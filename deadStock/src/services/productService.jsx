import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  getDoc,
  doc,
  serverTimestamp,
  query,
  where,
  orderBy,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

const productsRef = collection(db, "products");

// Cloudinary config (unchanged)
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

/* CREATE Product with dynamic fields - SAFE VERSION */
export const addProduct = async (productData, userId, userType) => {
  if (!productData || typeof productData !== "object") {
    throw new Error("Invalid product data");
  }

  if (!productData.name?.trim()) {
    throw new Error("Product name is required");
  }

  if (!productData.manufacture_date) {
    throw new Error("Manufacture date is required");
  }

  if (!userId) {
    throw new Error("User ID is required");
  }

  try {
    const slug = productData.name
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-");

    const totalStock = Number(productData.stock) || 1;
    const basePrice = Number(productData.basePrice) || 0;

    // ✅ FLOOR PRICE IS ALWAYS 50% OF BASE PRICE
    const floorPrice = basePrice * 0.5;

    const baseProduct = {
      name: productData.name,
      slug,
      description: productData.description || "",
      categoryId: productData.categoryId || null,
      subcategoryId: productData.subcategoryId || null,

      basePrice,
      currentPrice: basePrice,
      floorPrice,

      manufacture_date: productData.manufacture_date,

      stock: totalStock,
      availableStock: totalStock,
      reservedStock: 0,
      sold: 0,

      sellerId: userId,
      sellerType: userType || "B2C",

      status: productData.status || "active",
      saleType: productData.saleType || "direct",

      images: productData.images || [],

      rating: 0,
      reviews: 0,

      moq: Number(productData.moq) || 1,
      requiresB2BVerification:
        Boolean(productData.requiresB2BVerification) || false,

      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),

      isDepreciating: true,
      depreciationCount: 0,
      lastDepreciatedAt: null,

      ...processDynamicFields(productData),
    };

    const docRef = await addDoc(productsRef, baseProduct);

    return {
      id: docRef.id,
      ...baseProduct,
    };
  } catch (error) {
    console.error("Error in addProduct:", error);
    throw error;
  }
};

/* Upload images to CLOUDINARY (unchanged) */
const uploadProductImages = async (images, userId, productId = "") => {
  if (!images || !Array.isArray(images) || images.length === 0) {
    return [];
  }

  const uploadPromises = images.map(async (image, index) => {
    try {
      const file = image.file || image;
      if (!(file instanceof File)) return null;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);
      formData.append("folder", `products/${userId}/${productId}`);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );

      const data = await response.json();

      if (!data.secure_url) {
        throw new Error("Cloudinary upload failed");
      }

      return {
        url: data.secure_url,
        publicId: data.public_id,
        name: file.name || `image_${index}`,
        size: data.bytes || 0,
        format: data.format,
        width: data.width,
        height: data.height,
        isMain: index === 0,
      };
    } catch {
      return null;
    }
  });

  const results = await Promise.all(uploadPromises);
  return results.filter(Boolean);
};

/* Helper function to process dynamic fields */
const processDynamicFields = (productData) => {
  const dynamicData = {};

  if (
    productData.specifications &&
    typeof productData.specifications === "object"
  ) {
    dynamicData.specifications = productData.specifications;
  }

  if (productData.features && Array.isArray(productData.features)) {
    dynamicData.features = productData.features;
  }

  Object.keys(productData).forEach((key) => {
    const reservedFields = [
      "name",
      "slug",
      "description",
      "categoryId",
      "subcategoryId",
      "basePrice",
      "currentPrice",
      "floorPrice",
      "manufacture_date",
      "stock",
      "sold",
      "sellerId",
      "sellerType",
      "status",
      "saleType",
      "images",
      "rating",
      "reviews",
      "moq",
      "requiresB2BVerification",
      "createdAt",
      "updatedAt",
      "specifications",
      "features",
      "isDepreciating",
      "depreciationCount",
      "lastDepreciatedAt",
    ];

    if (
      !reservedFields.includes(key) &&
      productData[key] !== undefined &&
      productData[key] !== null &&
      productData[key] !== ""
    ) {
      dynamicData[key] = productData[key];
    }
  });

  return dynamicData;
};
/* READ Products with filters */
export const getAllProducts = async (filters = {}) => {
  try {
    let q = query(productsRef, orderBy("createdAt", "desc"));

    // Apply filters
    if (filters.categoryId) {
      q = query(q, where("categoryId", "==", filters.categoryId));
    }
    if (filters.sellerId) {
      q = query(q, where("sellerId", "==", filters.sellerId));
    }
    if (filters.status) {
      q = query(q, where("status", "==", filters.status));
    }

    const snapshot = await getDocs(q);

    // Map documents safely
    return snapshot.docs.map((doc) => {
      const data = doc.data();

      // Safely handle createdAt
      const createdAt =
        data.createdAt && typeof data.createdAt.toDate === "function"
          ? data.createdAt.toDate().toISOString() // Firestore Timestamp
          : data.createdAt
            ? new Date(data.createdAt).toISOString() // string or number
            : new Date().toISOString(); // fallback if missing

      // Safely handle updatedAt
      const updatedAt =
        data.updatedAt && typeof data.updatedAt.toDate === "function"
          ? data.updatedAt.toDate().toISOString()
          : data.updatedAt
            ? new Date(data.updatedAt).toISOString()
            : new Date().toISOString();

      return {
        id: doc.id,
        ...data,
        createdAt,
        updatedAt,
      };
    });
  } catch (error) {
    console.error("Error getting products:", error);
    throw error;
  }
};

/* UPDATE Product */
export const updateProduct = async (id, updates) => {
  try {
    const productDoc = doc(db, "products", id);
    return await updateDoc(productDoc, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

/* DELETE Product */
export const deleteProduct = async (id) => {
  try {
    const productDoc = doc(db, "products", id);
    return await deleteDoc(productDoc);
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

/* GET Single Product by ID */
export const getProductById = async (productId) => {
  try {
    const productRef = doc(db, "products", productId);
    const productDoc = await getDoc(productRef);

    if (!productDoc.exists()) {
      throw new Error("Product not found");
    }

    return {
      id: productId,
      ...productDoc.data(),
      createdAt:
        productDoc.data().createdAt?.toDate()?.toISOString() ||
        new Date().toISOString(),
      updatedAt:
        productDoc.data().updatedAt?.toDate()?.toISOString() ||
        new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error getting product:", error);
    throw error;
  }
};

/* GET Single Product by Slug */
export const getProductBySlug = async (slug) => {
  try {
    const q = query(productsRef, where("slug", "==", slug));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return null;
    }

    const docSnap = snapshot.docs[0];

    return {
      id: docSnap.id,
      ...docSnap.data(),
      createdAt:
        docSnap.data().createdAt?.toDate()?.toISOString() ||
        new Date().toISOString(),
      updatedAt:
        docSnap.data().updatedAt?.toDate()?.toISOString() ||
        new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error getting product by slug:", error);
    throw error;
  }
};

/* GET Products by Seller */
const parseFirestoreDate = (value) => {
  if (!value) return new Date().toISOString(); // fallback if missing

  // If it's a Firestore Timestamp
  if (typeof value.toDate === "function") {
    return value.toDate().toISOString();
  }

  // If it's already a string or number
  const date = new Date(value);
  if (!isNaN(date.getTime())) return date.toISOString();

  // fallback if parsing fails
  return new Date().toISOString();
};

/* GET products by seller */
export const getProductsBySeller = async (sellerId, status = "active") => {
  try {
    if (!sellerId) throw new Error("Seller ID is required");

    // Build query
    let q = query(
      productsRef,
      where("sellerId", "==", sellerId),
      where("status", "==", status)
    );

    const snapshot = await getDocs(q);

    // Map documents safely
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: parseFirestoreDate(data.createdAt),
        updatedAt: parseFirestoreDate(data.updatedAt),
      };
    });
  } catch (error) {
    console.error("Error getting seller products:", error);
    throw error;
  }
};

/* GET Products by Category */
export const getProductsByCategory = async (categoryId, limit = 20) => {
  try {
    let q = query(
      productsRef,
      where("categoryId", "==", categoryId),
      where("status", "==", "active"),
      orderBy("createdAt", "desc")
    );

    if (limit) {
      // Note: For limiting, you might need to use 'limit' function
      // but basic Firestore query doesn't have limit in this syntax
      // We'll filter after getting results
      const snapshot = await getDocs(q);
      const products = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt:
          doc.data().createdAt?.toDate()?.toISOString() ||
          new Date().toISOString(),
        updatedAt:
          doc.data().updatedAt?.toDate()?.toISOString() ||
          new Date().toISOString(),
      }));
      return products.slice(0, limit);
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt:
        doc.data().createdAt?.toDate()?.toISOString() ||
        new Date().toISOString(),
      updatedAt:
        doc.data().updatedAt?.toDate()?.toISOString() ||
        new Date().toISOString(),
    }));
  } catch (error) {
    console.error("Error getting category products:", error);
    throw error;
  }
};

/* UPDATE Product Images */
export const updateProductImages = async (productId, userId, newImages) => {
  try {
    // Upload new images
    const uploadedImages = await uploadProductImages(
      newImages,
      userId,
      productId
    );

    // Get current product
    const product = await getProductById(productId);

    // Merge with existing images
    const allImages = [...(product.images || []), ...uploadedImages];

    // Update product
    await updateProduct(productId, {
      images: allImages,
      updatedAt: serverTimestamp(),
    });

    return allImages;
  } catch (error) {
    console.error("Error updating product images:", error);
    throw error;
  }
};

/* REMOVE Product Image */
export const removeProductImage = async (productId, imageIndex) => {
  try {
    const product = await getProductById(productId);
    const updatedImages = product.images.filter(
      (_, index) => index !== imageIndex
    );

    await updateProduct(productId, {
      images: updatedImages,
      updatedAt: serverTimestamp(),
    });

    return updatedImages;
  } catch (error) {
    console.error("Error removing product image:", error);
    throw error;
  }
};

/* SET Main Image */
export const setMainProductImage = async (productId, imageIndex) => {
  try {
    const product = await getProductById(productId);
    const updatedImages = product.images.map((img, index) => ({
      ...img,
      isMain: index === imageIndex,
    }));

    await updateProduct(productId, {
      images: updatedImages,
      updatedAt: serverTimestamp(),
    });

    return updatedImages;
  } catch (error) {
    console.error("Error setting main image:", error);
    throw error;
  }
};
