import React, { useRef } from "react";
import {
  Box,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import browsedata from "./data/browse_data";
import CategoryCard from "./card/category_card";

const BrowseByCategory = () => {
  const scrollRef = useRef(null);
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isDesktop = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));

  const cardWidth = isLarge ? 260 : isDesktop ? 240 : 220;

  const scroll = (dir) => {
    scrollRef.current.scrollBy({
      left: dir === "left" ? -cardWidth * 2 : cardWidth * 2,
      behavior: "smooth",
    });
  };

  return (
  <Box
    sx={{
      px: { xs: 2, md: 6 },
      py: { xs: 4, md: 6 },
      background: "linear-gradient(180deg, #f9fafb 0%, #ffffff 100%)",
    }}
  >
    <Box
      sx={{
        backgroundColor: "rgba(255,255,255,0.75)",
        backdropFilter: "blur(6px)",
        borderRadius: 4,
        p: { xs: 2, md: 4 },
        boxShadow: "0 10px 40px rgba(0,0,0,0.06)",
      }}
    >
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant={isMobile ? "h6" : "h4"} fontWeight="bold">
          Browse by Category
        </Typography>

        {!isMobile && (
          <Box>
            <IconButton onClick={() => scroll("left")}>
              <ArrowBackIosNewIcon />
            </IconButton>
            <IconButton onClick={() => scroll("right")}>
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
        )}
      </Box>

      {/* Mobile → Vertical */}
      {isMobile ? (
        <Box display="grid" gap={2}>
          {browsedata.map((cat) => (
            <CategoryCard key={cat.slug} category={cat} isMobile />
          ))}
        </Box>
      ) : (
        /* Tablet & Desktop → Carousel */
        <Box
          ref={scrollRef}
          sx={{
            display: "grid",
            gridAutoFlow: "column",
            gridAutoColumns: `${cardWidth}px`,
            gap: 3,
            overflowX: "auto",
            pb: 1,
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {browsedata.map((cat) => (
            <CategoryCard key={cat.slug} category={cat} width={cardWidth} />
          ))}
        </Box>
      )}
    </Box>
  </Box>
);

};

export default BrowseByCategory;
