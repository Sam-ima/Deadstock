// src/components/BrowseByCategory/BrowseByCategory.jsx
import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  useTheme,
} from "@mui/material";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { useNavigate } from "react-router-dom";

import categories from "../../data/categories";
import BrowseHeader from "./browseHeader";
import BrowseList from "./browseList";
import CategoryCard from "../categoryCard";

const BrowseByCategory = () => {
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const theme = useTheme();

  const [showAll, setShowAll] = useState(false);

  return (
    <Box sx={{ py: { xs: 3, sm: 4, md: 6 }, backgroundColor: "#ffffff" }}>
      <Container maxWidth="lg">
        <BrowseHeader />

        {/* 🔹 CAROUSEL VIEW */}
        {!showAll && (
          <BrowseList
            categories={categories}
            scrollRef={scrollRef}
            onCategoryClick={(slug) => navigate(`/category/${slug}`)}
          />
        )}

        {/* 🔹 GRID VIEW (NO DOTS, NO SCROLL) */}
        {showAll && (
          <Grid container spacing={3} mt={1} justifyContent="center">
            {categories.map((category) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={category.id}
                display="flex"
                justifyContent="center"
              >
                <CategoryCard
                  category={category}
                  onClick={() =>
                    navigate(`/category/${category.slug}`)
                  }
                />
              </Grid>
            ))}
          </Grid>
        )}

        {/* 🔹 TOGGLE BUTTON */}
        <Box display="flex" justifyContent="center" mt={5}>
          <Button
            variant="outlined"
            size="large"
            endIcon={<KeyboardDoubleArrowRightIcon />}
            onClick={() => setShowAll((prev) => !prev)}
            sx={{
              color: "#2E7D32",
              borderColor: "#2E7D32",
              borderRadius: 3,
              px: 4,
              py: 1.2,
              fontWeight: 600,
            }}
          >
            {showAll ? "View Less Categories" : "View All Categories"}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default BrowseByCategory;
