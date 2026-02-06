import { Box, Typography, Grid } from "@mui/material";
import AuctionProductCard from "../card/auction card/AuctionProductCard";
import { useAuctionProducts } from "../card/auction card/hook/useAuctionProducts";

const LiveAuctionSection = () => {
  // ✅ FILTER ONLY LIVE AUCTIONS
  const liveAuctions = useAuctionProducts().filter(
    (product) => product?.auction?.status === "live"
  );

  // ✅ DO NOT RENDER SECTION IF NO LIVE AUCTIONS
  if (liveAuctions.length === 0) return null;

  return (
    <Box sx={{ py: { xs: 4, md: 6 }, background: "#ece8e8" }}>
      {/* Heading */}
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography
          fontSize={{ xs: "1.6rem", sm: "1.8rem", md: "2.4rem" }}
          fontWeight={800}
        >
          🔥 Live Auctions
        </Typography>
        <Typography color="text.secondary" mt={1}>
          Compete with others and place your highest bid
        </Typography>
      </Box>

      {/* Cards */}
      <Grid container spacing={4} justifyContent="center">
        {liveAuctions.map((product) => (
          <Grid item key={product.id}>
            <AuctionProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default LiveAuctionSection;
