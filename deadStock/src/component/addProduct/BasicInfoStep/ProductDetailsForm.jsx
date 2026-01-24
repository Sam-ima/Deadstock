import { Grid, TextField, Typography, InputAdornment } from "@mui/material";
import { Tag, MessageSquare, Hash, ShoppingCart } from "lucide-react";

const ProductDetailsForm = ({ formData, setFormData, errors }) => {
  const handleChange = (field, value) =>
    setFormData(prev => ({ ...prev, [field]: value }));

  return (
    <Grid item xs={12}>
      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
        Product Details
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Product Name *"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Tag size={18} />
                </InputAdornment>
              )
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            value={formData.description}
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

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            type="number"
            label="Stock Quantity *"
            value={formData.stock}
            onChange={(e) => handleChange("stock", e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Hash size={18} />
                </InputAdornment>
              )
            }}
          />
        </Grid>

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
      </Grid>
    </Grid>
  );
};

export default ProductDetailsForm;
