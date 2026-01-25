// hooks/useDeliveryDetails.js
import { useState } from "react";

const initialDeliveryDetails = {
  fullName: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  phone: "",
};

export function useDeliveryDetails() {
  const [deliveryDetails, setDeliveryDetails] = useState(initialDeliveryDetails);

  const isDeliveryDetailsComplete = () => {
    return Object.values(deliveryDetails).every((field) => field.trim() !== "");
  };

  const resetDeliveryDetails = () => {
    setDeliveryDetails(initialDeliveryDetails);
  };

  return {
    deliveryDetails,
    setDeliveryDetails,
    isDeliveryDetailsComplete,
    resetDeliveryDetails
  };
}