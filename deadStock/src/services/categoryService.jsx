// src/services/categoryService.js - UPDATED VERSION
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
  orderBy
} from "firebase/firestore";
import { db } from "../firebase/firebase";

const categoriesRef = collection(db, "categories");
const subcategoriesRef = collection(db, "subcategories");

/* CREATE Category */
export const addCategory = async (categoryData) => {
  const slug = categoryData.slug || 
    categoryData.name.toLowerCase().replace(/\s+/g, '-');
  
  return await addDoc(categoriesRef, {
    ...categoryData,
    slug,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
};

/* READ Categories */
export const getCategories = async () => {
  const snapshot = await getDocs(query(categoriesRef, orderBy("name")));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
};

// Update src/services/categoryService.js - READ Subcategories by Category
export const getSubcategoriesByCategory = async (categoryId) => {
  try {
    // Use a simple query and sort locally
    const q = query(subcategoriesRef, where("categoryId", "==", categoryId));
    const snapshot = await getDocs(q);
    
    const subcategories = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
    
    // Sort by name locally to avoid index requirement
    return subcategories.sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error("Error getting subcategories:", error);
    throw error;
  }
};

/* CREATE Subcategory */
export const addSubcategory = async (subcategoryData) => {
  return await addDoc(subcategoriesRef, {
    ...subcategoryData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
};

/* GET Category by ID */
export const getCategoryById = async (categoryId) => {
  const categories = await getCategories();
  return categories.find(cat => cat.id === categoryId) || null;
};

/* GET Category by Slug */
export const getCategoryBySlug = async (slug) => {
  const categories = await getCategories();
  return categories.find(cat => cat.slug === slug) || null;
};