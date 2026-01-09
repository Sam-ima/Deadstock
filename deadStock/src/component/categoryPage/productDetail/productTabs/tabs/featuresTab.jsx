// src/pages/product/components/tabs/FeaturesTab.jsx
import { Grid, Paper, Typography } from '@mui/material';
import { Star } from '@mui/icons-material';

const FeaturesTab = ({ product }) => (
  <Grid container spacing={2}>
    {product.features.map((feature, i) => (
      <Grid item xs={12} sm={6} key={i}>
        <Paper sx={{ p: 2, display: 'flex', gap: 1 }}>
          <Star color="primary" />
          <Typography>{feature}</Typography>
        </Paper>
      </Grid>
    ))}
  </Grid>
);

export default FeaturesTab;
