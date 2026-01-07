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
        p: { xs: 2, sm: 3, md: 4 }, // responsive padding
        borderRadius: 3,
        backgroundColor: "#f8fff8",
        border: "2px solid #e0f2e1",
      }}
    >
      <Stack spacing={{ xs: 2, sm: 2.5, md: 3 }}> {/* responsive spacing */}
        {/* Product Description */}
        <Box>
          <Typography
            variant="h5"
            fontWeight={700}
            sx={{ color: "#1B5E20", mb: 1, fontSize: { xs: "1.1rem", sm: "1.25rem", md: "1.5rem" } }}
          >
            Product Description
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ lineHeight: 1.6, fontSize: { xs: "0.85rem", sm: "0.9rem", md: "1rem" } }}
          >
            {product.description ||
              "This is a premium auction item with excellent quality and craftsmanship."}
          </Typography>
        </Box>

        <Divider sx={{ borderColor: "#c8e6c9" }} />

        {/* Specifications */}
        <Box>
          <Typography
            variant="h5"
            fontWeight={700}
            sx={{ color: "#1B5E20", mb: 2, fontSize: { xs: "1.1rem", sm: "1.25rem", md: "1.5rem" } }}
          >
            Specifications
          </Typography>
          <Stack spacing={{ xs: 1, sm: 1.5 }}>
            {specs.map((spec, index) => (
              <Stack
                key={index}
                direction="row"
                justifyContent="space-between"
                sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" } }}
              >
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" } }}>
                  {spec.label}
                </Typography>
                <Typography variant="body1" fontWeight={600} sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" } }}>
                  {spec.value}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Box>

        <Divider sx={{ borderColor: "#c8e6c9" }} />

        {/* Features / Highlights */}
        <Box>
          <Typography
            variant="h5"
            fontWeight={700}
            sx={{ color: "#1B5E20", mb: 2, fontSize: { xs: "1.1rem", sm: "1.25rem", md: "1.5rem" } }}
          >
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
                  fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.9rem" }, // responsive font
                  py: { xs: 0.3, sm: 0.4, md: 0.5 },
                  px: { xs: 0.8, sm: 1, md: 1.2 },
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
