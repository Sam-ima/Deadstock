// AddProductPage.jsx
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  Alert,
  Snackbar,
  CircularProgress
} from "@mui/material";
import { Save, Upload, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext/authContext";
import { useProducts } from "../../context/productContext";
import BasicInfoSection from "./basicInformationSection";
import PricingSection from "./pricingSection";
import ProductImagesSection from "./imageUpload";

const AddProductPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { createProduct } = useProducts();
  
  const [formData, setFormData] = useState({
    name: '',
    categorySlug: '',
    subcategoryId: '',
    description: '',
    condition: 'New',
    stock: 1,
    basePrice: 0,
    floorPrice: 0,
    saleType: 'direct',
    images: [],
    sellerId: currentUser?.uid,
    sellerType: currentUser?.userType || 'B2C',
    requiresB2BVerification: false,
    moq: 1,
    bulkDiscount: 0,
    status: 'draft'
  });

  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    
    // Required fields
    if (!formData.name) errors.name = "Product name is required";
    if (!formData.categorySlug) errors.categorySlug = "Category is required";
    if (!formData.description || formData.description.length < 20) 
      errors.description = "Description must be at least 20 characters";
    if (!formData.condition) errors.condition = "Condition is required";
    if (!formData.stock || formData.stock < 1) errors.quantity = "Quantity must be at least 1";
    if (!formData.basePrice || formData.basePrice <= 0) errors.basePrice = "Price must be greater than 0";
    
    // Floor price validation
    if (formData.floorPrice < 0 || formData.floorPrice > formData.basePrice) {
      errors.floorPrice = "Floor price must be between 0 and base price";
    }
    
    // MOQ validation for B2B
    if (currentUser?.userType === 'B2B' && (!formData.moq || formData.moq < 1)) {
      errors.moq = "MOQ must be at least 1";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      setSnackbar({
        open: true,
        message: 'Please fix all errors before submitting',
        severity: 'error'
      });
      return;
    }

    setLoading(true);
    
    try {
      // Prepare final product data
      const productData = {
        ...formData,
        sellerId: currentUser.uid,
        sellerType: currentUser.userType,
        currentPrice: formData.basePrice, // Initial price
        createdAt: new Date().toISOString(),
        depreciationCount: 0,
        bids: [],
        sold: 0,
        rating: 0,
        reviews: 0
      };

      // Upload images to Firebase Storage (simplified)
      // In production, you would:
      // 1. Upload to Firebase Storage
      // 2. Get download URLs
      // 3. Replace formData.images with URLs
      
      await createProduct(productData);
      
      setSnackbar({
        open: true,
        message: 'Product listed successfully!',
        severity: 'success'
      });
      
      // Redirect after delay
      setTimeout(() => {
        navigate('/seller/dashboard');
      }, 2000);
      
    } catch (error) {
      console.error('Error listing product:', error);
      setSnackbar({
        open: true,
        message: `Failed to list product: ${error.message}`,
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDraft = () => {
    // Save as draft logic
    setFormData(prev => ({ ...prev, status: 'draft' }));
    setSnackbar({
      open: true,
      message: 'Draft saved successfully',
      severity: 'info'
    });
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: '#f9fafb' }}>
      <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
        {/* Header */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ sm: "center" }}
          spacing={2}
          sx={{ mb: 4 }}
        >
          <Box>
            <Typography fontSize={28} fontWeight={800} color="primary">
              List an Item
            </Typography>
            <Typography fontSize={14} color="text.secondary">
              Add details to publish your product on the marketplace
            </Typography>
            <Typography fontSize={12} color="text.secondary" sx={{ mt: 0.5 }}>
              Seller: {currentUser?.email} ({currentUser?.userType || 'B2C'})
            </Typography>
          </Box>

          <Button
            variant="outlined"
            startIcon={<ArrowLeft size={16} />}
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
        </Stack>

        {/* Error Summary */}
        {Object.keys(formErrors).length > 0 && (
          <Alert severity="error" sx={{ mb: 3 }}>
            Please fix the errors in the form before submitting
          </Alert>
        )}

        {/* Form Sections */}
        <Stack spacing={4}>
          <BasicInfoSection 
            formData={formData} 
            setFormData={setFormData}
          />
          
          <PricingSection 
            formData={formData} 
            setFormData={setFormData}
            isB2BUser={currentUser?.userType === 'B2B'}
          />
          
          <ProductImagesSection 
            formData={formData} 
            setFormData={setFormData}
          />

          {/* Action Bar */}
          <Paper
            elevation={1}
            sx={{
              p: 3,
              borderRadius: 3,
              bgcolor: 'white',
              position: 'sticky',
              bottom: 0,
              zIndex: 1000
            }}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
            >
              <Typography variant="caption" color="text.secondary">
                All fields marked with * are required
              </Typography>
              
              <Stack direction="row" spacing={2}>
                <Button
                  variant="outlined"
                  onClick={handleSaveDraft}
                  disabled={loading}
                  startIcon={<Save size={16} />}
                >
                  Save Draft
                </Button>

                <Button
                  variant="contained"
                  size="large"
                  onClick={handleSubmit}
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={16} /> : <Upload size={18} />}
                  sx={{
                    px: 4,
                    fontWeight: 600,
                    textTransform: "capitalize",
                    bgcolor: "#19683d",
                    '&:hover': { bgcolor: "#14532d" }
                  }}
                >
                  {loading ? 'Publishing...' : 'Publish Item'}
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </Stack>
      </Container>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddProductPage;

const modernInput = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 3,
    backgroundColor: "#fafafa",
    fontSize: 14.5,
    transition: "all .25s ease",
    "& fieldset": {
      borderColor: "#e5e7eb",
    },
    "&:hover fieldset": {
      borderColor: "#22c55e",
    },
    "&.Mui-focused": {
      backgroundColor: "#fff",
      boxShadow: "0 0 0 4px rgba(34,197,94,0.15)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#22c55e",
    },
  },
};