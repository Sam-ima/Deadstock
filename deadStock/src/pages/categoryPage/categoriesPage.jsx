import { Box } from '@mui/material';
import { useState } from 'react';

import browseData from '../../component/data/browse_data';
import products from './product';
import CategoriesSidebar from './categoriesSidebar';
import CategoryContent from './categoryContent';

const CategoriesPage = () => {
  const [activeCategory, setActiveCategory] = useState(browseData[0]);

  const filteredProducts = products.filter(
    p => p.category === activeCategory.slug
  );

  return (
    <Box display="flex" minHeight="100vh">
      <CategoriesSidebar
        categories={browseData}
        active={activeCategory.slug}
        onSelect={setActiveCategory}
      />

      <CategoryContent
        category={activeCategory}
        products={filteredProducts}
      />
    </Box>
  );
};

export default CategoriesPage;
