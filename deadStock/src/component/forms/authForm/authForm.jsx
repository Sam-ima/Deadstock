import { useState } from "react";
import { Stack } from "@mui/material";
import AuthHeader from "./formHeader";
import AuthFields from "./authFields";
import RememberForgot from "./rememberForgot";
import SellerFields from "./sellerFields";
import AuthActions from "./authActions";

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
      <AuthHeader isSignup={isSignup} />

      <AuthFields
        isSignup={isSignup}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        inputStyle={inputStyle}
      />

      {!isSignup && (
        <RememberForgot
          rememberMe={rememberMe}
          setRememberMe={setRememberMe}
        />
      )}

      {isSellerSignup && <SellerFields inputStyle={inputStyle} />}

      <AuthActions
        isSignup={isSignup}
        setMode={setMode}
        role={role}
        accent={accent}
      />
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
