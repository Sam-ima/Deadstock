// src/pages/product/components/tabs/DescriptionTab.jsx
import { Box, Typography, Paper, Grid, Stack, Chip } from '@mui/material';
import { ArrowForward, LocalShipping } from '@mui/icons-material';

const DescriptionTab = ({ product }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Product Description
        {product.moq > 1 && (
          <Chip
            icon={<LocalShipping />}
            label={`MOQ: ${product.moq}`}
            size="small"
            sx={{ ml: 1 }}
          />
        )}
      </Typography>

      <Typography paragraph sx={{ lineHeight: 1.8 }}>
        {product.description}
      </Typography>

      {product.keyFeatures && (
        <Paper sx={{ p: 3, bgcolor: 'primary.light', borderRadius: 1 }}>
          <Typography fontWeight={600} gutterBottom>
            Key Highlights
          </Typography>
          <Grid container spacing={1}>
            {product.keyFeatures.slice(0, 4).map((f, i) => (
              <Grid item xs={12} sm={6} key={i}>
                <Stack direction="row" spacing={1}>
                  <ArrowForward fontSize="small" />
                  <Typography variant="body2">{f}</Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}
    </Box>
  );
};

export default DescriptionTab;
