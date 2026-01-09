// src/pages/product/components/tabs/SpecificationsTab.jsx
import { Grid, Card, CardContent, Typography } from '@mui/material';

const SpecificationsTab = ({ product }) => (
  <Grid container spacing={2}>
    {Object.entries(product.specifications).map(([key, value]) => (
      <Grid item xs={12} sm={6} md={4} key={key}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="caption" color="text.secondary">
              {key}
            </Typography>
            <Typography fontWeight={500}>{value}</Typography>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
);

export default SpecificationsTab;
