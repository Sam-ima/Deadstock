import { Container } from "@mui/material";
import ProfileHeader from "./profileHeader";
import ProfileInfoCard from "./profileInfo";
import { authUser } from "../data/authUser"; 
import SellerActions from "./sellerActions";
import SectionCard from "../common/sectionCard";
import OrdersList from "./ordersList";


const sellerProfile = () => {
  return (
    <Container
      maxWidth="sm"
      sx={{ bgcolor: "#fff", minHeight: "100vh", py: 3 }}
    >
      <SectionCard user={authUser}/>
      {/* Pass authUser to ProfileHeader */}
      <ProfileHeader user={authUser} />

      {/* Seller-specific info card */}

      <ProfileInfoCard user={authUser} />

      <OrdersList user={authUser} />
    
      <SellerActions user={authUser} />
    </Container>
  );
};

export default sellerProfile;
