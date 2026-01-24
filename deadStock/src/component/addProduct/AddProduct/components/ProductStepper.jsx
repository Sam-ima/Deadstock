// components/ProductStepper.jsx
import { Paper, Stepper, Step, StepLabel } from "@mui/material";

const ProductStepper = ({ steps, activeStep }) => (
  <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
    <Stepper activeStep={activeStep} alternativeLabel>
      {steps.map(label => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  </Paper>
);

export default ProductStepper;
