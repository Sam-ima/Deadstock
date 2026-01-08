// src/components/ProductDetail/ProductInfo.jsx
import React from "react";
import {
  Stack,
  Typography,
  Chip,
  Paper,
  Rating,
} from "@mui/material";
import { Person, Verified } from "@mui/icons-material";

const ProductInfo = ({ product }) => {
  return (
    <Stack spacing={{ xs: 2, sm: 3 }}>
      {/* CATEGORY + TITLE */}
      <Stack spacing={1}>
        <Chip
          label={product.category}
          sx={{
            width: "fit-content",
            backgroundColor: "#4CAF50",
            color: "white",
            fontWeight: { xs: 500, sm: 600 },
            fontSize: { xs: "0.7rem", sm: "0.75rem" },
          }}
        />

        <Typography
          sx={{
            fontSize: {
              xs: "1.25rem",
              sm: "1.5rem",
              md: "1.75rem",
            },
            fontWeight: {
              xs: 600,
              sm: 700,
            },
            color: "#1B5E20",
            lineHeight: 1.2,
          }}
        >
          {product.name}
        </Typography>

        <Typography
          sx={{
            fontSize: {
              xs: "0.85rem",
              sm: "0.95rem",
            },
            color: "text.secondary",
            maxWidth: "95%",
          }}
        >
          {product.description ||
            "Premium auction item in excellent condition"}
        </Typography>
      </Stack>

      {/* SELLER & RATING CARD */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 1.5, sm: 2 },
          borderRadius: 3,
          backgroundColor: "#f8fff8",
          border: "1px solid #e0f2e1",
        }}
      >
        <Stack spacing={{ xs: 1.2, sm: 1.5 }}>
          {/* RATING */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <Rating
              value={product.rating || 4.5}
              precision={0.5}
              readOnly
              sx={{
                color: "#d8a855",
                fontSize: { xs: 18, sm: 20 },
              }}
            />
            <Typography
              sx={{
                fontSize: { xs: "0.75rem", sm: "0.85rem" },
                color: "text.secondary",
              }}
            >
              ({product.reviewCount || 124} reviews)
            </Typography>
          </Stack>

          {/* SELLER INFO */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <Person
              sx={{
                color: "#2E7D32",
                fontSize: { xs: 18, sm: 20 },
              }}
            />

            <Stack spacing={0}>
              <Typography
                sx={{
                  fontSize: { xs: "0.7rem", sm: "0.8rem" },
                  color: "text.secondary",
                }}
              >
                Seller
              </Typography>

              <Typography
                sx={{
                  fontSize: { xs: "0.85rem", sm: "0.95rem" },
                  fontWeight: { xs: 500, sm: 600 },
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                {product.seller || "Premium Auctions Inc."}
                <Verified
                  sx={{
                    fontSize: { xs: 16, sm: 18 },
                    color: "#2E7D32",
                  }}
                />
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default ProductInfo;
