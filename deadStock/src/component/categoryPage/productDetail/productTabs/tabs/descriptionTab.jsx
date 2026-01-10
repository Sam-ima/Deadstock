// src/pages/product/components/tabs/DescriptionTab.jsx
import { Box, Typography, Paper, Grid, Stack, Chip } from "@mui/material";
import { ArrowForward, LocalShipping } from "@mui/icons-material";

const DescriptionTab = ({ product }) => {
  return (
    <Box>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" } }}
      >
        Product Description
        {product.moq > 1 && (
          <Chip
            icon={<LocalShipping fontSize="small" />}
            label={`MOQ: ${product.moq}`}
            size="small"
            sx={{
              ml: 1,
              fontSize: { xs: "0.65rem", sm: "0.75rem" },
              height: { xs: 20, sm: 24 },
            }}
          />
        )}
      </Typography>

      <Typography
        paragraph
        sx={{
          lineHeight: 1.8,
          fontSize: { xs: "0.85rem", sm: "0.95rem" },
        }}
      >
        {product.description}
      </Typography>

      {product.keyFeatures && product.keyFeatures.length > 0 && (
        <Paper
          sx={{
            p: { xs: 2, sm: 3 },
            bgcolor: "primary.light",
            borderRadius: 1,
          }}
        >
          <Typography
            fontWeight={600}
            gutterBottom
            sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}
          >
            Key Highlights
          </Typography>
          <Grid container spacing={1}>
            {product.keyFeatures.map((f, i) => (
              <Grid
                item
                xs={12}
                sm={6}
                key={i}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <ArrowForward fontSize="small" />
                  <Typography
                    variant="body2"
                    sx={{ fontSize: { xs: "0.75rem", sm: "0.85rem" } }}
                  >
                    {f}
                  </Typography>
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
