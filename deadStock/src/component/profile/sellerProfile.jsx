import { Box, Typography, Button } from "@mui/material";
import ProfileHeader from "./profileHeader";
import SellerProducts from "./sellerProducts";
import { sellerData } from "../data/sellerData";

const sellerProfile = () => {
  return (
    <Box p={3} bgcolor="#fff" minHeight="100vh">
      <ProfileHeader role="seller" />

      <Typography variant="h6" mb={1}>
        Seller Stats
      </Typography>

      <Typography>Selling: {sellerData.stats.selling}</Typography>
      <Typography>Sold: {sellerData.stats.sold}</Typography>
      <Typography>Rating: {sellerData.stats.rating}</Typography>

      <Button
        fullWidth
        variant="contained"
        sx={{ my: 2 }}
        onClick={() => alert("Add Product Clicked")}
      >
        Add Product
      </Button>

      <SellerProducts products={sellerData.products} />
    </Box>
  );
};

export default sellerProfile;
