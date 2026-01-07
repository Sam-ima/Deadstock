// src/components/BrowseByCategory/BrowseByCategory.jsx
import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { useNavigate } from "react-router-dom";

import categories from "../../data/categories";
import BrowseHeader from "./browseHeader";
import BrowseList from "./browseList";
import CategoryCard from "../categoryCard";

const BrowseByCategory = () => {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);

  const theme = useTheme();

  // 🔹 screen breakpoints
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));
  const isMd = useMediaQuery(theme.breakpoints.only("md"));
  const isLg = useMediaQuery(theme.breakpoints.only("lg"));

  // 🔹 responsive visible count
  const getVisibleCount = () => {
    if (isXs) return 2;
    if (isSm) return 4;
    if (isMd) return 6;
    if (isLg) return 9;
    return 10; // xl
  };

  const visibleCount = getVisibleCount();

  const visibleCategories = showAll
    ? categories
    : categories.slice(0, visibleCount);

  const showToggle = categories.length > visibleCount;

  return (
    <Box sx={{ py: { xs: 3, sm: 4, md: 5 }, backgroundColor: "#a02222ff" }}>
      <Container maxWidth="lg">
        <BrowseHeader />

        {/* 🔹 SINGLE ROW VIEW */}
        {!showAll && (
          <BrowseList
            categories={visibleCategories}
            onCategoryClick={(slug) =>
              navigate(`/category/${slug}`)
            }
          />
        )}

        {/* 🔹 GRID VIEW */}
        {showAll && (
          <Grid
            container
            spacing={3}
            mt={2}
            justifyContent="center"
          >
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
        {showToggle && (
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
        )}
      </Container>
    </Box>
  );
};

export default BrowseByCategory;
