// PricingSection.jsx
import {
  Box,
  Grid,
  TextField,
  Typography,
  Paper,
  InputAdornment,
} from "@mui/material";
import { DollarSign, Package } from "lucide-react";

const PricingSection = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 4,
        p: { xs: 3, md: 4 },
        background: `
          linear-gradient(#fff, #fff) padding-box,
          linear-gradient(135deg, #22c55e, #f97316) border-box
        `,
        border: "1px solid transparent",
      }}
    >
      {/* Accent Glow */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at top left, rgba(249,115,22,0.12), transparent 60%)",
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <Box display="flex" alignItems="center" gap={2} mb={4} flexDirection="column">
      

        <Box>
          <Typography fontSize={20} fontWeight={800}>
            Pricing & Inventory
          </Typography>
          <Typography fontSize={13} color="text.secondary">
            Set price and available quantity
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={3} sx={{display:"flex",justifyContent:"space-around"}}>
        {/* Price */}
        <Grid item xs={12} md={12}>
          <TextField
            label="Starting Price"
            type="number"
            required
            fullWidth
            sx={modernInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <DollarSign size={16} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        {/* Quantity */}
        <Grid item xs={12} md={12}>
          <TextField
            label="Quantity Available(optional)"
            type="number"
            fullWidth
            sx={modernInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Package size={16} />
                </InputAdornment>
              ),
            }}
            placeholder="1"
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PricingSection;

const modernInput = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 3,
    backgroundColor: "#fafafa",
    fontSize: 14.5,
    transition: "all .25s ease",
    "& fieldset": {
      borderColor: "#e5e7eb",
    },
    "&:hover fieldset": {
      borderColor: "#22c55e",
    },
    "&.Mui-focused": {
      backgroundColor: "#fff",
      boxShadow: "0 0 0 4px rgba(34,197,94,0.15)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#22c55e",
    },
  },
};
