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

export const addProduct = async (productData, userId, userType) => {
  // Get category-based depreciation settings
  const depSettings = getDepreciationSettings(productData.categorySlug, productData);
  
  return await addDoc(productsRef, {
    ...productData,
    // Depreciation Metadata
    depreciationType: depSettings.type,
    depreciationRate: depSettings.rate,
    depreciationPeriod: depSettings.period, // 'daily', 'weekly', 'monthly'
    floorPrice: productData.floorPrice || productData.basePrice * 0.3,
    currentPrice: productData.basePrice, // Initial price same as base
    nextDepreciationAt: calculateNextDepreciationTime(depSettings.period),
    lastDepreciatedAt: null,
    depreciationCount: 0,
    
    // Product Status
    status: 'active',
    isDepreciating: true,
    
    // Seller Info
    sellerId: userId,
    sellerType: userType,
    
    // Timestamps
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    expiresAt: calculateExpiryDate(productData.categorySlug)
  });
};

// Helper function for depreciation settings
const getDepreciationSettings = (categorySlug, productData) => {
  const settings = {
    'electronics': {
      type: 'EXPONENTIAL',
      rate: 0.02, // 2% daily depreciation
      period: 'daily',
      formula: 'fast_exponential'
    },
    'fashion': {
      type: 'LINEAR',
      rate: 0.015, // 1.5% daily
      period: 'daily',
      formula: 'linear_seasonal'
    },
    'antiques': {
      type: 'SLOW_LINEAR',
      rate: 0.005, // 0.5% daily
      period: 'weekly',
      formula: 'slow_linear'
    },
    'bulk': {
      type: 'ACCELERATED_EXPONENTIAL',
      rate: productData.quantity > 100 ? 0.03 : 0.025,
      period: 'daily',
      formula: 'accelerated_bulk'
    },
    'seasonal': {
      type: 'STEP_BASED',
      rate: 0,
      period: 'weekly',
      formula: 'step_seasonal'
    }
  };
  
  return settings[categorySlug] || {
    type: 'LINEAR',
    rate: 0.01,
    period: 'daily',
    formula: 'default_linear'
  };
};

// Calculate next depreciation time
const calculateNextDepreciationTime = (period) => {
  const now = new Date();
  switch(period) {
    case 'daily':
      now.setDate(now.getDate() + 1);
      break;
    case 'weekly':
      now.setDate(now.getDate() + 7);
      break;
    case 'monthly':
      now.setMonth(now.getMonth() + 1);
      break;
  }
  // Set to midnight
  now.setHours(0, 0, 0, 0);
  return now;
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