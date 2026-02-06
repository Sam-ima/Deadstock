import { Box, Grid, Typography, Container } from "@mui/material";
import UpcomingAuctionCard from "../card/auctionCard/upcoming_card";
import { useAuctionProducts } from "../card/auctionCard/hook/useAuctionProducts";

const UpcomingAuctions = () => {
  // ✅ Get products from Firestore
  const { products, loading } = useAuctionProducts();

  // ✅ Filter only scheduled auctions
  const scheduledAuctions = products.filter(
    (product) => product?.auction?.status === "scheduled"
  );
  console.log("upcom:",scheduledAuctions)

  return (
    <Box sx={{ width: "100%", backgroundColor: "#ffffff" }}>
      <Box sx={{ py: { xs: 4, md: 6 } }}>
        <Container maxWidth="lg">
          {/* Heading */}
          <Typography
            fontSize={{ xs: "1.6rem", sm: "1.8rem", md: "2.4rem" }}
            fontWeight={800}
            mb={5}
            textAlign="center"
          >
            Upcoming Auctions
          </Typography>

          {/* Content */}
          {loading ? (
            <Typography textAlign="center">
              Loading upcoming auctions...
            </Typography>
          ) : scheduledAuctions.length > 0 ? (
            <Grid container spacing={3} justifyContent="center">
              {scheduledAuctions.map((product) => (
                <Grid item key={product.id}>
                  <UpcomingAuctionCard product={product} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography textAlign="center" color="text.secondary">
              No upcoming auctions available
            </Typography>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default UpcomingAuctions;
