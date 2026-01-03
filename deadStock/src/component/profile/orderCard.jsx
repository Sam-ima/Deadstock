import { Box, Typography, Chip } from "@mui/material";

const statusColor = {
  Delivered: "success",
  Shipped: "info",
  Processing: "warning",
};

const OrderCard = ({ title, size, date, price, status }) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={2}
    >
      <Box>
        <Typography fontWeight={600}>{title}</Typography>
        <Typography variant="body2" color="text.secondary">
          Size: {size} • {date}
        </Typography>
        <Chip
          size="small"
          label={status}
          color={statusColor[status]}
          sx={{ mt: 1 }}
        />
      </Box>

      <Typography fontWeight={600}>${price}</Typography>
    </Box>
  );
};

export default OrderCard;
