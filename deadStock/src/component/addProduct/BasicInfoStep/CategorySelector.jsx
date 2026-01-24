import { Grid, Box, TextField, Button, MenuItem } from "@mui/material";
import { Plus } from "lucide-react";

const CategorySelector = ({
  formData,
  setFormData,
  categories,
  subcategories,
  onAddCategory,
  onAddSubcategory
}) => {
  const handleChange = (field, value) =>
    setFormData(prev => ({ ...prev, [field]: value }));

  return (
    <>
      <Grid item xs={12}>
        <Box display="flex" gap={1}>
          <TextField
            select
            fullWidth
            label="Category *"
            value={formData.categoryId}
            onChange={(e) => handleChange("categoryId", e.target.value)}
          >
            <MenuItem value="">Select Category</MenuItem>
            {categories.map(c => (
              <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
            ))}
          </TextField>

          <Button onClick={onAddCategory} sx={{ height: 56 }}>
            <Plus size={20} />
          </Button>
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Box display="flex" gap={1}>
          <TextField
            select
            fullWidth
            label="Subcategory (Optional)"
            value={formData.subcategoryId || ""}
            onChange={(e) => handleChange("subcategoryId", e.target.value)}
          >
            <MenuItem value="">No Subcategory</MenuItem>
            {subcategories.map(s => (
              <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>
            ))}
          </TextField>

          <Button
            onClick={onAddSubcategory}
            disabled={!formData.categoryId}
            sx={{ height: 56 }}
          >
            <Plus size={20} />
          </Button>
        </Box>
      </Grid>
    </>
  );
};

export default CategorySelector;
