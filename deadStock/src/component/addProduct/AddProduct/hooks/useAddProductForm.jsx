// src/pages/AddProduct/hooks/useAddProductForm.js
import { useState } from "react";
import { toast } from "react-toastify";

export const useAddProductForm = ({ user, createProduct, navigate }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    categoryId: "",
    subcategoryId: "",
    basePrice: "",
    floorPrice: "",
    stock: "1",
    saleType: "direct",
    status: "draft"
  });

  const [images, setImages] = useState([]);
  const [specifications, setSpecifications] = useState([]);
  const [features, setFeatures] = useState([]);

  const [b2bFields, setB2bFields] = useState({
    moq: "1",
    bulkPrice: "",
    bulkDiscount: "0",
    requiresB2BVerification: false
  });

  const showSuccess = (msg) => toast.success(msg);
  const showError = (msg) => toast.error(msg);

  const validateCurrentStep = () => {
    switch (activeStep) {
      case 0:
        if (!formData.name.trim()) return showError("Product name is required"), false;
        if (!formData.categoryId) return showError("Please select a category"), false;
        if (!formData.stock || Number(formData.stock) < 1)
          return showError("Stock quantity must be at least 1"), false;
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

  const handleSubmit = async (status = "active") => {
    if (!validateCurrentStep()) return;

    setLoading(true);

    try {
      const specsObj = {};
      specifications.forEach(s => {
        if (s.key && s.value) specsObj[s.key.trim()] = s.value.trim();
      });

      const productData = {
        name: formData.name.trim(),
        description: formData.description?.trim() || "",
        categoryId: formData.categoryId,
        subcategoryId: formData.subcategoryId || "",
        basePrice: parseFloat(Number(formData.basePrice).toFixed(2)),
        floorPrice: parseFloat(
          (Number(formData.floorPrice) || Number(formData.basePrice) * 0.3).toFixed(2)
        ),
        stock: Number(formData.stock),
        status,
        saleType: formData.saleType,
        ...(specifications.length && { specifications: specsObj }),
        ...(features.length && { features: features.filter(f => f.trim()) }),
        moq: Number(b2bFields.moq) || 1,
        bulkPrice: b2bFields.bulkPrice ? Number(b2bFields.bulkPrice) : undefined,
        bulkDiscount: Number(b2bFields.bulkDiscount) || 0,
        requiresB2BVerification: Boolean(b2bFields.requiresB2BVerification)
      };

      const imagesForUpload = images.map(img => ({
        file: img.file || img,
        name: img.name || `image_${Date.now()}`,
        size: img.size || 0,
        url: img.url
      }));

      await createProduct(
        productData,
        user.uid,
        user.userType || "B2C",
        imagesForUpload
      );

      showSuccess(status === "draft" ? "Draft saved successfully!" : "Product published successfully!");
      setTimeout(() => navigate("/"), 2000);

    } catch (err) {
      showError(err.message || "Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  return {
    activeStep, setActiveStep,
    loading,
    formData, setFormData,
    images, setImages,
    specifications, setSpecifications,
    features, setFeatures,
    b2bFields, setB2bFields,
    handleSubmit,
    validateCurrentStep
  };
};
