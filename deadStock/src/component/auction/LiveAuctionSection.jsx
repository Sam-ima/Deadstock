import { Box, Typography, Grid, Container, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext/authContext"; // same as HeroSection
import AuctionProductCard from "../card/auctionCard/AuctionProductCard";
import { useAuctionProducts } from "../card/auctionCard/hook/useAuctionProducts";
import { useSearch } from "../Searchbar/SearchContext";

const LiveAuctionSection = () => {
  const { query } = useSearch();
  const { products, loading } = useAuctionProducts();
  const navigate = useNavigate();
  const { user } = useAuth(); // ← same auth source as the rest of the app

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCardClick = (e) => {
    if (!user) {
      e.preventDefault();
      e.stopPropagation();
      setDialogOpen(true);
    }
  };

  const handleDialogClose = () => setDialogOpen(false);

  const handleGoToLogin = () => {
    setDialogOpen(false);
    navigate("/login");
  };

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
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              fontSize={{ xs: "24px", sm: "28px", md: "32px", lg: "40px", xl: "48px" }}
              sx={{ lineHeight: 1.2, fontWeight: 800, mb: 5, textAlign: "center" }}
            >
              🔥 Live Auctions
            </Typography>
            <Typography color="text.secondary" mt={1}>
              Compete with others and place your highest bid
            </Typography>
          </Box>

          {loading ? (
            <Typography textAlign="center">Loading auctions...</Typography>
          ) : liveAuctions.length > 0 ? (
            <Grid container spacing={4} justifyContent="center">
              {liveAuctions.map((product) => (
                <Grid item key={product.id}>
                  <Box sx={{ position: "relative" }}>
                    <AuctionProductCard product={product} />

                    {/* Overlay only mounts for guests — authenticated users
                        click straight through to the card's own handler     */}
                    {!user && (
                      <Box
                        onClick={handleCardClick}
                        sx={{
                          position: "absolute",
                          inset: 0,
                          zIndex: 1,
                          cursor: "pointer",
                          borderRadius: "inherit",
                          backgroundColor: "transparent",
                        }}
                      />
                    )}
                  </Box>
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

      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        PaperProps={{ sx: { borderRadius: 3, px: 1, py: 0.5, maxWidth: 400 } }}
      >
        <DialogTitle sx={{ fontWeight: 700, fontSize: "1.2rem" }}>
          Sign in to bid
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "text.secondary" }}>
            You need to be logged in to participate in live auctions. Please
            sign in or create an account to place your bid.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ pb: 2, px: 3, gap: 1 }}>
          <Button onClick={handleDialogClose} variant="outlined" color="inherit" sx={{ borderRadius: 2 }}>
            Cancel
          </Button>
          <Button onClick={handleGoToLogin} variant="contained" sx={{ borderRadius: 2 }} autoFocus>
            Go to Login
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LiveAuctionSection;