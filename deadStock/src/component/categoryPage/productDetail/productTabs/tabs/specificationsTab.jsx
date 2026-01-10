// src/pages/product/components/tabs/SpecificationsTab.jsx
import { Grid, Card, CardContent, Typography } from "@mui/material";

const SpecificationsTab = ({ product }) => (
  <Grid container spacing={2}>
    {Object.entries(product.specifications).map(([key, value]) => (
      <Grid item xs={12} sm={6} md={4} key={key}>
        <Card variant="outlined" sx={{ p: { xs: 1, sm: 2 } }}>
          <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontSize: { xs: "0.7rem", sm: "0.8rem" } }}
            >
              {key}
            </Typography>
            <Typography
              fontWeight={500}
              sx={{ fontSize: { xs: "0.85rem", sm: "0.95rem" } }}
            >
              {value}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
);

export default SpecificationsTab;
