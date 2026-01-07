import { Box, TextField, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const AuthFields = ({
  isSignup,
  showPassword,
  setShowPassword,
  inputStyle,
}) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: 2,
      }}
    >
      {isSignup && <TextField label="Full Name" fullWidth sx={inputStyle} />}

      <TextField label="Email Address" type="email" fullWidth sx={inputStyle} />

      <TextField
        label="Password"
        type={showPassword ? "text" : "password"}
        fullWidth
        sx={inputStyle}
        InputProps={{
          endAdornment: (
            <IconButton onClick={() => setShowPassword((p) => !p)}>
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
  );
};

export default AuthFields;
