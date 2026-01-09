// context/categoryContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebase/firebase"; // Firestore
import { collection, addDoc, getDocs } from "firebase/firestore";

const CategoryContext = createContext();

export const useCategories = () => useContext(CategoryContext);

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState({});

  const fetchCategories = async () => {
    const snap = await getDocs(collection(db, "categories"));
    const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setCategories(data);
  };

  const fetchSubcategories = async (categorySlug) => {
    const snap = await getDocs(collection(db, `categories/${categorySlug}/subcategories`));
    const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setSubcategories(prev => ({ ...prev, [categorySlug]: data }));
  };

  const createCategory = async (categoryData) => {
    const docRef = await addDoc(collection(db, "categories"), categoryData);
    // After adding, fetch all categories again to update state
    await fetchCategories();
    return { id: docRef.id, ...categoryData };
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider value={{
      categories,
      subcategories,
      fetchCategories,
      fetchSubcategories,
      createCategory
    }}>
      {children}
    </CategoryContext.Provider>
  );
};
