// src/pages/product/components/ProductTabs.jsx
import { Box, Tabs, Tab, Typography, Grid, Paper, Stack } from '@mui/material';

const ProductTabs = ({ product, tabValue, setTabValue }) => {
  const handleTabChange = (event, newValue) => setTabValue(newValue);

  return (
    <Box sx={{ width: '100%', mt: 5 }}>
      <Tabs value={tabValue} onChange={handleTabChange} centered>
        <Tab label="Description" />
        {product.specifications && <Tab label="Specifications" />}
        {product.features && <Tab label="Features" />}
        <Tab label="Reviews" />
      </Tabs>

      <Box sx={{ py: 3 }}>
        {tabValue === 0 && product.description && (
          <Typography>{product.description}</Typography>
        )}
        {tabValue === 1 && product.specifications && (
          <Grid container spacing={2}>
            {Object.entries(product.specifications).map(([key, value]) => (
              <Grid item xs={12} sm={6} key={key}>
                <Paper sx={{ p: 2, border: '1px solid grey.200', borderRadius: 2 }}>
                  <Typography color="text.secondary">{key}</Typography>
                  <Typography fontWeight="medium">{value}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
        {tabValue === 2 && product.features && (
          <Grid container spacing={2}>
            {product.features.map((feature, i) => (
              <Grid item xs={12} sm={6} key={i}>
                <Stack direction="row" spacing={1} alignItems="flex-start">
                  <Typography color="primary.main">•</Typography>
                  <Typography>{feature}</Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
        )}
        {tabValue === 3 && (
          <Typography>{product.reviews} reviews • Average rating: {product.rating}/5</Typography>
        )}
      </Box>
    </Box>
  );
};

export default ProductTabs;
