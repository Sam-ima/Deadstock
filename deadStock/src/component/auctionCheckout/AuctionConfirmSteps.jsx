// components/steps/AuctionConfirmStep.jsx
import React from "react";
import { Box, Typography, Paper, Alert } from "@mui/material";
import { colors } from "../checkout/Constants";

const AuctionConfirmStep = ({ product, auction, deliveryDetails, paymentMethod, submitError }) => {
  const sections = [
    {
      title: "🏆 Auction Item",
      rows: [
        { label: "Product",     value: product.name },
        { label: "Winning Bid", value: `Rs. ${auction.highestBid}`, bold: true },
      ],
    },
    {
      title: "📦 Shipping To",
      rows: [
        { label: "Name",    value: deliveryDetails.fullName },
        { label: "Email",   value: deliveryDetails.email },
        { label: "Phone",   value: deliveryDetails.phone },
        { label: "Address", value: `${deliveryDetails.address}, ${deliveryDetails.city}` },
      ],
    },
    {
      title: "💳 Payment",
      rows: [
        { label: "Method", value: paymentMethod.toUpperCase() },
        { label: "Amount", value: `Rs. ${auction.highestBid}`, bold: true },
      ],
    },
  ];

  return (
    <Box>
      <Typography variant="h6" fontWeight={700} color={colors.textPrimary} sx={{ mb: 3 }}>
        ✅ Confirm Your Order
      </Typography>

      {sections.map(({ title, rows }) => (
        <Paper key={title} variant="outlined" sx={{ p: 2.5, mb: 2, borderRadius: 2 }}>
          <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1.5 }}>
            {title}
          </Typography>
          {rows.map(({ label, value, bold }) => (
            <Box key={label} sx={{ display: "flex", justifyContent: "space-between", py: 0.5 }}>
              <Typography variant="body2" color={colors.textSecondary}>{label}</Typography>
              <Typography
                variant="body2"
                fontWeight={bold ? 700 : 400}
                color={bold ? colors.primary : colors.textPrimary}
              >
                {value}
              </Typography>
            </Box>
          ))}
        </Paper>
      ))}

      {submitError && (
        <Alert severity="error" sx={{ mt: 2, borderRadius: 2 }}>{submitError}</Alert>
      )}
    </Box>
  );
};

export default AuctionConfirmStep;