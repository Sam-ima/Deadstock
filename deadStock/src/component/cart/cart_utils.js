import axios from "axios";
import { applyMoqPricing, SUB_MOQ_SURCHARGE_RATE} from "../categoryPage/productDetail/ProductInfo"
// adjust the import path to wherever ProductInfo lives

export { SUB_MOQ_SURCHARGE_RATE };

export const toNumber = (v) => {
  if (v === null || v === undefined) return 0;
  if (typeof v === "number") return v;
  if (typeof v === "string") {
    const num = parseFloat(v.replace(/[^0-9.-]+/g, ""));
    return isNaN(num) ? 0 : num;
  }
  return 0;
};

export const formatPrice = (v) => {
  const num = toNumber(v);
  return num.toLocaleString("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
};

/** Raw base unit price — before any MOQ surcharge. */
export const getBaseUnitPrice = (item) =>
  toNumber(
    item.unitPrice ||
      item.price ||
      item.product?.price ||
      item.product?.currentPrice ||
      0,
  );

/**
 * Effective unit price after applying the sub-MOQ surcharge when needed.
 *
 * Rule:
 *   qty >= moq  → standard price (no change)
 *   qty <  moq  → price × (1 + SUB_MOQ_SURCHARGE_RATE)
 *
 * Source: Shopify — buyers who cannot meet MOQ "may have to pay a surcharge"
 * https://www.shopify.com/blog/minimum-order-quantity
 * Rate (15 %): aligns with the 15–20 % wholesale margin standard
 * https://www.finaleinventory.com/inventory-management/what-is-moq
 */
export const getUnitPrice = (item) => {
  const base = getBaseUnitPrice(item);
  const qty = toNumber(item.quantity);
  const moq = toNumber(item.moq ?? item.product?.moq ?? 0);
  return applyMoqPricing(base, qty, moq);
};

export const getDisplayName = (item) =>
  item.product?.name || item.name || "Product";

/**
 * Total price for a cart line:
 *   - Use pre-computed totalPrice only when the item already meets MOQ;
 *     otherwise recalculate so the surcharge is always reflected.
 */
export const getItemTotal = (item) => {
  const qty = toNumber(item.quantity);
  const unitPrice = getUnitPrice(item); // already MOQ-aware
  const moq = toNumber(item.moq ?? item.product?.moq ?? 0);
  const isBelowMoq = moq > 0 && qty < moq;

  // Trust pre-computed totalPrice only when quantity is at or above MOQ
  if (!isBelowMoq && item.totalPrice) {
    return toNumber(item.totalPrice);
  }
  return qty * unitPrice;
};

/** Returns true when the item's quantity is below its MOQ. */
export const isSubMoq = (item) => {
  const qty = toNumber(item.quantity);
  const moq = toNumber(item.moq ?? item.product?.moq ?? 0);
  return moq > 0 && qty < moq;
};
 
// ─── Stock helpers ────────────────────────────────────────────────────────────

export const reserveProductStock = async (productId, quantity) =>
  axios.post("http://localhost:4000/api/stock/reserve", {
    productId,
    quantity,
  });

export const releaseProductStock = async (productId, quantity) =>
  axios.post("http://localhost:4000/api/stock/release", {
    productId,
    quantity,
  });

export const finalizeProductStock = async (
  productId,
  quantity,
  paymentStatus,
) =>
  axios.post("http://localhost:4000/api/stock/finalize", {
    productId,
    quantity,
    paymentStatus,
  });

// releaseStock is a backend handler — keep it server-side only.
// It is not exported from this client utility file.
