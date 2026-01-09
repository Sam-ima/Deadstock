import { useState } from "react";
import { Stack } from "@mui/material";
import AuthHeader from "./formHeader";
import AuthFields from "./authFields";
import RememberForgot from "./rememberForgot";
import SellerFields from "./sellerFields";
import AuthActions from "./authActions";
import BuyerTypeSelector from "./buyerTypeSelect";

export const AuthForm = ({ mode, setMode, role }) => {
  const isSignup = mode === "signup";

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [buyerType, setBuyerType] = useState("customer");

  const showBusinessFields =
    isSignup &&
    (role === "seller" || (role === "buyer" && buyerType === "business"));

  return (
    <Stack spacing={2}>
      <AuthHeader isSignup={isSignup} />

      <AuthFields
        isSignup={isSignup}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        inputStyle={inputStyle}
      />

      {/* Buyer choice */}
      {isSignup && role === "buyer" && (
        <BuyerTypeSelector buyerType={buyerType} setBuyerType={setBuyerType} />
      )}

      {!isSignup && (
        <RememberForgot rememberMe={rememberMe} setRememberMe={setRememberMe} />
      )}

      {/* Seller OR buyer-business */}
      {showBusinessFields && <SellerFields inputStyle={inputStyle} />}

      <AuthActions
        isSignup={isSignup}
        setMode={setMode}
        role={role}
        buyerType={buyerType}
      />
    </Stack>
  );
};
