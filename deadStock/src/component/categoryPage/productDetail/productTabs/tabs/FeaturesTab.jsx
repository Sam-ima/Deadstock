// src/pages/product/components/tabs/FeaturesTab.jsx
import { Grid, Paper, Typography } from "@mui/material";
import { Star } from "@mui/icons-material";

const FeaturesTab = ({ product }) => (
  <Grid container spacing={2}>
    {product.features.map((feature, i) => (
      <Grid item xs={12} sm={6} key={i}>
        <Paper
          sx={{
            p: { xs: 1.5, sm: 2 },
            display: "flex",
            gap: { xs: 0.5, sm: 1 },
            alignItems: "center",
          }}
        >
          <Star color="primary" sx={{ fontSize: { xs: 16, sm: 20 } }} />
          <Typography
            sx={{ fontSize: { xs: "0.8rem", sm: "0.95rem" } }}
          >
            {feature}
          </Typography>
        </Paper>
      </Grid>
    ))}
  </Grid>
);

export default FeaturesTab;
