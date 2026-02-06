import {
  Box,
  Typography,
  Button
} from "@mui/material";


const RoleUpgradeCard = ({ buyer, onActivate }) => {
  if (buyer.role === "both") return null;

  return (
    <Box
      mt={1}
      mx="auto"
      maxWidth={360}
      p={3}
      borderRadius={3}
      border="1px solid"
      borderColor="grey.300"
      textAlign="left"
    >
      <Typography fontWeight={600} mb={0.5}>
        Unlock Both Features
      </Typography>

      <Typography variant="body2" color="text.secondary" mb={2}>
        Sell & Buy products, manage orders, and grow your business.
      </Typography>

      <Button
        fullWidth
        variant="contained"
        color="success"
        onClick={onActivate}
      >
        Activate {buyer.role === "buyer" ? "Seller" : "Buyer"} Account
      </Button>
    </Box>
  );
};

export default RoleUpgradeCard
