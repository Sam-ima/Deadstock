// components/AuctionStatusScreen.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Container, Typography, Button } from "@mui/material";
import { colors } from "../checkout/Constants";

const STATUS_CONFIG = {
  
  "not-found": {
    icon: "❓",
    title: "Product Not Found",
    msg: "This auction product could not be found.",
    btn: "Browse Products",
    to: "/",
  },
  "not-ended": {
    icon: "⏳",
    title: "Auction Still Active",
    msg: "This auction has not ended yet.",
    btn: "Go Back",
    to: -1,
  },
  paid: {
    icon: "✅",
    title: "Payment Completed!",
    msg: "You have already paid for this auction item.",
    btn: "View Orders",
    to: "/orders",
    color: "#27ae60",
  },
  expired: {
    icon: "⏰",
    title: "Payment Deadline Expired",
    msg: "The 24-hour payment window has passed for this auction.",
    btn: "Browse Products",
    to: "/",
  },
  error: {
    icon: "❌",
    title: "Something Went Wrong",
    msg: "An error occurred. Please try again or contact support.",
    btn: "Go Home",
    to: "/",
  },
};

const AuctionStatusScreen = ({ status }) => {
  const navigate = useNavigate();
  const s = STATUS_CONFIG[status];
  if (!s) return null;

  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: "center", py: 10 }}>
        <Typography fontSize={64}>{s.icon}</Typography>
        <Typography
          variant="h5"
          fontWeight={700}
          sx={{ mt: 2, color: s.color || colors.primary }}
        >
          {s.title}
        </Typography>
        <Typography color={colors.textSecondary} sx={{ mt: 1 }}>
          {s.msg}
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 4, bgcolor: s.color || colors.primary, borderRadius: 2, px: 4 }}
          onClick={() => s.to === -1 ? navigate(-1) : navigate(s.to)}
        >
          {s.btn}
        </Button>
      </Box>
    </Container>
  );
};

export { STATUS_CONFIG };
export default AuctionStatusScreen;