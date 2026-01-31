// components/checkout/steps/components/ShippingFieldGroup.jsx
import React from "react";
import { Box } from "@mui/material";
import ShippingInput from "./ShippingInput";

const ShippingFieldGroup = React.memo(
  ({ fields, values, onChange, errors = {} }) => {
    return (
      <>
        {fields.map((field) => (
          <Box key={field.id} sx={field.fullWidth ? {} : { flex: 1 }}>
            <ShippingInput
              field={field}
              value={values[field.id] || ""}
              onChange={onChange}
              error={!!errors[field.id]}
              helperText={errors[field.id]}
            />
          </Box>
        ))}
      </>
    );
  },
);

ShippingFieldGroup.displayName = "ShippingFieldGroup";

export default ShippingFieldGroup;
