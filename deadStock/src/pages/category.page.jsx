import { useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Stack,
} from "@mui/material";
import products from "../component/data/products_data";
import CategoryCard from "../component/card/category_card";


const deriveCategory = (name) => {
  const n = name.toLowerCase();

  if (n.includes("watch") || n.includes("appliance")) return "electronics";
  if (n.includes("shirt")) return "fashion-apparel";
  if (n.includes("flower")) return "home-garden";

  return "others";
};

const CategoryPage = () => {
  const { slug } = useParams();
  const [sortBy, setSortBy] = useState("");

  const visibleCategories = useMemo(() => {
    return products
      .map((p) => ({
        title: p.name,
        image: p.img,
        slug: deriveCategory(p.name),
        priceValue: Number(p.price.replace(/[^0-9]/g, "")),
        bids: Math.floor(Math.random() * 30) + 1,
      }))
      .filter((item) => item.slug === slug)
      .sort((a, b) => {
        if (sortBy === "name") return a.title.localeCompare(b.title);
        if (sortBy === "price") return a.priceValue - b.priceValue;
        if (sortBy === "bids") return b.bids - a.bids;
        return 0;
      });
  }, [slug, sortBy]);

  return (
    <Box sx={{ minHeight: "100vh", py: 6 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems="center"
          mb={4}
          spacing={2}
        >
          <Typography variant="h4" fontWeight={700}>
            {slug.replace(/-/g, " ").toUpperCase()}
          </Typography>

          <Stack direction="row" spacing={1}>
            <Button variant="outlined" onClick={() => setSortBy("name")}>
              Name
            </Button>
            <Button variant="outlined" onClick={() => setSortBy("price")}>
              Price
            </Button>
            <Button variant="outlined" onClick={() => setSortBy("bids")}>
              Bids
            </Button>
          </Stack>
        </Stack>

        {/* Category Cards */}
        <Grid container spacing={3}>
          {visibleCategories.length ? (
            visibleCategories.map((item, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <CategoryCard
                  category={item}
                  isMobile={false}
                />
              </Grid>
            ))
          ) : (
            <Typography color="text.secondary">
              No items found in this category.
            </Typography>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default CategoryPage;
