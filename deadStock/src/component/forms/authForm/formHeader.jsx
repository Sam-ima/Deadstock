import { Stack, Typography, Divider } from "@mui/material";

const FormHeader = ({ isSignup }) => {
  return (
    <>
      <Stack spacing={0.5} textAlign="center">
        <Typography variant="h5" fontWeight={700}>
          {isSignup ? "Create Account" : "Welcome Back"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {isSignup ? "Join our marketplace today" : "Login to continue"}
        </Typography>
      </Stack>
      <Divider />
    </>
  );
};

export default FormHeader;
