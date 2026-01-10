import { Box, Paper, Stack, Chip, IconButton } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

const ProductImages = ({ product, selectedImage, setSelectedImage, isFavorite, setIsFavorite }) => {
  const discountPercent =
    product.basePrice > product.price
      ? Math.round(((product.basePrice - product.price) / product.basePrice) * 100)
      : 0;

  return (
    <Box flex={1}>
      <Paper
        elevation={0}
        sx={{ borderRadius: 2, overflow: "hidden", mb: 2, position: "relative", bgcolor: "grey.50" }}
      >
        {/* Main Image */}
        <Box
          component="img"
          src={product.images?.[selectedImage] || product.image}
          alt={product.name}
          sx={{
            width: "100%",
            height: { xs: 250, sm: 350, md: 400, lg: 450 },
            objectFit: "contain",
            p: { xs: 1, sm: 2 },
          }}
        />

        {/* Discount Chip */}
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
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
            }}
          />
        )}

        {/* Favorite */}
        <IconButton
          onClick={setIsFavorite}
          sx={{
            position: "absolute",
            top: { xs: 8, sm: 16 },
            right: { xs: 8, sm: 16 },
            bgcolor: "background.paper",
            "&:hover": { bgcolor: "background.paper" },
          }}
        >
          {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
        </IconButton>
      </Paper>

      {/* Thumbnails */}
      {product.images && product.images.length > 1 && (
        <Stack direction="row" spacing={1} sx={{ overflowX: "auto", py: 1, px: 0.5 }}>
          {product.images.map((img, index) => (
            <Box
              key={index}
              onClick={() => setSelectedImage(index)}
              sx={{
                flexShrink: 0,
                width: { xs: 60, sm: 70, md: 80 },
                height: { xs: 60, sm: 70, md: 80 },
                borderRadius: 1,
                overflow: "hidden",
                border: selectedImage === index ? 2 : 1,
                borderColor: selectedImage === index ? "primary.main" : "grey.300",
                cursor: "pointer",
                opacity: selectedImage === index ? 1 : 0.7,
                transition: "all 0.2s",
                "&:hover": { opacity: 1, transform: "scale(1.05)" },
              }}
            >
              <Box
                component="img"
                src={img}
                alt={`${product.name} - ${index + 1}`}
                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default ProductImages;
