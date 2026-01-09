// src/pages/product/components/ProductInfo.jsx
import { Box, Typography, Stack, Chip, Rating } from "@mui/material";
import QuantitySelector from "./quantitySelector";
import ActionButtons from "./actionButtons";

const ProductInfo = ({ product, quantity, setQuantity, isAuction = false }) => {
  const discountPercent =
    product.basePrice > product.price
      ? Math.round(
          ((product.basePrice - product.price) / product.basePrice) * 100
        )
      : 0;

  return (
    <Box
      flex={1}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        sx={{
          fontSize: {
            xs: "24px",
            sm: "28px",
            md: "32px",
            lg: "40px",
            xl: "48px",
          },
        }}
      >
        {product.name}
      </Typography>

      <Stack direction="row" spacing={1} alignItems="center" mb={2}>
        <Rating value={product.rating} precision={0.5} readOnly />
        <Typography color="text.secondary">
          {product.rating} ({product.reviews} reviews)
        </Typography>
        <Chip label={`${product.sold} sold`} size="small" variant="outlined" />
      </Stack>

      <Box mb={3}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography
            variant="h3"
            fontWeight="bold"
            color="primary.main"
            sx={{
              fontSize: {
                xs: "18px",
                sm: "20px",
                md: "24px",
              },
            }}
          >
            ${product.price}
          </Typography>

          {product.basePrice > product.price && (
            <>
              <Typography
                sx={{
                  textDecoration: "line-through",
                  fontSize: {
                    xs: "18px",
                    sm: "20px",
                    md: "24px",
                  },
                }}
                color="text.secondary"
              >
                ${product.basePrice}
              </Typography>
              <Chip
                label={`Save $${product.basePrice - product.price}`}
                color="error"
              />
            </>
          )}
        </Stack>

        {discountPercent > 0 && (
          <Typography variant="body2" color="text.secondary" mt={1}>
            Depreciation applied: {discountPercent}% off original price
          </Typography>
        )}
      </Box>

      <Box mb={3}>
        <Typography variant="body1">
          Availability: {product.stock > 0 ? "In Stock" : "Out of Stock"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.stock} units available • {product.sold} units sold
        </Typography>
      </Box>

      {/* 🚫 CART UI REMOVED FOR AUCTION */}
      {!isAuction && (
        <>
          <QuantitySelector
            quantity={quantity}
            setQuantity={setQuantity}
            stock={product.stock}
          />
          <ActionButtons product={product} quantity={quantity} />
        </>
      )}
    </Box>
  );
};

export default ProductInfo;
