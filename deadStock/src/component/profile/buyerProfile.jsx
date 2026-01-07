import { Container } from "@mui/material";
import ProfileHeader from "./profileHeader";
import ProfileInfoCard from "./profileInfo";
import { authUser } from "../data/authUser"; // your logged-in user

const buyerProfile = () => {
  return (
    <Container
      maxWidth="sm"
      sx={{ bgcolor: "#fff", minHeight: "100vh", py: 3 }}
    >
      {/* Pass authUser to ProfileHeader */}
      <ProfileHeader user={authUser} />

      {/* Seller-specific info card */}
      <ProfileInfoCard user={authUser} />
    </Container>
  );
};

export default buyerProfile;
