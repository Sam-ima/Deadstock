import { Box, TextField, Typography } from "@mui/material";

export default function ContactForm({ user }) {
  return (
    <Box>
      <Typography variant="h5" fontWeight={700}>
        Contact Information
      </Typography>

      <TextField
        fullWidth
        label="Email"
        defaultValue={user?.email || ""}
        margin="normal"
      />
    </Box>
  );
}
