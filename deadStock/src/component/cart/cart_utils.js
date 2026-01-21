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

export const getUnitPrice = (item) =>
  toNumber(
    item.unitPrice ||
    item.price ||
    item.product?.price ||
    item.product?.currentPrice ||
    0
  );

export const getDisplayName = (item) =>
  item.product?.name || item.name || "Product";

// New function to calculate item total
export const getItemTotal = (item) => {
  const qty = toNumber(item.quantity);
  const unitPrice = getUnitPrice(item);
  return toNumber(item.totalPrice) || (qty * unitPrice);
};