// src/components/Categories/CategoriesGrid.jsx
import { Grid } from '@mui/material';
import CategoryCard from './categoryCard';

const CategoriesGrid = ({ categories, onCategoryClick }) => {
  return (
    <Grid container spacing={3}>
      {categories.map((category) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={category.slug}>
          <CategoryCard
            category={category}
            onClick={onCategoryClick}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default CategoriesGrid;
