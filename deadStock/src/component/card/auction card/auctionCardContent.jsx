import { Box, Typography, Stack, Button } from "@mui/material";

const AuctionCardContent = ({ product, onPlaceBid }) => {
  return (
    <>
      {/* Image */}
      <Box sx={{ position: "relative" }}>
        <Box
          component="img"
          src={product.img}
          alt={product.name}
          loading="lazy"
          sx={{
            width: "100%",
            height: 180,
            objectFit: "cover",
          }}
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
            background: "rgba(0,0,0,0.7)",
            color: "#fff",
            fontSize: "0.75rem",
            fontWeight: 600,
          }}
        >
          ⏳ {product.timeLeft}
        </Box>
      </Box>

      {/* Content */}
      <Box sx={{ p: 2 }}>
        <Typography fontWeight={700} fontSize="1rem">
          {product.name}
        </Typography>

        <Stack spacing={0.8} mt={1}>
          <Typography fontSize="0.85rem" color="text.secondary">
            Highest Bid: <b>${product.highestBid}</b>
          </Typography>

          <Typography fontSize="0.8rem" color="text.secondary">
            Highest Bidder:{" "}
            <span style={{ fontWeight: 600 }}>{product.highestBidder}</span>
          </Typography>
        </Stack>

        <Button
          onClick={(e) => {
            e.stopPropagation();
            onPlaceBid();
          }}
          fullWidth
          variant="contained"
          sx={{
            mt: 2,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
            background: "#194638",
            "&:hover": {
              background: "#163b30",
            },
          }}
        >
          Place Bid
        </Button>
      </Box>
    </>
  );
};

export default AuctionCardContent;
