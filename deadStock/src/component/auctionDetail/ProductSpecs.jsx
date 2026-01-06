import React from "react";
import { Paper, Stack, Typography, Divider, Box, Chip } from "@mui/material";

const ProductSpecs = ({ product }) => {
  const specs = Array.isArray(product.specifications)
    ? product.specifications
    : [
        { label: "Condition", value: "New" },
        { label: "Material", value: "Stainless Steel" },
        { label: "Color", value: "Matte Black" },
        { label: "Weight", value: "2.5 kg" },
        { label: "Dimensions", value: "12 x 8 x 6 inches" },
      ];

  const features = Array.isArray(product.features)
    ? product.features
    : ["Limited Edition", "Eco-friendly", "Warranty Included", "Free Shipping"];

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, md: 4 },
        borderRadius: 3,
        backgroundColor: "#f8fff8",
        border: "2px solid #e0f2e1",
      }}
    >
      <Stack spacing={3}>
        {/* Product Description */}
        <Box>
          <Typography variant="h5" fontWeight={700} sx={{ color: "#1B5E20", mb: 1 }}>
            Product Description
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
            {product.description || "This is a premium auction item with excellent quality and craftsmanship."}
          </Typography>
        </Box>

        <Divider sx={{ borderColor: "#c8e6c9" }} />

        {/* Specifications */}
        <Box>
          <Typography variant="h5" fontWeight={700} sx={{ color: "#1B5E20", mb: 2 }}>
            Specifications
          </Typography>
          <Stack spacing={1.5}>
            {specs.map((spec, index) => (
              <Stack key={index} direction="row" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">
                  {spec.label}
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  {spec.value}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Box>

        <Divider sx={{ borderColor: "#c8e6c9" }} />

        {/* Features / Highlights */}
        <Box>
          <Typography variant="h5" fontWeight={700} sx={{ color: "#1B5E20", mb: 2 }}>
            Highlights
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {features.map((feature, index) => (
              <Chip
                key={index}
                label={feature}
                sx={{
                  backgroundColor: "#d8a855",
                  color: "#1B5E20",
                  fontWeight: 600,
                  mb: 1,
                }}
              />
            ))}
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );
};

export default ProductSpecs;
