// components/AddProduct/pricingSection.jsx
import {
  Box,
  Grid,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  FormControlLabel,
  Switch,
  Alert
} from "@mui/material";
import { DollarSign, Package, TrendingDown, Shield } from "lucide-react";
import { useState } from "react";

const PricingSection = ({ formData, setFormData, isB2BUser }) => {
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validatePricing = (field, value) => {
    const rules = {
      basePrice: value > 0 ? null : "Price must be greater than 0",
      floorPrice: value >= 0 && value <= formData.basePrice 
        ? null 
        : "Floor price must be between 0 and base price",
      moq: value >= 1 ? null : "MOQ must be at least 1"
    };
    
    return rules[field] || null;
  };

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

      <Grid container spacing={3}>
        {/* Base Price */}
        <Grid item xs={12} md={6}>
          <TextField
            label="Base Price ($)"
            type="number"
            required
            fullWidth
            value={formData.basePrice || ''}
            onChange={(e) => handleChange('basePrice', parseFloat(e.target.value) || 0)}
            onBlur={(e) => {
              const error = validatePricing('basePrice', e.target.value);
              setErrors(prev => ({ ...prev, basePrice: error }));
            }}
            error={!!errors.basePrice}
            helperText={errors.basePrice}
            sx={modernInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <DollarSign size={16} />
                </InputAdornment>
              ),
              inputProps: { min: 0.01, step: 0.01 }
            }}
          />
        </Grid>

        {/* Floor Price */}
        <Grid item xs={12} md={6}>
          <TextField
            label="Minimum Floor Price ($)"
            type="number"
            fullWidth
            value={formData.floorPrice || ''}
            onChange={(e) => handleChange('floorPrice', parseFloat(e.target.value) || 0)}
            onBlur={(e) => {
              const error = validatePricing('floorPrice', e.target.value);
              setErrors(prev => ({ ...prev, floorPrice: error }));
            }}
            error={!!errors.floorPrice}
            helperText={errors.floorPrice || "Lowest price before depreciation stops"}
            sx={modernInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <TrendingDown size={16} />
                </InputAdornment>
              ),
              inputProps: { min: 0, step: 0.01 }
            }}
          />
        </Grid>

        {/* B2B Features */}
        {isB2BUser && (
          <>
            <Grid item xs={12} md={6}>
              <TextField
                label="Minimum Order Quantity (MOQ)"
                type="number"
                fullWidth
                value={formData.moq || 1}
                onChange={(e) => handleChange('moq', parseInt(e.target.value) || 1)}
                onBlur={(e) => {
                  const error = validatePricing('moq', e.target.value);
                  setErrors(prev => ({ ...prev, moq: error }));
                }}
                error={!!errors.moq}
                helperText={errors.moq || "Minimum units for bulk orders"}
                sx={modernInput}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Package size={16} />
                    </InputAdornment>
                  ),
                  inputProps: { min: 1 }
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Bulk Discount (%)"
                type="number"
                fullWidth
                value={formData.bulkDiscount || 0}
                onChange={(e) => handleChange('bulkDiscount', parseFloat(e.target.value) || 0)}
                sx={modernInput}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DollarSign size={16} />
                    </InputAdornment>
                  ),
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                  inputProps: { min: 0, max: 100, step: 1 }
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.requiresB2BVerification || false}
                    onChange={(e) => handleChange('requiresB2BVerification', e.target.checked)}
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Shield size={16} />
                    <span>Require B2B Verification for bulk purchases</span>
                  </Box>
                }
              />
            </Grid>
          </>
        )}

        {/* Sale Type Selection */}
        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            Sale Type
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Box
                onClick={() => handleChange('saleType', 'direct')}
                sx={{
                  p: 2,
                  border: 2,
                  borderRadius: 2,
                  borderColor: formData.saleType === 'direct' ? '#22c55e' : '#e5e7eb',
                  bgcolor: formData.saleType === 'direct' ? '#f0fdf4' : 'transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <Typography fontWeight={600}>Direct Purchase</Typography>
                <Typography variant="caption" color="text.secondary">
                  Buyers purchase immediately at current price
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box
                onClick={() => handleChange('saleType', 'bidding')}
                sx={{
                  p: 2,
                  border: 2,
                  borderRadius: 2,
                  borderColor: formData.saleType === 'bidding' ? '#22c55e' : '#e5e7eb',
                  bgcolor: formData.saleType === 'bidding' ? '#f0fdf4' : 'transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <Typography fontWeight={600}>Auction/Bidding</Typography>
                <Typography variant="caption" color="text.secondary">
                  Buyers bid and highest bidder wins
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PricingSection;