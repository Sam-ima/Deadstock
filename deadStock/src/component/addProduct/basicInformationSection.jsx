import {
  Grid,
  MenuItem,
  TextField,
  Paper,
} from "@mui/material";

const categories = [
  { slug: "electronics", name: "Electronics" },
  { slug: "fashion", name: "Fashion" },
];

const BasicInfoSection = ({ data, onChange }) => {
  return (
    <Paper sx={{ p: 4, borderRadius: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            select
            label="Category"
            fullWidth
            value={data.categorySlug}
            onChange={(e) => onChange("categorySlug", e.target.value)}
          >
            {categories.map((c) => (
              <MenuItem key={c.slug} value={c.slug}>
                {c.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Product Name"
            fullWidth
            value={data.name}
            onChange={(e) => onChange("name", e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Description"
            multiline
            rows={4}
            fullWidth
            value={data.description}
            onChange={(e) => onChange("description", e.target.value)}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BasicInfoSection;
