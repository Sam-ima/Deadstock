import { TextField, Button, Stack, Typography } from "@mui/material";

export const AuthForm = ({ mode, setMode, role }) => {
  return (
    <Stack spacing={2}>
      {mode === "signup" && <TextField label="Full Name" fullWidth />}

      <TextField label="Email Address" type="email" fullWidth />
      <TextField label="Password" type="password" fullWidth />

      {mode === "signup" && (
        <TextField label="Confirm Password" type="password" fullWidth />
      )}

      <Button
        size="large"
        sx={{
          mt: 1,
          bgcolor: role === "buyer" ? "#2E7D32" : "#EF6C00",
          color: "#fff",
          borderRadius: 2,
          "&:hover": {
            bgcolor: role === "buyer" ? "#1B5E20" : "#E65100",
          },
        }}
      >
        {mode === "login" ? "Login" : "Create Account"}
      </Button>

      <Typography variant="body2" textAlign="center">
        {mode === "login"
          ? "Don't have an account?"
          : "Already have an account?"}
        <Button
          variant="text"
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          sx={{ textTransform: "none", ml: 1 }}
        >
          {mode === "login" ? "Sign Up" : "Login"}
        </Button>
      </Typography>
    </Stack>
  );
};
