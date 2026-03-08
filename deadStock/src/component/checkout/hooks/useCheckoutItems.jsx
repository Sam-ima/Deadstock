// hooks/useCheckoutItems.js
import { useSelector } from "react-redux";
import { resolveProductImages } from "../../categoryPage/product/productCard/utils/ProductImages";
import { getDisplayItems } from "../Utility";
import {
  getItemTotal,
  isSubMoq,
  toNumber,
  SUB_MOQ_SURCHARGE_RATE,
} from "../../cart/cart_utils";


function calculateTotals(items) {
  let subtotal       = 0;
  let surchargeTotal = 0;
  let itemCount      = 0;

  for (const item of items) {
    const qty        = toNumber(item.quantity);
    const lineTotal  = getItemTotal(item);          // MOQ-aware
    const baseTotal  = toNumber(
      item.product?.currentPrice ?? item.product?.price ?? item.unitPrice ?? 0
    ) * qty;

    subtotal      += lineTotal;
    surchargeTotal += isSubMoq(item) ? lineTotal - baseTotal : 0;
    itemCount     += qty;
  }

  return {
    subtotal,
    surchargeTotal,           // total extra charged due to sub-MOQ lines
    total: subtotal,          // same value; kept separate for UI display logic
    itemCount,
    hasSurcharge: surchargeTotal > 0,
    surchargeRate: SUB_MOQ_SURCHARGE_RATE,
  };
}

export function useCheckoutItems() {
  const directPurchaseItem = useSelector(
    (state) => state.directPurchase?.directPurchaseItem
  );
  const cartItemsObject = useSelector((state) => state.cart?.items || {});

  const cartItemsArray = Object.values(cartItemsObject).map((item) => ({
    ...item,
    id:        item.id || item.product?.id || Math.random().toString(36).substr(2, 9),
    quantity:  item.quantity  || 1,
    unitPrice: item.unitPrice || item.product?.currentPrice || item.product?.price || 0,
    moq:       item.moq       || item.product?.moq || 0,
    name:      item.name      || item.product?.name || "Product",
    product:   item.product   || item,
  }));

  const displayItems = getDisplayItems(
    directPurchaseItem,
    cartItemsArray,
    resolveProductImages
  );

  const totals = calculateTotals(displayItems);

  return {
    directPurchaseItem,
    displayItems,
    totals,
    hasItems: displayItems.length > 0 || !!directPurchaseItem,
  };
}