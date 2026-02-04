import { useState, useMemo,useEffect } from "react";
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

import { useCategories } from "../../../context/categoryContext";
import BrowseHeader from "./browseHeader";
import BrowseList from "./browseList";
import CategoryCard from "../categoryCard";
import { useSearch } from "../../Searchbar/SearchContext";
// Icons
import DevicesIcon from "@mui/icons-material/Devices";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import CollectionsIcon from "@mui/icons-material/Collections";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import HomeIcon from "@mui/icons-material/Home";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import BookIcon from "@mui/icons-material/Book";

const iconMap = {
  electronics: <DevicesIcon fontSize="small" />,
  fashion: <CheckroomIcon fontSize="small" />,
  art: <CollectionsIcon fontSize="small" />,
  "wholesale-stock": <WarehouseIcon fontSize="small" />,
  vehicles: <DirectionsCarIcon fontSize="small" />,
  home: <HomeIcon fontSize="small" />,
  food: <RestaurantIcon fontSize="small" />,
  fitness: <FitnessCenterIcon fontSize="small" />,
  music: <MusicNoteIcon fontSize="small" />,
  books: <BookIcon fontSize="small" />,
};

const BrowseByCategory = () => {
  const { query } = useSearch();
  const navigate = useNavigate();
  const { categories, loading } = useCategories();
  const [showAll, setShowAll] = useState(false);

  const theme = useTheme();

  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));
  const isMd = useMediaQuery(theme.breakpoints.only("md"));
  const isLg = useMediaQuery(theme.breakpoints.only("lg"));

  const getVisibleCount = () => {
    if (isXs) return 2;
    if (isSm) return 4;
    if (isMd) return 6;
    if (isLg) return 9;
    return 10;
  };

  const visibleCount = getVisibleCount();

  // 🔹 Attach icons to firebase categories
  const enrichedCategories = useMemo(() => {
    return categories.map((cat) => ({
      ...cat,
      icon: iconMap[cat.slug] || <WarehouseIcon fontSize="small" />,
    }));
  }, [categories]);

  const visibleCategories = showAll
    ? enrichedCategories
    : enrichedCategories.slice(0, visibleCount);

  const showToggle = enrichedCategories.length > visibleCount;
  const filteredCategories = useMemo(() => {
    if (!query) return enrichedCategories;

    const q = query.toLowerCase();
    return enrichedCategories.filter(
      (cat) =>
        cat.name.toLowerCase().includes(q) ||
        cat.slug?.toLowerCase().includes(q),
    );
  }, [query, enrichedCategories]);
  useEffect(() => {
    if (query.trim()) {
      setShowAll(true);
    }
  }, [query]);
  if (loading) return null;

  return (
    <Box sx={{ py: { xs: 3, sm: 4, md: 5 }, backgroundColor: "#f3f5f7ff" }}>
      <Container maxWidth="lg">
        <BrowseHeader />

        {/* 🔹 SINGLE ROW VIEW */}
        {!showAll && (
          <BrowseList
            categories={visibleCategories}
            onCategoryClick={(slug) => navigate(`/category/${slug}`)}
          />
        )}

        {/* 🔹 GRID VIEW */}
        {showAll && (
          <Grid container spacing={3} mt={2} justifyContent="center">
            {filteredCategories.map((category) => (
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
                  onClick={() => navigate(`/category/${category.slug}`)}
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
