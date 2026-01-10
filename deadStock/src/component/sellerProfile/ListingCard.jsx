import { Box, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const ListingCard = ({ title, price, img }) => {
  return (
    <Box
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        bgcolor: "#fff",
        boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
        transition: "all 0.3s ease",
        cursor: "pointer",

        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 16px 30px rgba(0,0,0,0.12)",
        },
      }}
    >
      {/* IMAGE */}
      <Box
        sx={{
          position: "relative",
          height: 180,
        }}
      >
        <Box
          component="img"
          src={img}
          alt={title}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        {/* EDIT ICON – ALWAYS VISIBLE */}
        <IconButton
          size="small"
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            bgcolor: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(6px)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            color: "#2e7d32",

            "&:hover": {
              bgcolor: "#2e7d32",
              color: "#fff",
            },
          }}
        >
          <EditIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* CONTENT */}
      <Box p={2}>
        <Typography
          fontWeight={600}
          fontSize={15}
          noWrap
        >
          {title}
        </Typography>

        <Typography
          fontWeight={700}
          sx={{
            color: "#ff8f00",
            mt: 0.5,
          }}
        >
          {price}
        </Typography>
      </Box>
    </Box>
  );
};

export default ListingCard;
