// src/pages/AddProduct/AddProductPage.jsx
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  Alert,
  Snackbar,
  CircularProgress,
  Paper,
} from "@mui/material";
import { Save, Upload, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/authContext/authContext";
import { useProducts } from "../../context/productContext";

import BasicInfoSection from "./basicInformationSection";
import PricingSection from "./pricingSection";
import ProductImagesSection from "./imageUpload";
import DynamicFields from "./dynamicFields";

const AddProductPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { createProduct } = useProducts();

  /* -------------------- CORE STATES -------------------- */

  const [formData, setFormData] = useState({
    name: "",
    categorySlug: "",
    subcategoryId: "",
    description: "",
    condition: "New",
    stock: 1,
    basePrice: 0,
    floorPrice: 0,
    saleType: "direct",
    status: "draft",
  });

  const [customFields, setCustomFields] = useState([]); // 🔥 dynamic fields
  const [images, setImages] = useState([]); // image files

  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  /* -------------------- VALIDATION -------------------- */

  const validateForm = () => {
    if (!formData.name) return "Product name is required";
    if (!formData.categorySlug) return "Category is required";
    if (!formData.description || formData.description.length < 20)
      return "Description must be at least 20 characters";
    if (formData.basePrice <= 0) return "Base price must be greater than 0";
    if (formData.stock < 1) return "Stock must be at least 1";
    return null;
  };

  /* -------------------- SUBMIT HANDLER -------------------- */

  const handleSubmit = async (status = "active") => {
    const error = validateForm();
    if (error) {
      setSnackbar({
        open: true,
        message: error,
        severity: "error",
      });
      return;
    }

    setLoading(true);

    try {
      await createProduct({
        productData: {
          ...formData,
          status,
          sellerId: currentUser.uid,
          sellerType: currentUser.userType || "B2C",
          currentPrice: formData.basePrice,
        },
        images,
        customFields,
        sellerId: currentUser.uid,
      });

      setSnackbar({
        open: true,
        message:
          status === "draft"
            ? "Draft saved successfully"
            : "Product published successfully",
        severity: "success",
      });

      setTimeout(() => {
        navigate("/seller/dashboard");
      }, 1500);
    } catch (err) {
      console.error(err);
      setSnackbar({
        open: true,
        message: "Failed to save product",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  /* -------------------- UI -------------------- */

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f9fafb" }}>
      <Container maxWidth="md" sx={{ py: 6 }}>
        {/* Header */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
        >
          <Box>
            <Typography fontSize={28} fontWeight={800}>
              Add Product
            </Typography>
            <Typography fontSize={13} color="text.secondary">
              Seller: {currentUser?.email}
            </Typography>
          </Box>

          <Button
            startIcon={<ArrowLeft size={16} />}
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </Stack>

        {/* Form Sections */}
        <Stack spacing={4}>
          <BasicInfoSection
            formData={formData}
            setFormData={setFormData}
          />

          <PricingSection
            formData={formData}
            setFormData={setFormData}
            isB2BUser={currentUser?.userType === "B2B"}
          />

          <ProductImagesSection
            images={images}
            setImages={setImages}
          />

          {/* 🔥 Dynamic Fields */}
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography fontWeight={700} mb={2}>
              Additional Product Details (Dynamic)
            </Typography>
            <DynamicFields
              fields={customFields}
              setFields={setCustomFields}
            />
          </Paper>

          {/* Action Bar */}
          <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 3,
              position: "sticky",
              bottom: 0,
              bgcolor: "#fff",
            }}
          >
            <Stack direction="row" justifyContent="space-between">
              <Button
                variant="outlined"
                startIcon={<Save size={16} />}
                disabled={loading}
                onClick={() => handleSubmit("draft")}
              >
                Save Draft
              </Button>

              <Button
                variant="contained"
                startIcon={
                  loading ? (
                    <CircularProgress size={16} />
                  ) : (
                    <Upload size={18} />
                  )
                }
                disabled={loading}
                onClick={() => handleSubmit("active")}
                sx={{
                  bgcolor: "#19683d",
                  "&:hover": { bgcolor: "#14532d" },
                }}
              >
                {loading ? "Publishing..." : "Publish Product"}
              </Button>
            </Stack>
          </Paper>
        </Stack>
      </Container>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddProductPage;
