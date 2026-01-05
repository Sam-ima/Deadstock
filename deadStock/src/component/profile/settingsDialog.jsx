import {
  Dialog,
  DialogTitle,
  DialogContent,
  Switch,
  Box,
  Typography,
} from "@mui/material";

const SettingsDialog = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Settings</DialogTitle>

      <DialogContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            py: 1,
          }}
        >
          <Typography>Dark Mode</Typography>
          <Switch defaultChecked />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            py: 1,
          }}
        >
          <Typography>Notifications</Typography>
          <Switch />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
