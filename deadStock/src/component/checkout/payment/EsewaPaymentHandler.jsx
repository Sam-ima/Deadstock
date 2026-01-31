// components/checkout/EsewaPaymentHandler.jsx
import React, { useState } from "react";
import { toast } from "react-toastify";

const REQUIRED_FIELDS = [
  "amount",
  "tax_amount",
  "total_amount",
  "transaction_uuid",
  "product_code",
  "product_service_charge",
  "product_delivery_charge",
  "success_url",
  "failure_url",
  "signed_field_names",
  "signature",
];

export function EsewaPaymentHandler({
  user,
  displayItems,
  totals,
  deliveryDetails,
  isDeliveryDetailsComplete,
}) {
  const [loading, setLoading] = useState(false);

  const extractPaymentData = (responseData) => {
    let paymentData;

    if (responseData.payload) {
      // Data is nested in payload property
      paymentData = responseData.payload;
      console.log("Found payload in nested structure");
    } else if (
      responseData.success === true ||
      responseData.success === false
    ) {
      // Data is directly in response (with success wrapper)
      paymentData = { ...responseData };
      delete paymentData.success;
      delete paymentData.message;
      console.log("Using direct response data (removing wrapper)");
    } else {
      // Assume data is already the payload
      paymentData = responseData;
      console.log("Using response data directly");
    }

    return paymentData;
  };

  const validatePaymentData = (paymentData) => {
    const missingFields = REQUIRED_FIELDS.filter((field) => {
      const value = paymentData[field];
      return value === undefined || value === null || value === "";
    });

    if (missingFields.length > 0) {
      console.error("Missing required fields:", missingFields);
      console.error("Payment data we have:", paymentData);
      return { isValid: false, missingFields };
    }

    return { isValid: true, missingFields: [] };
  };

  const createEsewaForm = (paymentData) => {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
    form.style.display = "none";
    form.id = "esewaPaymentForm";

    // Add all required fields
    REQUIRED_FIELDS.forEach((field) => {
      const value = paymentData[field];
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = field;
      input.value = value;
      form.appendChild(input);
    });

    // Add any additional fields
    Object.keys(paymentData)
      .filter(
        (field) =>
          !REQUIRED_FIELDS.includes(field) &&
          field !== "success" &&
          field !== "message",
      )
      .forEach((field) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = field;
        input.value = paymentData[field];
        form.appendChild(input);
      });

    return form;
  };

  const createDebugPanel = (paymentData, form) => {
    const debugDiv = document.createElement("div");
    debugDiv.innerHTML = `
      <div style="position: fixed; top: 10px; right: 10px; background: white; padding: 10px; border: 2px solid green; z-index: 9999; max-width: 400px;">
        <h3 style="margin: 0 0 10px 0; color: green;">Payment Ready</h3>
        <p style="margin: 5px 0;"><strong>Amount:</strong> NPR ${paymentData.total_amount}</p>
        <p style="margin: 5px 0;"><strong>Transaction ID:</strong> ${paymentData.transaction_uuid}</p>
        <div style="margin: 10px 0;">
          <button onclick="document.getElementById('esewaPaymentForm').submit()" 
                  style="background: green; color: white; padding: 8px 16px; border: none; cursor: pointer; margin-right: 10px;">
            Submit to eSewa
          </button>
          <button onclick="this.parentElement.parentElement.remove()" 
                  style="background: gray; color: white; padding: 8px 16px; border: none; cursor: pointer;">
            Close
          </button>
        </div>
        <details>
          <summary>View Details</summary>
          <pre style="background: #f5f5f5; padding: 10px; font-size: 11px; max-height: 200px; overflow: auto; margin-top: 10px;">
${JSON.stringify(paymentData, null, 2)}
          </pre>
        </details>
      </div>
    `;

    form.id = "esewaPaymentForm";
    document.body.appendChild(debugDiv);
  };

  const handlePayment = async () => {
    if (!isDeliveryDetailsComplete()) {
      toast.error("Please fill all delivery details before making payment.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "http://localhost:4000/api/payment/esewa/initiate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.uid,
            userEmail: user.email,
            items: displayItems,
            totalAmount: Math.round(totals.total),
            deliveryDetails,
          }),
        },
      );

      const responseText = await res.text();
      console.log("Raw response:", responseText);

      let responseData;
      try {
        responseData = JSON.parse(responseText);
        console.log("Parsed response data:", responseData);
      } catch (e) {
        console.error("Failed to parse JSON:", e);
        toast.error("Invalid response from payment server");
        setLoading(false);
        return;
      }

      if (!res.ok) {
        console.error("Payment initiation failed:", responseData);
        toast.error(responseData.error || "Unable to initiate payment");
        setLoading(false);
        return;
      }

      const paymentData = extractPaymentData(responseData);
      console.log("Payment data to use:", paymentData);

      const validation = validatePaymentData(paymentData);
      if (!validation.isValid) {
        toast.error(
          `Payment configuration incomplete. Missing: ${validation.missingFields.join(", ")}`,
        );
        setLoading(false);
        return;
      }

      // console.log("✅ All required fields present!");

      const form = createEsewaForm(paymentData);
      document.body.appendChild(form);
      createDebugPanel(paymentData, form);

      // Auto-submit after 2 seconds
      setTimeout(() => {
        console.log("Auto-submitting form to eSewa...");
        form.submit();
      }, 2000);
    } catch (err) {
      console.error("Payment error:", err);
      toast.error("Failed to process payment. Please try again.");
      setLoading(false);
    }
  };

  return {
    handlePayment,
    loading,
  };
}
