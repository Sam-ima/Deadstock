import { Container } from "@mui/material";
import ProfileHeader from "../component/profile/profileHeader";
import PersonalInfo from "../component/profile/personalInfo";
import ShippingInfo from "../component/profile/shippingInfo";
import RecentOrders from "../component/profile/recentOrders";
import OrderCard from "../component/profile/orderCard";

const Profile = () => {
  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <ProfileHeader />
      <PersonalInfo />
      <ShippingInfo />
      <RecentOrders />
      <OrderCard />
      
      
    </Container>
  );
};

export default Profile;
