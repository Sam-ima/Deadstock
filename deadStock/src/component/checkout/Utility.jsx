// component/checkout/Utility.js
export const getDisplayItems = (directPurchaseItem, cartItemsArray, resolveProductImages) => {
  // If there's a direct purchase item, show only that
  if (directPurchaseItem) {
   
    const product = directPurchaseItem.product || directPurchaseItem;
    const resolvedImages = product.images?.length > 0 
      ? product.images 
      : (resolveProductImages ? resolveProductImages(product) : []);
    
    return [{
      ...directPurchaseItem,
      id: directPurchaseItem.id || product.id || 'direct-' + Math.random().toString(36).substr(2, 9),
      product: {
        ...product,
        images: resolvedImages,
      },
      unitPrice: directPurchaseItem.unitPrice || product.currentPrice || product.price || 0,
      quantity: directPurchaseItem.quantity || 1,
      name: directPurchaseItem.name || product.name || 'Product',
      isDirectPurchase: true
    }];
  }
  
 
  
  return cartItemsArray.map((item) => {
    const product = item.product || item;
    const resolvedImages = product.images?.length > 0 
      ? product.images 
      : (resolveProductImages ? resolveProductImages(product) : []);
    
    return {
      ...item,
      id: item.id || product.id || Math.random().toString(36).substr(2, 9),
      product: {
        ...product,
        images: resolvedImages,
      },
      unitPrice: item.unitPrice || product.currentPrice || product.price || 0,
      quantity: item.quantity || 1,
      name: item.name || product.name || 'Product',
      isDirectPurchase: false
    };
  });
};

export const calculateTotals = (displayItems) => {
  if (!Array.isArray(displayItems) || displayItems.length === 0) {
    return {
      subtotal: 0,
      shipping: 0,
      tax: 0,
      discount: 0,
      total: 0,
    };
  }

  const subtotal = displayItems.reduce((sum, item) => {
    const unitPrice = item.unitPrice || 0;
    const quantity = item.quantity || 1;
    return sum + (unitPrice * quantity);
  }, 0);

  const shipping = subtotal > 200 ? 0 : 25;
  // const tax = subtotal * 0.031;
  const discount = subtotal > 150 ? 10 : 0;
  const total = subtotal + shipping - discount;

  return {
    subtotal: Number(subtotal.toFixed(2)),
    shipping: Number(shipping.toFixed(2)),
    // tax: Number(tax.toFixed(2)),
    discount: Number(discount.toFixed(2)),
    total: Number(total.toFixed(2)),
  };
};