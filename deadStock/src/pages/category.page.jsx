import { useParams } from "react-router-dom";
import { Box, Container, Typography } from "@mui/material";

const CategoryPage = () => {
  const { slug } = useParams();

  return (
    <Box sx={{ minHeight: "100vh", py: 6 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          fontWeight={700}
          gutterBottom
        >
          Category: {slug}
        </Typography>

        <Typography color="text.secondary">
          Showing products for the selected category.
        </Typography>
      </Container>
    </Box>
  );
};

export default CategoryPage;
