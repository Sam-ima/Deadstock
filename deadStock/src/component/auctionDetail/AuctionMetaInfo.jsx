import { Box, Typography, Stack } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import InventoryIcon from "@mui/icons-material/Inventory";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import PaymentIcon from "@mui/icons-material/Payment";

/**
 * Safely converts Firestore Timestamp or string/Date to a JS Date.
 */
const toJsDate = (value) => {
  if (!value) return null;
  if (typeof value.toDate === "function") return value.toDate();
  return new Date(value);
};

const formatDateTime = (value) => {
  const date = toJsDate(value);
  if (!date || isNaN(date)) return "N/A";
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const MetaRow = ({ icon, label, value, highlight }) => (
  <Stack direction="row" spacing={1.5} alignItems="flex-start">
    <Box sx={{ color: highlight ? "error.main" : "text.secondary", mt: 0.2, flexShrink: 0 }}>
      {icon}
    </Box>
    <Box>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ textTransform: "uppercase", letterSpacing: 0.5, fontSize: "0.68rem", display: "block" }}
      >
        {label}
      </Typography>
      <Typography
        variant="body2"
        fontWeight={highlight ? 600 : 400}
        color={highlight ? "error.main" : "text.primary"}
      >
        {value}
      </Typography>
    </Box>
  </Stack>
);

/**
 * Reads from product root:
 *   product.startTime         → Firestore Timestamp
 *   product.endTime           → Firestore Timestamp
 *   product.paymentDeadline   → null | Timestamp
 *   product.floorPrice        → number
 *   product.stock             → number
 *   product.availableStock    → number
 */
const AuctionMetaInfo = ({ product }) => {
  const stock = product?.stock ?? product?.availableStock ?? 0;

  return (
    <Box>
      <Typography
        variant="body2"
        fontWeight={600}
        mb={1.5}
        sx={{
          textTransform: "uppercase",
          letterSpacing: 0.5,
          fontSize: "0.75rem",
          color: "text.secondary",
        }}
      >
        Auction Details
      </Typography>

      <Stack spacing={1.5}>
        <MetaRow
          icon={<EventIcon fontSize="small" />}
          label="Start Time"
          value={formatDateTime(product?.startTime)}
        />
        <MetaRow
          icon={<EventAvailableIcon fontSize="small" />}
          label="End Time"
          value={formatDateTime(product?.endTime)}
          highlight
        />
        {product?.paymentDeadline && (
          <MetaRow
            icon={<PaymentIcon fontSize="small" />}
            label="Payment Deadline"
            value={formatDateTime(product.paymentDeadline)}
          />
        )}
        {product?.floorPrice != null && (
          <MetaRow
            icon={<PriceCheckIcon fontSize="small" />}
            label="Floor / Reserve Price"
            value={`Rs.${product.floorPrice}`}
          />
        )}
        <MetaRow
          icon={<InventoryIcon fontSize="small" />}
          label="Stock Available"
          value={`${stock} unit${stock !== 1 ? "s" : ""}`}
        />
      </Stack>
    </Box>
  );
};

export default AuctionMetaInfo;