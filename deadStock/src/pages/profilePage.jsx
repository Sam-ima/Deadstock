import { Container } from "@mui/material";
import { useState } from "react";

import ProfileHeader from "../component/profile/profileHeader";
import PersonalInfo from "../component/profile/personalInfo";
import ShippingInfo from "../component/profile/shippingInfo";
import RecentOrders from "../component/profile/recentOrders";
// import OrderCard from "../component/profile/orderCard";

import SettingsRow from "../component/profile/settingsRow";
import SettingsDialog from "../component/profile/settingsDialog";
import LogoutRow from "../component/profile/logoutRow";
import LogoutDialog from "../component/profile/logoutDialog";

const Profile = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <ProfileHeader />
      <PersonalInfo />
      <ShippingInfo />
      <RecentOrders />
      {/* <OrderCard /> */}

      {/* Settings */}
      <SettingsRow onClick={() => setSettingsOpen(true)} />
      <SettingsDialog
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />

      {/* Logout */}
      <LogoutRow onClick={() => setLogoutOpen(true)} />
      <LogoutDialog
        open={logoutOpen}
        onClose={() => setLogoutOpen(false)}
      />
    </Container>
  );
};

export default Profile;
