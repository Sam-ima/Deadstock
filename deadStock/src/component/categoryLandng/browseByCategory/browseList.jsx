// src/components/BrowseByCategory/BrowseList.jsx
import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import CategoryCard from "../categoryCard";

const AUTO_SCROLL_SPEED = 1;
const AUTO_SCROLL_INTERVAL = 20;
const MAX_DOTS = 5;

const BrowseList = ({
  categories,
  scrollRef,
  onCategoryClick,
  onPause,
  onResume,
}) => {
  const intervalRef = useRef(null);
  const itemRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const circularCategories = [...categories, ...categories];
  const SHOULD_CENTER = categories.length <= 5;

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || categories.length === 0) return;

    const itemWidth = itemRef.current.offsetWidth + 12;
    const loopPoint = itemWidth * categories.length;

    const startAutoScroll = () => {
      intervalRef.current = setInterval(() => {
        container.scrollLeft += AUTO_SCROLL_SPEED;

        // 🔁 seamless loop
        if (container.scrollLeft >= loopPoint) {
          container.scrollLeft -= loopPoint;
        }

        const index =
          Math.floor(container.scrollLeft / itemWidth) % categories.length;
        setActiveIndex(index);
      }, AUTO_SCROLL_INTERVAL);
    };

    startAutoScroll();

    return () => clearInterval(intervalRef.current);
  }, [categories.length]);


  const handleMouseEnter = () => {
    clearInterval(intervalRef.current);
  };

  const handleMouseLeave = () => {
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      const container = scrollRef.current;
      if (!container || !itemRef.current) return;

      const itemWidth = itemRef.current.offsetWidth + 12;
      const loopPoint = itemWidth * categories.length;

      container.scrollLeft += AUTO_SCROLL_SPEED;

      if (container.scrollLeft >= loopPoint) {
        container.scrollLeft -= loopPoint;
      }

      const index =
        Math.floor(container.scrollLeft / itemWidth) % categories.length;
      setActiveIndex(index);
    }, AUTO_SCROLL_INTERVAL);
  };


  const scrollToIndex = (index) => {
    if (!itemRef.current || !scrollRef.current) return;

    const itemWidth = itemRef.current.offsetWidth + 12;
    scrollRef.current.scrollTo({
      left: index * itemWidth,
      behavior: "smooth",
    });

    setActiveIndex(index);
  };

  /* ---------- DOT WINDOW LOGIC (like react-slick) ---------- */
  const getVisibleDots = () => {
    if (categories.length <= MAX_DOTS) {
      return categories.map((_, i) => i);
    }

    let start = activeIndex - Math.floor(MAX_DOTS / 2);
    let end = start + MAX_DOTS;

    if (start < 0) {
      start = 0;
      end = MAX_DOTS;
    }

    if (end > categories.length) {
      end = categories.length;
      start = end - MAX_DOTS;
    }

    return Array.from({ length: MAX_DOTS }, (_, i) => start + i);
  };

  const visibleDots = getVisibleDots();

  return (
    <>
      {/* CATEGORY LIST */}
      <Box
        ref={scrollRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{
          display: "grid",
          gridAutoFlow: "column",
          gridAutoColumns: "max-content",
          gap: 1.5,
          overflowX: "auto",
          scrollBehavior: "smooth",
          justifyContent: SHOULD_CENTER ? "center" : "flex-start",
          width: "100%",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {circularCategories.map((category, index) => (
          <Box key={`${category.id}-${index}`} ref={index === 0 ? itemRef : null}>
            <CategoryCard
              category={category}
              onClick={() => onCategoryClick(category.slug)}
            />
          </Box>
        ))}
      </Box>

      {/* DOTS (react-slick style) */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 1.5,
          gap: 1,
        }}
      >
        {visibleDots.map((dotIndex) => (
          <Box
            key={dotIndex}
            onClick={() => scrollToIndex(dotIndex)}
            sx={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              cursor: "pointer",
              backgroundColor:
                activeIndex === dotIndex ? "primary.main" : "grey.400",
              transform:
                activeIndex === dotIndex ? "scale(1.4)" : "scale(1)",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </Box>
    </>
  );
};

export default BrowseList;
