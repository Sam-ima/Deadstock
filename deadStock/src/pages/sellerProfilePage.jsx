import {
  Box,
  Container,
  Button,
} from "@mui/material";


import ProfileHeader from "../component/sellerProfile/sellerHeader";
import ListingsTabs from "../component/sellerProfile/listingsTabs";
import SettingsList from "../component/sellerProfile/settingsList";
import RecentActivity from "../component/sellerProfile/recentActivity";

const SellerProfilePage = () => {
  return (
    <Box bgcolor="#fff" minHeight="100vh">


      <Container maxWidth="lg"    sx={{
        paddingTop: { xs: "50px", sm: "50px", md: "50px", lg: "60px" },
        paddingBottom: "0px",
      }}>
        <ProfileHeader />
        <ListingsTabs />
        <SettingsList />
        <RecentActivity />

        <Button
          fullWidth
          sx={{
            mt: 3,
            bgcolor: "#377e37",
            color: "black",
            py: 1.5,
            borderRadius: 3,
          }}
        >
       settings
        </Button>
        <Button
          fullWidth
          sx={{
            mt: 3,
            bgcolor: "#e3550e",
            color: "Black",
            py: 1.5,
            borderRadius: 3,
          }}
        >
          Log Out
        </Button>
      </Container>
    </Box>
  );
};

export default SellerProfilePage;
