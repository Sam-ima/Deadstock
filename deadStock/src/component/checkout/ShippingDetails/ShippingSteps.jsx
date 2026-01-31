// components/checkout/steps/ShippingStep.jsx
import React from "react";
import { Typography, Box } from "@mui/material";
import { colors } from "../Constants";
import { SHIPPING_FIELDS } from "./shippingFields";
import ShippingFieldGroup from "./ShippingFIeldGroup";
import ShippingRow from "./ShippingRow";
// import SaveAddressCheckbox from "./components/SaveAddressCheckbox";

const ShippingStep = React.memo(
  ({
    user,
    deliveryDetails,
    setDeliveryDetails,
    errors = {},
    // onSaveAddressChange,
    // saveAddress = true
  }) => {
    const handleFieldChange = (fieldId, value) => {
      setDeliveryDetails((prev) => ({
        ...prev,
        [fieldId]: value,
      }));
    };

    // Group fields for layout
    const singleColumnFields = SHIPPING_FIELDS.filter(
      (field) => field.fullWidth || field.id === "email",
    );

    const rowFields = SHIPPING_FIELDS.filter(
      (field) => !field.fullWidth && field.id !== "email",
    );

    const cityZipFields = rowFields.filter(
      (field) => field.id === "city" || field.id === "zip",
    );

    const remainingFields = singleColumnFields.filter(
      (field) =>
        field.id !== "fullName" &&
        field.id !== "email" &&
        field.id !== "address",
    );

    return (
      <Box component="form" noValidate sx={{ width: "100%" }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h5"
            gutterBottom
            fontWeight={700}
            color={colors.textPrimary}
          >
            Shipping Details
          </Typography>
          <Typography variant="body2" color={colors.textSecondary}>
            Where should we deliver your amazing finds?
          </Typography>
        </Box>

        {/* Full Name */}
        <ShippingFieldGroup
          fields={[SHIPPING_FIELDS.find((f) => f.id === "fullName")]}
          values={{
            ...deliveryDetails,
            fullName: deliveryDetails.fullName || user?.fullName || "",
          }}
          onChange={handleFieldChange}
          errors={errors}
        />

        {/* Email */}
        <ShippingFieldGroup
          fields={[SHIPPING_FIELDS.find((f) => f.id === "email")]}
          values={{
            ...deliveryDetails,
            email: deliveryDetails.email || user?.email || "",
          }}
          onChange={handleFieldChange}
          errors={errors}
        />

        {/* Address */}
        <ShippingFieldGroup
          fields={[SHIPPING_FIELDS.find((f) => f.id === "address")]}
          values={deliveryDetails}
          onChange={handleFieldChange}
          errors={errors}
        />

        {/* City & ZIP Code (in row on larger screens) */}
        <ShippingRow spacing={2}>
          <ShippingFieldGroup
            fields={cityZipFields}
            values={deliveryDetails}
            onChange={handleFieldChange}
            errors={errors}
          />
        </ShippingRow>

        {/* State & Phone (full width) */}
        <ShippingFieldGroup
          fields={remainingFields}
          values={deliveryDetails}
          onChange={handleFieldChange}
          errors={errors}
        />

        {/* Save Address Checkbox */}
        {/* <SaveAddressCheckbox
        checked={saveAddress}
        onChange={onSaveAddressChange}
      /> */}
      </Box>
    );
  },
);

ShippingStep.displayName = "ShippingStep";

export default ShippingStep;
