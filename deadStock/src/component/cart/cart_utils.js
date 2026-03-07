import axios from "axios";

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
      0,
  );

export const getDisplayName = (item) =>
  item.product?.name || item.name || "Product";

// New function to calculate item total
export const getItemTotal = (item) => {
  const qty = toNumber(item.quantity);
  const unitPrice = getUnitPrice(item);
  return toNumber(item.totalPrice) || qty * unitPrice;
};

// Reserve stock (called on Add to Cart / Buy Now)
export const reserveProductStock = async (productId, quantity) => {
  return axios.post("http://localhost:4000/api/stock/reserve", {
    productId,
    quantity,
  });
};

export async function releaseStock(req, res) {
  const { productId, quantity } = req.body;

  if (!productId || !quantity || quantity < 1)
    return res.status(400).json({ error: "Invalid input" });

  const productRef = db.collection("products").doc(productId);

  try {
    await db.runTransaction(async (transaction) => {
      const productDoc = await transaction.get(productRef);
      if (!productDoc.exists) throw new Error("Product not found");

      const productData = productDoc.data();
      const reservedStock = Number(productData.reservedStock || 0);
      const availableStock = Number(productData.availableStock || 0);

      transaction.update(productRef, {
        reservedStock: Math.max(0, reservedStock - quantity),
        availableStock: availableStock + quantity,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    });

    return res.status(200).json({ success: true, message: "Stock released" });
  } catch (err) {
    console.error("ReleaseStock error:", err.message);
    return res.status(400).json({ error: err.message });
  }
}

// Finalize stock after payment
export const finalizeProductStock = async (productId, quantity, paymentStatus) => {
  return axios.post("http://localhost:4000/api/stock/finalize", {
    productId,
    quantity,
    paymentStatus,
  });
};

export const releaseProductStock = async (productId, quantity) => {
  return axios.post("http://localhost:4000/api/stock/release", {
    productId,
    quantity,
  });
};