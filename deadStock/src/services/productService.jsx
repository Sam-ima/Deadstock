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
  where
} from "firebase/firestore";
import { db } from "../firebase/firebase";

const productsRef = collection(db, "products");

/* CREATE Product with all required fields from project */
export const addProduct = async (productData) => {
  // Set initial depreciation values based on category
  const depreciationData = getInitialDepreciationData(productData);
  
  return await addDoc(productsRef, {
    ...productData,
    ...depreciationData,
    status: 'active',
    currentPrice: productData.basePrice, // Start with base price
    depreciationCount: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    expiresAt: calculateExpiryDate(productData.categorySlug)
  });
};

/* Helper function for initial depreciation setup */
const getInitialDepreciationData = (productData) => {
  const depreciationTypes = {
    'electronics': 'FAST',
    'fashion': 'SEASONAL',
    'antiques': 'SLOW',
    'bulk': 'ACCELERATED',
    'seasonal': 'STEP'
  };

  return {
    depreciationType: depreciationTypes[productData.categorySlug] || 'LINEAR',
    floorPrice: productData.floorPrice || productData.basePrice * 0.3,
    lastDepreciatedAt: serverTimestamp(),
    depreciationRate: getDepreciationRate(productData.categorySlug, productData.quantity)
  };
};

/* Helper function for depreciation rates */
const getDepreciationRate = (categorySlug, quantity) => {
  const rates = {
    'electronics': 0.15, // 15% per period
    'fashion': 10, // $10 per period
    'antiques': 2, // $2 per period
    'bulk': quantity > 100 ? 0.25 : 0.20, // 20-25% for bulk
    'seasonal': 0
  };
  return rates[categorySlug] || 0.1;
};

/* Calculate expiry date based on category */
const calculateExpiryDate = (categorySlug) => {
  const expiryDays = {
    'electronics': 30,
    'fashion': 90,
    'antiques': 365,
    'bulk': 60,
    'seasonal': 45
  };
  
  const days = expiryDays[categorySlug] || 90;
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

/* READ Products with filters */
export const getAllProducts = async (filters = {}) => {
  let q = productsRef;
  
  if (filters.categorySlug) {
    q = query(q, where("categorySlug", "==", filters.categorySlug));
  }
  
  if (filters.sellerId) {
    q = query(q, where("sellerId", "==", filters.sellerId));
  }
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

/* Other functions remain same... */
export const updateProductPrice = async (id, newPrice) => {
  const productDoc = doc(db, "products", id);
  return await updateDoc(productDoc, {
    currentPrice: newPrice,
    updatedAt: serverTimestamp()
  });
};

export const deleteProduct = async (id) => {
  const productDoc = doc(db, "products", id);
  return await deleteDoc(productDoc);
};