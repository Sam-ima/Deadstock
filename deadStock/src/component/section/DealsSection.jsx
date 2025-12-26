import React from "react";
import { ArrowRight } from "lucide-react";
import { Box, Typography, Button, Grid, Card, CardMedia, CardContent } from "@mui/material";
import dealCategories from "../data/deals_data";

const DealsSection = () => {
  return (
    <Box sx={{ backgroundColor: "#f5f5f5", py: 10 }}>
      <Box sx={{ textAlign: "center", mb: 8 }}>
        <Typography variant="h3" fontWeight={900} mb={2}>
          Featured Auctions
        </Typography>
        <Typography color="text.secondary" maxWidth={800} mx="auto">
          Browse through our curated categories and discover amazing discounts on quality products
        </Typography>
      </Box>

      <Grid container spacing={4} maxWidth={1200} mx="auto">
        {dealCategories.map((category, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                p: 2,
                border: "1px solid #e5e7eb",
                transition: "transform 0.3s",
                "&:hover": { transform: "translateY(-5px)" },
              }}
            >
              {/* Category Image */}
              <Box
                sx={{
                  width: 100,
                  height: 100,
                  mb: 2,
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <CardMedia
                  component="img"
                  image={category.img}
                  alt={category.name}
                  sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Box>

              {/* Category Name */}
              <Typography variant="h6" fontWeight={700} mb={1}>
                {category.name}
              </Typography>

              {/* Discount Text */}
              <Typography color="text.secondary" mb={2}>
                {category.discount}
              </Typography>

              <Button
                variant="contained"
                endIcon={<ArrowRight size={16} />}
                sx={{ borderRadius: 2, textTransform: "none", fontWeight: 700 }}
              >
                Shop Now
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DealsSection;
