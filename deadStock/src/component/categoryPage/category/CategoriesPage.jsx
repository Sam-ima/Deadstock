import { Box, IconButton, Typography } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useMemo, useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useSearch } from "../../Searchbar/SearchContext";
import { useCategories } from "../../../context/categoryContext";
import { useProducts } from "../../../context/productContext";
import { getCategoryIcon } from "./utils/categoryIcons";

import CategoriesSidebar from "./CategoriesSidebar";
import CategoryContent from "./CategoryContent";

const CategoriesPage = () => {
  const { query } = useSearch();
  const { slug } = useParams();
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);

  const { categories, subcategories, fetchSubcategories } = useCategories();
  const { products } = useProducts();

  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [activeSubcategory, setActiveSubcategory] = useState(null);

  const activeCategory = useMemo(
    () => categories.find((c) => c.slug === slug),
    [categories, slug],
  );

  useEffect(() => {
    if (activeCategory) {
      fetchSubcategories(activeCategory.id);
      setActiveSubcategory(null);
    }
  }, [activeCategory]);

  const categorySubcategories = activeCategory
    ? subcategories[activeCategory.id] || []
    : [];

  const filteredProducts = useMemo(() => {
    if (!activeCategory) return [];

    if (!activeSubcategory) {
      return products.filter((p) => p.categoryId === activeCategory.id);
    }

    return products.filter(
      (p) =>
        p.categoryId === activeCategory.id &&
        p.subcategoryId === activeSubcategory.id,
    );
  }, [products, activeCategory, activeSubcategory]);

  const searchedProducts = useMemo(() => {
    if (!query.trim()) return null;

    const q = query.toLowerCase();

    return products.filter(
      (p) =>
        p.title?.toLowerCase().includes(q) ||
        p.name?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q),
    );
  }, [query, products]);
  const productsToShow = query.trim() ? searchedProducts : filteredProducts;

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 200;
      const newScrollLeft =
        container.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);
      container.scrollTo({ left: newScrollLeft, behavior: "smooth" });
      setTimeout(updateArrowVisibility, 100);
    }
  };

  const updateArrowVisibility = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(
        container.scrollLeft < container.scrollWidth - container.clientWidth,
      );
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* SLIDEABLE CATEGORIES BAR */}
      <Box
        sx={{
          position: "relative",
          backgroundColor: "#f8f9fa",
          borderBottom: "1px solid #e0e0e0",
          py: 2,
          px: { xs: 1, sm: 2 },
        }}
      >
        <Typography
          variant="subtitle1"
          fontWeight={600}
          sx={{
            mt: { sm: 1.5 },
            mb: 1.5,
            px: 2,
            color: "text.secondary",
            fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
          }}
        >
          Quick Categories
        </Typography>

        {showLeftArrow && (
          <IconButton
            onClick={() => scroll("left")}
            size="small"
            sx={{
              position: "absolute",
              left: 8,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              backgroundColor: "white",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              display: { xs: "none", sm: "flex" },
            }}
          >
            <ChevronLeft fontSize="small" />
          </IconButton>
        )}

        {showRightArrow && (
          <IconButton
            onClick={() => scroll("right")}
            size="small"
            sx={{
              position: "absolute",
              right: 8,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              backgroundColor: "white",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              display: { xs: "none", sm: "flex" },
            }}
          >
            <ChevronRight fontSize="small" />
          </IconButton>
        )}

        <Box
          ref={scrollContainerRef}
          onScroll={updateArrowVisibility}
          sx={{
            display: "flex",
            gap: 1,
            overflowX: "auto",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
            px: 2,
          }}
        >
          {categories.map((category) => (
            <Box
              key={category.id}
              onClick={() => navigate(`/category/${category.slug}`)}
              sx={{
                flex: "0 0 auto",
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                px: { xs: 1, sm: 2, md: 2 },
                py: { xs: 0.5, md: 0.8 },
                borderRadius: "12px",
                backgroundColor:
                  category.slug === slug ? category.color + "15" : "white",
                border:
                  category.slug === slug
                    ? `2px solid ${category.color}`
                    : "1px solid #e0e0e0",
                cursor: "pointer",
                minWidth: 150,
              }}
            >
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor:
                    category.slug === slug ? category.color + "30" : "#f0f0f0",
                  color: category.slug === slug ? category.color : "#666",
                }}
              >
                {getCategoryIcon(category)}
              </Box>

              <Typography
                fontWeight={600}
                sx={{
                  fontSize: { xs: "0.85rem", sm: "0.88rem", md: "0.9rem" },
                  color:
                    category.slug === slug ? category.color : "text.primary",
                }}
              >
                {category.name}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Box sx={{ display: "flex", flex: 1, minHeight: 0 }}>
        <CategoriesSidebar
          category={activeCategory}
          subcategories={categorySubcategories}
          activeSubcategory={activeSubcategory}
          onSelect={setActiveSubcategory}
        />

        <CategoryContent
          category={activeCategory}
          products={productsToShow}
          activeSubcategory={activeSubcategory}
          isSearchMode={Boolean(query.trim())}
        />
      </Box>
    </Box>
  );
};

export default CategoriesPage;
