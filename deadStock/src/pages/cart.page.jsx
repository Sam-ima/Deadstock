import {
  Box,
  Typography,
  IconButton,
  Divider,
  Button,
  Stack,
  Badge,
  Card,
  Slide,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useState, useEffect } from "react"; // Added useEffect

import { useSelector, useDispatch } from "react-redux";
import { addItem, updateItemQuantity, removeItem } from "../store/slice/cartSlice";

// FIXED: Improved toNumber function
const toNumber = (v) => {
  if (v === null || v === undefined) return 0;
  if (typeof v === 'number') return v;
  if (typeof v === 'string') {
    const num = parseFloat(v.replace(/[^0-9.-]+/g, ""));
    return isNaN(num) ? 0 : num;
  }
  return 0;
};

// FIXED: Improved formatPrice function
const formatPrice = (v) => {
  const num = toNumber(v);
  return num.toLocaleString('en-IN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });
};


const CartDrawer = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items || {});
  const cartItemsArray = Object.values(cartItems);
  
  // Debug: Log cart items to see what's available
  useEffect(() => {
    if (open && cartItemsArray.length > 0) {
      console.log("📦 Cart Items Debug:", cartItemsArray);
      cartItemsArray.forEach((item, index) => {
        console.log(`Item ${index + 1}:`, {
          name: item.name || item.product?.name,
          unitPrice: item.unitPrice,
          price: item.price,
          productPrice: item.product?.price,
          productCurrentPrice: item.product?.currentPrice,
          totalPrice: item.totalPrice,
          quantity: item.quantity
        });
      });
    }
  }, [open, cartItemsArray]);

  const totalItems = cartItemsArray.reduce((sum, item) => sum + toNumber(item.quantity), 0);
  
  const cartTotal = cartItemsArray.reduce((sum, item) => {
    // Debug: Check all possible price sources
    const unitPrice = toNumber(
      item.unitPrice || 
      item.price || 
      (item.product && (item.product.price || item.product.currentPrice)) ||
      0
    );
    
    const quantity = toNumber(item.quantity);
    const totalPrice = toNumber(item.totalPrice || unitPrice * quantity);
    
    console.log("Price calculation for item:", {
      name: item.name,
      unitPrice,
      price: item.price,
      productPrice: item.product?.price,
      totalPrice,
      quantity
    });
    
    return sum + totalPrice;
  }, 0);

  const handleDecrease = (cartItemId, qty) => {
    if (qty > 1) {
      dispatch(updateItemQuantity({ cartItemId, quantity: qty - 1 }));
    } else {
      dispatch(removeItem(cartItemId));
    }
  };

  const handleIncrease = (cartItemId, qty) => {
    dispatch(updateItemQuantity({ cartItemId, quantity: qty + 1 }));
  };

  // Function to get display name
  const getDisplayName = (item) => {
    return item.product?.name || item.name || "Product";
  };

  // Function to get unit price
  const getUnitPrice = (item) => {
    const price = toNumber(
      item.unitPrice || 
      item.price || 
      (item.product && (item.product.price || item.product.currentPrice)) ||
      0
    );
    return price;
  };

  return (
    <>
      {/* Overlay */}
      {open && (
        <Box
          onClick={onClose}
          sx={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.3)",
            zIndex: 1199,
          }}
        />
      )}

      {/* Drawer */}
      <Slide direction="left" in={open} mountOnEnter unmountOnExit>
        <Box
          sx={{
            position: "fixed",
            top: 64,
            right: 0,
            width: { xs: 350, sm: 420 },
            height: "calc(100vh - 64px)",
            backgroundColor: "#1a3b2d", 
            zIndex: 1200,
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
            display: "flex",
            flexDirection: "column",
            color: "#FFFFFF",
            boxShadow: "-4px 0px 20px rgba(0,0,0,0.5)",
          }}
        >
          {/* HEADER */}
          <Box sx={{ p: 3 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Stack direction="row" spacing={2} alignItems="center">
                <Badge badgeContent={totalItems} color="error">
                  <ShoppingBagIcon sx={{ fontSize: 32, color: "#FFFFFF" }} />
                </Badge>
                <Typography fontWeight={700} sx={{ color: "#FFFFFF" }}>
                  {totalItems} items • Rs.{formatPrice(cartTotal)}
                </Typography>
              </Stack>
              <IconButton onClick={onClose} sx={{ color: "#FFFFFF" }}>
                <CloseIcon />
              </IconButton>
            </Stack>
          </Box>

          {/* CART ITEMS */}
          <Box sx={{ flex: 1, overflowY: "auto", px: 2, pb: 2 }}>
            {cartItemsArray.length === 0 ? (
              <Typography sx={{ mt: 5, textAlign: "center", color: "#FFFFFF" }}>
                Your cart is empty
              </Typography>
            ) : (
              cartItemsArray.map((item) => {
                const qty = toNumber(item.quantity);
                const unitPrice = getUnitPrice(item);
                const total = toNumber(item.totalPrice || unitPrice * qty);
                const displayName = getDisplayName(item);
                const cartItemId = item.cartItemId || item.id;

                return (
                  <Card
                    key={cartItemId}
                    sx={{
                      mb: 2,
                      p: 2,
                      backgroundColor: "#194638ff", 
                      color: "#FFFFFF",
                      borderRadius: 2,
                      transition: "transform 0.2s",
                      "&:hover": { transform: "scale(1.02)" },
                    }}
                  >
                    <Typography fontWeight={700} sx={{ mb: 1 }}>
                      {displayName}
                    </Typography>
                    
                    {/* Display bulk order info if applicable */}
                    {item.isBulkOrder && (
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: "#90EE90", 
                          fontStyle: "italic",
                          display: "block",
                          mb: 1
                        }}
                      >
                        ✓ Bulk order discount applied
                      </Typography>
                    )}
                    
                    <Typography sx={{ mb: 2 }}>
                      Price: Rs.{formatPrice(unitPrice)} × {qty} = Rs.{formatPrice(total)}
                    </Typography>

                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <IconButton
                          size="small"
                          sx={{ 
                            color: "#FFFFFF", 
                            border: "1px solid rgba(255,255,255,0.3)",
                            minWidth: "36px",
                            height: "36px"
                          }}
                          onClick={() => handleDecrease(cartItemId, qty)}
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        
                        <Typography sx={{ minWidth: "30px", textAlign: "center" }}>
                          {qty}
                        </Typography>
                        
                        <IconButton
                          size="small"
                          sx={{ 
                            color: "#FFFFFF", 
                            border: "1px solid rgba(255,255,255,0.3)",
                            minWidth: "36px",
                            height: "36px"
                          }}
                          onClick={() => handleIncrease(cartItemId, qty)}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Stack>
                      
                      <IconButton
                        size="small"
                        onClick={() => dispatch(removeItem(cartItemId))}
                        sx={{ color: "#FF6B6B" }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  </Card>
                );
              })
            )}
          </Box>

          {/* FOOTER */}
          {cartItemsArray.length > 0 && (
            <Box sx={{ 
              p: 3,
              backgroundColor: "rgba(25, 70, 56, 0.95)",
            }}>
              <Divider sx={{ mb: 2, borderColor: "#FFFFFF" }} />
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" fontWeight={800} sx={{ color: "#FFFFFF" }}>
                  Total:
                </Typography>
                <Typography variant="h6" fontWeight={800} sx={{ color: "#FFFFFF" }}>
                  Rs.{formatPrice(cartTotal)}
                </Typography>
              </Stack>
              <Button
                fullWidth
                variant="contained"
                startIcon={<ShoppingCartCheckoutIcon />}
                sx={{
                  backgroundColor: "#2a9d8f",
                  color: "#FFFFFF",
                  fontWeight: 700,
                  py: 1.5,
                  "&:hover": { backgroundColor: "#21867a" },
                }}
                onClick={() => {
                  onClose();
                  // Add checkout navigation here
                }}
              >
                Checkout
              </Button>
            </Box>
          )}
        </Box>
      </Slide>
    </>
  );
};

export default CartDrawer;