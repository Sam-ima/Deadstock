import { Box, Typography, Stack, Chip, Rating } from "@mui/material";
import QuantitySelector from "./QuantitySelector";
import ActionButtons from "./ActionButtons";

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
        p: { xs: 2, sm: 3, md: 4 }, // padding responsive
      }}
    >
      {/* Product Name */}
      <Typography
        variant="h5"
        fontWeight="bold"
        gutterBottom
        sx={{ fontSize: {
            xs: "24px",   // mobile
            sm: "28px",   // small tablets
            md: "32px",   // tablets / small laptop
            lg: "40px",   // desktop
            xl: "48px",   // large screens
          }, }}
      >
        {product.name}
      </Typography>

      {/* Rating and Reviews */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1}
        alignItems={{ xs: "flex-start", sm: "center" }}
        mb={2}
      >
        <Rating value={product.rating || 0} precision={0.5} readOnly size="small" />
        <Typography color="text.secondary" sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem" } }}>
          {product.rating || 0} ({product.reviews || 0} reviews)
        </Typography>
        <Chip
          label={`${product.sold || 0} sold`}
          size="small"
          variant="outlined"
          sx={{ mt: { xs: 1, sm: 0 } }}
        />
      </Stack>

      {/* Price and Discount */}
      <Box mb={3}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} 
        // alignItems="center"
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            color="primary.main"
            sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" } }}
          >
            Rs.{current}
          </Typography>

          {base > current && (
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography
                sx={{ textDecoration: "line-through", fontSize: { xs: "0.9rem", sm: "1rem" } }}
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
          <Typography
            variant="body2"
            color="text.secondary"
            mt={1}
            sx={{ fontSize: { xs: "0.75rem", sm: "0.85rem" } }}
          >
            Depreciation applied: {discountPercent}% off original price
          </Typography>
        )}
      </Box>

      {/* Stock Info */}
      <Box mb={3}>
        <Typography
          variant="body1"
          sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}
        >
          Availability: {product.stock > 0 ? "In Stock" : "Out of Stock"}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: { xs: "0.75rem", sm: "0.85rem" } }}
        >
          {product.availableStock} units available • {product.sold} units sold
        </Typography>
      </Box>

      {/* Quantity Selector & Action Buttons */}
      {!isAuction && (
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems={{ xs: "stretch", sm: "center" }}
        >
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
