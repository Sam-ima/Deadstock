import React, { useEffect } from "react";
import { Typography, Box, useTheme, useMediaQuery } from "@mui/material";
import { colors } from "../Constants";
import { SHIPPING_FIELDS } from "./shippingFields";
import ShippingFieldGroup from "./ShippingFIeldGroup";

// ⚠️ React.memo removed — it was preventing re-renders when deliveryDetails
// updated from the parent's useEffect, causing fields to stay blank visually
// even after the state had been written.
const ShippingStep = ({ user, deliveryDetails, setDeliveryDetails, errors = {}, handleChange }) => {
  const theme    = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // ── Sync user profile into deliveryDetails on mount ────────────────────────
  // This is a second safety net: if AuctionCheckout's useEffect fires before
  // ShippingStep mounts (step 0 → step 1 transition), this catches the case
  // where deliveryDetails is still empty when the form first renders.
  useEffect(() => {
    if (!user || !setDeliveryDetails) return;
    setDeliveryDetails((prev) => ({
      fullName: prev.fullName || user.fullName || "",
      email:    prev.email    || user.email    || "",
      phone:    prev.phone    || user.phone    || "",
      address:  prev.address  || user.address  || "",
      city:     prev.city     || user.city     || "",
      zip:      prev.zip      || user.zip      || "",
      state:    prev.state    || user.state    || "",
    }));
  // user object reference changes when auth loads — depend on it so this
  // re-runs if user arrives after the step mounts
  }, [user, setDeliveryDetails]);

  // fieldValues drives the controlled inputs — always reflects latest state
  const fieldValues = {
    fullName: deliveryDetails.fullName || user?.fullName || "",
    email:    deliveryDetails.email    || user?.email    || "",
    phone:    deliveryDetails.phone    || user?.phone    || "",
    address:  deliveryDetails.address  || user?.address  || "",
    city:     deliveryDetails.city     || user?.city     || "",
    zip:      deliveryDetails.zip      || user?.zip      || "",
    state:    deliveryDetails.state    || user?.state    || "",
  };

  return (
    <Box component="form" noValidate sx={{ width: "100%" }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom fontWeight={700} color={colors.textPrimary}>
          Shipping Details
        </Typography>
        <Typography variant="body2" color={colors.textSecondary}>
          Where should we deliver your amazing finds?
        </Typography>
      </Box>

      {/* Full Name + Email */}
      <Box sx={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 2 }}>
        <Box sx={{ width: "100%" }}>
          <ShippingFieldGroup
            fields={[SHIPPING_FIELDS.find((f) => f.id === "fullName")]}
            values={fieldValues}
            onChange={handleChange}
            errors={errors}
            isRowItem={true}
          />
        </Box>
        <Box sx={{ width: "100%" }}>
          <ShippingFieldGroup
            fields={[SHIPPING_FIELDS.find((f) => f.id === "email")]}
            values={fieldValues}
            onChange={handleChange}
            errors={errors}
            isRowItem={true}
          />
        </Box>
      </Box>

      {/* Address + Phone */}
      <Box sx={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 2 }}>
        <Box sx={{ width: "100%" }}>
          <ShippingFieldGroup
            fields={[SHIPPING_FIELDS.find((f) => f.id === "address")]}
            values={fieldValues}
            onChange={handleChange}
            errors={errors}
            isRowItem={true}
          />
        </Box>
        <Box sx={{ width: "100%" }}>
          <ShippingFieldGroup
            fields={[SHIPPING_FIELDS.find((f) => f.id === "phone")]}
            values={fieldValues}
            onChange={handleChange}
            errors={errors}
            isRowItem={true}
          />
        </Box>
      </Box>

      {/* City + ZIP */}
      <Box sx={{ mb: 3, display: "flex", flexDirection: isMobile ? "column" : "row", gap: 2 }}>
        <Box sx={{ width: "100%" }}>
          <ShippingFieldGroup
            fields={[SHIPPING_FIELDS.find((f) => f.id === "city")]}
            values={fieldValues}
            onChange={handleChange}
            errors={errors}
            isRowItem={true}
          />
        </Box>
        <Box sx={{ width: "100%" }}>
          <ShippingFieldGroup
            fields={[SHIPPING_FIELDS.find((f) => f.id === "zip")]}
            values={fieldValues}
            onChange={handleChange}
            errors={errors}
            isRowItem={true}
          />
        </Box>
      </Box>

      {/* State */}
      <Box sx={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 2 }}>
        <Box sx={{ width: "50%" }}>
          <ShippingFieldGroup
            fields={[SHIPPING_FIELDS.find((f) => f.id === "state")]}
            values={fieldValues}
            onChange={handleChange}
            errors={errors}
            isRowItem={true}
          />
        </Box>
      </Box>
    </Box>
  );
};

ShippingStep.displayName = "ShippingStep";
export default ShippingStep;