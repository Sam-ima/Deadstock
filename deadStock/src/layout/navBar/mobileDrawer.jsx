import { useState, useEffect } from "react";
import {
  Drawer,
  Box,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Button,
  Avatar,
  Divider,
  Typography,
} from "@mui/material";
import {
  ChevronDown,
  ChevronUp,
  User,
  LogOut,
  Store,
  ShoppingBag,
  Home,
  Gavel,
  Tag,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import categories from "../../component/data/categories_data";
import { auth, db } from "../../firebase/firebase";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const ITEM_HEIGHT = 35;
const VISIBLE_ITEMS = 5;

const navItems = [
  { label: "Home", path: "/", icon: <Home size={18} /> },
  { label: "Categories", submenu: categories, icon: <Tag size={18} /> },
  { label: "Auctions", path: "/auctions", icon: <Gavel size={18} /> },
  { label: "Sell an item", path: "/how-to-sell", icon: <Store size={18} /> },
];

const MobileDrawer = ({ open, onClose }) => {
  const [openSubmenu, setOpenSubmenu] = useState({});
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Check auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          // Fetch user data from Firestore
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            setUserData({
              role: "buyer",
              fullName: currentUser.displayName || "User",
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

  const toggleSubmenu = (label) => {
    setOpenSubmenu((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  const handleProfileNavigation = () => {
    // if (userData?.role === "seller") {
    //   navigate("/sellerProfile");
    // } else {
    //   navigate("/profile");
    // }
    navigate("/Profile")
    onClose();
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onClose();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

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
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box
        width={280}
        height="100%"
        bgcolor="#f9f9f9ff"
        display="flex"
        flexDirection="column"
      >
        {/* User Profile Section - Show when logged in */}

        {/* Navigation Items */}
        <Box p={2} flex={1} overflow="auto">
          <List>
            {navItems.map((item) => {
              const isActive = item.path && location.pathname === item.path;

              return (
                <Box key={item.label}>
                  <ListItemButton
                    onClick={() =>
                      item.submenu
                        ? toggleSubmenu(item.label)
                        : handleNavigation(item.path)
                    }
                    sx={{
                      borderRadius: 2,
                      mb: 0.5,
                      backgroundColor: isActive
                        ? "rgba(20,90,67,0.12)"
                        : "transparent",
                      "&:hover": {
                        backgroundColor: "rgba(20,90,67,0.08)",
                      },
                    }}
                  >
                    <Box mr={1.5} color={isActive ? "#145a43" : "inherit"}>
                      {item.icon}
                    </Box>
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontWeight: isActive ? 700 : 500,
                        color: isActive ? "#145a43" : "inherit",
                      }}
                    />
                    {item.submenu &&
                      (openSubmenu[item.label] ? (
                        <ChevronUp size={18} />
                      ) : (
                        <ChevronDown size={18} />
                      ))}
                  </ListItemButton>

                  {/* Submenu for Categories */}
                  {item.submenu && (
                    <Collapse in={openSubmenu[item.label]}>
                      <Box
                        sx={{
                          maxHeight: ITEM_HEIGHT * VISIBLE_ITEMS,
                          overflowY: "auto",
                        }}
                      >
                        <List disablePadding>
                          {item.submenu.map((sub) => (
                            <ListItemButton
                              key={sub}
                              sx={{
                                pl: 5,
                                height: ITEM_HEIGHT,
                              }}
                            >
                              <ListItemText
                                primary={sub}
                                primaryTypographyProps={{ fontSize: "0.9rem" }}
                              />
                            </ListItemButton>
                          ))}
                        </List>
                      </Box>
                    </Collapse>
                  )}
                </Box>
              );
            })}
          </List>
          <Divider />
        </Box>

        {/* profile and logout */}
        {user ? (
          <Box p={2} sx={{ mb: 3 }}>
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar
                sx={{
                  width: 48,
                  height: 48,
                  bgcolor: userData?.role === "seller" ? "#F57C00" : "#1976d2",
                  fontWeight: "bold",
                }}
              >
                {getUserInitials()}
              </Avatar>
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  {userData?.fullName || user.email?.split("@")[0]}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
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
              </Box>
            </Box>

            <Box mt={2} display="flex" gap={1} flexDirection="column">
              <Button
                fullWidth
                variant="outlined"
                startIcon={<User size={16} />}
                onClick={handleProfileNavigation}
                size="small"
                sx={{
                  borderRadius: "20px",
                  textTransform: "none",
                  borderColor: "#145a43",
                  color: "#145a43",
                  "&:hover": {
                    borderColor: "#0b3d2e",
                    backgroundColor: "rgba(20,90,67,0.04)",
                  },
                }}
              >
                Profile
              </Button>
              <Button
                fullWidth
                variant="contained"
                startIcon={<LogOut size={16} />}
                onClick={handleLogout}
                size="small"
                sx={{
                  borderRadius: "20px",
                  textTransform: "none",
                  backgroundColor: "#dc3545",
                  "&:hover": {
                    backgroundColor: "#c82333",
                  },
                }}
              >
                Logout
              </Button>
            </Box>
          </Box>
        ) : (
          /* Login/Register Section - Show when not logged in */
          <Box p={2} bgcolor="white" boxShadow="0 2px 4px rgba(0,0,0,0.1)">
            <Typography variant="h6" fontWeight="bold" color="#145a43" mb={1}>
              Welcome!
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Sign in to access your account
            </Typography>
            <Button
              fullWidth
              startIcon={<User size={18} />}
              onClick={() => handleNavigation("/login")}
              sx={{
                borderRadius: "24px",
                textTransform: "none",
                fontWeight: 600,
                background: "linear-gradient(135deg, #0b3d2e, #145a43)",
                color: "#fff",
                py: 1.2,
              }}
            >
              Login / Register
            </Button>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default MobileDrawer;
