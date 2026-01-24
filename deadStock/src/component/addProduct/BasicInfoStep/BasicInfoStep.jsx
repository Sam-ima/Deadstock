// src/pages/AddProduct/components/BasicInfoStep.jsx
import React, { useState, useEffect } from "react";
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
    const [availableSubcategories, setAvailableSubcategories] = useState([]);
    const [loadingSubcategories, setLoadingSubcategories] = useState(false);

    useEffect(() => {
        let active = true;

        const loadSubcategories = async () => {
            if (!formData.categoryId) return;

            setLoadingSubcategories(true);
            try {
                await fetchSubcategories(formData.categoryId);
                if (active) {
                    setFormData(prev => ({ ...prev, subcategoryId: "" }));
                }
            } catch {
                setErrors(prev => ({
                    ...prev,
                    subcategory: "Failed to load subcategories"
                }));
            } finally {
                if (active) setLoadingSubcategories(false);
            }
        };

        loadSubcategories();
        return () => (active = false);
    }, [formData.categoryId]);

    useEffect(() => {
        if (!loadingSubcategories && subcategories[formData.categoryId]) {
            setAvailableSubcategories(subcategories[formData.categoryId]);
        } else {
            setAvailableSubcategories([]);
        }
    }, [subcategories, formData.categoryId, loadingSubcategories]);

    const handleAddSubcategory = async () => {
        if (!newSubcategory.name.trim()) {
            setErrors(prev => ({ ...prev, subcategory: "Subcategory name is required" }));
            return;
        }

        if (!formData.categoryId) {
            setErrors(prev => ({ ...prev, subcategory: "Please select a category first" }));
            return;
        }

        try {
            await createSubcategory({
                name: newSubcategory.name.trim(),
                description:
                    newSubcategory.description || `Subcategory for ${newSubcategory.name}`,
                categoryId: formData.categoryId
            });

            // Clear form and close dialog
            setNewSubcategory({ name: "", description: "" });
            setNewSubcategoryOpen(false);
            setErrors({});
        } catch (err) {
            console.error("Error creating subcategory:", err);
            setErrors(prev => ({ ...prev, subcategory: "Failed to create subcategory" }));
        }
    };


    return (
        <Box
            sx={{
                width: "100%",
                maxWidth: 1200,
                mx: "auto",
                px: { xs: 1, sm: 2 }
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 1
                }}
            >
                <Tag size={22} />
                <Typography
                    variant="h5"
                    fontWeight={600}
                    sx={{
                        fontSize: { xs: "1.1rem", sm: "1.25rem" }
                    }}
                >
                    Basic Information
                </Typography>
            </Box>

            <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                    mb: { xs: 2, sm: 4 },
                    fontSize: { xs: "0.8rem", sm: "0.875rem" }
                }}
            >
                Provide basic details about your product
            </Typography>

            {/* Main Form */}
            <Grid
                container
                spacing={{ xs: 2, sm: 3 }}
            >
                <Grid item xs={12}>
                    <CategorySelector
                        formData={formData}
                        setFormData={setFormData}
                        categories={categories}
                        subcategories={availableSubcategories}
                        errors={errors}
                        onAddCategory={() => setNewCategoryOpen(true)}
                        onAddSubcategory={() => setNewSubcategoryOpen(true)}
                    />
                </Grid>

                <Grid item xs={12}>
                    <ProductDetailsForm
                        formData={formData}
                        setFormData={setFormData}
                        errors={errors}
                    />
                </Grid>
            </Grid>

            {/* Dialogs */}
            <AddCategoryDialog
                open={newCategoryOpen}
                onClose={() => setNewCategoryOpen(false)}
                newCategory={newCategory}
                setNewCategory={setNewCategory}
                createCategory={createCategory}
                errors={errors}
                setErrors={setErrors}
            />

            <AddSubcategoryDialog
                open={newSubcategoryOpen}
                onClose={() => setNewSubcategoryOpen(false)}
                newSubcategory={newSubcategory}
                setNewSubcategory={setNewSubcategory}
                onAddSubcategory={handleAddSubcategory} // pass the function
                errors={errors}
                categoryId={formData.categoryId} // ✅ pass the selected category ID
                categoryName={
                    categories.find(cat => cat.id === formData.categoryId)?.name || ""
                } // ✅ pass the name
            />

        </Box>
    );
};

export default BasicInfoStep;
