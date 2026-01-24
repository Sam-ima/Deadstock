import React, { useState, useEffect, useMemo } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { Tag } from "lucide-react";
import { useCategories } from "../../../context/categoryContext";

import CategorySelector from "./CategorySelector";
import ProductDetailsForm from "./ProductDetailsForm";
import AddCategoryDialog from "./AddCategoryDialog";
import AddSubcategoryDialog from "./AddSubcategoryDialog";

const BasicInfoStep = ({ formData, setFormData }) => {
  const {
    categories,
    subcategories,
    createCategory,
    createSubcategory,
    fetchSubcategories
  } = useCategories();

  const [newCategoryOpen, setNewCategoryOpen] = useState(false);
  const [newSubcategoryOpen, setNewSubcategoryOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "", description: "" });
  const [newSubcategory, setNewSubcategory] = useState({ name: "", description: "" });
  const [errors, setErrors] = useState({});
  const [loadingSubcategories, setLoadingSubcategories] = useState(false);

  /* -------- Fetch subcategories when category changes -------- */
  useEffect(() => {
    if (!formData.categoryId) return;

    let active = true;

    const load = async () => {
      setLoadingSubcategories(true);
      try {
        await fetchSubcategories(formData.categoryId);

        if (active) {
          // reset ONLY after new data is ready
          setFormData(prev => ({ ...prev, subcategoryId: "" }));
        }
      } finally {
        if (active) setLoadingSubcategories(false);
      }
    };

    load();
    return () => (active = false);
  }, [formData.categoryId]);


  /* ✅ Always read subcategories directly from context */
  const currentSubcategories = useMemo(
    () => subcategories[formData.categoryId] || [],
    [subcategories, formData.categoryId]
  );

  /* -------- Add Subcategory -------- */
  const handleAddSubcategory = async () => {
    if (!newSubcategory.name.trim()) {
      setErrors(prev => ({ ...prev, subcategory: "Subcategory name is required" }));
      return;
    }

    try {
      await createSubcategory({
        name: newSubcategory.name.trim(),
        description:
          newSubcategory.description || `Subcategory for ${newSubcategory.name}`,
        categoryId: formData.categoryId
      });

      setNewSubcategory({ name: "", description: "" });
      setNewSubcategoryOpen(false);
    } catch {
      setErrors(prev => ({ ...prev, subcategory: "Failed to create subcategory" }));
    }
  };

  return (
    <Box sx={{ width: "100%", px: { xs: 1, sm: 2, md: 3 } }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
        <Tag size={22} />
        <Typography variant="h5" fontWeight={600}>
          Basic Information
        </Typography>
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Provide basic details about your product
      </Typography>

      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} sx={{ width: "100%" }}>
        <Grid item xs={12} md={6} sx={{ width: "100%" }}>
          <Box sx={{
            width: "100%",
            maxWidth: "100%",
            pr: { md: 2 } // Add some right padding on medium screens
          }}>
            <CategorySelector
              formData={formData}
              setFormData={setFormData}
              categories={categories}
              subcategories={currentSubcategories}
              loadingSubcategories={loadingSubcategories}
              onAddCategory={() => setNewCategoryOpen(true)}
              onAddSubcategory={() => setNewSubcategoryOpen(true)}
            /></Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <ProductDetailsForm
            formData={formData}
            setFormData={setFormData}
            errors={errors}
          />
        </Grid>
      </Grid>

      <AddCategoryDialog
        open={newCategoryOpen}
        onClose={() => setNewCategoryOpen(false)}
        newCategory={newCategory}
        setNewCategory={setNewCategory}
        createCategory={createCategory}
      />

      <AddSubcategoryDialog
        open={newSubcategoryOpen}
        onClose={() => setNewSubcategoryOpen(false)}
        newSubcategory={newSubcategory}
        setNewSubcategory={setNewSubcategory}
        onAddSubcategory={handleAddSubcategory}
        categoryId={formData.categoryId}
        categoryName={categories.find(c => c.id === formData.categoryId)?.name}
      />
    </Box>
  );
};

export default BasicInfoStep;
