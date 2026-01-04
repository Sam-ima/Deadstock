import { Box, Typography, Grid } from "@mui/material";
import AuctionProductCard from "../card/auction card/bidding_card";
import liveAuctionData from "../data/live_auction_data";

const LiveAuctionSection = () => {
  return (
    <Box
      sx={{
      
        py: 6,
        px: { xs: 2, md: 6 },
        background: "#fff",
      }}
    >
      {/* Section Heading */}
      <Box sx={{ textAlign: "center", mt: 10, mb: 4 }}>
        <Typography
          sx={{
            fontSize: { xs: "1.8rem", md: "2.4rem" },
            fontWeight: 800,
            // color: "#fff",
            letterSpacing: "1px",
          }}
        >
           Live Auctions
        </Typography>
        <Typography sx={{ color: "rgba(255,255,255,0.85)", mt: 1 }}>
          Bid now before the timer runs out
        </Typography>
      </Box>

      {/* Auction Cards */}
      <Grid container spacing={3} justifyContent="center">
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
