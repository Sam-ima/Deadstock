import { Box, Container, Button } from "@mui/material";
import ProfileHeader from "../component/sellerProfile/sellerHeader";
import ListingsTabs from "../component/sellerProfile/listingsTabs";
import SettingsList from "../component/sellerProfile/settingsList";
import RecentActivity from "../component/sellerProfile/recentActivity";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

const SellerProfilePage = () => {
  const [seller, setSeller] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const uid = auth.currentUser?.uid;
      if (!uid) return;

      const snap = await getDoc(doc(db, "users", uid));
      if (snap.exists()) {
        setSeller(snap.data());
      }
    };

    fetchProfile();
  }, []);

  if (!seller) return null;
  return (
    <Box bgcolor="#fff" minHeight="100vh">
      <Container
        maxWidth="lg"
        sx={{
          paddingTop: { xs: "50px", sm: "50px", md: "50px", lg: "60px" },
          paddingBottom: "2px",
        }}
      >
        <ProfileHeader seller={seller} />
        <ListingsTabs sellerId={seller.uid} />
        <SettingsList seller={seller} />
        <RecentActivity />

     
      </Container>
    </Box>
  );
};

export default SellerProfilePage;
