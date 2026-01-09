// components/AddProduct/imageUpload.jsx
import {
  Box,
  Grid,
  Typography,
  Paper,
  IconButton,
  Alert
} from "@mui/material";
import { UploadCloud, X } from "lucide-react";
import { useState, useRef } from "react";

const ProductImagesSection = ({ formData, setFormData }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const images = formData.images || [];

  const handleImageUpload = async (files) => {
    const imageFiles = Array.from(files).slice(0, 8 - images.length);
    if (imageFiles.length === 0) return;

    setUploading(true);
    setError(null);

    const uploadedImages = [...images];

    for (const file of imageFiles) {
      if (!file.type.startsWith("image/")) {
        setError("Only image files are allowed");
        continue;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size must be less than 5MB");
        continue;
      }

      const imageUrl = URL.createObjectURL(file);
      uploadedImages.push({
        url: imageUrl,
        file,
        name: file.name,
        size: file.size
      });
    }

    setFormData((prev) => ({ ...prev, images: uploadedImages }));
    setUploading(false);
  };

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setFormData((prev) => ({ ...prev, images: newImages }));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleImageUpload(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

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
      <Box display="flex" alignItems="center" gap={2} mb={4} flexDirection="column">
        <Box>
          <Typography fontSize={20} fontWeight={800}>
            Product Images
          </Typography>
          <Typography fontSize={13} color="text.secondary">
            Upload clear photos to attract more buyers (Max 8 images)
          </Typography>
        </Box>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <input
        type="file"
        ref={fileInputRef}
        multiple
        accept="image/*"
        onChange={(e) => handleImageUpload(e.target.files)}
        style={{ display: "none" }}
      />

      <Box
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current.click()}
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
        <UploadCloud size={36} color={uploading ? "#f97316" : "#6b7280"} />
        <Typography mt={1.5} fontWeight={600}>
          {uploading ? "Uploading..." : "Click to upload or drag & drop"}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          PNG, JPG, GIF · Max 5MB per image
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.5 }}>
          {images.length} of 8 images uploaded
        </Typography>
      </Box>

      {images.length > 0 && (
        <Grid container spacing={2} mt={3}>
          {images.map((img, index) => (
            <Grid item xs={6} sm={4} md={3} key={index}>
              <Box sx={{ position: "relative" }}>
                <Box
                  sx={{
                    width: "100%",
                    aspectRatio: "1 / 1",
                    bgcolor: "grey.100",
                    borderRadius: 3,
                    border: "1px solid #e5e7eb",
                    backgroundImage: `url(${img.url})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    overflow: "hidden",
                  }}
                />
                <IconButton
                  size="small"
                  onClick={() => handleRemoveImage(index)}
                  sx={{
                    position: "absolute",
                    top: 4,
                    right: 4,
                    bgcolor: "rgba(0,0,0,0.5)",
                    color: "white",
                    "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
                  }}
                >
                  <X size={16} />
                </IconButton>
                {index === 0 && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 4,
                      left: 4,
                      bgcolor: "#22c55e",
                      color: "white",
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      fontSize: "0.7rem",
                      fontWeight: 600,
                    }}
                  >
                    Main
                  </Box>
                )}
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Paper>
  );
};

export default ProductImagesSection;
