// src/pages/AddProduct/components/ImagesStep.jsx - Updated
import React, { useRef } from "react";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  Alert,
  LinearProgress,
  Chip
} from "@mui/material";
import {
  UploadCloud,
  X,
  Image as ImageIcon
} from "lucide-react";

const ImagesStep = ({ images, setImages }) => {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleImageUpload = (files) => {
    const newFiles = Array.from(files).slice(0, 10 - images.length);
    
    if (newFiles.length === 0) return;

    setUploading(true);
    setError("");

    const newImages = [...images];
    
    newFiles.forEach((file) => {
      // Validate file
      if (!file.type.startsWith("image/")) {
        setError("Only image files are allowed (PNG, JPG, JPEG, GIF)");
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size must be less than 5MB");
        return;
      }

      // Create object URL for preview
      const previewUrl = URL.createObjectURL(file);
      newImages.push({
        file: file, // Keep the original file object
        preview: previewUrl, // Store preview separately
        name: file.name,
        size: file.size,
        type: file.type,
        isMain: newImages.length === 0 // First image is main
      });
    });

    setImages(newImages);
    setUploading(false);
  };

  const handleRemoveImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    // If we removed the main image, set the first remaining image as main
    if (index === 0 && newImages.length > 0) {
      newImages[0].isMain = true;
    }
    setImages(newImages);
  };

  const handleSetMainImage = (index) => {
    const newImages = images.map((img, i) => ({
      ...img,
      isMain: i === index
    }));
    setImages(newImages);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleImageUpload(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <ImageIcon size={24} /> Product Images
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Upload clear product images (max 10 images). First image will be used as thumbnail.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <input
        type="file"
        ref={fileInputRef}
        multiple
        accept="image/*"
        onChange={(e) => handleImageUpload(e.target.files)}
        style={{ display: "none" }}
      />

      {/* Upload Area */}
      <Box
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current.click()}
        sx={{
          border: "2px dashed",
          borderColor: images.length > 0 ? "#22c55e" : "#d1d5db",
          borderRadius: 3,
          py: 6,
          px: 2,
          textAlign: "center",
          cursor: "pointer",
          transition: "all 0.3s",
          backgroundColor: images.length > 0 ? "#f0fdf4" : "#fafafa",
          mb: 3,
          "&:hover": {
            borderColor: "#22c55e",
            backgroundColor: "#f0fdf4"
          }
        }}
      >
        <UploadCloud size={48} color={images.length > 0 ? "#22c55e" : "#6b7280"} />
        <Typography variant="h6" sx={{ mt: 2, mb: 1, fontWeight: 600 }}>
          {uploading ? "Uploading..." : "Drag & Drop or Click to Upload"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          PNG, JPG, GIF formats • Max 5MB per image
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1 }}>
          {images.length} of 10 images uploaded
        </Typography>
        
        {uploading && (
          <LinearProgress sx={{ mt: 2, height: 6, borderRadius: 3 }} />
        )}
      </Box>

      {/* Image Previews */}
      {images.length > 0 && (
        <Box>
          <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
            Uploaded Images ({images.length})
          </Typography>
          <Grid container spacing={2}>
            {images.map((img, index) => (
              <Grid item xs={6} sm={4} md={3} key={index}>
                <Box sx={{ position: "relative" }}>
                  <Box
                    component="img"
                    src={img.preview} // Use preview URL
                    alt={`Product ${index + 1}`}
                    sx={{
                      width: "100%",
                      height: 140,
                      objectFit: "cover",
                      borderRadius: 2,
                      border: img.isMain ? "3px solid #22c55e" : "1px solid #e5e7eb",
                      cursor: "pointer"
                    }}
                    onClick={() => handleSetMainImage(index)}
                  />
                  
                  {/* Main Image Badge */}
                  {img.isMain && (
                    <Chip
                      label="Main"
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 8,
                        left: 8,
                        bgcolor: "#22c55e",
                        color: "white",
                        fontWeight: 600
                      }}
                    />
                  )}
                  
                  {/* Remove Button */}
                  <IconButton
                    size="small"
                    onClick={() => handleRemoveImage(index)}
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      bgcolor: "rgba(0,0,0,0.6)",
                      color: "white",
                      "&:hover": { bgcolor: "rgba(0,0,0,0.8)" }
                    }}
                  >
                    <X size={16} />
                  </IconButton>
                  
                  {/* Image Info */}
                  <Typography variant="caption" sx={{ 
                    display: "block", 
                    mt: 0.5,
                    color: "text.secondary",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                  }}>
                    {img.name}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default ImagesStep;