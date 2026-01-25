// components/checkout/payment/PaymentStep.jsx
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
  Alert,
  Collapse,
  Button,
} from "@mui/material";
import { colors } from "../Constants";
import EsewaLogo from "../../../assets/esewa-logo.png";
import InfoIcon from "@mui/icons-material/Info";

const PaymentStep = ({ 
  paymentMethod, 
  onPaymentMethodChange,
  showValidation = true 
}) => {
  const [businessPurchase, setBusinessPurchase] = React.useState(false);
  const [showEsewaInfo, setShowEsewaInfo] = React.useState(false);

  const handlePaymentMethodSelect = (method) => {
    onPaymentMethodChange(method);
    if (method === "esewa") {
      setShowEsewaInfo(true);
    }
  };

  const handleBusinessPurchaseChange = (event) => {
    setBusinessPurchase(event.target.checked);
  };

  return (
    <Box>
      {/* Validation Alert */}
      {showValidation && !paymentMethod && (
        <Alert 
          severity="warning" 
          sx={{ mb: 3, borderRadius: 2 }}
          icon={<InfoIcon />}
        >
          Please select eSewa as your payment method to continue
        </Alert>
      )}

      <Typography
        variant="h6"
        gutterBottom
        fontWeight={700}
        color={colors.textPrimary}
      >
        Payment Method
      </Typography>

      <Typography variant="body2" color={colors.textSecondary} sx={{ mb: 3 }}>
        Secure payment using eSewa (Nepal)
      </Typography>

      {/* Payment Method Selection */}
      <FormControl component="fieldset" sx={{ width: "100%" }}>
        <RadioGroup
          value={paymentMethod || ""}
          onChange={(e) => handlePaymentMethodSelect(e.target.value)}
        >
          <PaymentOption
            value="esewa"
            paymentMethod={paymentMethod}
            label="eSewa Digital Wallet"
            description="Pay securely with your eSewa account"
            isRecommended={true}
          />
        </RadioGroup>
      </FormControl>

      {/* eSewa Information */}
      <Collapse in={showEsewaInfo && paymentMethod === "esewa"}>
        <Box
          sx={{
            mt: 3,
            p: 3,
            bgcolor: colors.successLight,
            borderRadius: 3,
            border: `1px solid ${colors.success}`,
          }}
        >
          <Typography variant="subtitle2" fontWeight={600} gutterBottom>
            🎉 eSewa Selected
          </Typography>
          <Typography variant="body2" color={colors.textSecondary}>
            You will be redirected to <strong>eSewa</strong> to complete your
            payment securely. Make sure you have sufficient balance in your eSewa account.
          </Typography>
          
          <Box sx={{ mt: 2 }}>
            <Typography variant="caption" fontWeight={600}>
              How it works:
            </Typography>
            <ul style={{ margin: "8px 0", paddingLeft: "20px" }}>
              <li style={{ marginBottom: "4px" }}>Click "Pay Now" to proceed to eSewa</li>
              <li style={{ marginBottom: "4px" }}>Login to your eSewa account</li>
              <li style={{ marginBottom: "4px" }}>Confirm the payment</li>
              <li>You'll be redirected back to see your order confirmation</li>
            </ul>
          </Box>
        </Box>
      </Collapse>

      {/* Business Invoice Checkbox */}
      <Box
        
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={businessPurchase}
              onChange={handleBusinessPurchaseChange}
              required
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
        
        <Collapse in={businessPurchase}>
          <Box sx={{ mt: 2 }}>
            <Typography variant="caption" color={colors.textSecondary}>
              Please ensure your business details are correctly filled in the shipping section.
            </Typography>
          </Box>
        </Collapse>
      </Box>

      {/* Step Completion Indicator */}
      {paymentMethod === "esewa" && businessPurchase && (
        <Alert 
          severity="success" 
          sx={{ mt: 3, borderRadius: 2 }}
        >
          ✓ Payment method selected and ready to proceed
        </Alert>
      )}
    </Box>
  );
};

const PaymentOption = ({ 
  value, 
  paymentMethod, 
  label, 
  description
}) => (
  <Card
    variant="outlined"
    onClick={() => {}} // Handled by RadioGroup
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
      position: "relative",
    }}
  >
  
    
    <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Radio 
          value={value} 
          sx={{ 
            color: colors.primary,
            "&.Mui-checked": {
              color: colors.primary,
            }
          }} 
        />

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
            flexShrink: 0,
          }}
        >
          <img 
            src={EsewaLogo} 
            alt="eSewa" 
            loading="lazy" 
            style={{ width: 35, height: 35 }} 
          />
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle1" fontWeight={600}>
            {label}
          </Typography>
          {description && (
            <Typography variant="body2" color={colors.textSecondary}>
              {description}
            </Typography>
          )}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

export default PaymentStep;