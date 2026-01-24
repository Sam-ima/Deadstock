// components/checkout/steps/PaymentStep.jsx
import React from "react";
import {
  Typography,
  TextField,
  InputAdornment,
  Box,
  FormControl,
  RadioGroup,
  Radio,
  Card,
  CardContent,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PaymentIcon from "@mui/icons-material/Payment";
import { colors } from "./Constants";

const PaymentStep = ({ paymentMethod, onPaymentMethodChange }) => {
  return (
    <Box>
      <Typography
        variant="h5"
        gutterBottom
        fontWeight={700}
        color={colors.textPrimary}
      >
        Payment Method
      </Typography>
      <Typography variant="body2" color={colors.textSecondary} sx={{ mb: 3 }}>
        Choose how you'd like to pay
      </Typography>

      <FormControl component="fieldset" sx={{ width: "100%" }}>
        <RadioGroup
          value={paymentMethod}
          onChange={(e) => onPaymentMethodChange(e.target.value)}
        >
          {/* Card */}
          <PaymentOption
            value="card"
            paymentMethod={paymentMethod}
            icon={<CreditCardIcon />}
            iconBgColor={
              paymentMethod === "card" ? colors.primary : colors.border
            }
            iconColor={
              paymentMethod === "card" ? colors.textLight : colors.textPrimary
            }
            label="Credit / Debit Card"
            onClick={() => onPaymentMethodChange("card")}
          />

          {/* PayPal */}
          <PaymentOption
            value="paypal"
            paymentMethod={paymentMethod}
            icon={<PaymentIcon />}
            iconBgColor="#FFC439"
            iconColor="#003087"
            label="PayPal"
            onClick={() => onPaymentMethodChange("paypal")}
          />
        </RadioGroup>
      </FormControl>

      {/* Card fields */}
      {paymentMethod === "card" && <CardFields />}

      <Box
        sx={{
          mt: 3,
          p: 2,
          bgcolor: colors.paperLight,
          borderRadius: 3,
          border: `1px solid ${colors.border}`,
        }}
      >
        <FormControlLabel
          required
          control={
            <Checkbox
              sx={{
                color: colors.primary,
                "&.Mui-checked": {
                  color: colors.primary,
                },
              }}
            />
          }
          label="This is a business purchase (Required for invoice)"
          sx={{ color: colors.textPrimary }}
        />
      </Box>
    </Box>
  );
};

const PaymentOption = ({
  value,
  paymentMethod,
  icon,
  iconBgColor,
  iconColor,
  label,
  onClick,
}) => (
  <Card
    variant="outlined"
    sx={{
      mb: 2,
      bgcolor: paymentMethod === value ? colors.paperLight : "transparent",
      border: `2px solid ${paymentMethod === value ? colors.primary : colors.border}`,
      borderRadius: 3,
      cursor: "pointer",
      transition: "all 0.3s ease",
      "&:hover": {
        borderColor: colors.primaryLight,
        transform: "translateY(-2px)",
      },
    }}
    onClick={onClick}
  >
    <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Radio value={value} sx={{ color: colors.primary }} />
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: "10px",
            bgcolor: iconBgColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mr: 2,
          }}
        >
          {React.cloneElement(icon, { sx: { color: iconColor } })}
        </Box>
        <Typography variant="subtitle1" fontWeight={600}>
          {label}
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

const CardFields = () => (
  <Box mt={3}>
    <TextField
      fullWidth
      label="Card number"
      defaultValue="4242 4242 4242 4242"
      margin="normal"
      variant="outlined"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <CreditCardIcon sx={{ color: colors.primary }} />
          </InputAdornment>
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
    <Box
      sx={{
        display: "flex",
        gap: 2,
        flexDirection: { xs: "column", sm: "row" },
      }}
    >
      <TextField
        fullWidth
        label="Expiration (MM/YY)"
        defaultValue="12/28"
        margin="normal"
        variant="outlined"
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
        label="CVC"
        defaultValue="123"
        margin="normal"
        variant="outlined"
        type="password"
        inputProps={{ maxLength: 4 }}
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
  </Box>
);

export default PaymentStep;
