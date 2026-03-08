import { Box, Typography, Stack, Chip, Alert } from "@mui/material";
import QuantitySelector from "./QuantitySelector";
import ActionButtons from "./ActionButtons";
import ProductRating from "../product/productCard/ProductRating";

// ─── MOQ Surcharge Rule ───────────────────────────────────────────────────────
// Industry standard: buyers ordering below MOQ pay a small-order surcharge.
// Source: Shopify — "If you can't meet your supplier's MOQ, you may have to
// pay a surcharge to purchase less than the minimum order quantity."
// (https://www.shopify.com/blog/minimum-order-quantity)
//
// Surcharge rate: 15% on the base price per unit.
// Rationale: Wholesale margins typically run 15–20% (Finale Inventory, 2025).
// A 15% surcharge recovers the margin lost on sub-MOQ handling without
// making the purchase prohibitive.
// (https://www.finaleinventory.com/inventory-management/what-is-moq)
// ─────────────────────────────────────────────────────────────────────────────
export const SUB_MOQ_SURCHARGE_RATE = 0.15; // 15 %

/**
 * Returns the effective unit price given a quantity and MOQ.
 * - qty >= moq  → no change, return baseUnitPrice as-is
 * - qty <  moq  → apply SUB_MOQ_SURCHARGE_RATE on top of baseUnitPrice
 */
export function applyMoqPricing(baseUnitPrice, quantity, moq) {
  const qty = Number(quantity) || 0;
  const minQty = Number(moq) || 0;
  if (minQty <= 0 || qty >= minQty) return baseUnitPrice;
  return baseUnitPrice * (1 + SUB_MOQ_SURCHARGE_RATE);
}

const ProductInfo = ({ product, quantity, setQuantity, isAuction = false }) => {
  const base = product.basePrice ?? product.currentPrice;
  const current = product.currentPrice ?? base;
  const moq = Number(product.moq) || 0;
  const qty = Number(quantity) || 1;

  // Is the user ordering below MOQ?
  const isBelowMoq = moq > 0 && qty < moq;

  // Effective unit price with optional surcharge
  const effectiveUnitPrice = applyMoqPricing(current, qty, moq);
  const surchargeAmount = effectiveUnitPrice - current;

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
          fontSize: { xs: "24px", sm: "28px", md: "32px", lg: "40px", xl: "48px" },
          textTransform: "capitalize",
        }}
      >
        {product.name}
      </Typography>

      <ProductRating productId={product.id} variant="info" />

      <Chip
        label={`${product.sold || 0} sold`}
        size="small"
        variant="outlined"
        sx={{ mb: 2 }}
      />

      {/* Price Section */}
      <Box mb={2}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          {/* Show effective (possibly surcharged) unit price */}
          <Typography variant="h6" fontWeight="bold" color="primary.main">
            Rs.{effectiveUnitPrice.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
            {isBelowMoq && (
              <Typography
                component="span"
                variant="caption"
                sx={{ ml: 1, color: "warning.main", fontWeight: 500 }}
              >
                (incl. {SUB_MOQ_SURCHARGE_RATE * 100}% small-order fee)
              </Typography>
            )}
          </Typography>

          {base > current && (
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography sx={{ textDecoration: "line-through" }} color="text.secondary">
                Rs.{base}
              </Typography>
              <Chip label={`Save Rs.${base - current}`} color="error" size="small" />
            </Stack>
          )}
        </Stack>

        {discountPercent > 0 && (
          <Typography variant="body2" color="text.secondary" mt={0.5}>
            Depreciation applied: {discountPercent}% off original price
          </Typography>
        )}

        {/* Sub-MOQ warning banner */}
        {isBelowMoq && (
          <Alert severity="warning" sx={{ mt: 1.5, fontSize: "0.82rem" }}>
            <strong>Below minimum order quantity ({moq} units).</strong> A{" "}
            {SUB_MOQ_SURCHARGE_RATE * 100}% small-order surcharge of Rs.
            {surchargeAmount.toLocaleString("en-IN", { maximumFractionDigits: 2 })} per unit
            has been applied to cover handling costs.{" "}
            <em>
              Order {moq}+ units to get the standard price of Rs.
              {current.toLocaleString("en-IN", { maximumFractionDigits: 2 })} per unit.
            </em>
          </Alert>
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
        <Typography variant="body2" color="text.secondary">
          Minimum Order Quantity: {moq}
        </Typography>
      </Box>

      {!isAuction && (
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <QuantitySelector
            quantity={quantity}
            setQuantity={setQuantity}
            stock={product.availableStock}
          />
          <ActionButtons product={product} quantity={quantity} />
        </Stack>
      )}
    </Box>
  );
};

export default ProductInfo;