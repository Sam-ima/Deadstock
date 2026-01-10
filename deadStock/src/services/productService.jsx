// src/services/productService.jsx - COMPLETE WITH ALL EXPORTS
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
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase/firebase";

const productsRef = collection(db, "products");

/* CREATE Product with dynamic fields - SAFE VERSION */
export const addProduct = async (
  productData,
  userId,
  userType,
  images = []
) => {
  console.log("=== addProduct called ===");
  console.log("Parameters received:", {
    productData,
    userId,
    userType,
    images,
  });

  // VALIDATE INPUTS
  if (!productData || typeof productData !== "object") {
    throw new Error(
      "Invalid product data: productData is required and must be an object"
    );
  }

  if (!productData.name || productData.name.trim() === "") {
    throw new Error("Product name is required");
  }

  if (!userId || userId.trim() === "") {
    throw new Error("User ID is required");
  }

  console.log("All validations passed, proceeding...");

  try {
    // 1. Generate slug from name
    const slug = productData.name
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-");

    console.log("Generated slug:", slug);

    // 2. Prepare base product data
    const baseProduct = {
      // Basic info (with defaults)
      name: productData.name || "Untitled Product",
      slug: slug,
      description: productData.description || "",
      categoryId: productData.categoryId || null,
      subcategoryId: productData.subcategoryId || null,

      // Pricing (with validation)
      basePrice: Number(productData.basePrice) || 0,
      currentPrice: Number(productData.basePrice) || 0,
      floorPrice:
        Number(productData.floorPrice) || Number(productData.basePrice) * 0.3,

      // Inventory
      stock: Number(productData.stock) || 1,
      sold: 0,

      // Seller info
      sellerId: userId,
      sellerType: userType || "B2C",

      // Status
      status: productData.status || "active",
      saleType: productData.saleType || "direct",

      // Images - will be updated later
      images: [],

      // Rating
      rating: 0,
      reviews: 0,

      // B2B fields (with safe defaults)
      moq: Number(productData.moq) || 1,
      bulkPrice: productData.bulkPrice ? Number(productData.bulkPrice) : null,
      bulkDiscount: Number(productData.bulkDiscount) || 0,
      requiresB2BVerification:
        Boolean(productData.requiresB2BVerification) || false,

      // Timestamps
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),

      // Depreciation fields
      isDepreciating: true,
      depreciationCount: 0,
      lastDepreciatedAt: null,

      // Dynamic fields
      ...processDynamicFields(productData),
    };

    console.log("Base product data prepared:", baseProduct);

    // 3. Create the product document FIRST
    console.log("Creating product document...");
    const docRef = await addDoc(productsRef, baseProduct);
    const productId = docRef.id;
    console.log("Product created with ID:", productId);

    // 4. Upload images if any
    let uploadedImages = [];
    if (images && Array.isArray(images) && images.length > 0) {
      console.log("Uploading images...");
      uploadedImages = await uploadProductImages(images, userId, productId);
      console.log("Images uploaded:", uploadedImages.length);
    }

    // 5. Update the product with image URLs
    const finalProductData = {
      ...baseProduct,
      images: uploadedImages,
      updatedAt: serverTimestamp(),
    };

    console.log("Updating product with images...");
    await updateDoc(docRef, finalProductData);

    console.log("=== Product created successfully ===");
    return {
      id: productId,
      ...finalProductData,
    };
  } catch (error) {
    console.error("=== ERROR in addProduct ===");
    console.error("Error:", error);
    throw error;
  }
};

/* Upload images to Firebase Storage */
const uploadProductImages = async (images, userId, productId = "") => {
  console.log("Starting image upload...");

  if (!images || !Array.isArray(images) || images.length === 0) {
    console.log("No valid images to upload");
    return [];
  }

  const uploadPromises = images.map(async (image, index) => {
    try {
      console.log(`Processing image ${index}:`, image);

      // Skip if no file
      if (!image || (!image.file && !(image instanceof File))) {
        console.log(`Skipping image ${index}: No file found`);
        return null;
      }

      const file = image.file || image;
      const timestamp = Date.now();
      const fileName = `${timestamp}_${index}_${
        file.name?.replace(/\s+/g, "_") || "image"
      }`;
      const path = `products/${userId}/${productId || "temp"}/${fileName}`;

      console.log(`Uploading to path: ${path}`);

      const storageRef = ref(storage, path);
      await uploadBytes(storageRef, file);

      const url = await getDownloadURL(storageRef);
      console.log(`Image ${index} uploaded successfully`);

      return {
        url,
        path,
        name: file.name || `image_${index}`,
        size: file.size || 0,
        isMain: index === 0,
      };
    } catch (error) {
      console.error(`Error uploading image ${index}:`, error);
      return null;
    }
  });

  const results = await Promise.all(uploadPromises);
  const validResults = results.filter(Boolean);

  console.log(`Image upload completed: ${validResults.length} successful`);
  return validResults;
};

/* Helper function to process dynamic fields */
const processDynamicFields = (productData) => {
  const dynamicData = {};

  // Add specifications if present
  if (
    productData.specifications &&
    typeof productData.specifications === "object"
  ) {
    dynamicData.specifications = productData.specifications;
  }

  // Add features if present
  if (productData.features && Array.isArray(productData.features)) {
    dynamicData.features = productData.features;
  }

  // Add other fields
  if (productData) {
    Object.keys(productData).forEach((key) => {
      // Skip reserved fields
      const reservedFields = [
        "name",
        "slug",
        "description",
        "categoryId",
        "subcategoryId",
        "basePrice",
        "currentPrice",
        "floorPrice",
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
        "bulkPrice",
        "bulkDiscount",
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
  }

  console.log("Dynamic fields processed:", dynamicData);
  return dynamicData;
};

/* READ Products with filters */
export const getAllProducts = async (filters = {}) => {
  try {
    let q = query(productsRef, orderBy("createdAt", "desc"));

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
export const getProductsBySeller = async (sellerId, status = "active") => {
  try {
    let q = query(
      productsRef,
      where("sellerId", "==", sellerId),
      where("status", "==", status)
    );

    if (status) {
      q = query(q, where("status", "==", status));
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
