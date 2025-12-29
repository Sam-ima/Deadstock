import React from "react";
import { Card, CardContent, Avatar, Typography, Button, Box, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ category, isMobile, onAddToCart }) => {
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.stopPropagation(); // 🚫 prevent card navigation
    if (onAddToCart) {
      onAddToCart(category);
    }
  };

  return (
    <Card
      onClick={() => navigate(`/category/${category.slug}`)}
      sx={{
        position: "relative",
        height: 250,
        cursor: "pointer",
        borderRadius: 4,
        overflow: "hidden",
        boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
        transition: "0.3s",
        "&:hover": {
          transform: isMobile ? "none" : "translateY(-6px)",
        },
      }}
    >
      {/* Overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.65))",
          zIndex: 1,
        }}
      />

      <CardContent
        sx={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Avatar
          src={category.image}
          alt={category.title}
          sx={{
            width: 80,
            height: 80,
            mb: 1.5,
            border: "3px solid #fff",
          }}
        />

        <Typography color="#fff" fontWeight={600} mb={1}>
          {category.title}
        </Typography>

        {/* Buttons */}
    <Stack direction="row" spacing={1}>
  {/* Shop Now */}
  <Button
    size="small"
    onClick={(e) => e.stopPropagation()}
    sx={{
      backgroundColor: "#10b981",
      color: "#fff",
      textTransform: "none",
      fontWeight: 600,
      borderRadius: 20,
      px: 2,
      "&:hover": { backgroundColor: "#059669" },
    }}
  >
    Shop Now
  </Button>

  {/* Add to Cart */}
  <Button
    size="small"
    onClick={handleAddToCart}
    sx={{
      backgroundColor: "#f97316",
      color: "#fff",
      textTransform: "none",
      fontWeight: 600,
      borderRadius: 20,
      px: 2,
      "&:hover": { backgroundColor: "#ea580c" },
    }}
  >
    Add to Cart
  </Button>
</Stack>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
