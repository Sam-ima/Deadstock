import { Box, Paper, Stack, Chip, IconButton } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { resolveProductImages } from "../product/productCard/utils/productImages";

const ProductImages = ({
  product,
  selectedImage,
  setSelectedImage,
  isFavorite,
  setIsFavorite,
}) => {
  const base = product.basePrice ?? product.currentPrice;
  const current = product.currentPrice ?? base;

  const discountPercent =
    base > current ? Math.round(((base - current) / base) * 100) : 0;

  // 🔑 Use Firestore images if present, otherwise fallback to static images
  const images =
    product.images?.length > 0
      ? product.images
      : resolveProductImages(product);

  return (
    <Box flex={1}>
      <Paper
        elevation={0}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          mb: 2,
          position: "relative",
          bgcolor: "grey.50",
        }}
      >
        <Box
          component="img"
          loading="lazy"
          src={images[selectedImage]}
          alt={product.name}
          sx={{
            width: "100%",
            height: { xs: 250, sm: 350, md: 400, lg: 450 },
            objectFit: "contain",
            p: { xs: 1, sm: 2 },
          }}
        />

        {discountPercent > 0 && (
          <Chip
            label={`${discountPercent}% OFF`}
            sx={{
              position: "absolute",
              top: { xs: 8, sm: 16 },
              left: { xs: 8, sm: 16 },
              bgcolor: "error.main",
              color: "white",
              fontWeight: "bold",
            }}
          />
        )}

        <IconButton
          onClick={setIsFavorite}
          sx={{
            position: "absolute",
            top: { xs: 8, sm: 16 },
            right: { xs: 8, sm: 16 },
            bgcolor: "background.paper",
          }}
        >
          {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
        </IconButton>
      </Paper>

      {images.length > 1 && (
        <Stack direction="row" spacing={1} sx={{ overflowX: "auto", py: 1 }}>
          {images.map((img, index) => (
            <Box
              key={index}
              onClick={() => setSelectedImage(index)}
              sx={{
                width: 70,
                height: 70,
                borderRadius: 1,
                overflow: "hidden",
                border: selectedImage === index ? 2 : 1,
                borderColor:
                  selectedImage === index
                    ? "primary.main"
                    : "grey.300",
                cursor: "pointer",
              }}
            >
              <Box
                component="img"
                src={img}
                loading="lazy"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default ProductImages;