import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LockIcon from "@mui/icons-material/Lock";

const SettingsList = () => {
  return (
    <Box mt={4}>
      <List sx={{ bgcolor: "#F9FAFB", borderRadius: 3 }}>
        <ListItem>
          <ListItemIcon><CreditCardIcon color="warning" /></ListItemIcon>
          <ListItemText primary="Payment Methods" secondary="Visa ending in 4242" />
        </ListItem>

        <ListItem>
          <ListItemIcon><LocalShippingIcon color="success" /></ListItemIcon>
          <ListItemText primary="Shipping Addresses" secondary="2 addresses saved" />
        </ListItem>

        <ListItem>
          <ListItemIcon><NotificationsIcon color="warning" /></ListItemIcon>
          <ListItemText primary="Notifications" secondary="Order updates" />
          <Switch defaultChecked />
        </ListItem>

        <ListItem>
          <ListItemIcon><LockIcon color="primary" /></ListItemIcon>
          <ListItemText primary="Privacy & Security" secondary="Password, 2FA" />
        </ListItem>
      </List>
    </Box>
  );
};

export default SettingsList;
