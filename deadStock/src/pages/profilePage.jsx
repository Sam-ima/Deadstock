import {
  Box,
  Container,
  Button,
} from "@mui/material";


import ProfileHeader from "../component/profile/profileHeader";
// import ShippingInfo from "../component/profile/shippingInfo";
import OrdersList from "../component/profile/ordersList";
import ProfileInfo from "../component/profile/profileInfo";

const ProfiePage = () => {
  return (
    <Box bgcolor="#fff" minHeight="100vh">


      <Container maxWidth="lg"    sx={{
        paddingTop: { xs: "50px", sm: "50px", md: "50px", lg: "60px" },
        paddingBottom: "0px",
      }}>
        <ProfileHeader />
          <ProfileInfo />
        {/* <ShippingInfo /> */}
        <OrdersList />
      

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

export default ProfiePage;
