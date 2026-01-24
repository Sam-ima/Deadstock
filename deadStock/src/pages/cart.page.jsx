// CartDrawer.jsx
import { Box, Slide, Typography } from "@mui/material";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateItemQuantity,
  removeItem,
} from "../store/slice/cartSlice";
import { useAuth } from "../context/authContext/authContext";
import CartDrawerHeader from "../component/cart/cartHeader";
import CartDrawerItem from "../component/cart/cart_item";
import CartDrawerFooter from "../component/cart/cart_footer";
import CartDrawerEmpty from "../component/cart/cart_drawer_empty";
import { toNumber, getItemTotal } from "../component/cart/cart_utils";

const CartDrawer = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const cartItems = useSelector((state) =>
    user ? state.cart.items || {} : {}
  );

  const cartItemsArray = Object.values(cartItems).sort((a, b) => {
    const dateA = new Date(a.addedAt || a.updatedAt || 0);
    const dateB = new Date(b.addedAt || b.updatedAt || 0);
    return dateB - dateA;
  });

  useEffect(() => {
    if (open) {
      console.log("🔐 User logged in:", !!user);
      console.log("📦 Cart Items:", cartItemsArray.length);
    }
  }, [open, cartItemsArray, user]);

  const totalItems = cartItemsArray.reduce(
    (sum, item) => sum + toNumber(item.quantity),
    0
  );

  const cartTotal = cartItemsArray.reduce(
    (sum, item) => sum + getItemTotal(item),
    0
  );

  return (
    <>
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

      <Slide direction="left" in={open} mountOnEnter unmountOnExit>
        <Box
          sx={{
            position: "fixed",
            top: { xs: 56, sm: 64 },
            right: 0,
            width: {
              xs: "85vw", // Not full screen on mobile
              sm: 450,
              md: 500,
            },
            maxWidth: { xs: 350 }, // optional max width for very small screens
            height: {
              xs: "calc(100vh - 56px)", // mobile
              sm: "calc(100vh - 64px)", // tablet/desktop
            },
            backgroundColor: "#1a3b2d",
            zIndex: 1200,
            borderTopLeftRadius: { xs: 12, sm: 20 },
            borderBottomLeftRadius: { xs: 12, sm: 20 },
            display: "flex",
            flexDirection: "column",
            color: "#FFF",
            boxShadow: "-5px 0 25px rgba(0,0,0,0.2)",
            transition: "transform 0.3s ease-in-out",
          }}
        >
          <CartDrawerHeader
            user={user}
            totalItems={totalItems}
            cartTotal={cartTotal}
            onClose={onClose}
          />

          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              px: { xs: 2, sm: 3 },
              py: { xs: 1, sm: 2 },
              '&::-webkit-scrollbar': { width: '6px' },
              '&::-webkit-scrollbar-track': { background: 'rgba(255,255,255,0.1)', borderRadius: '3px' },
              '&::-webkit-scrollbar-thumb': { background: 'rgba(255,255,255,0.3)', borderRadius: '3px', '&:hover': { background: 'rgba(255,255,255,0.4)' } },
            }}
          >
            {!user ? (
              <CartDrawerEmpty onClose={onClose} />
            ) : cartItemsArray.length === 0 ? (
              <Box sx={{ textAlign: "center", mt: 4, color: "#FFF", px: 2 }}>
                <Typography variant="h6" sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' }, mb: 1 }}>
                  Your cart is empty
                </Typography>
                <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)", fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                  Add some products to get started!
                </Typography>
              </Box>
            ) : (
              cartItemsArray.map((item) => (
                <CartDrawerItem
                  key={item.cartItemId || item.id}
                  item={item}
                  onIncrease={(id, q) =>
                    dispatch(updateItemQuantity({ cartItemId: id, quantity: q + 1 }))
                  }
                  onDecrease={(id, q) =>
                    q > 1
                      ? dispatch(updateItemQuantity({ cartItemId: id, quantity: q - 1 }))
                      : dispatch(removeItem(id))
                  }
                  onRemove={(id) => dispatch(removeItem(id))}
                />
              ))
            )}
          </Box>

          {user && cartItemsArray.length > 0 && (
            <CartDrawerFooter
              cartTotal={cartTotal}
              onCheckout={onClose}
            />
          )}
        </Box>
      </Slide>
    </>
  );
};

export default CartDrawer;



// import {
//   Box,
//   Typography,
//   IconButton,
//   Divider,
//   Button,
//   Stack,
//   Badge,
//   Card,
//   Slide,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import DeleteIcon from "@mui/icons-material/Delete";
// import AddIcon from "@mui/icons-material/Add";
// import RemoveIcon from "@mui/icons-material/Remove";
// import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
// import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
// import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { addItem, updateItemQuantity, removeItem } from "../store/slice/cartSlice";
// import { useAuth } from "../context/authContext/authContext"; 

// // FIXED: Improved toNumber function
// const toNumber = (v) => {
//   if (v === null || v === undefined) return 0;
//   if (typeof v === 'number') return v;
//   if (typeof v === 'string') {
//     const num = parseFloat(v.replace(/[^0-9.-]+/g, ""));
//     return isNaN(num) ? 0 : num;
//   }
//   return 0;
// };

// // FIXED: Improved formatPrice function
// const formatPrice = (v) => {
//   const num = toNumber(v);
//   return num.toLocaleString('en-IN', {
//     minimumFractionDigits: 0,
//     maximumFractionDigits: 2
//   });
// };


// const CartDrawer = ({ open, onClose }) => {
//   const dispatch = useDispatch();
//   const { user } = useAuth(); // Get user auth state
  
//   // Only show cart items if user is logged in
//   const cartItems = useSelector((state) => {
//     // If user is not logged in, return empty cart
//     if (!user) {
//       return {};
//     }
//     return state.cart.items || {};
//   });
  
//   const cartItemsArray = Object.values(cartItems);
  
//   // Debug: Log cart items to see what's available
//   useEffect(() => {
//     if (open) {
//       console.log("🔐 User logged in:", !!user);
//       console.log("📦 Cart Items:", cartItemsArray.length);
//       if (cartItemsArray.length > 0) {
//         console.log("Cart Items Debug:", cartItemsArray);
//       }
//     }
//   }, [open, cartItemsArray, user]);

//   const totalItems = cartItemsArray.reduce((sum, item) => sum + toNumber(item.quantity), 0);
  
//   const cartTotal = cartItemsArray.reduce((sum, item) => {
//     const unitPrice = toNumber(
//       item.unitPrice || 
//       item.price || 
//       (item.product && (item.product.price || item.product.currentPrice)) ||
//       0
//     );
    
//     const quantity = toNumber(item.quantity);
//     const totalPrice = toNumber(item.totalPrice || unitPrice * quantity);
    
//     return sum + totalPrice;
//   }, 0);

//   const handleDecrease = (cartItemId, qty) => {
//     if (qty > 1) {
//       dispatch(updateItemQuantity({ cartItemId, quantity: qty - 1 }));
//     } else {
//       dispatch(removeItem(cartItemId));
//     }
//   };

//   const handleIncrease = (cartItemId, qty) => {
//     dispatch(updateItemQuantity({ cartItemId, quantity: qty + 1 }));
//   };

//   // Function to get display name
//   const getDisplayName = (item) => {
//     return item.product?.name || item.name || "Product";
//   };

//   // Function to get unit price
//   const getUnitPrice = (item) => {
//     const price = toNumber(
//       item.unitPrice || 
//       item.price || 
//       (item.product && (item.product.price || item.product.currentPrice)) ||
//       0
//     );
//     return price;
//   };

//   return (
//     <>
//       {/* Overlay */}
//       {open && (
//         <Box
//           onClick={onClose}
//           sx={{
//             position: "fixed",
//             inset: 0,
//             background: "rgba(0,0,0,0.3)",
//             zIndex: 1199,
//           }}
//         />
//       )}

//       {/* Drawer */}
//       <Slide direction="left" in={open} mountOnEnter unmountOnExit>
//         <Box
//           sx={{
//             position: "fixed",
//             top: 64,
//             right: 0,
//             width: { xs: 350, sm: 420 },
//             height: "calc(100vh - 64px)",
//             backgroundColor: "#1a3b2d", 
//             zIndex: 1200,
//             borderTopLeftRadius: 20,
//             borderBottomLeftRadius: 20,
//             display: "flex",
//             flexDirection: "column",
//             color: "#FFFFFF",
//             boxShadow: "-4px 0px 20px rgba(0,0,0,0.5)",
//           }}
//         >
//           {/* HEADER */}
//           <Box sx={{ p: 3 }}>
//             <Stack direction="row" justifyContent="space-between" alignItems="center">
//               <Stack direction="row" spacing={2} alignItems="center">
//                 <Badge badgeContent={totalItems} color="error">
//                   <ShoppingBagIcon sx={{ fontSize: 32, color: "#FFFFFF" }} />
//                 </Badge>
//                 <Typography fontWeight={700} sx={{ color: "#FFFFFF" }}>
//                   {user ? `${totalItems} items • Rs.${formatPrice(cartTotal)}` : "Please Login"}
//                 </Typography>
//               </Stack>
//               <IconButton onClick={onClose} sx={{ color: "#FFFFFF" }}>
//                 <CloseIcon />
//               </IconButton>
//             </Stack>
//           </Box>

//           {/* CART ITEMS */}
//           <Box sx={{ flex: 1, overflowY: "auto", px: 2, pb: 2 }}>
//             {!user ? (
//               <Box sx={{ textAlign: "center", mt: 5, p: 3 }}>
//                 <ShoppingBagIcon sx={{ fontSize: 64, color: "rgba(255,255,255,0.5)", mb: 2 }} />
//                 <Typography variant="h6" sx={{ color: "#FFFFFF", mb: 2 }}>
//                   Please Login
//                 </Typography>
//                 <Typography sx={{ color: "rgba(255,255,255,0.8)", mb: 3 }}>
//                   You need to be logged in to view and manage your cart.
//                 </Typography>
//                 <Button
//                   variant="contained"
//                   onClick={() => {
//                     onClose();
//                     navigate("/login", { state: { redirectTo: window.location.pathname } });
//                   }}
//                   sx={{
//                     backgroundColor: "#2a9d8f",
//                     color: "#FFFFFF",
//                     "&:hover": { backgroundColor: "#21867a" },
//                   }}
//                 >
//                   Login to Continue
//                 </Button>
//               </Box>
//             ) : cartItemsArray.length === 0 ? (
//               <Typography sx={{ mt: 5, textAlign: "center", color: "#FFFFFF" }}>
//                 Your cart is empty
//               </Typography>
//             ) : (
//               cartItemsArray.map((item) => {
//                 const qty = toNumber(item.quantity);
//                 const unitPrice = getUnitPrice(item);
//                 const total = toNumber(item.totalPrice || unitPrice * qty);
//                 const displayName = getDisplayName(item);
//                 const cartItemId = item.cartItemId || item.id;

//                 return (
//                   <Card
//                     key={cartItemId}
//                     sx={{
//                       mb: 2,
//                       p: 2,
//                       backgroundColor: "#194638ff", 
//                       color: "#FFFFFF",
//                       borderRadius: 2,
//                       transition: "transform 0.2s",
//                       "&:hover": { transform: "scale(1.02)" },
//                     }}
//                   >
//                     <Typography fontWeight={700} sx={{ mb: 1 }}>
//                       {displayName}
//                     </Typography>
                    
//                     {/* Display bulk order info if applicable */}
//                     {item.isBulkOrder && (
//                       <Typography 
//                         variant="caption" 
//                         sx={{ 
//                           color: "#90EE90", 
//                           fontStyle: "italic",
//                           display: "block",
//                           mb: 1
//                         }}
//                       >
//                         ✓ Bulk order discount applied
//                       </Typography>
//                     )}
                    
//                     <Typography sx={{ mb: 2 }}>
//                       Price: Rs.{formatPrice(unitPrice)} × {qty} = Rs.{formatPrice(total)}
//                     </Typography>

//                     <Stack direction="row" justifyContent="space-between" alignItems="center">
//                       <Stack direction="row" alignItems="center" spacing={1}>
//                         <IconButton
//                           size="small"
//                           sx={{ 
//                             color: "#FFFFFF", 
//                             border: "1px solid rgba(255,255,255,0.3)",
//                             minWidth: "36px",
//                             height: "36px"
//                           }}
//                           onClick={() => handleDecrease(cartItemId, qty)}
//                         >
//                           <RemoveIcon fontSize="small" />
//                         </IconButton>
                        
//                         <Typography sx={{ minWidth: "30px", textAlign: "center" }}>
//                           {qty}
//                         </Typography>
                        
//                         <IconButton
//                           size="small"
//                           sx={{ 
//                             color: "#FFFFFF", 
//                             border: "1px solid rgba(255,255,255,0.3)",
//                             minWidth: "36px",
//                             height: "36px"
//                           }}
//                           onClick={() => handleIncrease(cartItemId, qty)}
//                         >
//                           <AddIcon fontSize="small" />
//                         </IconButton>
//                       </Stack>
                      
//                       <IconButton
//                         size="small"
//                         onClick={() => dispatch(removeItem(cartItemId))}
//                         sx={{ color: "#FF6B6B" }}
//                       >
//                         <DeleteIcon fontSize="small" />
//                       </IconButton>
//                     </Stack>
//                   </Card>
//                 );
//               })
//             )}
//           </Box>

//           {/* FOOTER - Only show when user is logged in and cart has items */}
//           {user && cartItemsArray.length > 0 && (
//             <Box sx={{ 
//               p: 3,
//               backgroundColor: "rgba(25, 70, 56, 0.95)",
//             }}>
//               <Divider sx={{ mb: 2, borderColor: "#FFFFFF" }} />
//               <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
//                 <Typography variant="h6" fontWeight={800} sx={{ color: "#FFFFFF" }}>
//                   Total:
//                 </Typography>
//                 <Typography variant="h6" fontWeight={800} sx={{ color: "#FFFFFF" }}>
//                   Rs.{formatPrice(cartTotal)}
//                 </Typography>
//               </Stack>
//               <Button
//                 fullWidth
//                 variant="contained"
//                 startIcon={<ShoppingCartCheckoutIcon />}
//                 sx={{
//                   backgroundColor: "#2a9d8f",
//                   color: "#FFFFFF",
//                   fontWeight: 700,
//                   py: 1.5,
//                   "&:hover": { backgroundColor: "#21867a" },
//                 }}
//                 onClick={() => {
//                   onClose();
//                   // Add checkout navigation here
//                 }}
//               >
//                 Checkout
//               </Button>
//             </Box>
//           )}
//         </Box>
//       </Slide>
//     </>
//   );
// };

// export default CartDrawer;