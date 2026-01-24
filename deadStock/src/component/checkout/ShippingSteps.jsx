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

const ShippingStep = ({ user, deliveryDetails, setDeliveryDetails }) => {
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

      {/* Full Name */}
      <TextField
        fullWidth
        label="Full name"
        value={deliveryDetails.fullName || user?.displayName || ""}
        onChange={(e) =>
          setDeliveryDetails((prev) => ({ ...prev, fullName: e.target.value }))
        }
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

      {/* Street Address */}
      <TextField
        fullWidth
        label="Street address"
        placeholder="123 Main Street"
        value={deliveryDetails.address || ""}
        onChange={(e) =>
          setDeliveryDetails((prev) => ({ ...prev, address: e.target.value }))
        }
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

      {/* City & Postal / ZIP */}
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
          value={deliveryDetails.city || ""}
          onChange={(e) =>
            setDeliveryDetails((prev) => ({ ...prev, city: e.target.value }))
          }
          margin="normal"
          variant="outlined"
          InputProps={{
            startAdornment: <InputAdornment position="start">🏙️</InputAdornment>,
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
          value={deliveryDetails.zip || ""}
          onChange={(e) =>
            setDeliveryDetails((prev) => ({ ...prev, zip: e.target.value }))
          }
          margin="normal"
          variant="outlined"
          InputProps={{
            startAdornment: <InputAdornment position="start">📮</InputAdornment>,
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

      {/* State / Province */}
      <TextField
        fullWidth
        label="State / Province"
        value={deliveryDetails.state || ""}
        onChange={(e) =>
          setDeliveryDetails((prev) => ({ ...prev, state: e.target.value }))
        }
        margin="normal"
        variant="outlined"
        InputProps={{
          startAdornment: <InputAdornment position="start">🗺️</InputAdornment>,
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

      {/* Phone */}
      <TextField
        fullWidth
        label="Phone Number"
        value={deliveryDetails.phone || ""}
        onChange={(e) =>
          setDeliveryDetails((prev) => ({ ...prev, phone: e.target.value }))
        }
        margin="normal"
        variant="outlined"
        InputProps={{
          startAdornment: <InputAdornment position="start">📞</InputAdornment>,
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

      {/* Save Address Checkbox */}
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
 
