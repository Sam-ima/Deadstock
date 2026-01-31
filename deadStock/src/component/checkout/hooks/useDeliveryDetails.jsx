// hooks/useDeliveryDetails.js
import { useState } from "react";

const initialDeliveryDetails = {
  address: "",
  city: "",
  state: "",
  zip: "",
  phone: "",
};

const NEPAL_PHONE_REGEX = /^(?:\+977|977)?9[6-8]\d{8}$/;

export function useDeliveryDetails() {
  const [deliveryDetails, setDeliveryDetails] = useState(initialDeliveryDetails);

  const isPhoneValid = (phone) => {
    return NEPAL_PHONE_REGEX.test(phone.replace(/\s|-/g, ""));
  };

  const isDeliveryDetailsComplete = () => {
    return (
      Object.values(deliveryDetails).every(
        (field) => field.trim() !== ""
      ) &&
      isPhoneValid(deliveryDetails.phone)
    );
  };

  const resetDeliveryDetails = () => {
    setDeliveryDetails(initialDeliveryDetails);
  };

  return {
    deliveryDetails,
    setDeliveryDetails,
    isDeliveryDetailsComplete,
    resetDeliveryDetails,
    isPhoneValid,
  };
}
