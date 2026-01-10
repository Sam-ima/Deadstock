import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const ProfileInfo = () => {
  return (
    <>
      {/* Personal Info */}
      <Typography variant="caption" color="text.secondary" mt={4}>
        PERSONAL INFO
      </Typography>

      <List sx={{ bgcolor: "#F9FAFB", borderRadius: 3, mt: 1 }}>
        <ListItem button>
          <ListItemIcon>
            <EmailIcon color="warning" />
          </ListItemIcon>
          <ListItemText
            primary="Email"
            secondary="j.smith@example.com"
          />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <PhoneIcon color="warning" />
          </ListItemIcon>
          <ListItemText
            primary="Phone"
            secondary="+1 (555) 000-0000"
          />
        </ListItem>
      </List>

      {/* Shipping */}
      <Typography variant="caption" color="text.secondary" mt={3}>
        SHIPPING
      </Typography>

      <List sx={{ bgcolor: "#F9FAFB", borderRadius: 3, mt: 1 }}>
        <ListItem button>
          <ListItemIcon>
            <LocationOnIcon color="warning" />
          </ListItemIcon>
          <ListItemText
            primary="Primary Address"
            secondary="123 Sneaker St, Apt 4B, New York"
          />
        </ListItem>
      </List>
    </>
  );
};

export default ProfileInfo;
