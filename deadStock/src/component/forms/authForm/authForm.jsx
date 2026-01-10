import { useState } from "react";
import { Stack } from "@mui/material";
import {
  signupWithEmail,
  loginWithEmail,
  loginWithGoogle,
} from "../../../context/authContext/authServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase/firebase";

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

  const resetForm = () => {
    setForm({
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

    setShowPassword(false);
    setShowConfirmPassword(false);
    setBuyerType("customer");
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
        resetForm(); // ✅ reset form
        setMode("login"); // ✅ show login form
      } else {
        const cred = await loginWithEmail(form.email, form.password);

        // 🔥 fetch user data
        const userRef = doc(db, "users", cred.user.uid);
        const snap = await getDoc(userRef);

        if (!snap.exists()) {
          toast.error("User data not found");
          return;
        }

        const userData = snap.data();

        toast.success("Logged in successfully");

        // 🔀 role based navigation
        if (userData.role === "seller") {
          navigate("/sellerProfile");
        } else {
          navigate("/profile"); // buyer home
        }
      }
    } catch (err) {
      // Check Firebase error codes
      if (err.code === "auth/email-already-in-use") {
        toast.error("This email is already in use. Please try another.");
      } else {
        toast.error("Authentication failed"); // generic fallback
      }
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
        <RememberForgot rememberMe={rememberMe} setRememberMe={setRememberMe} />
      )}

      {showBusinessFields && (
        <SellerFields
          inputStyle={inputStyle}
          form={form}
          onChange={handleChange}
        />
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
