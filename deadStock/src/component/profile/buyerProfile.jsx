import { Box, Typography, Button } from "@mui/material";
import ProfileHeader from "./profileHeader";
import BuyerOrders from "./buyerOrders";
import { buyerData } from "../data/buyerData";
import settingsSection from "./settingsSection";

const buyerProfile = () => {
  return (
    <Box
      p={{ xs: 2, md: 4 }}
      bgcolor="#fff"
      minHeight="100vh"
      maxWidth={500}
      mx="auto"
    >
      <ProfileHeader role="buyer" />

      <Typography variant="h6" mb={2}>
        Recent Orders
      </Typography>

      <BuyerOrders orders={buyerData.orders} />

      <settingsSection />
    </Box>
  );
};

export default buyerProfile;
