// src/components/BrowseByCategory/BrowseHeader.jsx
import { Typography, Box } from '@mui/material';

const BrowseHeader = () => {
  return (
    <Box textAlign="center" mb={4}>
      <Typography
        fontWeight={800}
        sx={{
          mb: 1,
          color: "#1F1F1F",

          fontSize: {
            xs: "24px",   // mobile
            sm: "28px",   // small tablets
            md: "32px",   // tablets / small laptop
            lg: "40px",   // desktop
            xl: "48px",   // large screens
          },

          lineHeight: 1.2,
        }}
      >
        Browse by Category
      </Typography>


      <Typography
        variant="body1"
        color="text.secondary"
        maxWidth={520}
        mx="auto"
        sx={{fontSize: {
            xs: "16px",   // mobile
            sm: "18px",   // small tablets
            md: "20px",   // tablets / small laptop
            lg: "22px",   // desktop
            xl: "24px",   // large screens
          },}}
      >
        Explore items by category and find exactly what you need
      </Typography>
    </Box>
  );
};

export default BrowseHeader;
