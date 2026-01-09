import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { Upload } from "lucide-react";
import BasicInfoSection from "./basicInformationSection";
import PricingSection from "./pricingSection";
import ProductImagesSection from "./imageUpload";
import { useProducts } from "../../context/productContext";
import { useAuth } from "../../context/authContext";

const AddProductPage = () => {
  const { createProduct } = useProducts();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    categorySlug: "",
    subcategoryId: "",
    description: "",

    basePrice: "",
    floorPrice: "",
    quantity: 1,
    moq: 1,

    images: [],
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePublish = async () => {
    const payload = {
      ...formData,
      basePrice: Number(formData.basePrice),
      currentPrice: Number(formData.basePrice),
      floorPrice: Number(formData.floorPrice),
      quantity: Number(formData.quantity),
      moq: Number(formData.moq),

      sellerId: user.uid,
      sellerType: user.role, // B2C or B2B
      sellingType: "DIRECT",
      status: "ACTIVE",
    };

    await createProduct(payload);
  };

  return (
    <Box minHeight="100vh">
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography fontSize={28} fontWeight={800}>
          List an Item
        </Typography>

        <Stack spacing={4} mt={4}>
          <BasicInfoSection data={formData} onChange={handleChange} />
          <PricingSection data={formData} onChange={handleChange} />
          <ProductImagesSection onUpload={(imgs) => handleChange("images", imgs)} />

          <Button
            variant="contained"
            size="large"
            startIcon={<Upload size={18} />}
            onClick={handlePublish}
            sx={{ bgcolor: "#19683dff" }}
          >
            Publish Item
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default AddProductPage;
