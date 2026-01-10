// src/pages/AddProduct/components/SpecificationsStep.jsx - Updated
import React from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  IconButton,
  Paper,
  Chip,
  Alert,
  InputAdornment
} from "@mui/material";
import {
  Plus,
  Trash2,
  List,
  Key,
  Type,
  MessageSquare
} from "lucide-react";

const SpecificationsStep = ({ specifications, setSpecifications, features, setFeatures }) => {
  const [newSpec, setNewSpec] = React.useState({ key: "", value: "" });
  const [newFeature, setNewFeature] = React.useState("");

  const addSpecification = () => {
    if (newSpec.key.trim() && newSpec.value.trim()) {
      setSpecifications([...specifications, { ...newSpec }]);
      setNewSpec({ key: "", value: "" });
    }
  };

  const removeSpecification = (index) => {
    setSpecifications(specifications.filter((_, i) => i !== index));
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature("");
    }
  };

  const removeFeature = (index) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <List size={24} /> Specifications & Features (Optional)
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Add detailed specifications and key features of your product (Optional)
      </Typography>

      <Grid container spacing={4}>
        {/* Specifications Section */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 2, height: "100%" }}>
            <Typography variant="h6" fontWeight={600} gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Key size={20} /> Specifications (Optional)
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Add key-value pairs like Brand: Canon, Resolution: 32.5MP
            </Typography>

            {/* Add Specification Form */}
            <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
              <TextField
                fullWidth
                label="Property"
                value={newSpec.key}
                onChange={(e) => setNewSpec({ ...newSpec, key: e.target.value })}
                placeholder="e.g., Brand"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Key size={16} />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="Value"
                value={newSpec.value}
                onChange={(e) => setNewSpec({ ...newSpec, value: e.target.value })}
                placeholder="e.g., Canon"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Type size={16} />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="contained"
                onClick={addSpecification}
                sx={{ minWidth: "auto", px: 2 }}
              >
                <Plus size={20} />
              </Button>
            </Box>

            {/* Specifications List */}
            {specifications.length > 0 ? (
              <Grid container spacing={2}>
                {specifications.map((spec, index) => (
                  <Grid item xs={12} key={index}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        bgcolor: "grey.50",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                      }}
                    >
                      <Box>
                        <Typography variant="subtitle2" fontWeight={600} color="primary">
                          {spec.key}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {spec.value}
                        </Typography>
                      </Box>
                      <IconButton
                        size="small"
                        onClick={() => removeSpecification(index)}
                        color="error"
                      >
                        <Trash2 size={16} />
                      </IconButton>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Alert severity="info">
                Specifications are optional. Add key details like brand, model, size, etc.
              </Alert>
            )}
          </Paper>
        </Grid>

        {/* Features Section */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 2, height: "100%" }}>
            <Typography variant="h6" fontWeight={600} gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <MessageSquare size={20} /> Key Features (Optional)
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              List the main features and selling points
            </Typography>

            {/* Add Feature Form */}
            <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
              <TextField
                fullWidth
                label="Add Feature"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                placeholder="e.g., 4K Video Recording"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addFeature();
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Plus size={16} />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="contained"
                onClick={addFeature}
                sx={{ minWidth: "auto", px: 3 }}
              >
                Add
              </Button>
            </Box>

            {/* Features List */}
            {features.length > 0 ? (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {features.map((feature, index) => (
                  <Chip
                    key={index}
                    label={feature}
                    onDelete={() => removeFeature(index)}
                    sx={{
                      borderRadius: 1,
                      bgcolor: "primary.50",
                      color: "primary.700",
                      "& .MuiChip-deleteIcon": {
                        color: "primary.500"
                      }
                    }}
                  />
                ))}
              </Box>
            ) : (
              <Alert severity="info">
                Features are optional. Add bullet points like "4K Video", "Weather Sealed", etc.
              </Alert>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Instructions */}
      <Alert severity="info" sx={{ mt: 3 }}>
        <Typography variant="body2">
          • <strong>Both sections are optional</strong> but help buyers make informed decisions<br />
          • <strong>Specifications</strong> are key-value pairs (Brand: Canon, Color: Black)<br />
          • <strong>Features</strong> are bullet points highlighting product benefits
        </Typography>
      </Alert>
    </Box>
  );
};

export default SpecificationsStep;