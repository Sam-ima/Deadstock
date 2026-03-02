import { useEffect, useState } from "react";
import { Box, Button, Avatar, Typography } from "@mui/material";
import { User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../../firebase/firebase";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const DrawerAuthSection = ({ onClose }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    return auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);

      if (!currentUser) return setUserData(null);

      const docSnap = await getDoc(doc(db, "users", currentUser.uid));
      setUserData(
        docSnap.exists()
          ? docSnap.data()
          : { fullName: "User", role: "buyer", photoURL: null },
      );
    });
  }, []);

  const logout = async () => {
    await signOut(auth);
    onClose();
    navigate("/");
  };

  // Compute initials fallback
  const initials =
    userData?.fullName
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  if (!user) {
    return (
      <Box p={2}>
        <Button
          fullWidth
          variant="contained"
          onClick={() => {
            navigate("/login");
            onClose();
          }}
        >
          Login / Register
        </Button>
      </Box>
    );
  }

  return (
    <Box p={2}>
      <Box display="flex" gap={2} alignItems="center">
        {userData?.photoURL ? (
          <Avatar
            src={userData.photoURL}
            alt={userData.fullName || user.email}
            sx={{ width: 48, height: 48 }}
          />
        ) : (
          <Avatar sx={{ width: 48, height: 48 }}>{initials}</Avatar>
        )}

        <Box>
          <Typography fontWeight="bold">{userData?.fullName}</Typography>
          <Typography variant="caption">
            {userData?.role === "both"
              ? "Seller & Buyer"
              : userData?.role === "seller"
                ? "Seller "
                : "Buyer "}
          </Typography>
        </Box>
      </Box>

      <Box mt={2} display="flex" flexDirection="column" gap={1}>
        <Button
          variant="outlined"
          startIcon={<User size={16} />}
          onClick={() => {
            navigate("/profile");
            onClose();
          }}
        >
          Profile
        </Button>

        <Button
          variant="contained"
          color="error"
          startIcon={<LogOut size={16} />}
          onClick={logout}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default DrawerAuthSection;
