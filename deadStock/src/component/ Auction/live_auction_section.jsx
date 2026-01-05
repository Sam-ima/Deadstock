import { Box, Typography, Grid } from "@mui/material";
import AuctionProductCard from "../card/auction card/bidding_card";
import liveAuctionData from "../data/live_auction_data";

const LiveAuctionSection = () => {
  return (
    <Box sx={{ py: 8, px: { xs: 2, md: 6 }, background: "#fff" }}>
      {/* Heading */}
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography fontSize={{ xs: "1.8rem", md: "2.4rem" }} fontWeight={800}>
          🔥 Live Auctions
        </Typography>
        <Typography color="text.secondary" mt={1}>
          Compete with others and place your highest bid
        </Typography>
      </Box>

      {/* Cards */}
      <Grid container spacing={4} justifyContent="center">
        {liveAuctionData.map((product) => (
          <Grid item key={product.id}>
            <AuctionProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default LiveAuctionSection;
