import { useEffect,useState } from "react";
import { Box, Container, Button } from "@mui/material";
import ProfileHeader from "../component/profile/ProfileHeader/profileHeader";
import OrdersList from "../component/profile/ordersList";
import ProfileInfo from "../component/profile/profileInfo";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

const ProfiePage = () => {
   const [buyer, setBuyer] = useState(null);
  
    useEffect(() => {
      const fetchProfile = async () => {
        const uid = auth.currentUser?.uid;
        if (!uid) return;
  
        const snap = await getDoc(doc(db, "users", uid));
        if (snap.exists()) {
          setBuyer(snap.data());
        }
      };
  
      fetchProfile();
    }, []);
  
    if (!buyer) return null;

  return (
    <Box bgcolor="#fff" minHeight="100vh">
      <Container
        maxWidth="lg"
        sx={{
          paddingTop: { xs: "50px", sm: "50px", md: "50px", lg: "60px" },
          paddingBottom: "2px",
        }}
      >
        <ProfileHeader buyer={buyer}/>
        <ProfileInfo buyer={buyer}/>
        <OrdersList />
      </Container>
    </Box>
  );
};

export default ProfiePage;
