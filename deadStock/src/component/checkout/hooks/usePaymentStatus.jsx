// hooks/usePaymentStatus.js
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export function usePaymentStatus() {
  const [searchParams] = useSearchParams();
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [paymentError, setPaymentError] = useState("");
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    const status = searchParams.get("status");
    const error = searchParams.get("error");
    const order = searchParams.get("orderId");

    if (status === "success") {
      setPaymentStatus("success");
      if (order) setOrderId(order);
    } else if (status === "failed" || error) {
      setPaymentStatus("failed");
      setPaymentError(error || "Payment was not completed successfully");
      if (order) setOrderId(order);
    }
  }, [searchParams]);

  return { paymentStatus, paymentError, orderId };
}
