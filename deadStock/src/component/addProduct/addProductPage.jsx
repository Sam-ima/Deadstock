// src/pages/AddProduct/AddProductPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  CircularProgress
} from "@mui/material";
import {
  Save,
  Upload,
  ArrowLeft,
  CheckCircle
} from "lucide-react";

import { useAuth } from "../../context/authContext/authContext";
import { useProducts } from "../../context/productContext";

import BasicInfoStep from "./basicInformationSection";
import PricingStep from "./pricingSection";
import ImagesStep from "./imageUpload";
import SpecificationsStep from "./specificationSteps";
import ReviewStep from "./reviewSteps";

const steps = [
  "Basic Information",
  "Pricing & Inventory",
  "Images",
  "Specifications",
  "Review & Publish"
];

const AddProductPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createProduct } = useProducts();

  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);

  // Main form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    categoryId: "",
    subcategoryId: "",
    basePrice: "",
    floorPrice: "",
    stock: "1",
    saleType: "direct",
    status: "draft"
  });

  // Images state
  const [images, setImages] = useState([]);

  // Specifications state
  const [specifications, setSpecifications] = useState([]);
  const [features, setFeatures] = useState([]);

  // B2B fields
  const [b2bFields, setB2bFields] = useState({
    moq: "1",
    bulkPrice: "",
    bulkDiscount: "0",
    requiresB2BVerification: false
  });

  // Toast functions
  const showSuccess = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const showError = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const showInfo = (message) => {
    toast.info(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      handleSubmit("active");
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep === 0) {
      navigate(-1);
    } else {
      setActiveStep((prevStep) => prevStep - 1);
    }
  };

  // In your AddProductPage.jsx - Update validateCurrentStep function
  const validateCurrentStep = () => {
    switch (activeStep) {
      case 0: // Basic Info
        if (!formData.name.trim()) {
          showError("Product name is required");
          return false;
        }
        if (!formData.categoryId) {
          showError("Please select a category");
          return false;
        }
        if (!formData.stock || Number(formData.stock) < 1) {
          showError("Stock quantity must be at least 1");
          return false;
        }
        return true;

      case 1: // Pricing
        if (!formData.basePrice || Number(formData.basePrice) <= 0) {
          showError("Base price must be greater than 0");
          return false;
        }
        return true;

      case 2: // Images - MANDATORY CHECK
        if (images.length === 0) {
          showError("At least one product image is required");
          return false;
        }
        return true;

      default:
        return true;
    }
  };

  // In your AddProductPage.jsx - Update the handleSubmit function
  const handleSubmit = async (status = "active") => {
    console.log("=== STARTING handleSubmit ===");
    console.log("Form Data:", formData);
    console.log("User:", user);
    console.log("Images:", images);
    console.log("Specifications:", specifications);
    console.log("Features:", features);

    if (!validateCurrentStep()) {
      console.log("Validation failed");
      return;
    }

    setLoading(true);

    try {
      // Prepare specifications object
      const specsObj = {};
      specifications.forEach(spec => {
        if (spec.key && spec.value) {
          specsObj[spec.key.trim()] = spec.value.trim();
        }
      });

      // Prepare final product data
      // In your handleSubmit function, update the productData preparation:
      // In your handleSubmit function, update the productData preparation:
      const productData = {
        name: formData.name.trim(),
        description: formData.description?.trim() || "",
        categoryId: formData.categoryId,
        subcategoryId: formData.subcategoryId || "",
        basePrice: parseFloat(Number(formData.basePrice).toFixed(2)),
        floorPrice: parseFloat((Number(formData.floorPrice) || Number(formData.basePrice) * 0.3).toFixed(2)),
        stock: Number(formData.stock),
        status: status,
        saleType: formData.saleType,

        // Make specifications and features optional
        ...(specifications.length > 0 && {
          specifications: specsObj
        }),
        ...(features.length > 0 && {
          features: features.filter(f => f.trim() !== "")
        }),

        moq: Number(b2bFields.moq) || 1,
        bulkPrice: b2bFields.bulkPrice ? Number(b2bFields.bulkPrice) : undefined,
        bulkDiscount: Number(b2bFields.bulkDiscount) || 0,
        requiresB2BVerification: Boolean(b2bFields.requiresB2BVerification) || false
      };

      console.log("Final Product Data:", productData);
      console.log("User ID:", user?.uid);
      console.log("User Type:", user?.userType);
      console.log("Images count:", images.length);

      // Validate required data
      if (!productData.name) {
        throw new Error("Product name is required");
      }
      if (!productData.categoryId) {
        throw new Error("Category is required");
      }
      if (!user || !user.uid) {
        throw new Error("User authentication failed");
      }

      // Prepare images for upload (ensure each has a file property)
      const imagesForUpload = images.map(img => ({
        file: img.file || img,
        name: img.name || `image_${Date.now()}`,
        size: img.size || 0,
        url: img.url // Keep the preview URL for reference
      }));

      console.log("Calling createProduct...");

      // Call createProduct with ALL parameters in correct order
      await createProduct(
        productData,          // First parameter: productData
        user.uid,             // Second parameter: userId
        user.userType || "B2C", // Third parameter: userType
        imagesForUpload       // Fourth parameter: images
      );

      const successMessage = status === "draft"
        ? "Draft saved successfully!"
        : "Product published successfully!";

      showSuccess(successMessage);
      console.log("Product created successfully!");

      // Redirect after delay
      setTimeout(() => {
        navigate("/");
      }, 2000);

    } catch (error) {
      console.error("=== ERROR in handleSubmit ===");
      console.error("Error:", error);
      console.error("Error message:", error.message);

      // More specific error messages
      let errorMessage = error.message || "Failed to save product. Please try again.";

      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDraft = () => {
    handleSubmit("draft");
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <BasicInfoStep
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 1:
        return (
          <PricingStep
            formData={formData}
            setFormData={setFormData}
            b2bFields={b2bFields}
            setB2bFields={setB2bFields}
            isB2BUser={user?.userType === "B2B"}
          />
        );
      case 2:
        return (
          <ImagesStep
            images={images}
            setImages={setImages}
          />
        );
      case 3:
        return (
          <SpecificationsStep
            specifications={specifications}
            setSpecifications={setSpecifications}
            features={features}
            setFeatures={setFeatures}
          />
        );
      case 4:
        return (
          <ReviewStep
            formData={formData}
            images={images}
            specifications={specifications}
            features={features}
            b2bFields={b2bFields}
            isB2BUser={user?.userType === "B2B"}
          />
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <Box sx={{
      minHeight: "100vh",
      bgcolor: "background.default",
      py: { xs: 3, md: 4 }
    }}>
      <ToastContainer />

      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Button
            startIcon={<ArrowLeft size={20} />}
            onClick={handleBack}
            sx={{ mb: 2 }}
          >
            Back
          </Button>
          <Typography variant="h4" fontWeight={800} gutterBottom>
            Add New Product
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Seller: {user?.email || "Not logged in"} • {user?.userType || "B2C"}
          </Typography>
        </Box>

        {/* Stepper */}
        <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Paper>

        {/* Current Step Content */}
        <Paper sx={{
          p: { xs: 3, md: 4 },
          mb: 4,
          borderRadius: 3,
          minHeight: 400
        }}>
          {getStepContent(activeStep)}
        </Paper>

        {/* Action Buttons */}
        <Paper sx={{
          p: 3,
          borderRadius: 3,
          bottom: 20,
          bgcolor: "background.paper",
          boxShadow: 3
        }}>
          <Box sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 2
          }}>
            <Box>
              <Button
                variant="outlined"
                onClick={handleSaveDraft}
                disabled={loading}
                startIcon={<Save size={18} />}
              >
                Save as Draft
              </Button>
            </Box>

            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="outlined"
                onClick={handleBack}
                disabled={loading}
              >
                {activeStep === 0 ? "Cancel" : "Back"}
              </Button>

              <Button
                variant="contained"
                onClick={handleNext}
                disabled={loading}
                startIcon={
                  loading ? (
                    <CircularProgress size={18} />
                  ) : activeStep === steps.length - 1 ? (
                    <CheckCircle size={18} />
                  ) : (
                    <Upload size={18} />
                  )
                }
                sx={{
                  bgcolor: activeStep === steps.length - 1 ? "#22c55e" : "#19683d",
                  "&:hover": {
                    bgcolor: activeStep === steps.length - 1 ? "#16a34a" : "#14532d"
                  }
                }}
              >
                {loading
                  ? "Processing..."
                  : activeStep === steps.length - 1
                    ? "Publish Product"
                    : "Continue"
                }
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default AddProductPage;