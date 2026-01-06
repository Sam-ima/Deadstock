import { Box, Typography, Chip } from "@mui/material";

const statusColor = {
  Delivered: "success",
  Shipped: "info",
  Processing: "warning",
};

const orderCard = ({ title, size, date, price, status }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 2,
        p: 1.5,
        borderRadius: 2,
        cursor: "pointer",
        transition: "0.25s",
        "&:hover": {
          backgroundColor: "action.hover",
          transform: "scale(1.02)",
        },
      }}
    >
      <Box>
        <Typography fontWeight={600}>{title}</Typography>
        <Typography variant="body2" color="text.secondary">
          Size: {size} • {date}
        </Typography>
        <Chip size="small" label={status} color={statusColor[status]} sx={{ mt: 1 }} />
      </Box>

      <Typography fontWeight={600}>${price}</Typography>
    </Box>
  );
};

export default orderCard;
