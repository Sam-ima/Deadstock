// components/checkout/steps/PaymentStep.jsx
import React from "react";
import {
  Typography,
  Box,
  FormControl,
  RadioGroup,
  Radio,
  Card,
  CardContent,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { colors } from "./Constants";
import EsewaLogo from "../../assets/esewa-logo.png";

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
        Secure payment using eSewa (Nepal)
      </Typography>

      <FormControl component="fieldset" sx={{ width: "100%" }}>
        <RadioGroup
          value={paymentMethod}
          onChange={(e) => onPaymentMethodChange(e.target.value)}
        >
          <PaymentOption
            value="esewa"
            paymentMethod={paymentMethod}
            label="eSewa Digital Wallet"
            onClick={() => onPaymentMethodChange("esewa")}
          />
        </RadioGroup>
      </FormControl>

      {/* eSewa info */}
      {paymentMethod === "esewa" && (   
        <Box
          sx={{
            mt: 3,
            p: 2,
            bgcolor: colors.paperLight,
            borderRadius: 3,
            border: `1px solid ${colors.border}`,
          }}
        >
          <Typography variant="body2" color={colors.textSecondary}>
            You will be redirected to <strong>eSewa</strong> to complete your
            payment securely.
          </Typography>
        </Box>
      )}

      {/* Business Invoice Checkbox */}
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

const PaymentOption = ({ value, paymentMethod, label, onClick }) => (
  <Card
    variant="outlined"
    onClick={onClick}
    sx={{
      mb: 2,
      bgcolor: paymentMethod === value ? colors.paperLight : "transparent",
      border: `2px solid ${
        paymentMethod === value ? colors.primary : colors.border
      }`,
      borderRadius: 3,
      cursor: "pointer",
      transition: "all 0.3s ease",
      "&:hover": {
        borderColor: colors.primaryLight,
        transform: "translateY(-2px)",
      },
    }}
  >
    <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Radio value={value} sx={{ color: colors.primary }} />

        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: 2,
            bgcolor: "#60BB46",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mr: 2,
          }}
        >
          <img src={EsewaLogo} alt="eSewa" style={{ width: 28, height: 28 }} />
        </Box>

        <Typography variant="subtitle1" fontWeight={600}>
          {label}
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

export default PaymentStep;
