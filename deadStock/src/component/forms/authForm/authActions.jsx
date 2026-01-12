import { Button, Typography } from "@mui/material";
import { Google } from "@mui/icons-material";

const AuthActions = ({
  isSignup,
  setMode,
  role,
  onSubmit,
  onGoogle,
  loading,
}) => {
  return (
    <>
      <Button
        size="large"
        fullWidth
        disabled={loading}
        onClick={onSubmit}   // ✅ FIX
        sx={{
          mt: 1,
          py: 1.4,
          fontWeight: 700,
          borderRadius: 3,
          textTransform: "none",
          background: "#2E7D32",
          color: "#fff",
          "&:hover": {
            transform: "translateY(-1px)",
          },
          transition: "0.3s",
        }}
      >
        {isSignup ? "Create Account" : "Login"}
      </Button>

      {/* <Button
        variant="outlined"
        startIcon={<Google />}
        fullWidth
        disabled={loading}
        onClick={onGoogle}   // ✅ FIX
        sx={{
          py: 1.2,
          borderRadius: 3,
          textTransform: "none",
          fontWeight: 600,
        }}
      >
        Continue with Google
      </Button> */}

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
