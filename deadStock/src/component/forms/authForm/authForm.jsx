import { useState } from "react";
import { Stack } from "@mui/material";
import { signupWithEmail, loginWithEmail, loginWithGoogle } from "../../../context/authContext/authServices";
import { toast } from "react-toastify";

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

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    shopName: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    panVat: "",
  });

  const showBusinessFields =
    isSignup &&
    (role === "seller" || (role === "buyer" && buyerType === "business"));

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (isSignup) {
        if (form.password !== form.confirmPassword) {
          toast.error("Passwords do not match");
          return;
        }

        await signupWithEmail({
          email: form.email,
          password: form.password,
          fullName: form.fullName,
          role: role === "buyer" ? buyerType : role,
          shopName: showBusinessFields ? form.shopName : null,
          phone: showBusinessFields ? form.phone : null,
          address: showBusinessFields ? form.address : null,
          city: showBusinessFields ? form.city : null,
          country: showBusinessFields ? form.country : null,
          panVat: showBusinessFields ? form.panVat : null,
        });

        toast.success("Account created successfully 🎉");
      } else {
        await loginWithEmail(form.email, form.password);
        toast.success("Logged in successfully");
      }
    } catch (err) {
      toast.error(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      await loginWithGoogle(role === "buyer" ? buyerType : role);
    } catch (err) {
      toast.error("Google login failed");
    }
  };

  return (
    <Stack spacing={2}>
      <AuthHeader isSignup={isSignup} />

      <AuthFields
        isSignup={isSignup}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        inputStyle={inputStyle}
        form={form}
        onChange={handleChange}
      />

      {isSignup && role === "buyer" && (
        <BuyerTypeSelector buyerType={buyerType} setBuyerType={setBuyerType} />
      )}

      {!isSignup && (
        <RememberForgot rememberMe={rememberMe} setRememberMe={setRememberMe} />
      )}

      {showBusinessFields && (
        <SellerFields inputStyle={inputStyle} form={form} onChange={handleChange} />
      )}

      <AuthActions
        isSignup={isSignup}
        loading={loading}
        onSubmit={handleSubmit}
        onGoogle={handleGoogle}
        setMode={setMode}
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
