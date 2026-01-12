// // src/components/cart/CartSuccessSnackbar.jsx
// import { Snackbar, Alert, Stack, Typography, Box } from "@mui/material";
// import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// const CartSuccessSnackbar = ({ open, onClose, product }) => {
//   if (!product) return null;

//   return (
//     <Snackbar
//       open={open}
//       autoHideDuration={3000}
//       onClose={onClose}
//       anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//       sx={{
//         '& .MuiSnackbar-root': {
//           bottom: 80, // Position above the cart drawer
//         }
//       }}
//     >
//       <Alert
//         onClose={onClose}
//         severity="success"
//         icon={<CheckCircleIcon fontSize="large" />}
//         sx={{
//           width: '100%',
//           maxWidth: 400,
//           backgroundColor: 'white',
//           color: '#2E7D32',
//           border: '1px solid #2E7D32',
//           boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
//           '& .MuiAlert-icon': {
//             color: '#2E7D32',
//             alignItems: 'center',
//           }
//         }}
//       >
//         <Stack spacing={1}>
//           <Stack direction="row" alignItems="center" spacing={1}>
//             <ShoppingCartCheckoutIcon sx={{ color: '#2E7D32' }} />
//             <Typography variant="subtitle1" fontWeight={600}>
//               Added to Cart!
//             </Typography>
//           </Stack>
          
//           <Stack direction="row" spacing={2} alignItems="center">
//             <Box
//               sx={{
//                 width: 60,
//                 height: 60,
//                 borderRadius: 1,
//                 overflow: 'hidden',
//                 flexShrink: 0,
//               }}
//             >
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 style={{
//                   width: '100%',
//                   height: '100%',
//                   objectFit: 'cover',
//                 }}
//               />
//             </Box>
            
//             <Box flex={1}>
//               <Typography variant="body2" fontWeight={500} noWrap>
//                 {product.name}
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 Quantity: {product.quantity}
//               </Typography>
//               <Typography variant="body2" fontWeight={600} color="#2E7D32">
//                 ${(product.unitPrice * product.quantity).toFixed(2)}
//               </Typography>
//             </Box>
//           </Stack>
          
//           <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
//             Product successfully added to your shopping cart
//           </Typography>
//         </Stack>
//       </Alert>
//     </Snackbar>
//   );
// };

// export default CartSuccessSnackbar;