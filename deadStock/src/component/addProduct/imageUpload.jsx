// src/pages/AddProduct/components/ImagesStep.jsx
import React, { useRef, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  Alert,
  LinearProgress,
  Chip
} from "@mui/material";
import { UploadCloud, X, Image as ImageIcon } from "lucide-react";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

const ImagesStep = ({ images, setImages }) => {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleImageUpload = (files) => {
    const selectedFiles = Array.from(files);
    const remainingSlots = 10 - images.length;
    const filesToAdd = selectedFiles.slice(0, remainingSlots);

    if (!filesToAdd.length) return;

    setUploading(true);
    setError("");

    const updatedImages = [...images];

    filesToAdd.forEach((file) => {
      if (!ALLOWED_TYPES.includes(file.type)) {
        setError("Only JPG, JPEG, PNG, and WEBP images are allowed.");
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        setError("Each image must be less than 5MB.");
        return;
      }

      updatedImages.push({
        file,                     // ⬅ original File object (used later for Cloudinary)
        preview: URL.createObjectURL(file),
        name: file.name,
        size: file.size,
        type: file.type,
        isMain: updatedImages.length === 0
      });
    });

    setImages(updatedImages);
    setUploading(false);
  };

  const handleRemoveImage = (index) => {
    const updated = images.filter((_, i) => i !== index);

    if (images[index]?.preview) {
      URL.revokeObjectURL(images[index].preview);
    }

    if (updated.length && !updated.some(img => img.isMain)) {
      updated[0].isMain = true;
    }

    setImages(updated);
  };

  const handleSetMainImage = (index) => {
    setImages(images.map((img, i) => ({
      ...img,
      isMain: i === index
    })));
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} gutterBottom display="flex" gap={1}>
        <ImageIcon size={22} /> Product Images
      </Typography>

      <Typography variant="body2" color="text.secondary" mb={3}>
        Upload up to 10 images. JPG, PNG, WEBP • Max 5MB each.
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <input
        ref={fileInputRef}
        type="file"
        hidden
        multiple
        accept="image/*"
        onChange={(e) => handleImageUpload(e.target.files)}
      />

      {/* Upload Box */}
      <Box
        onClick={() => fileInputRef.current.click()}
        sx={{
          border: "2px dashed #cbd5e1",
          borderRadius: 3,
          p: 5,
          textAlign: "center",
          cursor: "pointer",
          bgcolor: "#fafafa",
          mb: 4,
          "&:hover": { borderColor: "#22c55e", bgcolor: "#f0fdf4" }
        }}
      >
        <UploadCloud size={42} />
        <Typography fontWeight={600} mt={1}>
          Drag & drop or click to upload
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {images.length}/10 images selected
        </Typography>

        {uploading && <LinearProgress sx={{ mt: 2 }} />}
      </Box>

      {/* Preview Grid */}
      {images.length > 0 && (
        <Grid container spacing={2}>
          {images.map((img, index) => (
            <Grid item xs={6} sm={4} md={3} key={index}>
              <Box position="relative">
                <Box
                  component="img"
                  src={img.preview}
                  alt={img.name}
                  onClick={() => handleSetMainImage(index)}
                  sx={{
                    width: "100%",
                    height: 140,
                    objectFit: "cover",
                    borderRadius: 2,
                    border: img.isMain ? "3px solid #22c55e" : "1px solid #e5e7eb",
                    cursor: "pointer"
                  }}
                />

                {img.isMain && (
                  <Chip
                    label="Main"
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 8,
                      left: 8,
                      bgcolor: "#22c55e",
                      color: "#fff",
                      fontWeight: 600
                    }}
                  />
                )}

                <IconButton
                  size="small"
                  onClick={() => handleRemoveImage(index)}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    bgcolor: "rgba(0,0,0,0.6)",
                    color: "#fff",
                    "&:hover": { bgcolor: "rgba(0,0,0,0.8)" }
                  }}
                >
                  <X size={16} />
                </IconButton>
              </Box>

              <Typography variant="caption" noWrap>
                {img.name}
              </Typography>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ImagesStep;
