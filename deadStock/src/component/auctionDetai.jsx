import { Box, Container, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import ProductImages from "./categoryPage/productDetail/ProductImages";
import ProductInfo from "./categoryPage/productDetail/ProductInfo";
import AuctionTimer from "./auctionDetail/auctionTimer";
import BidDialog from "./card/auction card/placeBidDialog";

import { setSelectedImage, toggleWishlist } from "../store/slice/auctionSlice";

const AuctionDetail = ({ product }) => {
  const dispatch = useDispatch();

  // ✅ FIX: dialog state
  const [openBidDialog, setOpenBidDialog] = useState(false);

  const selectedImage = useSelector(
    (state) => state.auction.selectedImages[product.id] ?? 0
  );

  const isFavorite = useSelector((state) =>
    state.auction.wishlist.includes(product.id)
  );

  const transformedProduct = {
    ...product,
   basePrice: product.currentBid,          
  currentPrice: product.highestBid,
    images: product.galleryImages || [product.img],
  };

  return (
    <Box sx={{ minHeight: "100vh", pt: { xs: 2, md: 4 } }}>
      <Container maxWidth="xl">

        {/* MOBILE */}
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            flexDirection: "column",
            gap: 3,
          }}
        >
          <ProductInfo product={transformedProduct} isAuction showPrice />

          <ProductImages
            product={transformedProduct}
            selectedImage={selectedImage}
            setSelectedImage={(index) =>
              dispatch(setSelectedImage({ productId: product.id, index }))
            }
            isFavorite={isFavorite}
            setIsFavorite={() => dispatch(toggleWishlist(product.id))}
          />

          <AuctionTimer
            product={product}
            onPlaceBid={() => setOpenBidDialog(true)}
          />
        </Box>

        {/* DESKTOP */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 4,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <ProductImages
              product={transformedProduct}
              selectedImage={selectedImage}
              setSelectedImage={(index) =>
                dispatch(setSelectedImage({ productId: product.id, index }))
              }
              isFavorite={isFavorite}
              setIsFavorite={() => dispatch(toggleWishlist(product.id))}
            />
          </Box>

          <Box sx={{ width: "40%" }}>
            <ProductInfo product={transformedProduct} isAuction showPrice />

            <Box >
              <AuctionTimer
                product={product}
                onPlaceBid={() => setOpenBidDialog(true)}
              />
            </Box>
          </Box>
        </Box>
      </Container>

      {/* ✅ Dialog */}
      <BidDialog
        open={openBidDialog}
        onClose={() => setOpenBidDialog(false)}
        product={product}
      />
    </Box>
  );
};

export default AuctionDetail;








// import React, { useState } from "react";
// import {
//   Container,
//   Grid,
//   Typography,
//   Box,
//   Button,
//   Chip,
//   IconButton,
//   Stack,
//   Divider,
//   Paper,
//   Rating,
//   TextField,
//   Snackbar,
//   Alert,
//   Breadcrumbs,
//   Link,
// } from "@mui/material";
// import {
//   Favorite,
//   FavoriteBorder,
//   Share,
//   ArrowBack,
//   Timer,
//   Gavel,
//   MonetizationOn,
//   Person,
//   CalendarToday,
//   LocationOn,
//   Verified,
//   Star,
// } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";

// const ProductDetail = ({ product }) => {
//   const navigate = useNavigate();
//   const [isWishlisted, setIsWishlisted] = useState(false);
//   const [bidAmount, setBidAmount] = useState(product.currentBid + 10);
//   const [showSnackbar, setShowSnackbar] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [selectedImage, setSelectedImage] = useState(product.img);

//   const primaryColor = "#2E7D32"; // Green
//   const accentColor = "#d8a855"; // Gold
//   const lightGreen = "#4CAF50";
//   const darkGreen = "#1B5E20";
//   const lightBg = "#f8fff8";

//   const handlePlaceBid = () => {
//     if (bidAmount <= product.currentBid) {
//       setSnackbarMessage("Bid amount must be higher than current bid!");
//       setShowSnackbar(true);
//       return;
//     }
//     console.log(`Placing bid: $${bidAmount} for product ${product.id}`);
//     setSnackbarMessage("Bid placed successfully!");
//     setShowSnackbar(true);
//   };

//   const handleBuyNow = () => {
//     console.log(`Buying now: ${product.id}`);
//     setSnackbarMessage("Purchase initiated!");
//     setShowSnackbar(true);
//   };

//   const handleShare = () => {
//     if (navigator.share) {
//       navigator.share({
//         title: product.name,
//         text: `Check out ${product.name} on our auction site!`,
//         url: window.location.href,
//       });
//     } else {
//       navigator.clipboard.writeText(window.location.href);
//       setSnackbarMessage("Link copied to clipboard!");
//       setShowSnackbar(true);
//     }
//   };

//   const galleryImages =
//     product.galleryImages || [
//       product.img,
//       "https://images.unsplash.com/photo-1544006659-f0b21f04cb1d?q=80&w=1000&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1508685096489-7aac29bca228?q=80&w=1000&auto=format&fit=crop",
//     ];

//   return (
//     <>
//       {/* Navigation Bar */}
//       <Box
//         sx={{
//           position: "sticky",
//           top: 0,
//           zIndex: 1000,
//           backgroundColor: "white",
//           borderBottom: "2px solid #f0f0f0",
//           py: { xs: 1, sm: 1.5 },
//           px: { xs: 2, sm: 3, md: 4 },
//           boxShadow: "0 2px 12px rgba(46, 125, 50, 0.08)",
//         }}
//       >
//         <Container maxWidth="lg">
//           <Stack direction="row" alignItems="center" spacing={2}>
//             <IconButton
//               onClick={() => navigate(-1)}
//               sx={{
//                 backgroundColor: lightBg,
//                 "&:hover": { backgroundColor: "#e8f5e8" },
//                 p: { xs: 0.5, sm: 1 },
//               }}
//             >
//               <ArrowBack sx={{ color: primaryColor, fontSize: { xs: 20, sm: 24 } }} />
//             </IconButton>
//             <Breadcrumbs aria-label="breadcrumb" sx={{ flexGrow: 1, fontSize: { xs: 12, sm: 14 } }}>
//               <Link
//                 underline="hover"
//                 color="inherit"
//                 onClick={() => navigate("/")}
//                 sx={{ cursor: "pointer", fontSize: { xs: 12, sm: 14 } }}
//               >
//                 Home
//               </Link>
//               <Link
//                 underline="hover"
//                 color="inherit"
//                 onClick={() => navigate("/auctions")}
//                 sx={{ cursor: "pointer", fontSize: { xs: 12, sm: 14 } }}
//               >
//                 Auctions
//               </Link>
//               <Typography color="text.primary" sx={{ fontSize: { xs: 12, sm: 14 } }}>
//                 {product.category}
//               </Typography>
//             </Breadcrumbs>
//             <Stack direction="row" spacing={1}>
//               <IconButton onClick={() => setIsWishlisted(!isWishlisted)} sx={{ p: { xs: 0.5, sm: 1 } }}>
//                 {isWishlisted ? <Favorite sx={{ color: "#e53935", fontSize: { xs: 18, sm: 24 } }} /> : <FavoriteBorder sx={{ color: primaryColor, fontSize: { xs: 18, sm: 24 } }} />}
//               </IconButton>
//               <IconButton onClick={handleShare} sx={{ p: { xs: 0.5, sm: 1 } }}>
//                 <Share sx={{ color: primaryColor, fontSize: { xs: 18, sm: 24 } }} />
//               </IconButton>
//             </Stack>
//           </Stack>
//         </Container>
//       </Box>

//       {/* Main Content */}
//       <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 3, md: 5 } }}>
//         <Grid container spacing={{ xs: 3, sm: 4, md: 5 }}>
//           {/* Images */}
//           <Grid item xs={12} lg={7}>
//             <Paper
//               elevation={0}
//               sx={{
//                 borderRadius: 3,
//                 overflow: "hidden",
//                 border: "2px solid #e8f5e9",
//                 backgroundColor: "white",
//                 mb: { xs: 2, md: 3 },
//               }}
//             >
//               <Box
//                 component="img"
//                 src={selectedImage}
//                 alt={product.name}
//                 sx={{
//                   width: "100%",
//                   height: { xs: 250, sm: 350, md: 500 },
//                   objectFit: "contain",
//                   display: "block",
//                   backgroundColor: lightBg,
//                   p: { xs: 1, sm: 2 },
//                 }}
//               />
//               <Box
//                 sx={{
//                   position: "absolute",
//                   top: { xs: 10, sm: 20 },
//                   left: { xs: 10, sm: 20 },
//                   backgroundColor: primaryColor,
//                   color: "white",
//                   px: { xs: 2, sm: 3 },
//                   py: { xs: 0.5, sm: 1 },
//                   borderRadius: 2,
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 1,
//                   boxShadow: "0 4px 12px rgba(46, 125, 50, 0.3)",
//                   fontSize: { xs: 10, sm: 14 },
//                 }}
//               >
//                 <Gavel fontSize="small" />
//                 <Typography variant="body2" fontWeight={600}>
//                   LIVE AUCTION
//                 </Typography>
//               </Box>
//             </Paper>

//             {/* Thumbnail Gallery */}
//             <Stack direction="row" spacing={1.5} sx={{ overflowX: "auto", pb: 1 }}>
//               {galleryImages.map((img, index) => (
//                 <Box
//                   key={index}
//                   onClick={() => setSelectedImage(img)}
//                   sx={{
//                     width: { xs: 60, sm: 80, md: 100 },
//                     height: { xs: 60, sm: 80, md: 100 },
//                     borderRadius: 2,
//                     overflow: "hidden",
//                     cursor: "pointer",
//                     border: selectedImage === img ? `3px solid ${primaryColor}` : "2px solid #e0e0e0",
//                     flexShrink: 0,
//                     transition: "all 0.3s ease",
//                     "&:hover": {
//                       borderColor: accentColor,
//                       transform: "translateY(-2px)",
//                     },
//                   }}
//                 >
//                   <Box component="img" src={img} alt={`${product.name} ${index + 1}`} sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
//                 </Box>
//               ))}
//             </Stack>
//           </Grid>

//           {/* Product Info */}
//           <Grid item xs={12} lg={5}>
//             <Stack spacing={{ xs: 3, md: 4 }}>
//               {/* Title */}
//               <Box>
//                 <Chip label={product.category} sx={{ backgroundColor: lightGreen, color: "white", fontWeight: 600, mb: 1 }} />
//                 <Typography variant="h5" fontWeight={700} sx={{ color: darkGreen, mb: 1, lineHeight: 1.2, fontSize: { xs: 20, sm: 24, md: 32 } }}>
//                   {product.name}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: 12, sm: 14, md: 16 }, lineHeight: 1.5 }}>
//                   {product.description || "Premium auction item in excellent condition"}
//                 </Typography>
//               </Box>

//               {/* Ratings */}
//               <Paper elevation={0} sx={{ p: 2, borderRadius: 3, backgroundColor: lightBg, border: "1px solid #e0f2e1" }}>
//                 <Stack spacing={1.5}>
//                   <Stack direction="row" alignItems="center" spacing={1}>
//                     <Rating value={product.rating || 4.5} precision={0.5} readOnly sx={{ color: accentColor, fontSize: { xs: 16, sm: 20 } }} />
//                     <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: 10, sm: 12 } }}>
//                       ({product.reviewCount || 124} reviews)
//                     </Typography>
//                   </Stack>
//                   <Divider sx={{ borderColor: "#c8e6c9" }} />
//                   <Stack direction="row" alignItems="center" spacing={1}>
//                     <Person sx={{ color: primaryColor, fontSize: { xs: 18, sm: 20 } }} />
//                     <Box>
//                       <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: 10, sm: 12 } }}>
//                         Seller
//                       </Typography>
//                       <Typography variant="body1" fontWeight={600} sx={{ fontSize: { xs: 12, sm: 14 } }}>
//                         {product.seller || "Premium Auctions Inc."}
//                         <Verified fontSize="small" sx={{ color: primaryColor, ml: 0.5, verticalAlign: "middle" }} />
//                       </Typography>
//                     </Box>
//                   </Stack>
//                 </Stack>
//               </Paper>

//               {/* Auction Timer - Enhanced */}
//               <Paper
//                 elevation={0}
//                 sx={{
//                   p: 4,
//                   borderRadius: 3,
//                   backgroundColor: "#1B5E20",
//                   color: "white",
//                   position: "relative",
//                   overflow: "hidden",
//                   "&::before": {
//                     content: '""',
//                     position: "absolute",
//                     top: 0,
//                     right: 0,
//                     width: "100px",
//                     height: "100px",
//                     background: `linear-gradient(45deg, transparent 50%, ${accentColor}50 50%)`,
//                   },
//                 }}
//               >
//                 <Stack spacing={3}>
//                   <Stack direction="row" alignItems="center" spacing={2}>
//                     <Timer sx={{ fontSize: 32, color: accentColor }} />
//                     <Box>
//                       <Typography variant="body2" sx={{ opacity: 0.9 }}>
//                         Auction Ends In
//                       </Typography>
//                       <Typography variant="h4" fontWeight={700}>
//                         {product.timeLeft}
//                       </Typography>
//                     </Box>
//                   </Stack>
                  
//                   <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />
                  
//                   <Grid container spacing={3}>
//                     <Grid item xs={6}>
//                       <Stack spacing={1}>
//                         <Typography variant="body2" sx={{ opacity: 0.9 }}>
//                           <MonetizationOn fontSize="small" sx={{ mr: 1, verticalAlign: "middle" }} />
//                           Current Bid
//                         </Typography>
//                         <Typography 
//                           variant="h3" 
//                           fontWeight={800}
//                           sx={{ 
//                             color: accentColor,
//                             textShadow: "0 2px 4px rgba(0,0,0,0.2)",
//                           }}
//                         >
//                           ${product.currentBid.toLocaleString()}
//                         </Typography>
//                       </Stack>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Stack spacing={1}>
//                         <Typography variant="body2" sx={{ opacity: 0.9 }}>
//                           <Star fontSize="small" sx={{ mr: 1, verticalAlign: "middle" }} />
//                           Highest Bid
//                         </Typography>
//                         <Typography 
//                           variant="h3" 
//                           fontWeight={800}
//                           sx={{ 
//                             color: "white",
//                             textShadow: "0 2px 4px rgba(0,0,0,0.2)",
//                           }}
//                         >
//                           ${product.highestBid.toLocaleString()}
//                         </Typography>
//                       </Stack>
//                     </Grid>
//                   </Grid>
                  
//                   <Box
//                     sx={{
//                       backgroundColor: "rgba(255,255,255,0.1)",
//                       p: 2,
//                       borderRadius: 2,
//                       border: "1px solid rgba(255,255,255,0.2)",
//                     }}
//                   >
//                     <Typography variant="body2" sx={{ opacity: 0.9 }}>
//                       <Person fontSize="small" sx={{ mr: 1, verticalAlign: "middle" }} />
//                       Highest Bidder: <b>{product.highestBidder}</b>
//                     </Typography>
//                   </Box>
//                 </Stack>
//               </Paper>

//               {/* Bid Input Section - Enhanced */}
//               <Paper
//                 elevation={0}
//                 sx={{
//                   p: 4,
//                   borderRadius: 3,
//                   backgroundColor: lightBg,
//                   border: "2px solid #e0f2e1",
//                 }}
//               >
//                 <Stack spacing={3}>
//                   <Box>
//                     <Typography variant="h5" fontWeight={600} sx={{ color: darkGreen, mb: 2 }}>
//                       Place Your Bid
//                     </Typography>
                    
//                     <Stack direction="row" spacing={2} alignItems="center" mb={2}>
//                       <TextField
//                         fullWidth
//                         type="number"
//                         label="Enter Bid Amount"
//                         value={bidAmount}
//                         onChange={(e) => setBidAmount(parseFloat(e.target.value))}
//                         variant="outlined"
//                         sx={{
//                           "& .MuiOutlinedInput-root": {
//                             borderRadius: 2,
//                             backgroundColor: "white",
//                             "&.Mui-focused fieldset": {
//                               borderColor: primaryColor,
//                             },
//                           },
//                         }}
//                         InputProps={{
//                           startAdornment: (
//                             <Typography sx={{ color: primaryColor, fontWeight: 600, mr: 1 }}>
//                               $
//                             </Typography>
//                           ),
//                         }}
//                       />
//                       <Button
//                         variant="contained"
//                         size="large"
//                         onClick={handlePlaceBid}
//                         sx={{
//                           minWidth: 140,
//                           height: 56,
//                           borderRadius: 2,
//                           fontWeight: 700,
//                           fontSize: "1rem",
//                           backgroundColor: primaryColor,
//                           "&:hover": {
//                             backgroundColor: darkGreen,
//                             transform: "translateY(-2px)",
//                             boxShadow: "0 8px 16px rgba(46, 125, 50, 0.3)",
//                           },
//                           transition: "all 0.3s ease",
//                         }}
//                       >
//                         Place Bid
//                       </Button>
//                     </Stack>
                    
//                     <Typography variant="body2" color="text.secondary">
//                       Minimum bid increment: <b style={{ color: primaryColor }}>$10</b>
//                     </Typography>
//                   </Box>

//                   <Divider sx={{ borderColor: "#c8e6c9" }} />

//                   {/* Quick Bid Buttons */}
//                   <Box>
//                     <Typography variant="body2" color="text.secondary" mb={2}>
//                       Quick Bid:
//                     </Typography>
//                     <Stack direction="row" spacing={2} flexWrap="wrap" gap={1}>
//                       {[50, 100, 250, 500].map((amount) => (
//                         <Button
//                           key={amount}
//                           variant="outlined"
//                           onClick={() => setBidAmount(product.currentBid + amount)}
//                           sx={{
//                             borderRadius: 2,
//                             borderColor: lightGreen,
//                             color: primaryColor,
//                             fontWeight: 600,
//                             "&:hover": {
//                               borderColor: primaryColor,
//                               backgroundColor: lightBg,
//                             },
//                           }}
//                         >
//                           +${amount}
//                         </Button>
//                       ))}
//                     </Stack>
//                   </Box>
//                 </Stack>
//               </Paper>

//               {/* Buy Now Button - Prominent */}
//               <Button
//                 variant="contained"
//                 size="large"
//                 fullWidth
//                 onClick={handleBuyNow}
//                 sx={{
//                   py: 3,
//                   borderRadius: 3,
//                   fontWeight: 800,
//                   fontSize: "1.2rem",
//                   backgroundColor: accentColor,
//                   color: darkGreen,
//                   textTransform: "uppercase",
//                   letterSpacing: "1px",
//                   "&:hover": {
//                     backgroundColor: "#c89c48",
//                     transform: "translateY(-3px)",
//                     boxShadow: "0 12px 20px rgba(216, 168, 85, 0.3)",
//                   },
//                   transition: "all 0.3s ease",
//                   boxShadow: "0 6px 12px rgba(216, 168, 85, 0.2)",
//                 }}
//               >
//                 Buy Now - $
//                 {product.buyNowPrice?.toLocaleString() || 
//                   (product.highestBid * 1.2).toLocaleString()}
//               </Button>
//             </Stack>
//           </Grid>
//         </Grid>

//         {/* Additional Details Section */}
//         <Grid container spacing={4} sx={{ mt: { xs: 4, md: 8 } }}>
//           {/* Product Description */}
//           <Grid item xs={12} md={8}>
//             <Paper
//               elevation={0}
//               sx={{
//                 p: 4,
//                 borderRadius: 3,
//                 backgroundColor: lightBg,
//                 border: "1px solid #e0f2e1",
//               }}
//             >
//               <Typography 
//                 variant="h4" 
//                 fontWeight={700} 
//                 sx={{ color: darkGreen, mb: 3 }}
//               >
//                 Product Description
//               </Typography>
//               <Typography 
//                 variant="body1" 
//                 sx={{ 
//                   fontSize: "1.1rem",
//                   lineHeight: 1.8,
//                   color: "text.primary",
//                   mb: 4,
//                 }}
//               >
//                 {product.fullDescription || `This is a premium ${product.name} in excellent condition. Perfect for collectors and enthusiasts. The item has been carefully maintained and comes with all original accessories and documentation.`}
//               </Typography>
              
//               <Typography variant="h5" fontWeight={600} sx={{ color: darkGreen, mb: 2 }}>
//                 Specifications
//               </Typography>
//               <Grid container spacing={3}>
//                 {[
//                   { label: "Condition", value: "Excellent", icon: <Verified /> },
//                   { label: "Year", value: "2024", icon: <CalendarToday /> },
//                   { label: "Material", value: "Premium Materials", icon: <Star /> },
//                   { label: "Location", value: "New York, USA", icon: <LocationOn /> },
//                   { label: "Warranty", value: "1 Year", icon: <Verified /> },
//                   { label: "Authenticity", value: "Certified", icon: <Verified /> },
//                 ].map((spec, index) => (
//                   <Grid item xs={12} sm={6} key={index}>
//                     <Stack 
//                       direction="row" 
//                       spacing={2} 
//                       alignItems="center"
//                       sx={{
//                         p: 2,
//                         borderRadius: 2,
//                         backgroundColor: "white",
//                         border: "1px solid #e8f5e9",
//                       }}
//                     >
//                       <Box
//                         sx={{
//                           backgroundColor: lightBg,
//                           p: 1,
//                           borderRadius: 2,
//                           color: primaryColor,
//                         }}
//                       >
//                         {spec.icon}
//                       </Box>
//                       <Box>
//                         <Typography variant="body2" color="text.secondary">
//                           {spec.label}
//                         </Typography>
//                         <Typography variant="body1" fontWeight={600}>
//                           {spec.value}
//                         </Typography>
//                       </Box>
//                     </Stack>
//                   </Grid>
//                 ))}
//               </Grid>
//             </Paper>
//           </Grid>

//           {/* Bidding History Sidebar */}
//           <Grid item xs={12} md={4}>
//             <Paper
//               elevation={0}
//               sx={{
//                 p: 4,
//                 borderRadius: 3,
//                 backgroundColor: lightBg,
//                 border: "1px solid #e0f2e1",
//                 height: "100%",
//               }}
//             >
//               <Typography 
//                 variant="h5" 
//                 fontWeight={700} 
//                 sx={{ color: darkGreen, mb: 3 }}
//               >
//                 Recent Bids
//               </Typography>
//               <Stack spacing={2}>
//                 {[
//                   { bidder: "AlexJohnson", amount: 9200, time: "2 hours ago" },
//                   { bidder: "SarahW", amount: 9100, time: "3 hours ago" },
//                   { bidder: "Mike88", amount: 9000, time: "5 hours ago" },
//                   { bidder: "CollectorPro", amount: 8900, time: "1 day ago" },
//                 ].map((bid, index) => (
//                   <Box
//                     key={index}
//                     sx={{
//                       p: 2,
//                       borderRadius: 2,
//                       backgroundColor: "white",
//                       borderLeft: `4px solid ${index === 0 ? accentColor : lightGreen}`,
//                       transition: "all 0.3s ease",
//                       "&:hover": {
//                         transform: "translateX(4px)",
//                         boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//                       },
//                     }}
//                   >
//                     <Stack direction="row" justifyContent="space-between" alignItems="center">
//                       <Box>
//                         <Typography variant="body2" fontWeight={600}>
//                           {bid.bidder}
//                         </Typography>
//                         <Typography variant="body2" color="text.secondary">
//                           {bid.time}
//                         </Typography>
//                       </Box>
//                       <Typography 
//                         variant="h6" 
//                         fontWeight={700}
//                         sx={{ color: primaryColor }}
//                       >
//                         ${bid.amount.toLocaleString()}
//                       </Typography>
//                     </Stack>
//                   </Box>
//                 ))}
//               </Stack>
//             </Paper>
//           </Grid>
//         </Grid>
//       </Container>

//       {/* Enhanced Snackbar */}
//        <Snackbar
//         open={showSnackbar}
//         autoHideDuration={3000}
//         onClose={() => setShowSnackbar(false)}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       >
//         <Alert
//           onClose={() => setShowSnackbar(false)}
//           severity="success"
//           sx={{ width: "100%", backgroundColor: primaryColor, color: "white", borderRadius: 2 }}
//         >
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </>
//   );
// };

// export default ProductDetail;


