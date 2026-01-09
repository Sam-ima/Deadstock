// src/context/CategoryContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { 
  getCategories, 
  addCategory, 
  getSubcategoriesByCategory 
} from "../services/categoryService";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState({});

  const fetchCategories = async () => {
    const data = await getCategories();
    setCategories(data);
    return data;
  };

  const createCategory = async (categoryData) => {
    const newCategory = await addCategory(categoryData);
    await fetchCategories();
    return newCategory;
  };

  const fetchSubcategories = async (categorySlug) => {
    const data = await getSubcategoriesByCategory(categorySlug);
    setSubcategories(prev => ({
      ...prev,
      [categorySlug]: data
    }));
    return data;
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider value={{ 
      categories, 
      subcategories,
      fetchCategories,
      createCategory,
      fetchSubcategories 
    }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategories = () => useContext(CategoryContext);