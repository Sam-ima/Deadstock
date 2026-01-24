// src/pages/categories/components/EmptyState.jsx
import { Box, Typography } from "@mui/material";

const EmptyState = ({ categoryName }) => (
  <Box sx={{ textAlign: "center", py: 10, backgroundColor: "#f9f9f9" }}>
    <Typography color="text.secondary" mb={2} sx={{ fontSize: 24 }}>
      No products found
    </Typography>
    <Typography color="text.secondary" sx={{ maxWidth: 600, mx: "auto" }}>
      We're currently updating our inventory. Check back soon for new arrivals in {categoryName}!
    </Typography>
  </Box>
);

export default EmptyState;
