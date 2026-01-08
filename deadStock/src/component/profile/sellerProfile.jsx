import { Container } from "@mui/material";
import ProfileHeader from "./profileHeader";
import ProfileInfoCard from "./profileInfo";
import { authUser } from "../data/authUser"; 
import OrdersList from "./ordersList";
import ShippingInfo from "./shippingInfo";
import SellerProduct from "./sellerProduct";
import ProfileStats from "./profileStatus";


const sellerProfile = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{ bgcolor: "#fff", minHeight: "100vh", py: 3 }}
    >
      {/* <SectionCard user={authUser}/> */}
      <ProfileHeader user={authUser} />

      < ProfileStats user={authUser}/>

 

      <ProfileInfoCard user={authUser} />

      <ShippingInfo user={authUser} />

      <OrdersList user={authUser} />

      <SellerProduct user={authUser} />
    
      {/* <SellerActions user={authUser} /> */}
    </Container>
  );
};

export default sellerProfile;
