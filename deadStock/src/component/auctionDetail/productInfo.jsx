// src/components/ProductDetail/ProductInfo.jsx
import React from "react";
import { Stack, Typography, Chip, Paper, Rating} from "@mui/material";
import { Person, Verified } from "@mui/icons-material";

const ProductInfo = ({ product }) => {
  return (
    <Stack spacing={3}>
      <div>
        <Chip label={product.category} sx={{ backgroundColor: "#4CAF50", color: "white", fontWeight: 600, mb: 1 }} />
        <Typography variant="h5" fontWeight={700} sx={{ color: "#1B5E20", mb: 1, lineHeight: 1.2 }}>
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description || "Premium auction item in excellent condition"}
        </Typography>
      </div>

      <Paper elevation={0} sx={{ p: 2, borderRadius: 3, backgroundColor: "#f8fff8", border: "1px solid #e0f2e1" }}>
        <Stack spacing={1.5}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Rating value={product.rating || 4.5} precision={0.5} readOnly sx={{ color: "#d8a855", fontSize: 20 }} />
            <Typography variant="body2" color="text.secondary">
              ({product.reviewCount || 124} reviews)
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Person sx={{ color: "#2E7D32", fontSize: 20 }} />
            <Stack spacing={0}>
              <Typography variant="body2" color="text.secondary">
                Seller
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                {product.seller || "Premium Auctions Inc."}
                <Verified fontSize="small" sx={{ color: "#2E7D32", ml: 0.5, verticalAlign: "middle" }} />
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default ProductInfo;
