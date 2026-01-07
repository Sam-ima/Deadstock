import { authUser } from "../component/data/authUser";
import { ROLES } from "../component/constants/roles";
import BuyerProfile from "../component/profile/buyerProfile";
import SellerProfile from "../component/profile/sellerProfile";


const profilePage = (maxWidth="lg") => {

  
  maxWidth="lg";
  return authUser.role === ROLES.BUYER
    ? <SellerProfile />
    : <BuyerProfile />;

};

export default profilePage;
