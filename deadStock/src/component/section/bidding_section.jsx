import { Grid, Typography, Box, Container } from "@mui/material";
import AuctionProductCard from "../card/auction card/bidding_card";
import { biddingItems } from "../data/bidding_data";

const BiddingSection = () => {
  return (
    <Box
      sx={{
        py: 6,
        backgroundColor: "#c3cacaff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Container maxWidth="lg">
        {/* Heading */}
        <Typography
          variant="h4"
          fontWeight={700}
          textAlign="center"
          mb={4}
        >
          Bidding Products
        </Typography>

        {/* Grid of products */}
        <Grid container spacing={8} justifyContent="center">
          {biddingItems.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <AuctionProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default BiddingSection;
