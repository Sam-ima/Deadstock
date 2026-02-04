import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
  TextField,
  Button,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import StoreIcon from "@mui/icons-material/Store";
import BadgeIcon from "@mui/icons-material/Badge";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

import { toast } from "react-toastify";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const ProfileInfo = ({ buyer }) => {
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingBusiness, setIsEditingBusiness] = useState(false);
  const [isEditingShipping, setIsEditingShipping] = useState(false);
  const [formData, setFormData] = useState({ ...buyer });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  if (!buyer) return null;

  const isBusiness =
    buyer.role === "seller" ||
    (buyer.role === "buyer" && buyer.buyerType === "business");
   const isSeller = buyer.role === "seller";
  const sectionStyle = {
    p: 2,
    mb: 3,
    borderRadius: 3,
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 1,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (isBusiness && buyer.business && name.startsWith("business.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        business: {
          ...prev.business,
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async (section) => {
    try {
      await updateDoc(doc(db, "users", buyer.uid), formData);

      // Update the buyer object directly so UI reflects changes immediately
      Object.assign(buyer, formData);

      if (section === "personal") setIsEditingPersonal(false);
      if (section === "business") setIsEditingBusiness(false);
      if (section === "shipping") setIsEditingShipping(false);

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile!");
    }
  };

  const handleCancel = (section) => {
    setFormData({ ...buyer });
    if (section === "personal") setIsEditingPersonal(false);
    if (section === "business") setIsEditingBusiness(false);
    if (section === "shipping") setIsEditingShipping(false);
  };

  return (
    <Box sx={{ mt: 3, mb: 5 }}>
      {/* Personal Info */}
      <Paper sx={{ ...sectionStyle, p: isMobile ? 2 : 3 }}>
        {/* Header */}
        <Box
          sx={{
            ...headerStyle,
            flexDirection: isMobile ? "column" : "row",
            gap: 1,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "#c15c3a",
              fontFamily: "Inter",
              fontWeight: 600,
            }}
          >
            Personal Info
          </Typography>

          <IconButton
            size="small"
            color={isEditingPersonal ? "error" : "primary"}
            onClick={() =>
              isEditingPersonal
                ? handleCancel("personal")
                : setIsEditingPersonal(true)
            }
          >
            {isEditingPersonal ? <CancelIcon /> : <EditIcon />}
          </IconButton>
        </Box>

        <Divider sx={{ my: 1.5 }} />

        <List disablePadding>
          <Stack spacing={1.5}>
            {/* Email */}
            <ListItem disableGutters>
              <ListItemIcon>
                <EmailIcon color="warning" />
              </ListItemIcon>

              {isEditingPersonal ? (
                <TextField
                  name="email"
                  label="Email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                />
              ) : (
                <ListItemText
                  primary="Email"
                  secondary={buyer.email || "Not Provided"}
                />
              )}
            </ListItem>

            {/* Phone */}
            <ListItem disableGutters>
              <ListItemIcon>
                <PhoneIcon color="warning" />
              </ListItemIcon>

              {isEditingPersonal ? (
                <TextField
                  name="phone"
                  label="Phone"
                  value={formData.phone || ""}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                />
              ) : (
                <ListItemText
                  primary="Phone"
                  secondary={buyer.phone || "Not Provided"}
                />
              )}
            </ListItem>

            {/* Seller-only fields */}
            {isSeller && (
              <>
                {/* Shop Name */}
                <ListItem disableGutters>
                  <ListItemIcon>
                    <StoreIcon color="warning" />
                  </ListItemIcon>

                  {isEditingPersonal ? (
                    <TextField
                      name="shopName"
                      label="Shop Name"
                      value={formData.shopName || ""}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                    />
                  ) : (
                    <ListItemText
                      primary="Shop Name"
                      secondary={buyer.shopName || "Not Provided"}
                    />
                  )}
                </ListItem>

                {/* PAN / VAT */}
                <ListItem disableGutters>
                  <ListItemIcon>
                    <BadgeIcon color="warning" />
                  </ListItemIcon>

                  {isEditingPersonal ? (
                    <TextField
                      name="panVat"
                      label="PAN / VAT"
                      value={formData.panVat || ""}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                    />
                  ) : (
                    <ListItemText
                      primary="PAN / VAT"
                      secondary={buyer.panVat || "Not Provided"}
                    />
                  )}
                </ListItem>
              </>
            )}

            {/* Save button */}
            {isEditingPersonal && (
              <Box sx={{ mt: 2, textAlign: "right" }}>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<SaveIcon />}
                  onClick={() => handleSave("personal")}
                >
                  Save Changes
                </Button>
              </Box>
            )}
          </Stack>
        </List>
      </Paper>

      {/* Business Info */}
      {isBusiness && buyer.business && (
        <Paper sx={sectionStyle}>
          <Box sx={headerStyle}>
            <Typography
              variant="h6"
              sx={{ color: "#c15c3a", fontFamily: "Inter" }}
            >
              Business Info
            </Typography>
            <IconButton
              size="small"
              color={isEditingBusiness ? "error" : "primary"}
              onClick={() =>
                isEditingBusiness
                  ? handleCancel("business")
                  : setIsEditingBusiness(true)
              }
            >
              {isEditingBusiness ? <CancelIcon /> : <EditIcon />}
            </IconButton>
          </Box>

          <Divider sx={{ mb: 1 }} />
          <List>
            {["shopName", "phone", "address", "city", "country", "panVat"].map(
              (field) => (
                <ListItem key={field}>
                  {isEditingBusiness ? (
                    <TextField
                      name={`business.${field}`}
                      label={field
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}
                      value={formData.business[field] || ""}
                      onChange={handleChange}
                      fullWidth
                    />
                  ) : (
                    <ListItemText
                      primary={field
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}
                      secondary={buyer.business[field]}
                    />
                  )}
                </ListItem>
              )
            )}

            {isEditingBusiness && (
              <Box sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<SaveIcon />}
                  onClick={() => handleSave("business")}
                >
                  Save
                </Button>
              </Box>
            )}
          </List>
        </Paper>
      )}

      {/* Shipping Info */}
      {buyer.address && (
        <Paper sx={sectionStyle}>
          <Box sx={headerStyle}>
            <Typography
              variant="h6"
              sx={{ color: "#c15c3a", fontFamily: "Inter" }}
            >
              Shipping Address
            </Typography>
            <IconButton
              size="small"
              color={isEditingShipping ? "error" : "primary"}
              onClick={() =>
                isEditingShipping
                  ? handleCancel("shipping")
                  : setIsEditingShipping(true)
              }
            >
              {isEditingShipping ? <CancelIcon /> : <EditIcon />}
            </IconButton>
          </Box>

          <Divider sx={{ mb: 1 }} />
          <List>
            {["address", "city", "country"].map((field) => (
              <ListItem key={field}>
                {isEditingShipping ? (
                  <TextField
                    name={field}
                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={formData[field] || ""}
                    onChange={handleChange}
                    fullWidth
                  />
                ) : (
                  <ListItemText
                    primary={field.charAt(0).toUpperCase() + field.slice(1)}
                    secondary={buyer[field]}
                  />
                )}
              </ListItem>
            ))}

            {isEditingShipping && (
              <Box sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<SaveIcon />}
                  onClick={() => handleSave("shipping")}
                >
                  Save
                </Button>
              </Box>
            )}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default ProfileInfo;
