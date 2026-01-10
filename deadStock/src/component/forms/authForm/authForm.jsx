import { useState } from "react";
import { Stack } from "@mui/material";
import {
  signupWithEmail,
  loginWithEmail,
  loginWithGoogle,
  resetPasswordWithEmail, 
} from "../../../context/authContext/authServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";

import AuthHeader from "./formHeader";
import AuthFields from "./authFields";
import RememberForgot from "./rememberForgot";
import SellerFields from "./sellerFields";
import AuthActions from "./authActions";
import BuyerTypeSelector from "./buyerTypeSelect";

export const AuthForm = ({ mode, setMode, role }) => {
  const isSignup = mode === "signup";
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

  /* ================= PASSWORD RESET ================= */

  const handleForgotPassword = async () => {
    if (!form.email) {
      toast.error("Please enter your email first");
      return;
    }

    try {
      await resetPasswordWithEmail(form.email);
      toast.success(
        "Password reset link sent to your email 📧 (check spam too)"
      );
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        toast.error("No account found with this email");
      } else if (err.code === "auth/invalid-email") {
        toast.error("Invalid email address");
      } else {
        toast.error("Failed to send reset email");
      }
    }
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

          // ✅ role NEVER changes for buyer
          role: role,

          // ✅ buyerType only for buyer
          buyerType: role === "buyer" ? buyerType : null,

          // ✅ business fields allowed for:
          // 1. seller
          // 2. buyer + business
          shopName: showBusinessFields ? form.shopName : null,
          phone: showBusinessFields ? form.phone : null,
          address: showBusinessFields ? form.address : null,
          city: showBusinessFields ? form.city : null,
          country: showBusinessFields ? form.country : null,
          panVat: showBusinessFields ? form.panVat : null,
        });

        toast.success("Account created successfully 🎉");
        setMode("login");
      } else {
        const cred = await loginWithEmail(form.email, form.password);

        const snap = await getDoc(doc(db, "users", cred.user.uid));

        if (!snap.exists()) {
          toast.error("User data not found");
          return;
        }

        const userData = snap.data();

        toast.success("Logged in successfully");

        if (userData.role === "seller") {
          navigate("/sellerProfile");
        } else {
          navigate("/profile");
        }
      }
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        toast.error("Email already in use");
      } else {
        toast.error("Authentication failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      await loginWithGoogle(role === "buyer" ? buyerType : role);
    } catch {
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
        showConfirmPassword={showConfirmPassword}
        setShowConfirmPassword={setShowConfirmPassword}
        inputStyle={inputStyle}
        form={form}
        onChange={handleChange}
      />

      {isSignup && role === "buyer" && (
        <BuyerTypeSelector buyerType={buyerType} setBuyerType={setBuyerType} />
      )}

      {!isSignup && (
        <RememberForgot
          rememberMe={rememberMe}
          setRememberMe={setRememberMe}
          onForgotPassword={handleForgotPassword} // ✅ added
        />
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
