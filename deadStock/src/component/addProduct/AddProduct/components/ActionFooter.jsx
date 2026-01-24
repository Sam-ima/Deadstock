// components/ActionFooter.jsx
import { Box, Button, CircularProgress, Paper } from "@mui/material";
import { Save, Upload, CheckCircle } from "lucide-react";

const ActionFooter = ({
  loading,
  activeStep,
  totalSteps,
  onBack,
  onNext,
  onSaveDraft
}) => (
  <Paper
    sx={{
      p: { xs: 2, sm: 3 },
      borderRadius: 3,
    //   position: "sticky",
      bottom: 0,
      zIndex: 10,
      bgcolor: "background.paper"
    }}
  >
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "space-between",
        alignItems: { xs: "stretch", sm: "center" },
        gap: { xs: 1.5, sm: 2 }
      }}
    >
      {/* Save Draft */}
      <Button
        variant="outlined"
        onClick={onSaveDraft}
        disabled={loading}
        startIcon={<Save size={18} />}
        fullWidth
        sx={{
          width: { sm: "auto" },
          fontSize: { xs: "0.85rem", sm: "0.95rem" }
        }}
      >
        Save as Draft
      </Button>

      {/* Navigation Buttons */}
      <Box
        sx={{
          display: "flex",
          gap: 1.5,
          flexDirection: { xs: "column", sm: "row" }
        }}
      >
        <Button
          variant="outlined"
          onClick={onBack}
          disabled={loading}
          fullWidth
          sx={{
            fontSize: { xs: "0.85rem", sm: "0.95rem" },
            // backgroundColor: "#f3f4f6",
          }}
        >
          {activeStep === 0 ? "Cancel" : "Back"}
        </Button>

        <Button
          variant="contained"
          onClick={onNext}
          disabled={loading}
          fullWidth
          startIcon={
            loading ? (
              <CircularProgress size={18} />
            ) : activeStep === totalSteps - 1 ? (
              <CheckCircle size={18} />
            ) : (
              <Upload size={18} />
            )
          }
          sx={{
            fontSize: { xs: "0.85rem", sm: "0.95rem" },
            bgcolor: activeStep === totalSteps - 1 ? "#22c55e" : "#19683d",
            "&:hover": {
              bgcolor: activeStep === totalSteps - 1 ? "#16a34a" : "#14532d"
            },
            
          }}
        >
          {loading
            ? "Processing..."
            : activeStep === totalSteps - 1
            ? "Publish Product"
            : "Continue"}
        </Button>
      </Box>
    </Box>
  </Paper>
);

export default ActionFooter;
