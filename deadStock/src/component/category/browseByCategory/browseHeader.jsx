// src/components/BrowseByCategory/BrowseHeader.jsx
import { Typography, Box } from '@mui/material';

const BrowseHeader = () => {
  return (
    <Box textAlign="center" mb={4}>
      <Typography
        variant="h4"
        fontWeight={800}
        sx={{
          mb: 1,
          color: '#1F1F1F',
          // background: 'linear-gradient(135deg, #667eea, #764ba2)',
          // WebkitBackgroundClip: 'text',
          // WebkitTextFillColor: 'transparent',
        }}
      >
        Browse by Category
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        maxWidth={520}
        mx="auto"
      >
        Explore items by category and find exactly what you need
      </Typography>
    </Box>
  );
};

export default BrowseHeader;
