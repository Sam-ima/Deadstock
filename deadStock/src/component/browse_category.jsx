import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const categories = [
  { title: "Electronics", slug: "electronics", image: "https://images.unsplash.com/photo-1518770660439-4636190af475" },
  { title: "Fashion & Apparel", slug: "fashion", image: "https://images.unsplash.com/photo-1521335629791-ce4aec67dd47" },
  { title: "Home & Garden", slug: "home-garden", image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511" },
  { title: "Industrial Equipment", slug: "industrial", image: "https://images.unsplash.com/photo-1581090700227-1e37b190418e" },
  { title: "Food & Beverage", slug: "food", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836" },
  { title: "Health & Beauty", slug: "health-beauty", image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15" },
  { title: "Sports & Outdoors", slug: "sports", image: "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf" },
  { title: "Automotive", slug: "automotive", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70" },
];

const BrowseByCategory = () => {
  const navigate = useNavigate();
  const scrollRef = React.useRef(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const scroll = (direction) => {
    scrollRef.current.scrollBy({
      left: direction === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  return (
    <Box
      sx={{
        px: { xs: 0, sm: 3, md: 0 },
        py: { xs: 4, md: 6 },
        backgroundColor: "#fff",
      }}
    >
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography
          variant={isMobile ? "h6" : "h4"}
          fontWeight="bold"
        >
          Browse by Category
        </Typography>

        {/* Hide arrows on mobile */}
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

      {/* Carousel */}
      <Box
        ref={scrollRef}
        sx={{
          display: "flex",
          gap: { xs: 2, md: 3 },
          overflowX: "auto",
          scrollBehavior: "smooth",
          pb: 1,
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {categories.map((cat, index) => (
          <Card
            key={index}
            onClick={() => navigate(`/category/${cat.slug}`)}
            sx={{
              minWidth: isMobile ? 150 : isTablet ? 190 : 220,
              height: isMobile ? 170 : isTablet ? 200 : 220,
              flexShrink: 0,
              cursor: "pointer",
              borderRadius: 4,
              backdropFilter: "blur(10px)",
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.1))",
              boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
              transition: "0.3s",
              "&:hover": {
                transform: isMobile ? "none" : "translateY(-8px) scale(1.03)",
                boxShadow: "0 12px 40px rgba(0,0,0,0.25)",
              },
            }}
          >
            <CardContent
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                p: 2,
              }}
            >
              <Avatar
                src={cat.image}
                alt={cat.title}
                sx={{
                  width: isMobile ? 60 : isTablet ? 75 : 90,
                  height: isMobile ? 60 : isTablet ? 75 : 90,
                  mb: 1.5,
                }}
              />
              <Typography
                fontWeight={600}
                fontSize={isMobile ? 13 : 14}
              >
                {cat.title}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default BrowseByCategory;
