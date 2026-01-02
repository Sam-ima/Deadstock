import { useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Card,
  CardMedia,
  CardContent,
  Stack,
} from "@mui/material";
import products from "../component/data/products_data";

// 🔥 derive category from product name (NO DATA CHANGE)
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

  const visibleProducts = useMemo(() => {
    return products
      .map((p) => ({
        ...p,
        category: deriveCategory(p.name),
        priceValue: Number(p.price.replace(/[^0-9]/g, "")),
        bids: Math.floor(Math.random() * 30) + 1,
      }))
      .filter((p) => p.category === slug)
      .sort((a, b) => {
        if (sortBy === "name") return a.name.localeCompare(b.name);
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
            <Button onClick={() => setSortBy("name")}>Name</Button>
            <Button onClick={() => setSortBy("price")}>Price</Button>
            <Button onClick={() => setSortBy("bids")}>Bids</Button>
          </Stack>
        </Stack>

        {/* Products */}
        <Grid container spacing={3}>
          {visibleProducts.length ? (
            visibleProducts.map((item, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={item.img}
                    alt={item.name}
                  />
                  <CardContent>
                    <Typography fontWeight={600}>{item.name}</Typography>
                    <Typography>Price: {item.price}</Typography>
                    <Typography>Bids: {item.bids}</Typography>
                    <Typography color="error">{item.time}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography>No products found.</Typography>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default CategoryPage;
