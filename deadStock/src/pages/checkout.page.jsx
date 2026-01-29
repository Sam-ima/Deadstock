import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/authContext/authContext";
import { usePaymentStatus } from "../component/checkout/hooks/usePaymentStatus";
import { useCheckoutItems } from "../component/checkout/hooks/useCheckoutItems";
import { useDeliveryDetails } from "../component/checkout/hooks/useDeliveryDetails";
import CheckoutLayout from "../component/checkout/CheckoutLayout";
import PaymentSuccess from "../component/checkout/payment/PayementSuccess";
import PaymentFailure from "../component/checkout/payment/PaymentFailurePage";
import EmptyCartState from "../component/checkout/EmptyCartState";
import { EsewaPaymentHandler } from "../component/checkout/payment/EsewaPaymentHandler";
import { finalizeProductStock } from "../component/cart/cart_utils";

function CheckoutPage() {
  const [activeStep, setActiveStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState(null);

  const { user } = useAuth();
  const { paymentStatus, paymentError, orderId } = usePaymentStatus();
  const { directPurchaseItem, displayItems, totals, hasItems } =
    useCheckoutItems();
  const { deliveryDetails, setDeliveryDetails, isDeliveryDetailsComplete } =
    useDeliveryDetails();
  const isPaymentMethodSelected = paymentMethod === "esewa";

  const { handlePayment, loading } = EsewaPaymentHandler({
    user,
    displayItems,
    totals,
    deliveryDetails,
    isDeliveryDetailsComplete,
    isPaymentMethodSelected,
  });

  const handleBack = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };
  const handleNext = () => {
    if (activeStep === 1 && !isDeliveryDetailsComplete()) {
      toast.error("Please fill all delivery details.");
      return;
    }
    if (activeStep === 2 && !isPaymentMethodSelected) {
      toast.error("Please select eSewa.");
      return;
    }
    if (activeStep < 2) setActiveStep((prev) => prev + 1);
  };
  const handlePaymentMethodChange = (method) => setPaymentMethod(method);

  const handlePaymentWithValidation = () => {
    if (!isPaymentMethodSelected) {
      toast.error("Select eSewa.");
      return;
    }
    if (!isDeliveryDetailsComplete()) {
      toast.error("Complete delivery details.");
      return;
    }
    handlePayment();
  };

  // ------------------------
  // Finalize stock on payment status change
  // ------------------------
  useEffect(() => {
    if (!paymentStatus || paymentStatus === "pending") return;

    const finalizeAllItems = async () => {
      const status = paymentStatus === "success" ? "success" : "failed";
      for (const item of displayItems) {
        try {
          await finalizeProductStock(item.product.id, item.quantity, status);
        } catch (err) {
          console.error("❌ Stock finalize error:", err.message);
        }
      }
    };

    finalizeAllItems();
  }, [paymentStatus, displayItems]);

  if (paymentStatus === "success")
    return <PaymentSuccess userEmail={user?.email} orderId={orderId} />;
  if (paymentStatus === "failed")
    return <PaymentFailure errorMessage={paymentError} orderId={orderId} />;
  if (!hasItems) return <EmptyCartState />;

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
