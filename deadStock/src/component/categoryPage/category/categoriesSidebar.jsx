// src/pages/categories/CategoriesSidebar.jsx
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const CategoriesSidebar = ({
  category,
  subcategories,
  activeSubcategory,
  onSelect,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        width: { xs: 110, sm: 200, md: 240 }, // responsive width
        borderRight: "1px solid",
        borderColor: "grey.200",
        p: { xs: 1.5, sm: 2, md: 3 },
        backgroundColor: "#FAFAFA",
      }}
    >
      {/* ✅ CATEGORY NAME (VISIBLE ON ALL SCREENS) */}
      {category && (
        <Typography
          onClick={() => onSelect(null)}
          fontWeight={800}
          sx={{
            cursor: "pointer",
            color: !activeSubcategory ? "#2E7D32" : "text.primary",
            fontSize: {
              xs: "0.9rem",
              sm: "1rem",
              md: "1.1rem",
            },
            mt: { xs: 1, sm: 2 },
            mb: { xs: 1, sm: 1.5, md: 2 },
            textAlign: { xs: "center", sm: "left" },
            "&:hover": {
              color: "#1B5E20",
            },
          }}
        >
          {category.name}
        </Typography>
      )}

      {/* ✅ SUBCATEGORIES */}
      {subcategories.map((sub) => {
        const isActive = activeSubcategory?.id === sub.id;

        return (
          <Box
            key={sub.id}
            onClick={() => onSelect(sub)}
            sx={{
              px: { xs: 1, sm: 2 },
              py: { xs: 0.8, sm: 1, md: 1.2 },
              borderRadius: 2,
              cursor: "pointer",
              mb: 0.5,
              textAlign: "left",
              //  { xs: "center", sm: "left" },
              backgroundColor: isActive ? "#E8F5E9" : "transparent",
              color: isActive ? "#2E7D32" : "text.primary",
              fontWeight: isActive ? 600 : 500,
              fontSize: {
                xs: "0.85rem",
                sm: "0.9rem",
                md: "0.95rem",
              },
              "&:hover": {
                backgroundColor: "#F1F8E9",
              },
            }}
          >
            {sub.name}
          </Box>
        );
      })}
    </Box>
  );
};

export default CategoriesSidebar;
