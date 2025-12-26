import { Grid, Typography, Container } from "@mui/material";
import AuctionProductCard from "../card/auction_product_card";;
import {biddingItems} from "../data/bidding_data";

const BiddingSection = () => {
  return (
    <Container sx={{ py: 6 }}>
      <Typography
        variant="h4"
        fontWeight={700}
        textAlign="center"
        mb={4}
      >
       Featured Auction Products
      </Typography>

      <Grid container spacing={4}>
        {biddingItems.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <AuctionProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BiddingSection;
