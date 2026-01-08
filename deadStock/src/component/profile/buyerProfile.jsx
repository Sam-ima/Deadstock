import { Container } from "@mui/material";
import ProfileHeader from "./profileHeader";
import ProfileInfoCard from "./profileInfo";
import { authUser } from "../data/authUser"; 
import SectionCard from "../common/sectionCard";
import OrdersList from "./ordersList";
import ShippingInfo from "./shippingInfo";


const buyerProfile = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{ bgcolor: "#fff", minHeight: "100vh", py: 3 }}
    >
      {/* <SectionCard user={authUser}/>   */}
      {/* Pass authUser to ProfileHeader */}
      <ProfileHeader user={authUser} />


      <ProfileInfoCard user={authUser} />

      <ShippingInfo user={authUser} />

      <OrdersList user={authUser} />
    

    </Container>
  );
};

export default buyerProfile;
