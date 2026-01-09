import {
  Grid,
  TextField,
  Paper,
} from "@mui/material";

const PricingSection = ({ data, onChange }) => {
  return (
    <Paper sx={{ p: 4, borderRadius: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            label="Base Price"
            type="number"
            fullWidth
            value={data.basePrice}
            onChange={(e) => onChange("basePrice", e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Floor Price (Minimum)"
            type="number"
            fullWidth
            value={data.floorPrice}
            onChange={(e) => onChange("floorPrice", e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Quantity"
            type="number"
            fullWidth
            value={data.quantity}
            onChange={(e) => onChange("quantity", e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="MOQ (B2B only)"
            type="number"
            fullWidth
            value={data.moq}
            onChange={(e) => onChange("moq", e.target.value)}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PricingSection;
