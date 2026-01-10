import React from "react";
import { Box, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedImage } from "../../store/slice/auctionSlice";

const ImageGallery = ({ product }) => {
  const dispatch = useDispatch();

  // selected image index from Redux (default = 0)
  const selectedIndex = useSelector(
    (state) => state.auction.selectedImages[product.id] ?? 0
  );

  // Safely get images array
  const galleryImages = React.useMemo(() => {
    if (product.galleryImages && product.galleryImages.length > 0) {
      return product.galleryImages;
    } else if (product.images && product.images.length > 0) {
      return product.images;
    } else if (product.img) {
      return [product.img];
    } else {
      // Fallback to a placeholder image
      return ["https://via.placeholder.com/400x300?text=No+Image"];
    }
  }, [product]);

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
          src={galleryImages[selectedIndex]}
          alt={product.name || "Product image"}
          sx={{
            width: "100%",
            maxWidth: { xs: 220, sm: 280, md: 350, lg: 400 },
            height: { xs: 180, sm: 240, md: 300, lg: 340 },
            borderRadius: { xs: 1, sm: 2 },
            objectFit: "cover",
            backgroundColor: "#f8fff8",
          }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/400x300?text=Image+Error";
          }}
        />
      </Box>

      {/* Thumbnails */}
      {galleryImages.length > 1 && (
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
                  setSelectedImage({
                    productId: product.id,
                    index,
                  })
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
                  selectedIndex === index
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
                alt={`${product.name || "Product"} ${index + 1}`}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/72x72?text=Image";
                }}
              />
            </Box>
          ))}
        </Stack>
      )}
    </>
  );
};

export default ImageGallery;