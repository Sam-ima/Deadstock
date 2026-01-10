// src/pages/AddProduct/components/BasicInfoStep.jsx - COMPLETE UPDATED VERSION
import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  InputAdornment,
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  Select
} from "@mui/material";
import {
  Tag,
  Layers,
  Package,
  Plus,
  MessageSquare,
  Hash,
  ShoppingCart
} from "lucide-react";
import { useCategories } from "../../context/categoryContext";

const BasicInfoStep = ({ formData, setFormData }) => {
  const {
    categories,
    subcategories,
    createCategory,
    createSubcategory,
    fetchSubcategories,
    loading: categoriesLoading
  } = useCategories();

  const [newCategoryOpen, setNewCategoryOpen] = useState(false);
  const [newSubcategoryOpen, setNewSubcategoryOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "", description: "" });
  const [newSubcategory, setNewSubcategory] = useState({ name: "", description: "" });
  const [errors, setErrors] = useState({});
  const [loadingSubcategories, setLoadingSubcategories] = useState(false);
  const [availableSubcategories, setAvailableSubcategories] = useState([]);

  // Fetch subcategories when category changes
  useEffect(() => {
    let active = true;

    const fetchSubcats = async () => {
      if (!formData.categoryId) return;

      setLoadingSubcategories(true);
      try {
        await fetchSubcategories(formData.categoryId);

        // Clear only if subcategory is not part of this category anymore
        if (active) {
          setFormData(prev => ({
            ...prev,
            subcategoryId: ""
          }));
        }
      } catch (error) {
        console.error("Error fetching subcategories:", error);
        setErrors(prev => ({ ...prev, subcategory: "Failed to load subcategories" }));
      } finally {
        if (active) setLoadingSubcategories(false);
      }
    };

    fetchSubcats();
    return () => {
      active = false;
    };
  }, [formData.categoryId]);


  // Update available subcategories when subcategories state changes
  useEffect(() => {
    if (!loadingSubcategories && formData.categoryId && subcategories[formData.categoryId]) {
      setAvailableSubcategories(subcategories[formData.categoryId]);
    } else if (!formData.categoryId) {
      setAvailableSubcategories([]);
    }
  }, [formData.categoryId, subcategories, loadingSubcategories]);


  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.name.trim()) {
      setErrors({ category: "Category name is required" });
      return;
    }

    try {
      const categoryData = {
        name: newCategory.name.trim(),
        description: newCategory.description || `Category for ${newCategory.name}`,
        color: "#6B7280",
        icon: "📦"
      };

      await createCategory(categoryData);
      setNewCategory({ name: "", description: "" });
      setNewCategoryOpen(false);
      setErrors({});
    } catch (error) {
      console.error("Error creating category:", error);
      setErrors({ category: "Failed to create category" });
    }
  };

  const handleAddSubcategory = async () => {
    if (!newSubcategory.name.trim()) {
      setErrors({ subcategory: "Subcategory name is required" });
      return;
    }

    if (!formData.categoryId) {
      setErrors({ subcategory: "Please select a category first" });
      return;
    }

    try {
      const subcategoryData = {
        name: newSubcategory.name.trim(),
        description: newSubcategory.description || `Subcategory for ${newSubcategory.name}`,
        categoryId: formData.categoryId
      };

      await createSubcategory(subcategoryData);
      setNewSubcategory({ name: "", description: "" });
      setNewSubcategoryOpen(false);
      setErrors({});
    } catch (error) {
      console.error("Error creating subcategory:", error);
      setErrors({ subcategory: "Failed to create subcategory" });
    }
  };

  // Get category name by ID
  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : "Unknown Category";
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Tag size={24} /> Basic Information
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Provide basic details about your product
      </Typography>

      <Grid container spacing={3}>
        {/* Row 1: Category & Subcategory */}
        {/* Category */}
        <Grid item xs={12} sx={{ width: "50vw" }}>
          <Box sx={{ display: "flex", gap: 1, alignItems: "flex-start" }}>
            <TextField
              select
              fullWidth
              sx={{ flexGrow: 1 }}
              label="Category *"
              value={formData.categoryId}
              onChange={(e) => handleChange("categoryId", e.target.value)}
            >
              <MenuItem value="">Select Category</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </TextField>

            <Button
              onClick={() => setNewCategoryOpen(true)}
              sx={{ minWidth: "auto", height: 56 }}
              title="Add New Category"
            >
              <Plus size={20} />
            </Button>
          </Box>
        </Grid>

        {/* Subcategory */}
        <Grid item xs={12} sx={{ width: "50vw" }}>
          <Box sx={{ display: "flex", gap: 1, alignItems: "flex-start" }}>
            <TextField
              select
              fullWidth
              sx={{ flexGrow: 1 }}
              label="Subcategory (Optional)"
              value={formData.subcategoryId || ""}
              onChange={(e) => handleChange("subcategoryId", e.target.value)}
            >
              <MenuItem value="">No Subcategory</MenuItem>
              {availableSubcategories.map((sub) => (
                <MenuItem key={sub.id} value={sub.id}>
                  {sub.name}
                </MenuItem>
              ))}
            </TextField>

            <Button
              onClick={() => setNewSubcategoryOpen(true)}
              disabled={!formData.categoryId}
              sx={{ minWidth: "auto", height: 56 }}
              title="Add New Subcategory"
            >
              <Plus size={20} />
            </Button>
          </Box>
        </Grid>

        {/* Row 2: Product Details */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            Product Details
          </Typography>
          <Grid container spacing={3}>
            {/* Product Name */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Product Name *"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                error={!!errors.name}
                helperText={errors.name}
                placeholder="e.g., Canon EOS 90D DSLR Camera"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Tag size={18} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Description */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description (Optional)"
                multiline
                rows={4}
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Describe your product in detail. Include features, condition, and any important information for buyers..."
                helperText="Optional but recommended for better sales"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{ alignSelf: "flex-start", mt: 1 }}>
                      <MessageSquare size={18} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Stock Quantity */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Stock Quantity *"
                type="number"
                value={formData.stock}
                onChange={(e) => handleChange("stock", e.target.value)}
                error={!!errors.stock}
                helperText="How many units are available?"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Hash size={18} />
                    </InputAdornment>
                  ),
                  inputProps: { min: 1 }
                }}
              />
            </Grid>

            {/* MOQ - Minimum Order Quantity */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Minimum Order Quantity (MOQ)"
                type="number"
                value={formData.moq || 1}
                onChange={(e) => handleChange("moq", e.target.value)}
                helperText="Minimum units required per order"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ShoppingCart size={18} />
                    </InputAdornment>
                  ),
                  inputProps: { min: 1 }
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Add Category Dialog */}
      <Dialog
        open={newCategoryOpen}
        onClose={() => setNewCategoryOpen(false)}
        maxWidth="sm"
        fullWidth
        disableEnforceFocus
        disableAutoFocus
      >
        <DialogTitle>Add New Category</DialogTitle>
        <DialogContent>
          {errors.category && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errors.category}
            </Alert>
          )}
          <TextField
            autoFocus
            margin="dense"
            label="Category Name *"
            fullWidth
            value={newCategory.name}
            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
            sx={{ mb: 2 }}
            error={!!errors.category}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={newCategory.description}
            onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
            placeholder="Describe this category..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNewCategoryOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddCategory}>
            Add Category
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Subcategory Dialog */}
      <Dialog
        open={newSubcategoryOpen}
        onClose={() => setNewSubcategoryOpen(false)}
        maxWidth="sm"
        fullWidth
        disableEnforceFocus
        disableAutoFocus
      >
        <DialogTitle>Add New Subcategory</DialogTitle>
        <DialogContent>
          {!formData.categoryId ? (
            <Alert severity="warning" sx={{ mb: 2 }}>
              Please select a category first before adding a subcategory.
            </Alert>
          ) : (
            <Alert severity="info" sx={{ mb: 2 }}>
              Adding to: <strong>{getCategoryName(formData.categoryId)}</strong>
            </Alert>
          )}

          {errors.subcategory && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errors.subcategory}
            </Alert>
          )}

          <TextField
            autoFocus
            margin="dense"
            label="Subcategory Name *"
            fullWidth
            value={newSubcategory.name}
            onChange={(e) => setNewSubcategory({ ...newSubcategory, name: e.target.value })}
            sx={{ mb: 2 }}
            error={!!errors.subcategory}
            disabled={!formData.categoryId}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={2}
            value={newSubcategory.description}
            onChange={(e) => setNewSubcategory({ ...newSubcategory, description: e.target.value })}
            placeholder="Describe this subcategory..."
            disabled={!formData.categoryId}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNewSubcategoryOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleAddSubcategory}
            disabled={!formData.categoryId}
          >
            Add Subcategory
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BasicInfoStep;