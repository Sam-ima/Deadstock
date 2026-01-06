import { Stack, TextField, Button, Typography } from "@mui/material";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const handleReset = () => {
    toast.success("Demo: Password reset successful 🎉");
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h5" fontWeight={700}>
        Reset Password
      </Typography>

      <TextField label="New Password" type="password" fullWidth />
      <TextField label="Confirm Password" type="password" fullWidth />

      <Button variant="contained" onClick={handleReset}>
        Reset Password
      </Button>
    </Stack>
  );
};

export default ResetPassword;
