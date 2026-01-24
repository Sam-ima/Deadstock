import {
  Box,
  Paper,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { colors } from "./Constants";

export default function OrderSummary({ items, totals, loading, onPay, user }) {
  return (
    <Paper sx={{ p: 3, borderRadius: 4 }}>
      <Typography variant="h5" fontWeight={700}>
        Order Summary
      </Typography>

      <Box my={3}>
        {items.map((item) => (
          <Box key={item.id} mb={2}>
            <Typography fontWeight={600}>
              {item.name} × {item.quantity}
            </Typography>
            <Typography variant="caption">
              ${(item.unitPrice * item.quantity).toFixed(2)}
            </Typography>
          </Box>
        ))}
      </Box>

      <Typography>Subtotal: ${totals.subtotal.toFixed(2)}</Typography>
      <Typography>Tax: ${totals.tax.toFixed(2)}</Typography>

      <Typography fontWeight={800} mt={1}>
        Total: ${totals.total.toFixed(2)}
      </Typography>

      <Button
        fullWidth
        disabled={loading || !user}
        onClick={onPay}
        startIcon={<LockIcon />}
        sx={{
          mt: 3,
          background: colors.accentGradient,
          color: colors.textLight,
        }}
      >
        {loading ? <CircularProgress size={22} /> : "Complete Payment"}
      </Button>
    </Paper>
  );
}
