// AddProductPage.jsx
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { Save, Upload } from "lucide-react";
import BasicInfoSection from "./basicInformationSection";
import PricingSection from "./pricingSection";
import ProductImagesSection from "./imageUpload";

const AddProductPage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
       
      }}
    >
      <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
        {/* Header */}
        
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ sm: "center" }}
            spacing={2}
          >
            <Box>
              <Typography fontSize={28} fontWeight={800}>
                List an Item
              </Typography>
              <Typography fontSize={14} color="text.secondary">
                Add details to publish your product on the marketplace
              </Typography>
            </Box>
{/* 
            <Button
              variant="outlined"
              startIcon={<ArrowLeft size={16} />}
            >
              Cancel
            </Button> */}
          </Stack>
     

        {/* Form Sections */}
        <Stack spacing={4}>
          <BasicInfoSection />
          <PricingSection />
          <ProductImagesSection />

          {/* Action Bar */}
          
            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent="flex-end"
              spacing={2}
            >
              {/* <Button
                // variant="outlined"
                startIcon={<Save size={16} />}
                fullWidth={{ xs: true, sm: false }}
                sx={{color:"#fff", bgcolor:"#e6802cff"}}
              >
                Save Draft
              </Button> */}

              <Button
                variant="contained"
                size="large"
                startIcon={<Upload size={18} />}
                fullWidth={{ xs: true, sm: false }}
                sx={{
                  px: 4,
                  fontWeight: 400,
                  textTransform:"capitalize",
                  bgcolor:"#19683dff"
                }}
              >
                Publish Item
              </Button>
            </Stack>
          
        </Stack>
      </Container>
    </Box>
  );
};

export default AddProductPage;
