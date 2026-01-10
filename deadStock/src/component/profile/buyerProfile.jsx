import { Container } from "@mui/material";
import ProfileHeader from "./profileHeader";
import ProfileInfoCard from "./profileInfo";
import OrdersList from "./ordersList";
import ShippingInfo from "./shippingInfo";


const buyerProfile = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{ bgcolor: "#fff", minHeight: "100vh", py: 3 }}
    >
      {/* Pass authUser to ProfileHeader */}
      <ProfileHeader />


      <ProfileInfoCard />

      <ShippingInfo />

      <OrdersList />
    

    </Container>
  );
};

export default buyerProfile;
