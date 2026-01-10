import { Box } from "@mui/material";
import CategoryCard from "../categoryCard";

const BrowseList = ({ categories, onCategoryClick }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 2,
        flexWrap: "nowrap",
        overflow: "hidden",
        width: "100%",
      }}
    >
      {categories.map((category) => (
        <Box key={category.id} sx={{ flex: "0 0 auto" }}>
          <CategoryCard
            category={category}
            onClick={() => onCategoryClick(category.slug)}
          />
        </Box>
      ))}
    </Box>
  );
};

export default BrowseList;
