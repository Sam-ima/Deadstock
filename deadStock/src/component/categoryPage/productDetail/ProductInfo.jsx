import { Box, Typography, Stack, Chip } from "@mui/material";
import QuantitySelector from "./QuantitySelector";
import ActionButtons from "./ActionButtons";
import ProductRating from "../product/productCard/ProductRating"; // adjust path

const ProductInfo = ({ product, quantity, setQuantity, isAuction = false }) => {
  const base = product.basePrice ?? product.currentPrice;
  const current = product.currentPrice ?? base;

  const discountPercent =
    base > current ? Math.round(((base - current) / base) * 100) : 0;

  return (
    <Box
      flex={1}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        p: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Typography
        variant="h5"
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

      {/* ⭐ Reusable Rating */}
      <ProductRating productId={product.id} variant="info" />

      <Chip
        label={`${product.sold || 0} sold`}
        size="small"
        variant="outlined"
        sx={{ mb: 2 }}
      />

      {/* Price Section */}
      <Box mb={3}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <Typography
            variant="h6"
            fontWeight="bold"
            color="primary.main"
          >
            Rs.{current}
          </Typography>

          {base > current && (
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography
                sx={{ textDecoration: "line-through" }}
                color="text.secondary"
              >
                Rs.{base}
              </Typography>

              <Chip
                label={`Save Rs.${base - current}`}
                color="error"
                size="small"
              />
            </Stack>
          )}
        </Stack>

        {discountPercent > 0 && (
          <Typography variant="body2" color="text.secondary" mt={1}>
            Depreciation applied: {discountPercent}% off original price
          </Typography>
        )}
      </Box>

      {/* Stock */}
      <Box mb={3}>
        <Typography>
          Availability: {product.stock > 0 ? "In Stock" : "Out of Stock"}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {product.availableStock} units available • {product.sold} units sold
        </Typography>
      </Box>

      {!isAuction && (
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <QuantitySelector
            quantity={quantity}
            setQuantity={setQuantity}
            stock={product.stock}
          />
          <ActionButtons product={product} quantity={quantity} />
        </Stack>
      )}
    </Box>
  );
};

export default ProductInfo;