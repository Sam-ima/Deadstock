// src/context/CategoryContext.jsx - UPDATED
import { createContext, useContext, useEffect, useState } from "react";
import {
  getCategories,
  addCategory,
  getSubcategoriesByCategory,
  addSubcategory
} from "../services/categoryService";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCategories();
      setCategories(data);
      return data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError("Failed to load categories");
      return [];
    } finally {
      setLoading(false);
    }
  };

  const createCategory = async (categoryData) => {
    setLoading(true);
    try {
      const newCategory = await addCategory(categoryData);
      await fetchCategories(); // Refresh the list
      return newCategory;
    } catch (error) {
      console.error("Error creating category:", error);
      setError("Failed to create category");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const fetchSubcategories = async (categoryId) => {
    try {
      const data = await getSubcategoriesByCategory(categoryId);
      setSubcategories(prev => ({
        ...prev,
        [categoryId]: data
      }));
      return data;
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      setSubcategories(prev => ({
        ...prev,
        [categoryId]: []
      }));
      return [];
    }
  };

  const createSubcategory = async (subcategoryData) => {
    try {
      const newSubcategory = await addSubcategory(subcategoryData);
      // Refresh subcategories for this category
      await fetchSubcategories(subcategoryData.categoryId);
      return newSubcategory;
    } catch (error) {
      console.error("Error creating subcategory:", error);
      throw error;
    }
  };

  const getCategoryById = (categoryId) => {
    return categories.find(cat => cat.id === categoryId);
  };

  const getSubcategoryById = (categoryId, subcategoryId) => {
    const subs = subcategories[categoryId] || [];
    return subs.find(sub => sub.id === subcategoryId);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider
      value={{
        categories,
        subcategories,
        loading,
        error,
        fetchCategories,
        createCategory,
        fetchSubcategories,
        createSubcategory,
        getCategoryById,
        getSubcategoryById
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategories = () => useContext(CategoryContext);