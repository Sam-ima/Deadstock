import { Box, Typography, Stack, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { getTimeLeft } from "./utils/auctionTime";

const AuctionCardContent = ({ product, onPlaceBid }) => {
  const auction = product?.auction;

  // ✅ SAFE INITIAL STATE
  const [timeLeft, setTimeLeft] = useState(
    auction?.endTime ? getTimeLeft(auction.endTime) : "--"
  );

  useEffect(() => {
    // ✅ DO NOTHING IF AUCTION DOES NOT EXIST
    if (!auction?.endTime) return;

    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(auction.endTime));
    }, 1000);

    return () => clearInterval(interval);
  }, [auction?.endTime]);

  // ✅ EXTRA SAFETY (OPTIONAL BUT GOOD)
  if (!auction) return null;

  return (
    <>
      {/* Image */}
      <Box sx={{ position: "relative" }}>
        <Box
          component="img"
          src={product.images?.find(i => i.isMain)?.url}
          alt={product.name}
          sx={{ width: "100%", height: 180, objectFit: "cover" }}
        />

        {/* Timer */}
        <Box
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            px: 1.5,
            py: 0.5,
            borderRadius: 20,
            bgcolor: "rgba(0,0,0,0.75)",
            color: "#fff",
            fontSize: "0.75rem",
            fontWeight: 600,
          }}
        >
          ⏳ {timeLeft}
        </Box>
      </Box>

      {/* Content */}
      <Box sx={{ p: 2 }}>
        <Typography fontWeight={700}>{product.name}</Typography>

        <Stack spacing={0.5} mt={1}>
          <Typography fontSize="0.85rem">
            Highest Bid: <b>Rs. {auction.highestBid}</b>
          </Typography>

          <Typography fontSize="0.8rem" color="text.secondary">
            Bids: {auction.bidCount}
          </Typography>
        </Stack>

        <Button
          fullWidth
          variant="contained"
          onClick={(e) => {
            e.stopPropagation();
            onPlaceBid();
          }}
          sx={{
            mt: 2,
            background: "#194638",
            "&:hover": { background: "#163b30" },
          }}
        >
          Place Bid
        </Button>
      </Box>
    </>
  );
};

export default AuctionCardContent;
