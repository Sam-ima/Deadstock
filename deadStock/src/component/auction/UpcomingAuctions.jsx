import { Box, Grid, Typography, Container } from "@mui/material";
import AuctionProductCard from "../card/auctionCard/AuctionProductCard";
import { useAuctionProducts } from "../card/auctionCard/hook/useAuctionProducts";
import { useSearch } from "../Searchbar/SearchContext";

const UpcomingAuctions = () => {
  const { query } = useSearch();
  const { products, loading } = useAuctionProducts();

  const scheduledAuctions = products.filter((product) => {
    const isScheduled = product?.auction?.status === "scheduled";

    const searchText = `${product?.name || ""}`.toLowerCase();

    const matchesSearch = searchText.includes(
      query?.toLowerCase().trim()
    );

    return isScheduled && matchesSearch;
  });

  return (
    <Box sx={{ width: "100%", backgroundColor: "#ffffff" }}>
      <Box sx={{ py: { xs: 4, md: 6 } }}>
        <Container maxWidth="lg">
          <Typography
            fontSize={{
              xs: "24px",
              sm: "28px",
              md: "32px",
              lg: "40px",
              xl: "48px",
            }}
            sx={{
              lineHeight: 1.2,
              fontWeight: 800,
              mb: 5,
              textAlign: "center",
            }}
          >
            Upcoming Auctions
          </Typography>

          {loading ? (
            <Typography textAlign="center">
              Loading upcoming auctions...
            </Typography>
          ) : scheduledAuctions.length > 0 ? (
            <Grid container spacing={3} justifyContent="center">
              {scheduledAuctions.map((product) => (
                <Grid item key={product.id}>
                  <AuctionProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography textAlign="center" color="text.secondary">
              No upcoming auctions found
            </Typography>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default UpcomingAuctions;