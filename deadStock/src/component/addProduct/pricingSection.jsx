// src/pages/AddProduct/components/PricingStep.jsx
import React from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
  InputAdornment,
  Switch,
  FormControlLabel,
  Alert,
  Paper
} from "@mui/material";
import {
  DollarSign,
  TrendingDown,
  Package,
  Percent,
  Shield
} from "lucide-react";

const PricingStep = ({ formData, setFormData, b2bFields, setB2bFields, isB2BUser }) => {
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleB2BChange = (field, value) => {
    setB2bFields(prev => ({ ...prev, [field]: value }));
  };

  // Auto-calculate floor price
  React.useEffect(() => {
    if (formData.basePrice && !formData.floorPrice) {
      const calculatedFloor = Number(formData.basePrice) * 0.3;
      setFormData(prev => ({ ...prev, floorPrice: calculatedFloor.toFixed(2) }));
    }
  }, [formData.basePrice]);

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <DollarSign size={24} /> Pricing & Inventory
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Set your pricing strategy and inventory details
      </Typography>

      <Grid container spacing={3}>
        {/* Base Price */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Base Price (Rs.) *"
            type="number"
            value={formData.basePrice}
            onChange={(e) => handleChange("basePrice", e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <DollarSign size={18} />
                </InputAdornment>
              ),
              inputProps: { min: 0.01, step: 0.01 }
            }}
            helperText="Starting price of your product"
          />
        </Grid>

        {/* Floor Price */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Minimum Price (Rs.)"
            type="number"
            value={formData.floorPrice}
            onChange={(e) => handleChange("floorPrice", e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <TrendingDown size={18} />
                </InputAdornment>
              ),
              inputProps: { min: 0, step: 0.01 }
            }}
            helperText="Lowest price before automatic depreciation stops"
          />
        </Grid>

        {/* Sale Type Selection */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            Sale Type
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Paper
                elevation={formData.saleType === "direct" ? 2 : 0}
                onClick={() => handleChange("saleType", "direct")}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  border: `2px solid ${formData.saleType === "direct" ? "#22c55e" : "#e5e7eb"}`,
                  bgcolor: formData.saleType === "direct" ? "#f0fdf4" : "transparent",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  "&:hover": {
                    borderColor: "#22c55e",
                    bgcolor: "#f0fdf4"
                  }
                }}
              >
                <Typography fontWeight={600}>Direct Purchase</Typography>
                <Typography variant="body2" color="text.secondary">
                  Buyers purchase immediately at current price
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper
                elevation={formData.saleType === "bidding" ? 2 : 0}
                onClick={() => handleChange("saleType", "bidding")}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  border: `2px solid ${formData.saleType === "bidding" ? "#22c55e" : "#e5e7eb"}`,
                  bgcolor: formData.saleType === "bidding" ? "#f0fdf4" : "transparent",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  "&:hover": {
                    borderColor: "#22c55e",
                    bgcolor: "#f0fdf4"
                  }
                }}
              >
                <Typography fontWeight={600}>Auction / Bidding</Typography>
                <Typography variant="body2" color="text.secondary">
                  Buyers bid and highest bidder wins
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        {/* B2B Section */}
        {isB2BUser && (
          <>
            <Grid item xs={12}>
              <Alert severity="info" sx={{ mb: 2 }}>
                B2B sellers can set bulk pricing and minimum order quantities
              </Alert>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Minimum Order Quantity (MOQ)"
                type="number"
                value={b2bFields.moq}
                onChange={(e) => handleB2BChange("moq", e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Package size={18} />
                    </InputAdornment>
                  ),
                  inputProps: { min: 1 }
                }}
                helperText="Minimum units required for bulk orders"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Bulk Discount (%)"
                type="number"
                value={b2bFields.bulkDiscount}
                onChange={(e) => handleB2BChange("bulkDiscount", e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Percent size={18} />
                    </InputAdornment>
                  ),
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                  inputProps: { min: 0, max: 100, step: 1 }
                }}
                helperText="Discount applied for bulk orders"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Bulk Price ($)"
                type="number"
                value={b2bFields.bulkPrice}
                onChange={(e) => handleB2BChange("bulkPrice", e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DollarSign size={18} />
                    </InputAdornment>
                  ),
                  inputProps: { min: 0, step: 0.01 }
                }}
                helperText="Special price for bulk orders (optional)"
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={b2bFields.requiresB2BVerification}
                    onChange={(e) => handleB2BChange("requiresB2BVerification", e.target.checked)}
                  />
                }
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Shield size={18} />
                    <span>Require B2B verification for bulk purchases</span>
                  </Box>
                }
              />
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};

export default PricingStep;