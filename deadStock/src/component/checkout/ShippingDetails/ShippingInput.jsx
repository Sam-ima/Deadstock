// components/checkout/steps/components/ShippingInput.jsx
import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import { colors } from "../Constants";

const ShippingInput = React.memo(
  ({ field, value, onChange, error, helperText, ...props }) => {
    const handleChange = (e) => {
      onChange(field.id, e.target.value);
    };

    return (
      <TextField
        fullWidth={field.fullWidth}
        label={field.label}
        placeholder={field.placeholder}
        value={value}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
        type={field.type || "text"}
        required={field.required}
        error={error}
        helperText={helperText}
        autoComplete={field.autoComplete}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">{field.icon}</InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
            "&:hover fieldset": {
              borderColor: colors.primaryLight,
            },
            "&.Mui-focused fieldset": {
              borderColor: colors.primary,
            },
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: colors.primary,
          },
        }}
        {...props}
      />
    );
  },
);

ShippingInput.displayName = "ShippingInput";

export default ShippingInput;
