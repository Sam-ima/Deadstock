import { Box, Container, Paper } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../../context/authContext/authContext";
import { useProducts } from "../../../context/productContext";

import { steps } from "./Constants";
import { useAddProductForm } from "./hooks/useAddProductForm";

import PageHeader from "./components/PageHeader";
import ProductStepper from "./components/ProductStepper";
import StepContent from "./components/StepContent";
import ActionFooter from "./components/ActionFooter";

const AddProductPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createProduct } = useProducts();

  const form = useAddProductForm({ user, createProduct, navigate });

  // ✅ VALIDATED NEXT / PUBLISH HANDLER
  const handleNext = () => {
    const isValid = form.validateCurrentStep();
    if (!isValid) return;

    if (form.activeStep === steps.length - 1) {
      form.handleSubmit("active");
    } else {
      form.setActiveStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (form.activeStep === 0) {
      navigate(-1);
    } else {
      form.setActiveStep(prev => prev - 1);
    }
  };

  return (
    <Box minHeight="100vh" py={4}>
      <ToastContainer />
      <Container maxWidth="lg">

        <PageHeader user={user} onBack={handleBack} />

        <ProductStepper
          steps={steps}
          activeStep={form.activeStep}
        />

        <Paper sx={{ p: 4, mb: 4, minHeight: 400 }}>
          <StepContent
            step={form.activeStep}
            user={user}
            {...form}
          />
        </Paper>

        <ActionFooter
          loading={form.loading}
          activeStep={form.activeStep}
          totalSteps={steps.length}
          onBack={handleBack}
          onNext={handleNext}
          onSaveDraft={() => form.handleSubmit("draft")}
        />
      </Container>
    </Box>
  );
};

export default AddProductPage;
