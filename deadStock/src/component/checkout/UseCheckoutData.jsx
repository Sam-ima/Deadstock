import { useSelector } from 'react-redux';
import { resolveProductImages } from '../categoryPage/product/productCard/utils/ProductImages';

export const useCheckoutData = () => {
  const directPurchaseItem = useSelector(
    (state) => state.directPurchase?.directPurchaseItem
  );

  const cartItemsObject = useSelector(
    (state) => state.cart?.items || {}
  );

  const cartItems = Object.values(cartItemsObject).map(item => {
    const product = item.product || item;
    return {
      id: item.id || product.id,
      name: product.name || 'Product',
      quantity: item.quantity || 1,
      unitPrice: item.unitPrice || product.currentPrice || 0,
      product: {
        ...product,
        images: product.images?.length
          ? product.images
          : resolveProductImages(product),
      },
    };
  });

  const displayItems = directPurchaseItem
    ? [{
        ...directPurchaseItem,
        quantity: directPurchaseItem.quantity || 1,
        isDirectPurchase: true,
      }]
    : cartItems;

  const subtotal = displayItems.reduce(
    (sum, i) => sum + i.unitPrice * i.quantity,
    0
  );

  const shipping = subtotal > 200 ? 0 : 25;
  const tax = subtotal * 0.031;
  const discount = subtotal > 150 ? 10 : 0;

  const total = subtotal + shipping + tax - discount;

  return {
    displayItems,
    totals: { subtotal, shipping, tax, discount, total },
    directPurchaseItem,
  };
};
