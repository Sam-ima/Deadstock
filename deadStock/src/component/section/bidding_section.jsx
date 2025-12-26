import { Grid, Typography, Box } from "@mui/material";
import AuctionProductCard from "../card/auction_product_card";
import { biddingItems } from "../data/bidding_data";

const BiddingSection = () => {
  return (
    <Box
      sx={{
        py: 6,
        backgroundColor: "#333", // dark gray background
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h4"
        fontWeight={700}
        textAlign="center"
        mb={4}
        sx={{ color: "#fff" }}
      >
        Bidding Products
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {biddingItems.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <AuctionProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BiddingSection;
