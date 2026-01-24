import { Alert, Typography, Box } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { colors } from "./Constants";

export default function UserEmailBanner({ user }) {
  if (!user) {
    return (
      <Alert severity="warning" sx={{ mb: 3 }}>
        Please login to continue checkout
      </Alert>
    );
  }

  return (
    <Alert
      icon={<EmailIcon />}
      sx={{
        mb: 3,
        bgcolor: `${colors.primary}10`,
        border: `1px solid ${colors.primary}30`,
      }}
    >
      <Typography fontWeight={600}>
        Logged in as{" "}
        <Box component="span" sx={{ color: colors.primary }}>
          {user.email}
        </Box>
      </Typography>
    </Alert>
  );
}
