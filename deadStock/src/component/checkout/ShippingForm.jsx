import { Box, TextField, Typography } from "@mui/material";

export default function ShippingForm({ user }) {
  return (
    <Box>
      <Typography variant="h5" fontWeight={700}>
        Shipping Details
      </Typography>

      <TextField
        fullWidth
        label="Full Name"
        defaultValue={user?.displayName || ""}
        margin="normal"
      />

      <TextField fullWidth label="Address" margin="normal" />

      <Box display="flex" gap={2}>
        <TextField fullWidth label="City" />
        <TextField fullWidth label="ZIP Code" />
      </Box>
    </Box>
  );
}
