import { Box, Typography, Stack, Chip, Rating } from "@mui/material";
import QuantitySelector from "./quantitySelector";
import ActionButtons from "./actionButtons";

const ProductInfo = ({ product, quantity, setQuantity, isAuction = false }) => {
  const base = product.basePrice ?? product.currentPrice;
  const current = product.currentPrice ?? base;

  const discountPercent =
    base > current ? Math.round(((base - current) / base) * 100) : 0;

  return (
    <Box flex={1} sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        {product.name}
      </Typography>

      <Stack direction="row" spacing={1} alignItems="center" mb={2}>
        <Rating value={product.rating || 0} precision={0.5} readOnly />
        <Typography color="text.secondary">
          {product.rating || 0} ({product.reviews || 0} reviews)
        </Typography>
        <Chip label={`${product.sold || 0} sold`} size="small" variant="outlined" />
      </Stack>

      <Box mb={3}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="h5" fontWeight="bold" color="primary.main">
            ${current}
          </Typography>

          {base > current && (
            <>
              <Typography sx={{ textDecoration: "line-through" }} color="text.secondary">
                ${base}
              </Typography>
              <Chip label={`Save $${base - current}`} color="error" />
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
