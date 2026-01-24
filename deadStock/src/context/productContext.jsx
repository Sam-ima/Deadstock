// src/context/productContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import {
  addProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductsBySeller,
  getProductById
} from "../services/productService";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllProducts(filters);
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  // ✅ UPDATED: No image handling here
  const createProduct = async (productData, userId, userType) => {
    setLoading(true);
    setError(null);
    try {
      console.log("Creating product in context:", {
        productData,
        userId,
        userType
      });

      if (!productData) {
        throw new Error("Product data is required");
      }

      if (!userId) {
        throw new Error("User ID is required");
      }

      const newProduct = await addProduct(
        productData,
        userId,
        userType || "B2C"
      );

      await fetchProducts(); // Refresh list
      return newProduct;

    } catch (err) {
      console.error("Error creating product:", err);
      setError(err.message || "Failed to create product");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProductData = async (id, updates) => {
    setLoading(true);
    setError(null);
    try {
      await updateProduct(id, updates);
      await fetchProducts();
    } catch (err) {
      console.error("Error updating product:", err);
      setError("Failed to update product");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeProduct = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await deleteProduct(id);
      await fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
      setError("Failed to delete product");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchSellerProducts = async (sellerId, status = "active") => {
    setLoading(true);
    setError(null);
    try {
      return await getProductsBySeller(sellerId, status);
    } catch (err) {
      console.error("Error fetching seller products:", err);
      setError("Failed to load seller products");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchProductById = async (productId) => {
    setLoading(true);
    setError(null);
    try {
      return await getProductById(productId);
    } catch (err) {
      console.error("Error fetching product:", err);
      setError("Failed to load product");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        fetchProducts,
        createProduct,
        updateProduct: updateProductData,
        removeProduct,
        fetchSellerProducts,
        fetchProductById
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
