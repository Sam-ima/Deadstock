import { Box, Typography, Stack, Rating, Divider } from "@mui/material";
import AuctionStatusBadge from "./AuctionStatusBadge";
import AuctionCountdown from "./AuctionCountDown";
import AuctionBidSection from "./AuctionBidSection";
import AuctionMetaInfo from "./AuctionMetaInfo";

/**
 * All auction fields live at the ROOT of the product document:
 *   product.status        → "live" | "upcoming" | "ended"
 *   product.startTime     → Firestore Timestamp
 *   product.endTime       → Firestore Timestamp
 *   product.highestBid    → number
 *   product.startingBid   → number
 *   product.bidCount      → number
 *   product.minBidIncrement → number
 *   product.floorPrice    → number
 *   product.paymentDeadline → null | Timestamp
 *   product.highestBidderId → string
 *   product.winnerId      → null | string
 */
const AuctionInfo = ({ product }) => {
  const status = product?.status; // "live" | "upcoming" | "ended"

  return (
    <Box
      flex={1}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <AuctionStatusBadge status={status} />

      <Typography
        variant="h5"
        fontWeight="bold"
        sx={{ fontSize: { xs: "22px", sm: "26px", md: "32px", lg: "38px" }, lineHeight: 1.2 }}
      >
        {product.name}
      </Typography>

      <Stack direction="row" spacing={1} alignItems="center">
        <Rating value={product.rating || 0} precision={0.5} readOnly size="small" />
        <Typography color="text.secondary" variant="body2">
          {product.rating || 0} ({product.reviews || 0} reviews) • {product.sold || 0} sold
        </Typography>
      </Stack>

      <Divider />
      <AuctionCountdown product={product} status={status} />
      <Divider />
      <AuctionBidSection product={product} status={status} />
      <Divider />
      <AuctionMetaInfo product={product} />
    </Box>
  );
};

export default AuctionInfo;