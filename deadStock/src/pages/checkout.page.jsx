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
  const [deliveryDetails, setDeliveryDetails] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
  });

  const { user } = useAuth();
  const dispatch = useDispatch();

  // Get items from Redux
  const directPurchaseItem = useSelector(
    (state) => state.directPurchase?.directPurchaseItem,
  );
  const cartItemsObject = useSelector((state) => state.cart?.items || {});

  // Debug logging
  useEffect(() => {
    console.log("Direct Purchase Item:", directPurchaseItem);
    console.log("Cart Items Object:", cartItemsObject);
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

  console.log("Display Items:", displayItems);
  console.log("Direct Purchase Item exists?", !!directPurchaseItem);

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

    try {
      const res = await fetch(
        "http://localhost:4000/api/payment/esewa/initiate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.uid,
            items: displayItems,
            totalAmount: totals.total,
            deliveryDetails,
          }),
        },
      );

      // Check content-type before parsing
      const contentType = res.headers.get("content-type");
      if (!contentType?.includes("application/json")) {
        const text = await res.text();
        console.error("Server returned non-JSON response:", text);
        toast.error("Payment initiation failed: invalid server response");
        return;
      }

      const paymentData = await res.json();

      if (!res.ok) {
        toast.error(paymentData.error || "Unable to initiate payment");
        return;
      }

      const form = document.createElement("form");
      form.method = "POST";
      form.action = "https://uat.esewa.com.np/epay/main";

      Object.entries(paymentData).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      console.error(err);
      toast.error("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  // Check if we have items to display
  const hasItems = displayItems.length > 0;

  if (paymentSuccess) {
    return <PaymentSuccess userEmail={user?.email} />;
  }

  // FIXED: Check if we have no items AND no direct purchase item
  if (!hasItems && !directPurchaseItem) {
    console.log("Showing empty cart state - no items and no direct purchase");
    return <EmptyCartState />;
  }

  // console.log('Rendering CheckoutLayout with items:', displayItems);

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
      deliveryDetails={deliveryDetails}
      setDeliveryDetails={setDeliveryDetails}
    />
  );
}

export default CheckoutPage;
