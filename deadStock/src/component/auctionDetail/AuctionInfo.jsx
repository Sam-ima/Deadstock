import { Box, Typography, Divider, Chip } from "@mui/material";
import AuctionCountdown from "./AuctionCountDown";
import AuctionBidSection from "./AuctionBidSection";
import AuctionMetaInfo from "./AuctionMetaInfo";

const toJsDate = (value) => {
  if (!value) return null;
  if (typeof value.toDate === "function") return value.toDate();
  return new Date(value);
};

const getAuctionStatus = (product) => {
  const now = Date.now();
  const start = toJsDate(product?.auction?.startTime)?.getTime();
  const end = toJsDate(product?.auction?.endTime)?.getTime();
  if (!start || !end) return "ended";
  if (now < start) return "upcoming";
  if (now >= start && now < end) return "live";
  return "ended";
};

const AuctionInfo = ({ product }) => {
  if (!product?.auction) return null;

  const status = getAuctionStatus(product);

  return (
    <Box sx={{ flex: 1, maxWidth: 480, width: "100%" }}>
      <Typography variant="h5" fontWeight="bold" mb={1}>
        {product?.name}
      </Typography>

      <Chip
        label={status.toUpperCase()}
        color={
          status === "live" ? "error" : status === "upcoming" ? "warning" : "default"
        }
        size="small"
        sx={{ fontWeight: 600, mb: 2 }}
      />

      {/* Pass the auction sub-object so children read from the right place */}
      <AuctionCountdown auction={product.auction} status={status} />

      <Divider sx={{ my: 3 }} />

      <AuctionBidSection auction={product.auction} status={status} />

      <Divider sx={{ my: 3 }} />

      <AuctionMetaInfo product={product} auction={product.auction} />
    </Box>
  );
};

export default AuctionInfo;