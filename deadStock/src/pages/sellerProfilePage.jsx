import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

import ProfileHeader from "../component/sellerProfile/ProfileHeader/profileHeader";
import ProfileInfo from "../component/sellerProfile/ProfileInfo/profileInfo";
// import RecentActivity from "../component/sellerProfile/recentActivity";
import ListingsTabs from "../component/sellerProfile/productListing/listingsTabs";

const SellerProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const uid = auth.currentUser?.uid;
      if (!uid) return;

      const snap = await getDoc(doc(db, "users", uid));
      if (snap.exists()) {
        const data = snap.data();
        setUser(data);
      }
    };

    fetchProfile();
  }, []);

  if (!user)
    return <Typography textAlign="center">Loading profile...</Typography>;

  return (
    <Box bgcolor="#fff" minHeight="100vh">
      <Container
        maxWidth="lg"
        sx={{ paddingTop: { xs: "50px", lg: "60px" }, paddingBottom: "2px" }}
      >
        <ProfileHeader buyer={user} />
        <ListingsTabs user={user} />
        <ProfileInfo buyer={user} />
        {/* <RecentActivity /> */}

        {/* Listings + Orders Tabs */}
      </Container>
    </Box>
  );
};

export default SellerProfilePage;
