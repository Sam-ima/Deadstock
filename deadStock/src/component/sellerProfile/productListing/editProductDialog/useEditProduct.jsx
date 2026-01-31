import { useEffect, useState, useRef } from "react";
import { uploadToCloudinary } from "../../../../services/cloudinaryService";
import { EMPTY_FORM } from "./constants";

export const useEditProduct = ({ open, product, onSave }) => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [images, setImages] = useState([]);
  const [features, setFeatures] = useState([]);
  const [specifications, setSpecifications] = useState([]);

  const fileInputRef = useRef(null);
  const editingIndexRef = useRef(null);

  useEffect(() => {
    if (open && product) {
      setForm({
        name: product.name || "",
        description: product.description || "",
        categoryId: product.categoryId || "",
        subcategoryId: product.subcategoryId || "",
        basePrice: product.basePrice || "",
        stock: product.stock || "",
        saleType: product.saleType || "direct",
        manufacture_date: product.manufacture_date || "",
        moq: product.moq || 1,
        requiresB2BVerification: Boolean(product.requiresB2BVerification),
      });

      setImages(
        (product.images || []).map(img => ({
          url: img.url,
          isMain: Boolean(img.isMain),
          publicId: img.publicId,
          width: img.width,
          height: img.height,
          size: img.size,
        }))
      );

      setFeatures(product.features || []);
      setSpecifications(product.specifications || []);
    }
  }, [open, product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(p => ({
      ...p,
      [name]: value,
      ...(name === "categoryId" ? { subcategoryId: "" } : {}),
    }));
  };

  const addImage = () => {
    editingIndexRef.current = null;
    fileInputRef.current.click();
  };

  const editImage = (i) => {
    editingIndexRef.current = i;
    fileInputRef.current.click();
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploaded = await uploadToCloudinary(file);

    const newImage = {
      url: uploaded.secure_url,
      publicId: uploaded.public_id,
      width: uploaded.width,
      height: uploaded.height,
      size: uploaded.bytes,
      isMain: false,
    };

    setImages(prev =>
      editingIndexRef.current === null
        ? [...prev, newImage]
        : prev.map((img, i) =>
            i === editingIndexRef.current
              ? { ...newImage, isMain: img.isMain }
              : img
          )
    );

    editingIndexRef.current = null;
    e.target.value = "";
  };

  const handleSave = () => {
    onSave({
      ...product,
      ...form,
      basePrice: Number(form.basePrice),
      stock: Number(form.stock),
      moq: Number(form.moq),
      images,
      features,
      specifications,
    });
  };

  return {
    form,
    images,
    features,
    specifications,
    fileInputRef,
    handleChange,
    addImage,
    editImage,
    handleFileSelect,
    setImages,
    setFeatures,
    setSpecifications,
    handleSave,
  };
};