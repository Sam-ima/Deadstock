import { Stack, Button } from "@mui/material";
import StoreIcon from "@mui/icons-material/Store";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export const RoleSelector = ({ role, setRole }) => {
  return (
    <Stack direction="row" spacing={2} mb={3}>
      <Button
        fullWidth
        startIcon={<ShoppingCartIcon />}
        onClick={() => setRole("buyer")}
        variant={role === "buyer" ? "contained" : "outlined"}
        sx={{
          bgcolor: role === "buyer" ? "#2E7D32" : "transparent",
          borderColor: "#2E7D32",
          color: role === "buyer" ? "#fff" : "#2E7D32",
          "&:hover": { bgcolor: "#1B5E20", color: "#fff" },
        }}
      >
        Buyer
      </Button>
      <Button
        fullWidth
        startIcon={<StoreIcon />}
        onClick={() => setRole("seller")}
        variant={role === "seller" ? "contained" : "outlined"}
        sx={{
          bgcolor: role === "seller" ? "#EF6C00" : "transparent",
          borderColor: "#EF6C00",
          color: role === "seller" ? "#fff" : "#EF6C00",
          "&:hover": { bgcolor: "#E65100", color: "#fff" },
        }}
      >
        Seller
      </Button>
    </Stack>
  );
};
