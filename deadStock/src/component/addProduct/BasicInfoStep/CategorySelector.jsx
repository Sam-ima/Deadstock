import { Box, TextField, Button, MenuItem } from "@mui/material";
import { Plus } from "lucide-react";

const CategorySelector = ({
  formData,
  setFormData,
  categories,
  subcategories = [],
  onAddCategory,
  onAddSubcategory,
  loadingSubcategories
}) => {
  const handleChange = (field, value) =>
    setFormData(prev => ({ ...prev, [field]: value }));

  return (
    <Box sx={{ width: "100%" }}>
      {/* Category */}
      <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
        <TextField
          select
          fullWidth

          size="small"
          label="Category *"
          value={formData.categoryId || ""}
          onChange={(e) => handleChange("categoryId", e.target.value)}
          SelectProps={{
            MenuProps: {
              PaperProps: {
                style: {
                  maxHeight: 240,   // 👈 controls dropdown height
                },
              },
            },
          }}
        >
          <MenuItem value="">Select Category</MenuItem>
          {categories.map(c => (
            <MenuItem key={c.id} value={c.id}>
              {c.name}
            </MenuItem>
          ))}
        </TextField>

        <Button
          variant="outlined"
          onClick={onAddCategory}
          sx={{ width: 40, height: 40, minWidth: 40 }}
        >
          <Plus size={18} />
        </Button>
      </Box>

      {/* Subcategory */}
      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField
          select
          fullWidth
          size="small"
          label="Subcategory"
          value={formData.subcategoryId || ""}
          onChange={(e) => handleChange("subcategoryId", e.target.value)}
          disabled={!formData.categoryId}   // ✅ FIXED
          SelectProps={{
            MenuProps: {
              PaperProps: {
                style: {
                  maxHeight: 240,   // 👈 controls dropdown height
                },
              },
            },
          }}
        >
          <MenuItem value="">Select Subcategory</MenuItem>

          {loadingSubcategories ? (
            <MenuItem disabled>Loading...</MenuItem>
          ) : subcategories.length > 0 ? (
            subcategories.map(s => (
              <MenuItem key={s.id} value={s.id}>
                {s.name}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No subcategories</MenuItem>
          )}
        </TextField>

        <Button
          variant="outlined"
          onClick={onAddSubcategory}
          disabled={!formData.categoryId}
          sx={{ width: 40, height: 40, minWidth: 40 }}
        >
          <Plus size={18} />
        </Button>
      </Box>
    </Box>
  );
};

export default CategorySelector;
