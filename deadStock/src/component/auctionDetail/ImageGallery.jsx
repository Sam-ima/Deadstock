// src/components/ProductDetail/ImageGallery.jsx
import React from "react";
import { Box, Stack, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedImage } from "../../store/slice/auctionSlice";

const ImageGallery = ({ product }) => {
  const dispatch = useDispatch();
  const selectedImage = useSelector(
    (state) => state.auction.selectedImages[product.id] || product.img
  );

  const galleryImages =
    product.galleryImages || [
      product.img,
      "https://images.unsplash.com/photo-1544006659-f0b21f04cb1d?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508685096489-7aac29bca228?q=80&w=1000&auto=format&fit=crop",
    ];

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          border: "2px solid #e8f5e9",
          backgroundColor: "white",
          mb: { xs: 2, md: 3 },
        }}
      >
        <Box
          component="img"
          src={selectedImage}
          alt={product.name}
          sx={{
            width: "100%",
            height: { xs: 250, sm: 350, md: 500 },
            objectFit: "contain",
            display: "block",
            backgroundColor: "#f8fff8",
            p: { xs: 1, sm: 2 },
          }}
        />
      </Paper>

      <Stack direction="row" spacing={1.5} sx={{ overflowX: "auto", pb: 1 }}>
        {galleryImages.map((img, index) => (
          <Box
            key={index}
            onClick={() => dispatch(setSelectedImage({ productId: product.id, imageUrl: img }))}
            sx={{
              width: { xs: 60, sm: 80, md: 100 },
              height: { xs: 60, sm: 80, md: 100 },
              borderRadius: 2,
              overflow: "hidden",
              cursor: "pointer",
              border: selectedImage === img ? `3px solid #2E7D32` : "2px solid #e0e0e0",
              flexShrink: 0,
              transition: "all 0.3s ease",
              "&:hover": {
                borderColor: "#d8a855",
                transform: "translateY(-2px)",
              },
            }}
          >
            <Box component="img" src={img} alt={`${product.name} ${index + 1}`} sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </Box>
        ))}
      </Stack>
    </>
  );
};

export default ImageGallery;
