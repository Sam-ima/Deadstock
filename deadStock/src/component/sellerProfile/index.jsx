import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import ProfileHeader from "../sellerProfile/ProfileHeader/profileHeader";
import ProfileInfo from "../sellerProfile/ProfileInfo/profileInfo";
// import RecentActivity from "../component/sellerProfile/recentActivity";
import ListingsTabs from "../sellerProfile/productListing/listingsTabs";

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const uid = auth.currentUser?.uid;
      if (!uid) return;

      const snap = await getDoc(doc(db, "users", uid));
      if (snap.exists()) {
        setUser(snap.data());
      }
    };

    fetchProfile();
  }, []);

  if (!user)
    return <Typography textAlign="center">Loading profile...</Typography>;

  return (
    <Box bgcolor="#fff" minHeight="100vh">
      {/* Header Section */}
      <Container maxWidth="lg" sx={{ paddingTop: { xs: "50px", lg: "60px" } }}>
        <ProfileHeader buyer={user} />
      </Container>

      {/* Listings Section */}
      <Box sx={{ bgcolor: "grey.50" }}>
        <Container maxWidth="lg">
          <ListingsTabs user={user} />
        </Container>
      </Box>

      {/* Profile Info Section */}
      <Container maxWidth="lg" sx={{ pb: 3 }}>
        <ProfileInfo buyer={user} />
      </Container>
    </Box>
  );
};

export default ProfilePage;
