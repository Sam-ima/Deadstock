// pages/checkout.page.jsx
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "../context/authContext/authContext";
import { resolveProductImages } from "../component/categoryPage/product/productCard/utils/ProductImages";
import { clearDirectPurchaseItem } from "../store/slice/purchaseSlice";
import { toast } from "react-toastify";
// Import components
import CheckoutLayout from "../component/checkout/CheckoutLayout";
import PaymentSuccess from "../component/checkout/PayementSuccess";
import EmptyCartState from "../component/checkout/EmptyCartState";
import {
  getDisplayItems,
  calculateTotals,
} from "../component/checkout/Utility";

function CheckoutPage() {
  const [activeStep, setActiveStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  const dispatch = useDispatch();

  // Get items from Redux
  const directPurchaseItem = useSelector(
    (state) => state.directPurchase?.directPurchaseItem,
  );
  const cartItemsObject = useSelector((state) => state.cart?.items || {});

  // Debug logging
  useEffect(() => {
    console.log('Direct Purchase Item:', directPurchaseItem);
    console.log('Cart Items Object:', cartItemsObject);
  }, [directPurchaseItem, cartItemsObject]);

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
    resolveProductImages,
  );

  console.log('Display Items:', displayItems);
  console.log('Direct Purchase Item exists?', !!directPurchaseItem);

  // Calculate totals
  const totals = calculateTotals(displayItems);

  const handleNext = () => {
    if (activeStep < 2) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };

  const handlePayment = async () => {
    setLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      setPaymentSuccess(true);

      // Clear direct purchase item after successful payment
      if (directPurchaseItem) {
        dispatch(clearDirectPurchaseItem());
      }

      // Show success message
      toast.success("Payment successful! Order confirmed.", {
        position: "top-right",
        autoClose: 3000,
      });
    }, 2000);
  };

  // Check if we have items to display
  const hasItems = displayItems.length > 0;

  if (paymentSuccess) {
    return <PaymentSuccess userEmail={user?.email} />;
  }

  // FIXED: Check if we have no items AND no direct purchase item
  if (!hasItems && !directPurchaseItem) {
    console.log('Showing empty cart state - no items and no direct purchase');
    return <EmptyCartState />;
  }

  console.log('Rendering CheckoutLayout with items:', displayItems);

  return (
    <CheckoutLayout
      directPurchaseItem={directPurchaseItem}
      displayItems={displayItems}
      user={user}
      activeStep={activeStep}
      paymentMethod={paymentMethod}
      loading={loading}
      totals={totals}
      onNext={handleNext}
      onBack={handleBack}
      onPayment={handlePayment}
      onPaymentMethodChange={setPaymentMethod}
    />
  );
}

export default CheckoutPage;