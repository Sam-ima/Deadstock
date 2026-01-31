// components/checkout/steps/hooks/useShippingForm.js
import { useState, useCallback } from "react";
import { SHIPPING_FIELDS } from "../constants/ShippingFields";

export const useShippingForm = (initialDeliveryDetails = {}, user = null) => {
  const [deliveryDetails, setDeliveryDetails] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    ...initialDeliveryDetails,
  });

  const [errors, setErrors] = useState({});
  const [saveAddress, setSaveAddress] = useState(true);

  // Initialize with user data if available
  if (user && !deliveryDetails.fullName && user.displayName) {
    setDeliveryDetails((prev) => ({ ...prev, fullName: user.displayName }));
  }
  if (user && !deliveryDetails.email && user.email) {
    setDeliveryDetails((prev) => ({ ...prev, email: user.email }));
  }

  const handleFieldChange = useCallback(
    (fieldId, value) => {
      setDeliveryDetails((prev) => ({
        ...prev,
        [fieldId]: value,
      }));

      // Clear error for this field when user starts typing
      if (errors[fieldId]) {
        setErrors((prev) => ({
          ...prev,
          [fieldId]: undefined,
        }));
      }
    },
    [errors],
  );

  const handleSaveAddressChange = useCallback((event) => {
    setSaveAddress(event.target.checked);
  }, []);

  const validateForm = useCallback(() => {
    const newErrors = {};

    SHIPPING_FIELDS.forEach((field) => {
      if (field.required && !deliveryDetails[field.id]?.trim()) {
        newErrors[field.id] = `${field.label} is required`;
      }

      // Email validation
      if (field.id === "email" && deliveryDetails.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(deliveryDetails.email)) {
          newErrors.email = "Please enter a valid email address";
        }
      }

      // Phone validation
      // Phone validation (Nepal)
      if (field.id === "phone" && deliveryDetails.phone) {
        const cleanedPhone = deliveryDetails.phone.replace(/\s|-/g, "");
        if (!NEPAL_PHONE_REGEX.test(cleanedPhone)) {
          newErrors.phone =
            "Enter a valid Nepal phone number (e.g. 98XXXXXXXX or +97798XXXXXXXX)";
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [deliveryDetails]);

  const resetForm = useCallback(() => {
    setDeliveryDetails({
      fullName: "",
      email: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      phone: "",
    });
    setErrors({});
    setSaveAddress(true);
  }, []);

  return {
    deliveryDetails,
    errors,
    saveAddress,
    handleFieldChange,
    handleSaveAddressChange,
    validateForm,
    resetForm,
    isFormComplete: Object.values(deliveryDetails).every((value) =>
      value?.trim(),
    ),
    setDeliveryDetails,
  };
};
