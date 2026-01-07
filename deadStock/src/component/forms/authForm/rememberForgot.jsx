import { Box, Typography, Checkbox, FormControlLabel } from "@mui/material";

const RememberForgot = ({ rememberMe, setRememberMe }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <FormControlLabel
        control={
          <Checkbox
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
        }
        label="Remember me"
      />

      <Typography
        variant="body2"
        sx={{
          cursor: "pointer",
          color: "#EF6C00",
          fontWeight: 600,
          "&:hover": { textDecoration: "underline" },
        }}
      >
        Forgot password?
      </Typography>
    </Box>
  );
};

export default RememberForgot;
