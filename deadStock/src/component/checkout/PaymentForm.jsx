import { Box, Typography, TextField } from "@mui/material";

export default function PaymentForm() {
  return (
    <Box>
      <Typography variant="h5" fontWeight={700}>
        Payment Details
      </Typography>

      <TextField
        fullWidth
        label="Card Number"
        defaultValue="4242 4242 4242 4242"
        margin="normal"
      />

      <Box display="flex" gap={2}>
        <TextField label="MM/YY" fullWidth />
        <TextField label="CVC" fullWidth />
      </Box>
    </Box>
  );
}
