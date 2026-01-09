import { createContext, useContext, useEffect, useState } from "react";
import {
  addProduct,
  getAllProducts,
  deleteProduct,
} from "../services/productService";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const data = await getAllProducts();
    setProducts(data);
  };

  const createProduct = async (product) => {
    await addProduct(product);
    fetchProducts();
  };

  const removeProduct = async (id) => {
    await deleteProduct(id);
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{ products, createProduct, removeProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
