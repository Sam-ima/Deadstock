// src/contexts/CartContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('deadstock_cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('deadstock_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(cartItem => 
        cartItem.id === item.id && 
        cartItem.unitPrice === item.unitPrice
      );

      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += item.quantity;
        updatedCart[existingItemIndex].totalPrice = 
          updatedCart[existingItemIndex].unitPrice * updatedCart[existingItemIndex].quantity;
        return updatedCart;
      } else {
        return [...prevCart, item];
      }
    });
  };

  const removeFromCart = (itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === itemId 
          ? { 
              ...item, 
              quantity: newQuantity, 
              totalPrice: item.unitPrice * newQuantity,
              isBulkOrder: newQuantity >= item.moq
            } 
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('deadstock_cart');
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      cartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};