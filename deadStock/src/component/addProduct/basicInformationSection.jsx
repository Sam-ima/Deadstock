// components/AddProduct/basicInformationSection.jsx
import {
  Box,
  Grid,
  MenuItem,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar
} from "@mui/material";
import { Tag, Layers, ClipboardList, Plus, Package, Hash } from "lucide-react";
import { useState, useEffect } from "react";
import { useCategories } from "../../context/categoryContext";
import { modernInput } from "./inputs";

const BasicInfoSection = ({ formData, setFormData }) => {
  const { categories, subcategories, fetchSubcategories, createCategory, fetchCategories } = useCategories();
  const [newCategoryDialog, setNewCategoryDialog] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategorySlug, setNewCategorySlug] = useState("");
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    if (formData.categorySlug) {
      fetchSubcategories(formData.categorySlug);
    }
  }, [formData.categorySlug]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
  };

  // basicInformationSection.jsx (updated)
  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      setErrors({ category: "Category name is required" });
      return;
    }

    // Auto-generate slug
    const slug = newCategoryName.trim().toLowerCase().replace(/\s+/g, "-");

    try {
      const categoryData = {
        name: newCategoryName,
        slug,
        description: `Category for ${newCategoryName}`,
        color: "#6B7280",
        icon: "📦",
      };

      await createCategory(categoryData); // updates context & dropdown
      setNewCategoryDialog(false);
      setNewCategoryName("");
      setErrors({});
    } catch (err) {
      console.error(err);
      setErrors({ category: "Failed to create category" });
    }
  };


  const validateField = (field, value) => {
    const rules = {
      name: value ? null : "Product name is required",
      categorySlug: value ? null : "Category is required",
      description: value && value.length >= 20 ? null : "Description must be at least 20 characters",
      condition: value ? null : "Condition is required",
      quantity: value > 0 ? null : "Quantity must be greater than 0"
    };
    return rules[field] || null;
  };

  return (
    <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: 3, bgcolor: "#fff", border: "1px solid #e5e7eb" }}>
      <Box display="flex" flexDirection="column" alignItems="center" gap={1} mb={4}>
        <Typography fontSize={20} fontWeight={800}>Product Details</Typography>
        <Typography fontSize={13} color="text.secondary">Help buyers understand your item better</Typography>
      </Box>

      {errors.category && <Alert severity="error" sx={{ mb: 2 }}>{errors.category}</Alert>}

      <Grid container spacing={3}>
        {/* Category */}
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              select
              label="Category"
              fullWidth
              required
              value={formData.categorySlug || ""}
              onChange={(e) => handleChange("categorySlug", e.target.value)}
              error={!!errors.categorySlug}
              helperText={errors.categorySlug}
            >
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.slug}>
                  {cat.name}
                </MenuItem>
              ))}
            </TextField>

            <Button variant="contained" color="success" onClick={() => setNewCategoryDialog(true)} sx={{ minWidth: 'auto' }}>
              <Plus size={20} />
            </Button>
          </Box>
        </Grid>

        {/* Subcategory */}
        {formData.categorySlug && (
          <Grid item xs={12} md={6}>
            <TextField
              select
              label="Subcategory"
              fullWidth
              value={formData.subcategoryId || ''}
              onChange={(e) => handleChange('subcategoryId', e.target.value)}
              sx={modernInput}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Package size={16} />
                  </InputAdornment>
                ),
              }}
            >
              <MenuItem value="">Select Subcategory (Optional)</MenuItem>
              {subcategories[formData.categorySlug]?.map(sub => (
                <MenuItem key={sub.id} value={sub.id}>{sub.name}</MenuItem>
              ))}
            </TextField>
          </Grid>
        )}

        {/* Product Name */}
        <Grid item xs={12}>
          <TextField
            label="Product Name"
            placeholder="Vintage Leather Jacket"
            fullWidth
            required
            value={formData.name || ''}
            onChange={(e) => handleChange('name', e.target.value)}
            onBlur={(e) => setErrors(prev => ({ ...prev, name: validateField('name', e.target.value) }))}
            error={!!errors.name}
            helperText={errors.name}
            sx={modernInput}
            InputProps={{ startAdornment: <InputAdornment position="start"><Tag size={16} /></InputAdornment> }}
          />
        </Grid>

        {/* Condition */}
        <Grid item xs={12} md={6}>
          <TextField
            select
            label="Condition"
            fullWidth
            required
            value={formData.condition || ''}
            onChange={(e) => handleChange('condition', e.target.value)}
            onBlur={(e) => setErrors(prev => ({ ...prev, condition: validateField('condition', e.target.value) }))}
            error={!!errors.condition}
            helperText={errors.condition}
            sx={modernInput}
          >
            {['New', 'Like New', 'Used - Good', 'Used - Fair', 'Used - Poor'].map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
          </TextField>
        </Grid>

        {/* Quantity */}
        <Grid item xs={12} md={6}>
          <TextField
            label="Quantity Available"
            type="number"
            fullWidth
            required
            value={formData.stock || ''}
            onChange={(e) => handleChange('stock', parseInt(e.target.value) || 1)}
            onBlur={(e) => setErrors(prev => ({ ...prev, quantity: validateField('quantity', e.target.value) }))}
            error={!!errors.quantity}
            helperText={errors.quantity}
            sx={modernInput}
            InputProps={{
              startAdornment: <InputAdornment position="start"><Hash size={16} /></InputAdornment>,
              inputProps: { min: 1 }
            }}
          />
        </Grid>

        {/* Description */}
        <Grid item xs={12}>
          <TextField
            label="Description"
            multiline
            rows={4}
            placeholder="Describe features, condition, flaws..."
            fullWidth
            required
            value={formData.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
            onBlur={(e) => setErrors(prev => ({ ...prev, description: validateField('description', e.target.value) }))}
            error={!!errors.description}
            helperText={errors.description}
            sx={{ ...modernInput, "& textarea": { lineHeight: 1.7 } }}
            InputProps={{ startAdornment: <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1 }}><ClipboardList size={16} /></InputAdornment> }}
          />
        </Grid>
      </Grid>

      {/* Add Category Dialog */}
      <Dialog open={newCategoryDialog} onClose={() => setNewCategoryDialog(false)} PaperProps={{ sx: { p: 3, borderRadius: 3 } }}>
        <DialogTitle>Add New Category</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Category Name"
            fullWidth
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Category Slug"
            fullWidth
            value={newCategorySlug}
            onChange={(e) => setNewCategorySlug(e.target.value)}
            placeholder="e.g., electronics, fashion"
          />
        </DialogContent>
        <DialogActions sx={{ pt: 2 }}>
          <Button onClick={() => setNewCategoryDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddCategory}>Add Category</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>{snackbar.message}</Alert>
      </Snackbar>
    </Paper>
  );
};

export default BasicInfoSection;
