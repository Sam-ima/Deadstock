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
  Alert
} from "@mui/material";
import {
  Tag,
  Layers,
  ClipboardList,
  Plus,
  Package,
  Hash
} from "lucide-react";
import { useState, useEffect } from "react";
import { useCategories } from "../../context/categoryContext";

const BasicInfoSection = ({ formData, setFormData }) => {
  const { categories, subcategories, fetchSubcategories, createCategory } = useCategories();
  const [newCategoryDialog, setNewCategoryDialog] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategorySlug, setNewCategorySlug] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (formData.categorySlug) {
      fetchSubcategories(formData.categorySlug);
    }
  }, [formData.categorySlug]);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim() || !newCategorySlug.trim()) {
      setErrors({ category: "Category name and slug are required" });
      return;
    }

    try {
      const categoryData = {
        name: newCategoryName,
        slug: newCategorySlug.toLowerCase().replace(/\s+/g, '-'),
        description: `Category for ${newCategoryName}`,
        depreciationType: 'LINEAR', // Default
        color: '#6B7280', // Default gray
        icon: '📦' // Default icon
      };

      await createCategory(categoryData);
      setNewCategoryDialog(false);
      setNewCategoryName("");
      setNewCategorySlug("");
      setErrors({});
    } catch (error) {
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
      {/* Header */}
      <Box display="flex" alignItems="center" gap={2} mb={4} flexDirection="column">
        <Box>
          <Typography fontSize={20} fontWeight={800}>
            Product Details
          </Typography>
          <Typography fontSize={13} color="text.secondary">
            Help buyers understand your item better
          </Typography>
        </Box>
      </Box>

      {errors.category && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errors.category}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Category Selection with Add Option */}
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              select
              label="Category"
              fullWidth
              required
              value={formData.categorySlug || ''}
              onChange={(e) => handleChange('categorySlug', e.target.value)}
              error={!!errors.categorySlug}
              helperText={errors.categorySlug}
              sx={modernInput}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Layers size={16} />
                  </InputAdornment>
                ),
              }}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.slug}>
                  {category.name}
                </MenuItem>
              ))}
            </TextField>
            <Button
              variant="outlined"
              onClick={() => setNewCategoryDialog(true)}
              sx={{ minWidth: 'auto' }}
            >
              <Plus size={20} />
            </Button>
          </Box>
        </Grid>

        {/* Subcategory Selection */}
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
              {subcategories[formData.categorySlug]?.map((subcat) => (
                <MenuItem key={subcat.id} value={subcat.id}>
                  {subcat.name}
                </MenuItem>
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
            onBlur={(e) => {
              const error = validateField('name', e.target.value);
              setErrors(prev => ({ ...prev, name: error }));
            }}
            error={!!errors.name}
            helperText={errors.name}
            sx={modernInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Tag size={16} />
                </InputAdornment>
              ),
            }}
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
            onBlur={(e) => {
              const error = validateField('condition', e.target.value);
              setErrors(prev => ({ ...prev, condition: error }));
            }}
            error={!!errors.condition}
            helperText={errors.condition}
            sx={modernInput}
          >
            {['New', 'Like New', 'Used - Good', 'Used - Fair', 'Used - Poor'].map((cond) => (
              <MenuItem key={cond} value={cond}>
                {cond}
              </MenuItem>
            ))}
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
            onBlur={(e) => {
              const error = validateField('quantity', e.target.value);
              setErrors(prev => ({ ...prev, quantity: error }));
            }}
            error={!!errors.quantity}
            helperText={errors.quantity}
            sx={modernInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Hash size={16} />
                </InputAdornment>
              ),
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
            placeholder="Describe features, condition, flaws, and story behind this item..."
            fullWidth
            required
            value={formData.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
            onBlur={(e) => {
              const error = validateField('description', e.target.value);
              setErrors(prev => ({ ...prev, description: error }));
            }}
            error={!!errors.description}
            helperText={errors.description}
            sx={{
              ...modernInput,
              "& textarea": { lineHeight: 1.7 },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1 }}>
                  <ClipboardList size={16} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>

      {/* Add Category Dialog */}
      <Dialog open={newCategoryDialog} onClose={() => setNewCategoryDialog(false)}>
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
        <DialogActions>
          <Button onClick={() => setNewCategoryDialog(false)}>Cancel</Button>
          <Button onClick={handleAddCategory} variant="contained">
            Add Category
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default BasicInfoSection;