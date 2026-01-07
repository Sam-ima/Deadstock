import { Button, Typography } from "@mui/material";
import { Google } from "@mui/icons-material";

const AuthActions = ({ isSignup, setMode, role, accent }) => {
  return (
    <>
      <Button
        size="large"
        sx={{
          mt: 1,
          py: 1.4,
          fontWeight: 700,
          borderRadius: 3,
          textTransform: "none",
          background: accent,
          color: "#fff",
          boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
          "&:hover": {
            transform: "translateY(-1px)",
            boxShadow: "0 16px 40px rgba(0,0,0,0.35)",
          },
          transition: "0.3s",
        }}
      >
        {isSignup ? "Create Account" : "Login"}
      </Button>

      <Button
        variant="outlined"
        startIcon={<Google />}
        sx={{
          py: 1.2,
          borderRadius: 3,
          textTransform: "none",
          fontWeight: 600,
        }}
      >
        Continue with Google
      </Button>

      <Typography variant="body2" textAlign="center" color="text.secondary">
        {isSignup ? "Already have an account?" : "New here?"}
        <Button
          variant="text"
          onClick={() => setMode(isSignup ? "login" : "signup")}
          sx={{
            ml: 1,
            textTransform: "none",
            fontWeight: 700,
            color: role === "buyer" ? "#2E7D32" : "#EF6C00",
          }}
        >
          {isSignup ? "Login" : "Sign Up"}
        </Button>
      </Typography>
    </>
  );
};

export default AuthActions;
