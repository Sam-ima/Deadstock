import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  TextField,
  MenuItem,
  Switch,
  FormControlLabel,
} from "@mui/material";

import { useEditProduct } from "./useEditProduct";
import ImageGrid from "./ImageGrid";
import FeaturesSection from "./FeaturesSection";
import SpecificationsSection from "./SpecificationsSection";
import { useCategories } from "../../../../context/categoryContext";

const EditProductDialog = ({ open, product, onClose, onSave }) => {
  const {
    form,
    setForm,
    images,
    features,
    specifications,
    fileInputRef,
    handleChange,
    addImage,
    editImage,
    handleFileSelect,
    setImages,
    setFeatures,
    setSpecifications,
    handleSave,
  } = useEditProduct({ open, product, onSave });

  const { categories, subcategories, fetchSubcategories } = useCategories();
  const [currentSubcategories, setCurrentSubcategories] = useState([]);

  // Fetch subcategories whenever categoryId changes
  useEffect(() => {
    if (!form.categoryId) return;

    const subs = subcategories[form.categoryId] || [];
    if (subs.length) {
      setCurrentSubcategories(subs);
    } else {
      // fetch from server if not already loaded
      fetchSubcategories(form.categoryId).then((data) => setCurrentSubcategories(data));
    }
  }, [form.categoryId, subcategories, fetchSubcategories]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Edit Product</DialogTitle>

      <DialogContent>
        <Stack spacing={2}>
          <TextField
            label="Product Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />

          <TextField
            label="Description"
            name="description"
            multiline
            rows={3}
            value={form.description}
            onChange={handleChange}
          />

          {/* CATEGORY */}
          <TextField
            select
            label="Category"
            name="categoryId"
            value={form.categoryId}
            onChange={handleChange}
          >
            {categories.map((c) => (
              <MenuItem key={c.id} value={c.id}>
                {c.name}
              </MenuItem>
            ))}
          </TextField>

          {/* SUBCATEGORY */}
          <TextField
            select
            label="Subcategory"
            name="subcategoryId"
            value={form.subcategoryId}
            onChange={handleChange}
            disabled={!form.categoryId || !currentSubcategories.length}
          >
            {currentSubcategories.map((s) => (
              <MenuItem key={s.id} value={s.id}>
                {s.name}
              </MenuItem>
            ))}
          </TextField>

          {/* BASE PRICE */}
          <TextField
            label="Base Price"
            name="basePrice"
            type="number"
            value={form.basePrice}
            onChange={handleChange}
          />

          {/* STOCK */}
          <TextField
            label="Stock"
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
          />

          {/* SALE TYPE */}
          <TextField
            select
            label="Sale Type"
            name="saleType"
            value={form.saleType}
            onChange={handleChange}
          >
            <MenuItem value="direct">Direct</MenuItem>
            <MenuItem value="b2b">B2B</MenuItem>
          </TextField>

          {/* MANUFACTURE DATE */}
          <TextField
            label="Manufacture Date"
            name="manufacture_date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={form.manufacture_date}
            onChange={handleChange}
          />

          {/* MOQ */}
          <TextField
            label="Minimum Order Quantity (MOQ)"
            name="moq"
            type="number"
            value={form.moq}
            onChange={handleChange}
          />

          <FormControlLabel
            control={
              <Switch
                checked={form.requiresB2BVerification}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    requiresB2BVerification: e.target.checked,
                  }))
                }
              />
            }
            label="Requires B2B Verification"
          />

          <ImageGrid
            images={images}
            onAdd={addImage}
            onEdit={editImage}
            onRemove={(i) => setImages((p) => p.filter((_, idx) => idx !== i))}
          />

          <FeaturesSection features={features} setFeatures={setFeatures} />

          <SpecificationsSection
            specifications={specifications}
            setSpecifications={setSpecifications}
          />
        </Stack>

        <input
          type="file"
          hidden
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileSelect}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>Save Changes</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProductDialog;