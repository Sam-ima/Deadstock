import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from "@mui/material";

const logoutDialog = ({ open, onClose }) => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Are you sure you want to logout?</DialogTitle>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="error" onClick={handleLogout}>
          Logout
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default logoutDialog;
