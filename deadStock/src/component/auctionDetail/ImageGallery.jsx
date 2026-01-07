import React from "react";
import { Box, Stack } from "@mui/material";
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
      {/* Main Image */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: { xs: 1.5, sm: 2, md: 3 },
        }}
      >
        <Box
          component="img"
          src={selectedImage}
          alt={product.name}
          sx={{
            width: "100%",
            maxWidth: { xs: 220, sm: 280, md: 350, lg: 400 },
            height: { xs: 180, sm: 240, md: 300, lg: 340 },
            borderRadius: { xs: 1, sm: 2 },
            objectFit: "cover",
            backgroundColor: "#f8fff8",
          }}
        />
      </Box>

      {/* Thumbnails */}
      <Stack
        direction="row"
        spacing={{ xs: 0.8, sm: 1, md: 1.5 }}
        sx={{
          overflowX: "auto",
          pb: 1,
          px: { xs: 0.5, sm: 0 },
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {galleryImages.map((img, index) => (
          <Box
            key={index}
            onClick={() =>
              dispatch(
                setSelectedImage({ productId: product.id, imageUrl: img })
              )
            }
            sx={{
              width: { xs: 48, sm: 60, md: 72 },
              height: { xs: 48, sm: 60, md: 72 },
              borderRadius: 2,
              overflow: "hidden",
              cursor: "pointer",
              flexShrink: 0,
              border:
                selectedImage === img
                  ? "2px solid #2E7D32"
                  : "1.5px solid #e0e0e0",
              transition: "all 0.2s ease",
              "&:hover": {
                borderColor: "#d8a855",
                transform: "translateY(-1px)",
              },
            }}
          >
            <Box
              component="img"
              src={img}
              alt={`${product.name} ${index + 1}`}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
        ))}
      </Stack>
    </>
  );
};

export default ImageGallery;
