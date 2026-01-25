// hooks/useCheckoutItems.js
import { useSelector } from "react-redux";
import { resolveProductImages } from "../../categoryPage/product/productCard/utils/ProductImages";
import {
  getDisplayItems,
  calculateTotals,
} from "../Utility";

export function useCheckoutItems() {
  const directPurchaseItem = useSelector(
    (state) => state.directPurchase?.directPurchaseItem
  );
  const cartItemsObject = useSelector((state) => state.cart?.items || {});

  // Convert cart items object to array
  const cartItemsArray = Object.values(cartItemsObject).map((item) => ({
    ...item,
    id: item.id || item.product?.id || Math.random().toString(36).substr(2, 9),
    quantity: item.quantity || 1,
    unitPrice:
      item.unitPrice || item.product?.currentPrice || item.product?.price || 0,
    name: item.name || item.product?.name || "Product",
    product: item.product || item,
  }));

  // Get display items
  const displayItems = getDisplayItems(
    directPurchaseItem,
    cartItemsArray,
    resolveProductImages
  );

  // Calculate totals
  const totals = calculateTotals(displayItems);

  return {
    directPurchaseItem,
    displayItems,
    totals,
    hasItems: displayItems.length > 0 || !!directPurchaseItem
  };
}