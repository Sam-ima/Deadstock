// src/pages/AddProduct/components/ReviewStep.jsx
import React from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  Chip,
  Divider,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Stack
} from "@mui/material";
import {
  CheckCircle,
  DollarSign,
  Package,
  Image as ImageIcon,
  List,
  Layers,
  Tag
} from "lucide-react";

const ReviewStep = ({ formData, images, specifications, features, b2bFields, isB2BUser }) => {
  const formatPrice = (price) => {
    return `$${Number(price).toFixed(2)}`;
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <CheckCircle size={24} /> Review & Publish
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Review all details before publishing your product
      </Typography>

      <Alert severity="info" sx={{ mb: 4 }}>
        Please review all information carefully. Once published, you can edit the product from your dashboard.
      </Alert>

      <Grid container spacing={3}>
        {/* Basic Information */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 2, height: "100%" }}>
            <Typography variant="h6" fontWeight={600} gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Tag size={20} /> Basic Information
            </Typography>
            
            <TableContainer>
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Product Name</TableCell>
                    <TableCell>{formData.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
                    <TableCell>
                      {formData.description || (
                        <Typography variant="body2" color="text.secondary" fontStyle="italic">
                          No description provided
                        </Typography>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Stock Quantity</TableCell>
                    <TableCell>{formData.stock} units</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Sale Type</TableCell>
                    <TableCell>
                      <Chip
                        label={formData.saleType === "direct" ? "Direct Purchase" : "Auction/Bidding"}
                        size="small"
                        color={formData.saleType === "direct" ? "success" : "primary"}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Pricing */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 2, height: "100%" }}>
            <Typography variant="h6" fontWeight={600} gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <DollarSign size={20} /> Pricing
            </Typography>
            
            <TableContainer>
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Base Price</TableCell>
                    <TableCell>{formatPrice(formData.basePrice)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Minimum Price</TableCell>
                    <TableCell>{formatPrice(formData.floorPrice)}</TableCell>
                  </TableRow>
                  {isB2BUser && (
                    <>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600 }}>MOQ</TableCell>
                        <TableCell>{b2bFields.moq} units</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600 }}>Bulk Discount</TableCell>
                        <TableCell>{b2bFields.bulkDiscount}%</TableCell>
                      </TableRow>
                      {b2bFields.bulkPrice && (
                        <TableRow>
                          <TableCell sx={{ fontWeight: 600 }}>Bulk Price</TableCell>
                          <TableCell>{formatPrice(b2bFields.bulkPrice)}</TableCell>
                        </TableRow>
                      )}
                    </>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Images */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <ImageIcon size={20} /> Images ({images.length})
            </Typography>
            
            {images.length > 0 ? (
              <Grid container spacing={2} sx={{ mt: 2 }}>
                {images.slice(0, 4).map((img, index) => (
                  <Grid item xs={6} sm={3} md={2} key={index}>
                    <Box
                      component="img"
                      src={img.url}
                      alt={`Preview ${index + 1}`}
                      sx={{
                        width: "100%",
                        height: 100,
                        objectFit: "cover",
                        borderRadius: 2,
                        border: img.isMain ? "3px solid #22c55e" : "1px solid #e5e7eb"
                      }}
                    />
                  </Grid>
                ))}
                {images.length > 4 && (
                  <Grid item xs={6} sm={3} md={2}>
                    <Box
                      sx={{
                        width: "100%",
                        height: 100,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: "grey.100",
                        borderRadius: 2,
                        border: "1px dashed #ccc"
                      }}
                    >
                      <Typography variant="h6" color="text.secondary">
                        +{images.length - 4}
                      </Typography>
                    </Box>
                  </Grid>
                )}
              </Grid>
            ) : (
              <Alert severity="warning">No images uploaded</Alert>
            )}
          </Paper>
        </Grid>

        {/* Specifications */}
        {specifications.length > 0 && (
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, borderRadius: 2, height: "100%" }}>
              <Typography variant="h6" fontWeight={600} gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Layers size={20} /> Specifications ({specifications.length})
              </Typography>
              
              <Stack spacing={1} sx={{ mt: 2 }}>
                {specifications.slice(0, 5).map((spec, index) => (
                  <Box key={index} sx={{ display: "flex", justifyContent: "space-between", py: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      {spec.key}:
                    </Typography>
                    <Typography variant="body2" fontWeight={500}>
                      {spec.value}
                    </Typography>
                  </Box>
                ))}
                {specifications.length > 5 && (
                  <Typography variant="caption" color="text.secondary">
                    + {specifications.length - 5} more specifications
                  </Typography>
                )}
              </Stack>
            </Paper>
          </Grid>
        )}

        {/* Features */}
        {features.length > 0 && (
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, borderRadius: 2, height: "100%" }}>
              <Typography variant="h6" fontWeight={600} gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <List size={20} /> Features ({features.length})
              </Typography>
              
              <Stack spacing={1} sx={{ mt: 2 }}>
                {features.slice(0, 5).map((feature, index) => (
                  <Box key={index} sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                    <Typography variant="body2" color="primary" sx={{ mt: 0.3 }}>
                      •
                    </Typography>
                    <Typography variant="body2">
                      {feature}
                    </Typography>
                  </Box>
                ))}
                {features.length > 5 && (
                  <Typography variant="caption" color="text.secondary">
                    + {features.length - 5} more features
                  </Typography>
                )}
              </Stack>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default ReviewStep;