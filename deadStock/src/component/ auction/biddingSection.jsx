import { Grid, Typography, Box, Container } from "@mui/material";
import AuctionProductCard from "../card/auctionCard/AuctionProductCard";
import { useAuctionProducts } from "../card/auctionCard/hook/useAuctionProducts";

const BiddingSection = () => {
  const { products, loading } = useAuctionProducts();

  const now = Date.now();

  const endingSoon = products.filter((product) => {
    if (product?.auction?.status !== "live") return false;

    const endTime =
      typeof product.auction.endTime?.toDate === "function"
        ? product.auction.endTime.toDate().getTime()
        : new Date(product.auction.endTime).getTime();

    // Ending within next 2 hours
    return endTime - now <= 2 * 60 * 60 * 1000;
  });

  if (loading || endingSoon.length === 0) return null;

  return (
    <Box
      sx={{
        py: { xs: 3, sm: 4, md: 5 },
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          fontWeight={800}
          fontSize={{ xs: "1.6rem", sm: "1.8rem", md: "2.4rem" }}
          textAlign="center"
          mb={4}
        >
          ⏰ Ending Soon Bids
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {endingSoon.map((product) => (
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
