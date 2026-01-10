// src/components/product/ProductImageCarousel.jsx
import { Box, Chip, IconButton } from "@mui/material";
import { useState } from "react";
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';

const ProductImageCarousel = ({ images = [], fallbackImage }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showArrows, setShowArrows] = useState(false);

  const totalImages = images.length > 0 ? images.length : 0;

  const nextImage = (e) => {
    e.stopPropagation();
    if (totalImages > 1) setCurrentIndex((prev) => (prev + 1) % totalImages);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    if (totalImages > 1) setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages);
  };

  return (
    <Box
      sx={{ position: "relative" }}
      onMouseEnter={() => totalImages > 1 && setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      <Box
        component="img"
        loading="lazy"
        src={images[currentIndex] || fallbackImage}
        alt="product"
        sx={{
          width: "100%",
          height: { xs: 180, sm: 200, md: 220 },
          objectFit: "cover",
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Discount Badge can be rendered outside this component */}
      
      {/* Navigation Arrows */}
      {totalImages > 1 && (
        <>
          <IconButton
            onClick={prevImage}
            sx={{
              position: "absolute",
              left: 8,
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              color: "#333",
              width: 32,
              height: 32,
              opacity: showArrows ? 1 : 0,
              transition: "opacity 0.2s ease",
              zIndex: 2,
              "&:hover": { backgroundColor: "white" },
            }}
          >
            <ChevronLeft fontSize="small" />
          </IconButton>

          <IconButton
            onClick={nextImage}
            sx={{
              position: "absolute",
              right: 8,
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              color: "#333",
              width: 32,
              height: 32,
              opacity: showArrows ? 1 : 0,
              transition: "opacity 0.2s ease",
              zIndex: 2,
              "&:hover": { backgroundColor: "white" },
            }}
          >
            <ChevronRight fontSize="small" />
          </IconButton>

          {/* Dots */}
          <Box
            sx={{
              position: "absolute",
              bottom: 8,
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
              gap: 1,
              zIndex: 2,
            }}
          >
            {images.map((_, idx) => (
              <Box
                key={idx}
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: idx === currentIndex ? "#fff" : "rgba(255,255,255,0.5)",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: idx === currentIndex ? "#fff" : "rgba(255,255,255,0.8)",
                  },
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(idx);
                }}
              />
            ))}
          </Box>

          {/* Image Counter */}
          <Chip
            label={`${currentIndex + 1}/${totalImages}`}
            size="small"
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              backgroundColor: "rgba(0,0,0,0.7)",
              color: "#fff",
              fontWeight: 600,
              fontSize: "0.7rem",
              height: 20,
              zIndex: 2,
            }}
          />
        </>
      )}
    </Box>
  );
};

export default ProductImageCarousel;
