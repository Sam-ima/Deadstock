import { Stack, TextField, Button, Typography } from "@mui/material";
import {toast} from "react-toastify";

const ForgotPassword = ({ onBack }) => {
  const handleSendLink = () => {
    toast.success("Demo: Password reset link sent to your email 📧");
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h5" fontWeight={700}>
        Forgot Password
      </Typography>

      <Typography variant="body2" color="text.secondary">
        Enter your email. We’ll send you a reset link.
      </Typography>

      <TextField label="Email Address" type="email" fullWidth />

      <Button variant="contained" onClick={handleSendLink}>
        Send Reset Link
      </Button>

      <Button variant="text" onClick={onBack}>
        Back to Login
      </Button>
    </Stack>
  );
};

export default ForgotPassword;
