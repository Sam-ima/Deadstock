import { authUser } from "../component/data/authUser";
import { ROLES } from "../component/constants/roles";
import { Container } from "@mui/material";
import BuyerProfile from "../component/profile/buyerProfile";
import SellerProfile from "../component/profile/sellerProfile";

const ProfilePage = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        paddingTop: { xs: "50px", sm: "50px", md: "50px", lg: "60px" },
        paddingBottom: "0px",
      }}
    >
      {authUser.role === ROLES.SELLER ? (
        <BuyerProfile />
      ) : (
        <SellerProfile />
      )}
    </Container>
  );
};

export default ProfilePage;
