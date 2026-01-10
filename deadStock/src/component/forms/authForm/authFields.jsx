import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const AuthFields = ({
  isSignup,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
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

      {/* PASSWORD */}
      <TextField
        label="Password"
        name="password"
        value={form.password}
        onChange={onChange}
        type={showPassword ? "text" : "password"}
        fullWidth
        sx={inputStyle}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword((prev) => !prev)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* CONFIRM PASSWORD */}
      {isSignup && (
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={onChange}
          type={showConfirmPassword ? "text" : "password"}
          fullWidth
          sx={inputStyle}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() =>
                    setShowConfirmPassword((prev) => !prev)
                  }
                  edge="end"
                >
                  {showConfirmPassword ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      )}
    </>
  );
};

export default AuthFields;
