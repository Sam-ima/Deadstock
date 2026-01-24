// src/services/productService.js
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  where,
  orderBy
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase/firebase";

const productsRef = collection(db, "products");

/* CREATE Product with dynamic fields */
export const addProduct = async (productData, userId, userType, images = []) => {
  // 1. Upload images to Firebase Storage
  const uploadedImages = await uploadProductImages(images, userId);

  // 2. Generate slug from name
  const slug = productData.name
    .toLowerCase()
    .replace(/[^\w\s]/gi, '')
    .replace(/\s+/g, '-');

  const totalStock = Number(productData.stock) || 1;
  const basePrice = Number(productData.basePrice) || 0;

  // user input (could be undefined, empty, null)
  const userFloorPrice = productData.floorPrice;

  // final floor price logic
  const floorPrice =
    userFloorPrice !== undefined &&x
      userFloorPrice !== null &&
      userFloorPrice !== ''
      ? Number(userFloorPrice)
      : basePrice * 0.5;

  // 3. Prepare base product data
  const baseProduct = {
    name: productData.name,
    slug,
    description: productData.description || '',
    categoryId: productData.categoryId,
    subcategoryId: productData.subcategoryId || null,

    // Pricing
    basePrice,
    currentPrice: basePrice,
    floorPrice,

    // Inventory
    stock: totalStock,
    availableStock: totalStock,
    reservedStock: 0,
    sold: 0,


    // Seller info
    sellerId: userId,
    sellerType: userType,

    // Status
    status: productData.status || 'active',
    saleType: productData.saleType || 'direct',

    // Images
    images: uploadedImages,

    // Rating
    rating: 0,
    reviews: 0,

    // B2B fields
    moq: Number(productData.moq) || 1,
    bulkPrice: Number(productData.bulkPrice) || null,
    bulkDiscount: Number(productData.bulkDiscount) || 0,
    requiresB2BVerification: Boolean(productData.requiresB2BVerification) || false,

    // Timestamps
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),

    // Depreciation fields (auto-calculated)
    isDepreciating: true,
    depreciationCount: 0,
    lastDepreciatedAt: null
  };

  // 4. Add dynamic specifications and features
  const dynamicData = {};

  // Add specifications as object
  if (productData.specifications && typeof productData.specifications === 'object') {
    dynamicData.specifications = productData.specifications;
  }

  // Add features as array
  if (productData.features && Array.isArray(productData.features)) {
    dynamicData.features = productData.features;
  }

  // Add all other custom fields
  Object.keys(productData).forEach(key => {
    // Skip already processed fields
    const reservedFields = [
      'name', 'slug', 'description', 'categoryId', 'subcategoryId',
      'basePrice', 'currentPrice', 'floorPrice', 'stock', 'sold',
      'sellerId', 'sellerType', 'status', 'saleType', 'images',
      'rating', 'reviews', 'moq', 'bulkPrice', 'bulkDiscount',
      'requiresB2BVerification', 'createdAt', 'updatedAt',
      'specifications', 'features', 'status', 'isDepreciating',
      'depreciationCount', 'lastDepreciatedAt'
    ];

    if (!reservedFields.includes(key) && productData[key] !== undefined && productData[key] !== null && productData[key] !== '') {
      dynamicData[key] = productData[key];
    }
  });

  // 5. Combine all data
  const productToSave = {
    ...baseProduct,
    ...dynamicData
  };

  // 6. Add to Firestore
  const docRef = await addDoc(productsRef, productToSave);

  return {
    id: docRef.id,
    ...productToSave
  };
};

/* Upload images to Firebase Storage */
const uploadProductImages = async (images, userId) => {
  if (!images || images.length === 0) return [];

  const uploadPromises = images.map(async (image, index) => {
    try {
      const timestamp = Date.now();
      const fileName = `${timestamp}_${index}_${image.name.replace(/\s+/g, "_")}`;
      const path = `products/${userId}/${fileName}`;

      const storageRef = ref(storage, path);
      await uploadBytes(storageRef, image.file);

      const url = await getDownloadURL(storageRef);

      return {
        url,
        path,
        name: image.name,
        size: image.size,
        isMain: index === 0,
      };
    } catch (error) {
      console.error(`Error uploading image ${index}:`, error);
      return null;
    }
  });

  const results = await Promise.all(uploadPromises);
  return results.filter(Boolean);
};


/* READ Products with filters */
export const getAllProducts = async (filters = {}) => {
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
    ...doc.data()
  }));
};

/* UPDATE Product */
export const updateProduct = async (id, updates) => {
  const productDoc = doc(db, "products", id);
  return await updateDoc(productDoc, {
    ...updates,
    updatedAt: serverTimestamp()
  });
};

/* DELETE Product */
export const deleteProduct = async (id) => {
  const productDoc = doc(db, "products", id);
  return await deleteDoc(productDoc);
};