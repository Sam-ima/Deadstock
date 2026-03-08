import { useNavigate } from "react-router-dom";
import {
  Box,
  IconButton,
  Button,
  Badge,
  InputBase,
  Paper,
  Menu,
  MenuItem,
  Avatar,
  Typography,
  Divider,
} from "@mui/material";
import {
  ShoppingCart,
  Menu as MenuIcon,
  LogOut,
  Store,
  ShoppingBag,
} from "lucide-react";
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase/firebase"; // Make sure to import db
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useSelector } from "react-redux"; // ✅ Import Redux hook
import { toNumber } from "../../component/cart/cart_utils";
import SearchBar from "../../component/Searchbar/Searchbar";

const ActionIcons = ({ isMobile, onMenuClick, onCartClick }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  // ✅ Connect to Redux cart items
  const cartItems = useSelector((state) =>
    user ? state.cart.items || {} : {},
  );

  // ✅ Calculate total cart count dynamically
  const cartCount = Object.values(cartItems).reduce(
    (sum, item) => sum + toNumber(item.quantity),
    0,
  );

  // Fetch user data from Firestore when auth state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          // Fetch additional user data from Firestore
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            setUserData({
              role: "buyer", // Default role
              fullName: currentUser.displayName || "User",
              photoURL: currentUser.photoURL || "",
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleUserMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleUserMenuClose = () => setAnchorEl(null);

  const handleProfileClick = () => {
    handleUserMenuClose();
    // if (userData?.role === "seller") {
    //   navigate("/sellerProfile");
    // } else {
    //   navigate("/profile");
    // }
    navigate("/Profile");
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      handleUserMenuClose();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const getUserInitials = () => {
    if (userData?.fullName) {
      return userData.fullName
        .split(" ")
        .map((name) => name[0])
        .join("")
        .toUpperCase()
        .substring(0, 2);
    }
    return user?.email?.[0]?.toUpperCase() || "U";
  };

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <SearchBar />

      {/* Cart icon only for buyers */}
      {(!userData ||
        userData?.role === "buyer" ||
        userData?.role === "both") && (
        <IconButton color="inherit" onClick={onCartClick}>
          <Badge badgeContent={cartCount} color="warning">
            <ShoppingCart size={20} />
          </Badge>
        </IconButton>
      )}

      {/* User authentication */}
      {user ? (
        <>
          <IconButton
            color="inherit"
            onClick={handleUserMenuClick}
            sx={{
              display: { xs: "none", sm: "none", md: "block" },
              p: 0.5,
            }}
          >
            {userData?.photoURL ? (
              <Avatar
                src={userData.photoURL}
                alt={userData.fullName || user.email}
                sx={{ width: 32, height: 32 }}
              />
            ) : (
              <Avatar
                sx={{
                  width: 35,
                  height: 35,
                  bgcolor: userData?.role === "seller" ? "#F57C00" : "#1976d2",
                }}
              >
                {getUserInitials()}
              </Avatar>
            )}
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl) && !isMobile}
            onClose={handleUserMenuClose}
            disableScrollLock
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            PaperProps={{
              sx: { mt: 1, minWidth: 100 },
            }}
          >
            <MenuItem
              onClick={handleProfileClick}
              sx={{
                "&:hover": { backgroundColor: "transparent" },
                flexDirection: "column",
                alignItems: "flex-start",
                py: 1.5,
                cursor: "pointer",
              }}
            >
              <Typography variant="subtitle2" fontWeight="bold">
                {userData?.fullName || user.email}
              </Typography>
              <Typography variant="caption">
                {userData?.role === "both"
                  ? "Seller & Buyer"
                  : userData?.role === "seller"
                    ? "Seller "
                    : "Buyer "}
              </Typography>
            </MenuItem>

            <Divider />
            <MenuItem
              onClick={handleLogout}
              sx={{ color: "error.main", gap: 2, cursor: "pointer" }}
            >
              <LogOut size={16} />
              Logout
            </MenuItem>
          </Menu>
        </>
      ) : (
        !isMobile && (
          <Button
            onClick={() => navigate("/login")}
            sx={{
              ml: 0,
              px: { xs: 2, sm: 3 }, // responsive padding
              py: 1,
              borderRadius: "24px",
              textTransform: "none",
              fontWeight: 600,
              backgroundColor: "#F57C00",
              color: "#fff",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              lineHeight: 1.2, // prevents text overflow
              whiteSpace: "nowrap", // keeps text inside
              overflow: "hidden",

              minWidth: "auto", // avoids forced width issues
              height: "40px", // consistent button height

              "&:hover": {
                backgroundColor: "#EF6C00",
              },
            }}
          >
            Login 
          </Button>
        )
      )}

      {isMobile && (
        <IconButton color="inherit" onClick={onMenuClick}>
          <MenuIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default ActionIcons;
