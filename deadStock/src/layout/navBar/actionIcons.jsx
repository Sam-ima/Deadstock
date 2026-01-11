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
  Search,
  ShoppingCart,
  User,
  Menu as MenuIcon,
  LogOut,
  Store,
  ShoppingBag,
  User as UserIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase/firebase"; // Make sure to import db
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const ActionIcons = ({ isMobile, onMenuClick, onCartClick }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [cartCount, setCartCount] = useState(3);

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

  // Handle user menu
  const handleUserMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    handleUserMenuClose();
    if (userData?.role === "seller") {
      navigate("/sellerProfile");
    } else {
      navigate("/profile");
    }
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

  // Update cart count from your cart data
  useEffect(() => {
    // Fetch cart count logic here
  }, []);

  // Get user initials for avatar
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
      {/* Search Bar (Desktop Only) */}
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          px: 1,
          height: 38,
          borderRadius: "20px",
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          border: "1px solid rgba(255,255,255,0.3)",
          backdropFilter: "blur(8px)",
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: "rgba(255,255,255,0.25)",
          },
        }}
      >
        <Search size={16} />
        <InputBase
          placeholder="Search products..."
          sx={{
            ml: 1,
            color: "#fff",
            fontSize: "0.9rem",
            width: { xs: 100, sm: 180, md: 100, lg: 200 },
          }}
        />
      </Paper>

      {/* Cart - Show only for buyers */}
      {(!userData || userData?.role === "buyer") && (
        <IconButton color="inherit" onClick={onCartClick}>
          <Badge badgeContent={cartCount} color="warning">
            <ShoppingCart size={20} />
          </Badge>
        </IconButton>
      )}

      {/* User Authentication Section */}
      {user ? (
        // Logged in user - show user menu with role-based options
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
            open={Boolean(anchorEl)}
            onClose={handleUserMenuClose}
             disableScrollLock   // ✅ FIX
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            PaperProps={{
              sx: {
                mt: 1,
                minWidth: 100,
              },
            }}
          >
            {/* User info header */}
            <MenuItem
              onClick={handleProfileClick}
              sx={{
                cursor: "default",
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
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  mt: 0.5,
                }}
              >
                {userData?.role === "seller" ? (
                  <>
                    <Store size={12} />
                    Seller Account
                  </>
                ) : (
                  <>
                    <ShoppingBag size={12} />
                    Buyer Account
                  </>
                )}
              </Typography>
            </MenuItem>

            {/* Divider - you can add a proper divider component */}
            <Divider />
            {/* Logout - common for all roles */}
            <MenuItem
              onClick={handleLogout}
              sx={{ color: "error.main", gap: 2, cursor: "pointer" }}
            >
              <LogOut size={16} sx={{ marginRight: 12 }} />
              Logout
            </MenuItem>
          </Menu>
        </>
      ) : (
        // Not logged in - show login button
        !isMobile && (
          <Button
            startIcon={<User size={15} />}
            onClick={() => navigate("/login")}
            sx={{
              ml: 0,
              px: 1,
              py: 1,
              borderRadius: "24px",
              textTransform: "none",
              fontWeight: 600,
              backgroundColor: "#F57C00",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#EF6C00",
              },
            }}
          >
            Login/Register
          </Button>
        )
      )}

      {/* Mobile Menu Icon */}
      {isMobile && (
        <IconButton color="inherit" onClick={onMenuClick}>
          <MenuIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default ActionIcons;
