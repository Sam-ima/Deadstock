import { Grid, TextField, Typography, InputAdornment } from "@mui/material";
import { Tag, MessageSquare, Hash, ShoppingCart } from "lucide-react";

const ProductDetailsForm = ({ formData, setFormData, errors }) => {
  const handleChange = (field, value) =>
    setFormData(prev => ({ ...prev, [field]: value }));

  const today = new Date().toISOString().split("T")[0];

  return (
    <Grid item xs={12}>
      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
        Product Details
      </Typography>

      <Grid container spacing={3}>
        {/* Product Name */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            label="Product Name"
            value={formData.name || ""}
            onChange={(e) => handleChange("name", e.target.value)}
            error={!!errors?.name}
            helperText={errors?.name}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Tag size={18} />
                </InputAdornment>
              )
            }}
          />
        </Grid>

        {/* Stock */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            required
            type="number"
            label="Stock Quantity"
            value={formData.stock || 1}
            onChange={(e) => {
              const value = Math.max(1, Number(e.target.value));
              handleChange("stock", value);
            }}
            inputProps={{
              min: 1
            }}
            onWheel={(e) => e.target.blur()} // prevents scroll change
            error={!!errors?.stock}
            helperText={errors?.stock || "Minimum stock is 1"}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Hash size={18} />
                </InputAdornment>
              )
            }}
          />
        </Grid>

        {/* MOQ */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            type="number"
            label="Minimum Order Quantity (MOQ)"
            value={formData.moq || 1}
            onChange={(e) => handleChange("moq", e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ShoppingCart size={18} />
                </InputAdornment>
              )
            }}
          />
        </Grid>

        {/* Description */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            value={formData.description || ""}
            onChange={(e) => handleChange("description", e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MessageSquare size={18} />
                </InputAdornment>
              )
            }}
          />
        </Grid>

         {/* Manufacture Date */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            type="date" 
            label="Manufacture Date"
            value={formData.manufacture_date || ""}
            onChange={(e) =>
              handleChange("manufacture_date", e.target.value)
            }
            error={!!errors?.manufacture_date}
            helperText={errors?.manufacture_date}
            InputLabelProps={{ shrink: true }}
            inputProps={{
              max: today // 🚫 prevents future dates
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProductDetailsForm;