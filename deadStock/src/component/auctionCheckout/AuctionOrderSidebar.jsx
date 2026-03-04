// components/AuctionOrderSidebar.jsx
import { Box, Typography, Paper, Divider, Chip } from "@mui/material";
import { colors } from "../checkout/Constants";

const AuctionOrderSidebar = ({ product, auction, productImage, timeLeft, timerColor }) => (
  <Box sx={{ width: { xs: "100%", md: 300 }, flexShrink: 0 }}>
    <Paper elevation={0} sx={{ borderRadius: 3, p: 3, position: { md: "sticky" }, top: 20 }}>
      <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2 }}>
        Order Summary
      </Typography>

      {productImage && (
        <Box
          component="img"
          src={productImage}
          alt={product.name}
          sx={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 2, mb: 2 }}
        />
      )}

      <Typography variant="body1" fontWeight={600}>{product.name}</Typography>
      <Chip
        label="🏆 Auction Winner"
        size="small"
        sx={{ bgcolor: "#fff3cd", color: "#856404", fontWeight: 600, mt: 0.5, mb: 2 }}
      />

      <Divider sx={{ mb: 2 }} />

      {[
        { label: "Winning Bid", value: `Rs. ${auction.highestBid}` },
        { label: "Shipping",    value: "Free" },
      ].map(({ label, value }) => (
        <Box key={label} sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="body2" color={colors.textSecondary}>{label}</Typography>
          <Typography variant="body2" fontWeight={600}>{value}</Typography>
        </Box>
      ))}

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="subtitle2" fontWeight={700}>Total</Typography>
        <Typography variant="subtitle1" fontWeight={800} color={colors.primary}>
          Rs. {auction.highestBid}
        </Typography>
      </Box>

      {/* Live countdown */}
      {timeLeft && (
        <Box
          sx={{
            bgcolor: timeLeft.hours < 2 ? "#fef2f2" : "#fff3cd",
            border: `1px solid ${timerColor}40`,
            borderRadius: 2,
            p: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="caption" fontWeight={600} color={timerColor}>
            ⏰ Complete payment within
          </Typography>
          <Typography
            variant="h5"
            fontWeight={800}
            color={timerColor}
            sx={{ letterSpacing: 2, my: 0.5 }}
          >
            {String(timeLeft.hours).padStart(2, "0")}:
            {String(timeLeft.minutes).padStart(2, "0")}:
            {String(timeLeft.seconds).padStart(2, "0")}
          </Typography>
          <Typography variant="caption" color={colors.textSecondary}>
            or your item will be released
          </Typography>
        </Box>
      )}
    </Paper>
  </Box>
);

export default AuctionOrderSidebar;