import { Alert, Typography, Box } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { colors } from "./Constants";

const UserEmailDisplay = ({ user }) => {
  if (!user) {
    return (
      <Alert
        severity="warning"
        sx={{
          mb: 3,
          borderRadius: 2,
        }}
      >
        <Typography fontWeight={600}>
          Please login to complete your purchase
        </Typography>
      </Alert>
    );
  }

  return (
    <Alert
      severity="info"
      icon={<EmailIcon />}
      sx={{
        mb: 3,
        borderRadius: 2,
        bgcolor: `${colors.primary}10`,
        border: `1px solid ${colors.primary}30`,
      }}
    >
      <Typography fontWeight={600}>
        Logged in as:{" "}
        <Box component="span" sx={{ color: colors.primary }}>
          {user.email}
        </Box>
      </Typography>
      {user?.role === "seller" && (
        <Typography variant="body2" sx={{ mt: 0.5 }}>
          Business account • Bulk pricing applied where applicable
        </Typography>
      )}
    </Alert>
  );
};

export default UserEmailDisplay;
