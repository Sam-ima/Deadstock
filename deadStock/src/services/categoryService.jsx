// src/services/categoryService.js
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp
} from "firebase/firestore";
import { db } from "../firebase/firebase";

const categoriesRef = collection(db, "categories");
const subcategoriesRef = collection(db, "subcategories");

/* CREATE Category */
export const addCategory = async (categoryData) => {
  return await addDoc(categoriesRef, {
    ...categoryData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
};

/* READ Categories */
export const getCategories = async () => {
  const snapshot = await getDocs(categoriesRef);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

/* READ Subcategories by Category */
export const getSubcategoriesByCategory = async (categorySlug) => {
  const q = query(subcategoriesRef, where("categorySlug", "==", categorySlug));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

/* CREATE Subcategory */
export const addSubcategory = async (subcategoryData) => {
  return await addDoc(subcategoriesRef, {
    ...subcategoryData,
    createdAt: serverTimestamp()
  });
};