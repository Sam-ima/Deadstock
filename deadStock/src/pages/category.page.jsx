import { useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Stack,
} from "@mui/material";
import products from "../component/data/products_data";
import CategoryCard from "../component/card/category_card";

const deriveCategory = (name) => {
  const n = name.toLowerCase();

  if (n.includes("watch") || n.includes("appliance") || n.includes("headphones"))
    return "electronics";
  if (n.includes("shirt") || n.includes("jacket")) return "fashion-apparel";
  if (n.includes("flower") || n.includes("garden")) return "home-garden";
  if (n.includes("drill") || n.includes("forklift") || n.includes("machine"))
    return "industrial-equipment";
  if (n.includes("honey") || n.includes("coffee") || n.includes("food"))
    return "food-beverage";
  if (n.includes("skin") || n.includes("hair") || n.includes("beauty"))
    return "health-beauty";
  if (n.includes("bike") || n.includes("tent") || n.includes("camping"))
    return "sports-outdoors";
  if (n.includes("tire") || n.includes("car") || n.includes("engine"))
    return "automotive";
  return "others";
};

const CategoryPage = () => {
  const { slug } = useParams();
  const [sortBy, setSortBy] = useState("");

  const visibleCategories = useMemo(() => {
    return products
      .map((p) => ({
        title: p.name, // Only title
        image: p.img, // Only image
        slug: deriveCategory(p.name), // Needed for navigation
      }))
      .filter((item) => item.slug === slug)
      .sort((a, b) => {
        if (sortBy === "name") return a.title.localeCompare(b.title);
        return 0;
      });
  }, [slug, sortBy]);

  return (
    <Box sx={{ minHeight: "100vh", py: 6 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="center"
          alignItems="center"
          mb={4}
          spacing={2}
        >
          <Typography variant="h4" fontWeight={700}>
            {slug.replace(/-/g, " ").toUpperCase()}
          </Typography>
        </Stack>

        {/* Category Cards */}
        <Grid container spacing={3} justifyContent="center">
          {visibleCategories.length ? (
            visibleCategories.map((item, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <CategoryCard category={item} isMobile={false} />
              </Grid>
            ))
          ) : (
            <Typography color="text.secondary" textAlign="center" width="100%">
              No items found in this category.
            </Typography>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default CategoryPage;
