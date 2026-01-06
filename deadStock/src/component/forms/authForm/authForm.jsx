import { useState } from "react";
import {
  TextField,
  Button,
  Stack,
  Typography,
  Divider,
  Box,
  IconButton,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Visibility, VisibilityOff, Google } from "@mui/icons-material";

export const AuthForm = ({ mode, setMode, role }) => {
  const isSignup = mode === "signup";
  const isSellerSignup = isSignup && role === "seller";

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const accent =
    role === "buyer"
      ? "linear-gradient(135deg, #2E7D32, #2E7D32)"
      : "linear-gradient(135deg, #E65100, #FF9800)";

  return (
    <Stack spacing={2}>
      {/* ===== TITLE ===== */}
      <Stack spacing={0.5} textAlign="center">
        <Typography variant="h5" fontWeight={700}>
          {isSignup ? "Create Account" : "Welcome Back"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {isSignup ? "Join our marketplace today" : "Login to continue"}
        </Typography>
      </Stack>

      <Divider />

      {/* ===== FORM ===== */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: isSellerSignup ? "1fr 1fr" : "1fr",
          },
          gap: 2,
        }}
      >
        {isSignup && <TextField label="Full Name" fullWidth sx={inputStyle} />}

        <TextField
          label="Email Address"
          type="email"
          fullWidth
          sx={inputStyle}
        />

        {/* Password */}
        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          fullWidth
          sx={inputStyle}
          InputProps={{
            endAdornment: (
              <IconButton onClick={() => setShowPassword((p) => !p)} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            ),
          }}
        />

        {isSignup && (
          <TextField
            label="Confirm Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            sx={inputStyle}
          />
        )}
      </Box>
      {/* remember me  */}
      <Box sx={{display:"flex",justifyContent:"space-between"}}>
        {!isSignup && (
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
            }
            label="Remember me"
          />
        )}

        {/* ===== FORGOT PASSWORD ===== */}
        {!isSignup && (
          <Typography
            variant="body2"
            textAlign="right"
            sx={{
              cursor: "pointer",
              color: "#EF6C00",
              fontWeight: 600,
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Forgot password?
          </Typography>
        )}
      </Box>

      {/* ===== SELLER INFO ===== */}
      {isSellerSignup && (
        <>
          <Divider sx={{ my: 1 }}>Business Details</Divider>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "1fr 1fr",
              },
              gap: 2,
            }}
          >
            <TextField label="Store / Business Name" sx={inputStyle} />
            <TextField label="Phone Number" type="tel" sx={inputStyle} />
            <TextField
              label="Business Address"
              sx={{ gridColumn: "1 / -1", ...inputStyle }}
            />
            <TextField label="City" sx={inputStyle} />
            <TextField label="Country" sx={inputStyle} />
            <TextField
              label="PAN / VAT Number"
              sx={{ gridColumn: "1 / -1", ...inputStyle }}
            />
          </Box>
        </>
      )}

      {/* ===== SUBMIT ===== */}
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

      {/* ===== GOOGLE AUTH ===== */}
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

      {/* ===== TOGGLE ===== */}
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
    </Stack>
  );
};

const inputStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.95)",
    "& fieldset": { borderColor: "#ddd" },
    "&:hover fieldset": { borderColor: "#aaa" },
    "&.Mui-focused fieldset": {
      borderColor: "#FF9800",
      boxShadow: "0 0 0 3px rgba(255,152,0,0.2)",
    },
  },
};
