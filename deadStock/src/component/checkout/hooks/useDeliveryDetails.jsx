// hooks/useDeliveryDetails.js
import { useState } from "react";

const initialDeliveryDetails = {
  address: "",
  city: "",
  state: "",
  zip: "",
  phone: ""
};

const NEPAL_PHONE_REGEX = /^(?:\+977|977)?9[6-8]\d{8}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function useDeliveryDetails() {
  const [deliveryDetails, setDeliveryDetails] = useState(initialDeliveryDetails);
  const [errors, setErrors] = useState({});

  // ------------------------
  // Phone validation
  // ------------------------
  const isPhoneValid = (phone) => {
    return NEPAL_PHONE_REGEX.test(phone.replace(/\s|-/g, ""));
  };

  // ------------------------
  // Email validation
  // ------------------------
  const isEmailValid = (email) => {
    return EMAIL_REGEX.test(email.trim());
  };

  // ------------------------
  // Validate single field (real-time)
  // ------------------------
  const validateField = (id, value) => {
    let message = "";

    if (!value) {
      message = "This field is required";
    }

    if (id === "phone" && value && !isPhoneValid(value)) {
      message = "Enter valid Nepal phone number";
    }

    if (id === "email"  && !isEmailValid(value)) {
      message = "Enter valid email address";
    }

    setErrors((prev) => ({
      ...prev,
      [id]: message,
    }));
  };

  // ------------------------
  // Handle input change
  // ------------------------
  const handleChange = (id, value) => {
    setDeliveryDetails((prev) => ({
      ...prev,
      [id]: value,
    }));

    validateField(id, value); // immediate validation
  };

  // ------------------------
  // Validate all fields (used on Next click)
  // ------------------------
  const validateAllFields = () => {
    const newErrors = {};

    Object.entries(deliveryDetails).forEach(([key, value]) => {
      if (!value) {
        newErrors[key] = "This field is required";
      }
    });

    if (deliveryDetails.phone && !isPhoneValid(deliveryDetails.phone)) {
      newErrors.phone = "Enter valid Nepal phone number";
    }

    if (deliveryDetails.email && !isEmailValid(deliveryDetails.email)) {
      newErrors.email = "Enter valid email address";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const isDeliveryDetailsComplete = () => {
    return validateAllFields();
  };

  const resetDeliveryDetails = () => {
    setDeliveryDetails(initialDeliveryDetails);
    setErrors({});
  };

  return {
    deliveryDetails,
    handleChange,
    errors,
    isDeliveryDetailsComplete,
    resetDeliveryDetails,
    isPhoneValid,
  };
}