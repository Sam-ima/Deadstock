// src/hooks/useCartSuccess.js
import { useState, useEffect } from 'react';

export const useCartSuccess = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [addedProduct, setAddedProduct] = useState(null);

  const showCartSuccess = (product) => {
    setAddedProduct(product);
    setShowSuccess(true);
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
      setAddedProduct(null);
    }, 3000);
  };

  return {
    showSuccess,
    addedProduct,
    showCartSuccess,
    hideSuccess: () => {
      setShowSuccess(false);
      setAddedProduct(null);
    }
  };
};