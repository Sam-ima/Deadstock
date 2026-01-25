// pages/checkout.page.jsx
import { useState } from "react";
import { toast } from "react-toastify";

// Hooks
import { useAuth } from "../context/authContext/authContext";
import { usePaymentStatus } from "../component/checkout/hooks/usePaymentStatus";
import { useCheckoutItems } from "../component/checkout/hooks/useCheckoutItems";
import { useDeliveryDetails } from "../component/checkout/hooks/useDeliveryDetails";

// Components
import CheckoutLayout from "../component/checkout/CheckoutLayout";
import PaymentSuccess from "../component/checkout/PayementSuccess";
import PaymentFailure from "../component/checkout/PaymentFailurePage";
import EmptyCartState from "../component/checkout/EmptyCartState";
import { EsewaPaymentHandler } from "../component/checkout/payment/EsewaPaymentHandler";

function CheckoutPage() {
  const [activeStep, setActiveStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("card");
  
  // Custom Hooks
  const { user } = useAuth();
  const { paymentStatus, paymentError, orderId } = usePaymentStatus();
  const { directPurchaseItem, displayItems, totals, hasItems } = useCheckoutItems();
  const { deliveryDetails, setDeliveryDetails, isDeliveryDetailsComplete } = useDeliveryDetails();

  // Payment Handler
  const { handlePayment, loading } = EsewaPaymentHandler({
    user,
    displayItems,
    totals,
    deliveryDetails,
    isDeliveryDetailsComplete
  });

  // Navigation Handlers
  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (!isDeliveryDetailsComplete()) {
      toast.error("Please fill all delivery details before continuing.");
      return;
    }

    if (activeStep < 2) {
      setActiveStep((prev) => prev + 1);
    }
  };

  // Render Payment Status Pages
  if (paymentStatus === "success") {
    return <PaymentSuccess userEmail={user?.email} orderId={orderId} />;
  }

  if (paymentStatus === "failed") {
    return <PaymentFailure errorMessage={paymentError} orderId={orderId} />;
  }

  // Check for empty cart
  if (!hasItems) {
    return <EmptyCartState />;
  }

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