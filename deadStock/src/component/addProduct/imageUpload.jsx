// ProductImagesSection.jsx
import {
  Box,
  Grid,
  Typography,
  Paper,
  LinearProgress,
  Stack,
} from "@mui/material";
import { UploadCloud} from "lucide-react";

const ProductImagesSection = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 4,
        p: { xs: 3, md: 4 },
        background: `
          linear-gradient(#fff, #fff) padding-box,
          linear-gradient(135deg, #22c55e, #f97316) border-box
        `,
        border: "1px solid transparent",
      }}
    >
      {/* Accent Glow */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at bottom right, rgba(34,197,94,0.12), transparent 60%)",
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <Box
        display="flex"
        alignItems="center"
        gap={2}
        mb={4}
        flexDirection="column "
      >
        <Box>
          <Typography fontSize={20} fontWeight={800}>
            Product Images
          </Typography>
          <Typography fontSize={13} color="text.secondary">
            Upload clear photos to attract more buyers
          </Typography>
        </Box>
      </Box>

      {/* Upload Area */}
      <Box
        sx={{
          border: "2px dashed",
          borderColor: "#d1d5db",
          borderRadius: 3,
          py: 6,
          px: 2,
          textAlign: "center",
          cursor: "pointer",
          transition: "all .25s ease",
          backgroundColor: "#fafafa",
          "&:hover": {
            borderColor: "#22c55e",
            backgroundColor: "#f0fdf4",
          },
        }}
      >
        <UploadCloud size={36} />
        <Typography mt={1.5} fontWeight={600}>
          Click to upload or drag & drop
        </Typography>
        <Typography variant="caption" color="text.secondary">
          PNG, JPG, GIF · Max 800×400px
        </Typography>
      </Box>

      {/* Preview Thumbnails */}
      <Grid container spacing={2} mt={3}>
        {[1, 2].map((i) => (
          <Grid item xs={4} sm={3} md={2} key={i}>
            <Box
              sx={{
                width: "100%",
                aspectRatio: "1 / 1",
                bgcolor: "grey.100",
                borderRadius: 3,
                border: "1px solid #e5e7eb",
              }}
            />
          </Grid>
        ))}

        {/* Upload Progress */}
        <Grid item xs={12} sm={6} md={4}>
          <Stack spacing={1}>
            <Typography variant="caption" fontWeight={600}>
              Uploading… 45%
            </Typography>
            <LinearProgress
              sx={{
                height: 8,
                borderRadius: 5,
              }}
            />
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProductImagesSection;
