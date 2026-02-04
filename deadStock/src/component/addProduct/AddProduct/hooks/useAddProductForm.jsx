// src/pages/AddProduct/hooks/useAddProductForm.js
import { useState } from "react";
import { toast } from "react-toastify";
import { uploadToCloudinary } from "../../../../services/cloudinaryService";

export const useAddProductForm = ({ user, createProduct, navigate }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    categoryId: "",
    subcategoryId: "",
    basePrice: "",
    stock: "1",
    saleType: "direct",
    status: "draft",
    manufacture_date: "" // ✅ NEW (REQUIRED)
  });

  const [images, setImages] = useState([]);
  const [specifications, setSpecifications] = useState([]);
  const [features, setFeatures] = useState([]);

  const [b2bFields, setB2bFields] = useState({
    moq: "1",
    requiresB2BVerification: false
  });

  const showSuccess = (msg) => toast.success(msg);
  const showError = (msg) => toast.error(msg);

  const validateCurrentStep = () => {
    switch (activeStep) {
      case 0:
        if (!formData.categoryId) {
          showError("Please select a category");
          return false;
        }

        // 2️⃣ SUBCATEGORY NEXT
        if (!formData.subcategoryId) {
          showError("Please select a subcategory");
          return false;
        }

        // 3️⃣ PRODUCT NAME
        if (!formData.name.trim()) {
          showError("Product name is required");
          return false;
        }

        if (!formData.manufacture_date)
          return showError("Manufacture date is required"), false;

        if (!formData.stock || Number(formData.stock) < 1)
          return showError("Stock must be at least 1"), false;

        return true;

      case 1:
        if (!formData.basePrice || Number(formData.basePrice) <= 0)
          return showError("Base price must be greater than 0"), false;

        return true;

      case 2:
        if (images.length === 0)
          return showError("At least one product image is required"), false;

        return true;

      default:
        return true;
    }
  };

  const uploadImages = async () => {
    try {
      const uploadedImages = await Promise.all(
        images.map(async (img) => {
          const result = await uploadToCloudinary(img.file);
          return {
            url: result.secure_url,
            publicId: result.public_id,
            width: result.width,
            height: result.height,
            size: result.bytes,
            isMain: img.isMain
          };
        })
      );
      return uploadedImages;
    } catch (err) {
      console.error("Image upload failed:", err);
      showError("Failed to upload images. Please try again.");
      return [];
    }
  };

  const handleSubmit = async (status = "active") => {
    if (!validateCurrentStep()) return;

    setLoading(true);

    try {
      const uploadedImages = await uploadImages();

      const specsObj = {};
      specifications.forEach((s) => {
        if (s.key && s.value) specsObj[s.key.trim()] = s.value.trim();
      });

      const basePrice = Number(formData.basePrice);

      const productData = {
        name: formData.name.trim(),
        description: formData.description?.trim() || "",
        categoryId: formData.categoryId,
        subcategoryId: formData.subcategoryId || "",
        basePrice: parseFloat(basePrice.toFixed(2)),

        // ✅ FLOOR PRICE = 50% OF BASE PRICE
        floorPrice: parseFloat((basePrice * 0.5).toFixed(2)),

        stock: Number(formData.stock),
        status,
        saleType: formData.saleType,
        images: uploadedImages,

        manufacture_date: formData.manufacture_date, // ✅ REQUIRED FIELD

        ...(specifications.length && { specifications: specsObj }),
        ...(features.length && { features: features.filter((f) => f.trim()) }),

        moq: Number(b2bFields.moq) || 1,
        requiresB2BVerification: Boolean(
          b2bFields.requiresB2BVerification
        )
      };

      await createProduct(
        productData,
        user.uid,
        user.userType || "B2C"
      );

      showSuccess(
        status === "draft"
          ? "Draft saved successfully!"
          : "Product published successfully!"
      );

      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      showError(err.message || "Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  return {
    activeStep,
    setActiveStep,
    loading,
    formData,
    setFormData,
    images,
    setImages,
    specifications,
    setSpecifications,
    features,
    setFeatures,
    b2bFields,
    setB2bFields,
    handleSubmit,
    validateCurrentStep
  };
};