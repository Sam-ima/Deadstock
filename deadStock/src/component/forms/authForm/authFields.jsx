import { Box, TextField, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const AuthFields = ({
  isSignup,
  showPassword,
  setShowPassword,
  inputStyle,
  form,
  onChange,
}) => {
  return (
    <>
      {isSignup && (
        <TextField
          label="Full Name"
          name="fullName"
          value={form.fullName}
          onChange={onChange}
          fullWidth
          sx={inputStyle}
        />
      )}

      <TextField
        label="Email Address"
        name="email"
        value={form.email}
        onChange={onChange}
        type="email"
        fullWidth
        sx={inputStyle}
      />

      <TextField
        label="Password"
        name="password"
        value={form.password}
        onChange={onChange}
        type={showPassword ? "text" : "password"}
        fullWidth
        sx={inputStyle}
      />

      {isSignup && (
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={onChange}
          type={showPassword ? "text" : "password"}
          fullWidth
          sx={inputStyle}
        />
      )}
    </>
  );
};


export default AuthFields;
