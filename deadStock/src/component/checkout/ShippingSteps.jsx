// components/checkout/steps/ShippingStep.jsx
import React from "react";
import {
  Typography,
  TextField,
  InputAdornment,
  Box,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { colors } from "./Constants";

const ShippingStep = ({ user }) => {
  return (
    <Box component="form" noValidate>
      <Typography
        variant="h5"
        gutterBottom
        fontWeight={700}
        color={colors.textPrimary}
      >
        Shipping Details
      </Typography>
      <Typography variant="body2" color={colors.textSecondary} sx={{ mb: 3 }}>
        Where should we deliver your amazing finds?
      </Typography>

      <TextField
        fullWidth
        label="Full name"
        defaultValue={user?.displayName || ""}
        margin="normal"
        variant="outlined"
        InputProps={{
          startAdornment: <InputAdornment position="start">👤</InputAdornment>,
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
            "&:hover fieldset": {
              borderColor: colors.primaryLight,
            },
          },
        }}
      />

      <TextField
        fullWidth
        label="Street address"
        placeholder="123 Main Street"
        margin="normal"
        variant="outlined"
        InputProps={{
          startAdornment: <InputAdornment position="start">🏠</InputAdornment>,
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
            "&:hover fieldset": {
              borderColor: colors.primaryLight,
            },
          },
        }}
      />

      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <TextField
          fullWidth
          label="City"
          margin="normal"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">🏙️</InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              "&:hover fieldset": {
                borderColor: colors.primaryLight,
              },
            },
          }}
        />
        <TextField
          fullWidth
          label="Postal / ZIP code"
          margin="normal"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">📮</InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              "&:hover fieldset": {
                borderColor: colors.primaryLight,
              },
            },
          }}
        />
      </Box>

      <FormControlLabel
        control={
          <Checkbox
            defaultChecked
            sx={{
              color: colors.primary,
              "&.Mui-checked": {
                color: colors.primary,
              },
            }}
          />
        }
        label="Save this address for future purchases"
        sx={{ mt: 2, color: colors.textPrimary }}
      />
    </Box>
  );
};

export default ShippingStep;
