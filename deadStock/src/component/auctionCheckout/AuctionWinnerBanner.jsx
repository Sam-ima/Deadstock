// components/AuctionWinnerBanner.jsx
import React from "react";
import { Box, Typography, Chip } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const AuctionWinnerBanner = ({ productName, timeLeft, timerColor }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: 2,
      mb: 3,
    }}
  >
    <Box>
      <Typography variant="h5" fontWeight={800}>
        🎉 You Won the Auction!
      </Typography>
      <Typography variant="body2" sx={{ opacity: 0.75, mt: 0.5 }}>
        Complete your purchase for <strong>{productName}</strong>
      </Typography>
    </Box>

    {timeLeft ? (
      <Box
        sx={{
          bgcolor: "rgba(0,0,0,0.06)",
          border: `1px solid ${timerColor}30`,
          borderRadius: 2,
          px: 3,
          py: 1.5,
          textAlign: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5 }}>
          <AccessTimeIcon fontSize="small" sx={{ color: timerColor }} />
          <Typography variant="caption" fontWeight={600} color={timerColor}>
            Time Remaining
          </Typography>
        </Box>
        <Typography
          variant="h5"
          fontWeight={800}
          sx={{ color: timerColor, letterSpacing: 3 }}
        >
          {String(timeLeft.hours).padStart(2, "0")}:
          {String(timeLeft.minutes).padStart(2, "0")}:
          {String(timeLeft.seconds).padStart(2, "0")}
        </Typography>
      </Box>
    ) : (
      <Chip
        label="⏰ Deadline Passed"
        sx={{ bgcolor: "#fef2f2", color: "#e74c3c", fontWeight: 700, border: "1px solid #fca5a5" }}
      />
    )}
  </Box>
);

export default AuctionWinnerBanner;