// components/steps/AuctionSummaryStep.jsx
import React from "react";
import { Box, Typography, Divider, Alert } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { colors } from "../checkout/Constants";

const AuctionSummaryStep = ({ product, auction, productImage, deadline }) => (
  <Box>
    <Typography variant="h6" fontWeight={700} color={colors.textPrimary} sx={{ mb: 3 }}>
      🏆 Auction Summary
    </Typography>

    {/* Product info */}
    <Box sx={{ display: "flex", gap: 2, mb: 3, p: 2, bgcolor: "#f9f9f9", borderRadius: 2 }}>
      {productImage && (
        <Box
          component="img"
          src={productImage}
          alt={product.name}
          sx={{ width: 100, height: 100, objectFit: "cover", borderRadius: 2, flexShrink: 0 }}
        />
      )}
      <Box>
        <Typography variant="h6" fontWeight={700}>{product.name}</Typography>
        <Typography variant="body2" color={colors.textSecondary} sx={{ mt: 0.5 }}>
          {product.description}
        </Typography>
        {product.features?.slice(0, 3).map((f, i) => (
          <Typography key={i} variant="caption" color={colors.textSecondary} sx={{ display: "block" }}>
            • {f}
          </Typography>
        ))}
      </Box>
    </Box>

    <Divider sx={{ my: 2 }} />

    {/* Bid rows */}
    {[
      { label: "Starting Bid",    value: `Rs. ${auction.startingBid}`, highlight: false },
      { label: "Total Bids",       value: auction.bidCount,             highlight: false },
      { label: "Your Winning Bid", value: `Rs. ${auction.highestBid}`,  highlight: true  },
    ].map(({ label, value, highlight }) => (
      <Box
        key={label}
        sx={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          py: 1.5, px: 2, mb: 1,
          bgcolor: highlight ? "#fef2f2" : "transparent",
          borderRadius: 2,
          border: highlight ? `1px solid ${colors.primary}20` : "none",
        }}
      >
        <Typography variant="body2" fontWeight={highlight ? 700 : 400} color={colors.textPrimary}>
          {label}
        </Typography>
        <Typography
          variant={highlight ? "h6" : "body2"}
          fontWeight={700}
          color={highlight ? colors.primary : colors.textSecondary}
        >
          {value}
        </Typography>
      </Box>
    ))}

    {/* Deadline warning */}
    <Alert severity="warning" icon={<AccessTimeIcon />} sx={{ mt: 3, borderRadius: 2 }}>
      <Typography variant="body2">
        <strong>Payment Deadline:</strong>{" "}
        {deadline.toLocaleString("en-US", { dateStyle: "full", timeStyle: "short" })}
      </Typography>
      <Typography variant="caption" color={colors.textSecondary}>
        Your purchase link will be disabled after this deadline.
      </Typography>
    </Alert>
  </Box>
);

export default AuctionSummaryStep;