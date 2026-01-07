// src/pages/categories/CategoryContent.jsx
import { Box, Typography, Grid, Container } from "@mui/material";
import ProductCard from "../product/productCard";

const CategoryContent = ({ category, products, activeSubcategory }) => {
  const hasProducts = products && products.length > 0;

  return (
    <Box sx={{ width: '100%' }}>
      {/* FULL-SCREEN CATEGORY BANNER */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          mb: { xs: 2, sm: 3, md: 4 },
        }}
      >
        {/* BACKGROUND IMAGE */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: {
              xs: 300,
              sm: 350,
              md: 450,
              lg: 550,
              xl: 650,
            },
            backgroundImage: `url(${category.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6))`,
              zIndex: 1,
            },
          }}
        >
          {/* CATEGORY CONTENT OVERLAY */}
          <Container
            maxWidth="lg"
            sx={{
              position: 'relative',
              zIndex: 2,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: { xs: 'center', sm: 'flex-start' },
              textAlign: { xs: 'center', sm: 'left' },
              color: 'white',
              px: { xs: 2, sm: 4 },
            }}
          >
            {/* CATEGORY NAME */}
            <Typography
              fontWeight={900}
              sx={{
                fontSize: {
                  xs: '24px',
                  sm: '28px',
                  md: '32px',
                  lg: '40px',
                  xl: '48px',
                },
                lineHeight: 1.1,
                mb: { xs: 2, sm: 3 },
                textShadow: '2px 2px 8px rgba(0,0,0,0.5)',
                maxWidth: '100%',
                color: '#FFFFFF',
              }}
            >
              {category.name}
            </Typography>

            {/* CATEGORY DESCRIPTION */}
            <Typography
              sx={{
                fontSize: {
                  xs: '14px',
                  sm: '16px',
                  md: '18px',
                  lg: '20px',
                },
                lineHeight: 1.6,
                mb: { xs: 3, sm: 4 },
                maxWidth: { xs: '100%', sm: '80%', md: '70%' },
                textShadow: '1px 1px 4px rgba(0,0,0,0.5)',
                fontWeight: 400,
                opacity: 0.95,
              }}
            >
              {category.description}
            </Typography>

            {/* SUBCATEGORY OR FEATURED TAG */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                flexWrap: 'wrap',
                justifyContent: { xs: 'center', sm: 'flex-start' },
              }}
            >
              {activeSubcategory ? (
                <>
                  <Box
                    sx={{
                      px: 3,
                      py: 1,
                      borderRadius: '20px',
                      backgroundColor: category.color,
                      color: 'white',
                      fontWeight: 700,
                      fontSize: { xs: '12px', sm: '14px', md: '16px' },
                      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    }}
                  >
                    {activeSubcategory.name}
                  </Box>
                  <Typography
                    sx={{
                      fontSize: { xs: '12px', sm: '14px', md: '16px' },
                      fontWeight: 600,
                      opacity: 0.9,
                      color: "#ffffff"
                    }}
                  >
                    {products.length} products available
                  </Typography>
                </>
              ) : (
                <Box
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: '20px',
                    backgroundColor: category.color,
                    color: 'white',
                    fontWeight: 700,
                    fontSize: { xs: '12px', sm: '14px', md: '16px' },
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                  }}
                >
                  Featured Category Products
                </Box>
              )}
            </Box>
          </Container>
        </Box>
      </Box>

      {/* PRODUCTS SECTION */}
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        {hasProducts ? (
          <>
            {/* PRODUCTS GRID TITLE */}
            <Typography
              variant="h2"
              fontWeight={700}
              mb={{ xs: 2, sm: 3, md: 4 }}
              sx={{
                fontSize: {
                  xs: '22px',
                  sm: '26px',
                  md: '30px',
                  lg: '32px',
                },
                textAlign: 'center',
                color: 'text.primary',
              }}
            >
              {activeSubcategory
                ? `Browse ${activeSubcategory.name}`
                : `Explore ${category.name}`
              }
            </Typography>

            {/* PRODUCT GRID */}
            <Grid
              container
              spacing={{ xs: 2, sm: 3, md: 4 }}
              justifyContent="center"
              sx={{ mb: 6 }}
            >
              {products.map((product) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  key={product.id}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Box sx={{ width: '100%', maxWidth: 400 }}>
                    <ProductCard product={product} />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </>
        ) : (
          // ✅ EMPTY STATE
          <Box
            sx={{
              textAlign: 'center',
              py: 10,
              px: 2,
              backgroundColor: '#f9f9f9',
            }}
          >
            <Typography
              variant="h4"
              color="text.secondary"
              mb={2}
              sx={{ fontSize: { xs: '20px', sm: '24px', md: '28px' } }}
            >
              No products found
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                fontSize: { xs: '14px', sm: '16px', md: '18px' },
                maxWidth: 600,
                mx: 'auto',
              }}
            >
              We're currently updating our inventory. Check back soon for new arrivals in {activeSubcategory?.name || category.name}!
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default CategoryContent;
