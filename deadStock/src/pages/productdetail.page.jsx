// src/pages/ProductDetailPage.jsx
import { useParams, useNavigate } from "react-router-dom";
import products from "../component/data/products_data";
import { Box, Container, Typography, Card, CardMedia, Stack, Button, Grid } from "@mui/material";
import CategoryCard from "../component/categoryLandng/categoryCard";

const deriveCategory = (name) => {
  const n = name.toLowerCase();
  if (n.includes("watch") || n.includes("appliance") || n.includes("headphones")) return "electronics";
  if (n.includes("shirt") || n.includes("jacket")) return "fashion-apparel";
  if (n.includes("flower") || n.includes("garden")) return "home-garden";
  if (n.includes("drill") || n.includes("forklift") || n.includes("machine")) return "industrial-equipment";
  if (n.includes("honey") || n.includes("coffee") || n.includes("food")) return "food-beverage";
  if (n.includes("skin") || n.includes("hair") || n.includes("beauty")) return "health-beauty";
  if (n.includes("bike") || n.includes("tent") || n.includes("camping")) return "sports-outdoors";
  if (n.includes("tire") || n.includes("car") || n.includes("engine")) return "automotive";
  return "others";
};

const ProductDetailPage = () => {
  const navigate = useNavigate();
  const { slug, title } = useParams();

  // Find the current product
  const product = products.find(
    (p) => deriveCategory(p.name) === slug && p.name === decodeURIComponent(title)
  );

  if (!product) {
    return (
      <Box sx={{ py: 6, textAlign: "center" }}>
        <Typography variant="h5">Product not found.</Typography>
      </Box>
    );
  }

  // Related products: same category, exclude current product
  const relatedProducts = products
    .filter((p) => deriveCategory(p.name) === slug && p.name !== product.name)
    .map((p) => ({
      title: p.name,
      image: p.img,
      slug: deriveCategory(p.name),
    }));

  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="md">
        {/* Main Product */}
        <Card sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, p: 2 }}>
          <CardMedia
            component="img"
            image={product.img}
            alt={product.name}
            sx={{ width: { xs: "100%", md: 300 }, borderRadius: 2 }}
          />
          <Box sx={{ flex: 1, ml: { md: 3 }, mt: { xs: 2, md: 0 } }}>
            <Typography variant="h4" fontWeight={700} mb={2}>
              {product.name}
            </Typography>

            <Typography variant="h6" color="#f97316" fontWeight={600} mb={2}>
              Price: {product.price}
            </Typography>

            <Typography mb={2}>Delivery Time: {product.time}</Typography>
            <Typography mb={2}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.
              Praesent efficitur nulla ac nulla laoreet, at luctus ex eleifend.
            </Typography>

            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#194638ff",
                  color: "#fff",
                  textTransform: "none",
                  fontWeight: 600,
                  borderRadius: 20,
                  px: 3,
                  "&:hover": { backgroundColor: "#059669" },
                }}
              >
                Buy Now
              </Button>

              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#f97316",
                  color: "#fff",
                  textTransform: "none",
                  fontWeight: 600,
                  borderRadius: 20,
                  px: 3,
                  "&:hover": { backgroundColor: "#ea580c" },
                }}
              >
                Add to Cart
              </Button>
            </Stack>
          </Box>
        </Card>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <Box sx={{ mt: 6 }}>
            <Typography variant="h5" fontWeight={700} mb={3} textAlign="center">
              Related Products
            </Typography>
            <Grid container spacing={3} justifyContent="center">
              {relatedProducts.map((item, idx) => (
                <Grid item xs={12} sm={6} md={4} key={idx}>
                  <CategoryCard category={item} isMobile={false} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default ProductDetailPage;
