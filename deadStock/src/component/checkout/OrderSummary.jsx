// components/checkout/OrderSummary.jsx
import React from "react";
import {
  Paper,
  Typography,
  Box,
  Divider,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { colors } from "./Constants";
import OrderItem from "./OrderItems";
import CostBreakdown from "./CostBreakDown";

const OrderSummary = ({
  directPurchaseItem,
  displayItems,
  totals,
  loading,
  hasItems,
  user,
  onPayment,
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        bgcolor: colors.paper,
        borderRadius: 4,
        border: `2px solid ${colors.border}`,
        boxShadow: `0 8px 32px ${colors.shadow}`,
        position: { lg: "sticky" },
       
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        fontWeight={700}
        color={colors.textPrimary}
      >
        Order Summary
      </Typography>

      {/* Purchase mode indicator */}
      {directPurchaseItem && (
        <Alert
          severity="info"
          sx={{
            mb: 2,
            borderRadius: 2,
            bgcolor: `${colors.primary}10`,
            border: `1px solid ${colors.primary}30`,
          }}
        >
          <Typography variant="caption" fontWeight={600}>
            Direct Purchase Mode
          </Typography>
        </Alert>
      )}

      {/* Items */}
      <Box sx={{ my: 1, maxHeight: 400, overflowY: "auto" }}>
        {hasItems ? (
          displayItems.map((item, index) => (
            <OrderItem key={item.id || index} item={item} index={index} />
          ))
        ) : (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography color={colors.textSecondary}>
              No items in your order
            </Typography>
          </Box>
        )}
      </Box>

      <Divider sx={{ my: 1, borderColor: colors.border }} />

      {/* Items count */}
      <Typography variant="body2" color={colors.textSecondary} sx={{ mb: 2 }}>
        {displayItems.length} item{displayItems.length !== 1 ? "s" : ""} in
        order
      </Typography>

      {/* Cost breakdown */}
      <CostBreakdown totals={totals} />

      <Divider sx={{ my: 3, borderColor: colors.border }} />

      {/* Total */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Typography variant="h6" fontWeight={700} color={colors.textPrimary}>
          Total Due
        </Typography>
        <Typography
          variant="h6"
          fontWeight={600}
          sx={{
            background: colors.accentGradient,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Rs. {totals.total.toFixed(2)}
        </Typography>
      </Box>
      <Typography variant="caption" color={colors.textSecondary}>
        Includes all taxes and fees
      </Typography>

      {/* Pay Button */}
      <Button
        fullWidth
        variant="contained"
        size="large"
        startIcon={<LockIcon />}
        endIcon={<ArrowForwardIcon />}
        onClick={onPayment}
        disabled={loading || !hasItems || !user}
        sx={{
          mt: 4,
          py: 1.8,
          background: colors.accentGradient,
          fontSize: "1.05rem",
          fontWeight: 700,
          borderRadius: 3,
          boxShadow: `0 6px 24px ${colors.accent}40`,
          "&:hover": {
            boxShadow: `0 8px 32px ${colors.accent}60`,
            transform: loading ? "none" : "translateY(-2px)",
          },
          transition: "all 0.3s ease",
        }}
      >
        {loading ? (
          <CircularProgress size={24} sx={{ color: colors.textLight }} />
        ) : (
          "Complete Payment"
        )}
      </Button>
    </Paper>
  );
};

export default OrderSummary;
