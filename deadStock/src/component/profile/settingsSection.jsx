import {
  Box,
  Paper,
  Typography,
  Switch,
  Divider,
  Button,
} from "@mui/material";
import { useState } from "react";

const settingsSection = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Paper sx={{ p: 2, mt: 4 }}>
      <Typography variant="h6" mb={2}>
        Settings
      </Typography>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography>Notifications</Typography>
        <Switch
          checked={notifications}
          onChange={() => setNotifications(!notifications)}
        />
      </Box>

      <Divider />

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        my={2}
      >
        <Typography>Dark Mode</Typography>
        <Switch
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
        />
      </Box>

      <Divider />

      <Button
        fullWidth
        variant="outlined"
        color="error"
        sx={{ mt: 2 }}
        onClick={() => alert("Logged out")}
      >
        Logout
      </Button>
    </Paper>
  );
};

export default settingsSection;
