// components/checkout/steps/ShippingStep.jsx - Simple version
import React from "react";
import { Typography, Box, useTheme, useMediaQuery } from "@mui/material";
import { colors } from "../Constants";
import { SHIPPING_FIELDS } from "./shippingFields";
import ShippingFieldGroup from "./ShippingFIeldGroup";

const ShippingStep = React.memo(
  ({ user, deliveryDetails, setDeliveryDetails, errors = {} }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const handleFieldChange = (fieldId, value) => {
      setDeliveryDetails((prev) => ({
        ...prev,
        [fieldId]: value,
      }));
    };

    const fieldValues = {
      ...deliveryDetails,
      fullName: deliveryDetails.fullName || user?.fullName || "",
      email: deliveryDetails.email || user?.email || "",
    };

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
        {/* State & Phone in row on larger screens */}
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: 2,
          }}
        >
          <Box sx={{ width: "100%" }}>
            <ShippingFieldGroup
              fields={[SHIPPING_FIELDS.find((f) => f.id === "fullName")]}
              values={fieldValues}
              onChange={handleFieldChange}
              errors={errors}
              isRowItem={true}
            />
          </Box>
          <Box sx={{ width: "100%" }}>
            <ShippingFieldGroup
              fields={[SHIPPING_FIELDS.find((f) => f.id === "email")]}
              values={fieldValues}
              onChange={handleFieldChange}
              errors={errors}
              isRowItem={true}
            />
          </Box>
        </Box>

        {/* State & Phone in row on larger screens */}
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: 2,
          }}
        >
          <Box sx={{ width: "100%" }}>
            <ShippingFieldGroup
              fields={[SHIPPING_FIELDS.find((f) => f.id === "address")]}
              values={fieldValues}
              onChange={handleFieldChange}
              errors={errors}
              isRowItem={true}
            />
          </Box>
          <Box sx={{ width: "100%" }}>
            <ShippingFieldGroup
              fields={[SHIPPING_FIELDS.find((f) => f.id === "phone")]}
              values={fieldValues}
              onChange={handleFieldChange}
              errors={errors}
              isRowItem={true}
            />
          </Box>
        </Box>

        {/* City & ZIP in row on larger screens */}
        <Box
          sx={{
            mb: 3,
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: 2,
          }}
        >
          <Box sx={{ width: "100%" }}>
            <ShippingFieldGroup
              fields={[SHIPPING_FIELDS.find((f) => f.id === "city")]}
              values={fieldValues}
              onChange={handleFieldChange}
              errors={errors}
              isRowItem={true}
            />
          </Box>
          <Box sx={{ width: "100%" }}>
            <ShippingFieldGroup
              fields={[SHIPPING_FIELDS.find((f) => f.id === "zip")]}
              values={fieldValues}
              onChange={handleFieldChange}
              errors={errors}
              isRowItem={true}
            />
          </Box>
        </Box>

        {/* State & Phone in row on larger screens */}
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: 2,
          }}
        >
          <Box sx={{ width: "50%" }}>
            <ShippingFieldGroup
              fields={[SHIPPING_FIELDS.find((f) => f.id === "state")]}
              values={fieldValues}
              onChange={handleFieldChange}
              errors={errors}
              isRowItem={true}
            />
          </Box>
        </Box>
      </Box>
    );
  },
);

ShippingStep.displayName = "ShippingStep";

export default ShippingStep;
