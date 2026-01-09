import { Box, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const ListingCard = ({ title, price, img }) => {
  return (
    <Box
      sx={{
        bgcolor: "#F9FAFB",
        borderRadius: 3,
        p: 2,
        position: "relative",
      }}
    >
      <IconButton
        size="small"
        sx={{ position: "absolute", top: 8, right: 8 }}
      >
        <EditIcon fontSize="small" />
      </IconButton>

      <Box
        component="img"
        src={img}
        alt={title}
        width="40%"
        borderRadius={2}
      />

      <Typography mt={1} fontWeight={600}>
        {title}
      </Typography>
      <Typography color="green" fontWeight={700}>
        {price}
      </Typography>
    </Box>
  );
};

export default ListingCard;
