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
import PaymentSuccess from "../component/checkout/payment/PayementSuccess";
import PaymentFailure from "../component/checkout/payment/PaymentFailurePage";
import EmptyCartState from "../component/checkout/EmptyCartState";
import { EsewaPaymentHandler } from "../component/checkout/payment/EsewaPaymentHandler";

function CheckoutPage() {
  const [activeStep, setActiveStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState(null);

  // Custom Hooks
  const { user } = useAuth();
  const { paymentStatus, paymentError, orderId } = usePaymentStatus();
  const { directPurchaseItem, displayItems, totals, hasItems } =
    useCheckoutItems();
  const { deliveryDetails, setDeliveryDetails, isDeliveryDetailsComplete } =
    useDeliveryDetails();
  const isPaymentMethodSelected = paymentMethod === "esewa";

  // Payment Handler
  const { handlePayment, loading } = EsewaPaymentHandler({
    user,
    displayItems,
    totals,
    deliveryDetails,
    isDeliveryDetailsComplete,
    isPaymentMethodSelected,
  });

  // Navigation Handlers
  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    // Step-specific validation
    if (activeStep === 1) {
      // Shipping step
      if (!isDeliveryDetailsComplete()) {
        toast.error("Please fill all delivery details before continuing.");
        return;
      }
    } else if (activeStep === 2) {
      // Payment step
      if (!isPaymentMethodSelected) {
        toast.error("Please select eSewa as your payment method to continue.");
        return;
      }
    }

    if (activeStep < 2) {
      setActiveStep((prev) => prev + 1);
    }
  };

  // Handle payment method change
  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    // if (method === "esewa") {
    //   toast.success("eSewa payment selected. You can now proceed to payment.");
    // }
  };
  // Handle payment with validation
  const handlePaymentWithValidation = () => {
    if (!isPaymentMethodSelected) {
      toast.error("Please select eSewa as your payment method.");
      return;
    }

    if (!isDeliveryDetailsComplete()) {
      toast.error("Please complete all delivery details first.");
      return;
    }

    handlePayment();
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
      onPayment={handlePaymentWithValidation}
      onPaymentMethodChange={handlePaymentMethodChange}
      deliveryDetails={deliveryDetails}
      setDeliveryDetails={setDeliveryDetails}
    />
  );
}

export default CheckoutPage;
