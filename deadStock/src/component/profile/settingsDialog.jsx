import {
  Dialog,
  DialogTitle,
  DialogContent,
  FormControlLabel,
  Switch,
  Box,
  Typography,
} from "@mui/material";

const SettingsDialog = ({ open, onClose, toggleTheme, mode }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Settings</DialogTitle>

      <DialogContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={1}
        >
          <Typography>Dark Mode</Typography>
          <Switch
            checked={mode === "dark"}
            onChange={toggleTheme}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
