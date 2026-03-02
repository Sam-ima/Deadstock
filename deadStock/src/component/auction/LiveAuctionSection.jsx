import { Box, Typography, Grid, Container } from "@mui/material";
import AuctionProductCard from "../card/auctionCard/AuctionProductCard";
import { useAuctionProducts } from "../card/auctionCard/hook/useAuctionProducts";
import { useSearch } from "../Searchbar/SearchContext";

const LiveAuctionSection = () => {
  const { query } = useSearch();
  const { products, loading } = useAuctionProducts();

  const liveAuctions = products.filter((product) => {
    const isLive = product?.auction?.status === "live";

    const searchText = `${product?.name || ""}`.toLowerCase();

    const matchesSearch = searchText.includes(query?.toLowerCase().trim());

    return isLive && matchesSearch;
  });

  return (
    <Box sx={{ width: "100%", backgroundColor: "#faf9f9ff" }}>
      <Box sx={{ py: { xs: 4, md: 6 } }}>
        <Container maxWidth="lg">
          {/* Heading */}
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              fontSize={{
                xs: "24px", // mobile
                sm: "28px", // small tablets
                md: "32px", // tablets / small laptop
                lg: "40px", // desktop
                xl: "48px", // large screens
              }}
              sx={{
                lineHeight: 1.2,
                fontWeight: 800,
                mb: 5,
                textAlign: "center",
              }}
            >
              🔥 Live Auctions
            </Typography>
            <Typography color="text.secondary" mt={1}>
              Compete with others and place your highest bid
            </Typography>
          </Box>

          {/* Content */}
          {loading ? (
            <Typography textAlign="center">Loading auctions...</Typography>
          ) : liveAuctions.length > 0 ? (
            <Grid container spacing={4} justifyContent="center">
              {liveAuctions.map((product) => (
                <Grid item key={product.id}>
                  <AuctionProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography textAlign="center" color="text.secondary">
              No live auctions available
            </Typography>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default LiveAuctionSection;
