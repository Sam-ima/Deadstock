import { Card, Typography, Box, Button } from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

const UpcomingAuctionCard = ({ product }) => {
  return (
    <Card
      sx={{
        position: "relative",
        width: "230px",
        height: "250px",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
        transition: "0.4s ease",
        "&:hover": {
          transform: "translateY(-8px)",
        },
      }}
    >
      {/* Image */}
      <Box
        component="img"
        src={product.img}
        alt={product.name}
        loading="lazy"
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* Soft overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.85))",
        }}
      />

      {/* Content */}
      <Box
        sx={{
          position: "absolute",
          bottom: 14,
          left: 14,
          right: 14,
          zIndex: 2,
        }}
      >
        <Typography sx={{ color: "#fff", fontWeight: 700 }}>
          {product.name}
        </Typography>

        <Typography
          sx={{
            fontSize: "0.8rem",
            color: "#d8a855ff",
            mt: 0.5,
          }}
        >
          Starts: {product.startTime}
        </Typography>

        <Button
          fullWidth
          size="small"
          variant="outlined"
          startIcon={<NotificationsActiveIcon />}
          sx={{
            mt: 1.5,
            color: "#fff",
            borderColor: "#d8a855ff",
            "&:hover": {
              backgroundColor: "#d8a85522",
              borderColor: "#d8a855ff",
            },
          }}
        >
          Remind Me
        </Button>
      </Box>
    </Card>
  );
};

export default UpcomingAuctionCard;
