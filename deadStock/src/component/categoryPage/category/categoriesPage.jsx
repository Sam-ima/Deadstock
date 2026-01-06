// src/pages/categories/CategoriesPage.jsx
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useMemo, useState } from 'react';

import categories from '../../data/categories';
import { subcategories } from '../../data/subcategories';
import products from '../../data/products';

import CategoriesSidebar from './categoriesSidebar';
import CategoryContent from './categoryContent';

const CategoriesPage = () => {
  const { slug } = useParams(); // category slug from URL

  const activeCategory = categories.find(c => c.slug === slug);

  const categorySubcategories = subcategories.filter(
    sub => sub.categorySlug === slug
  );

  const [activeSubcategory, setActiveSubcategory] = useState(null);

  const filteredProducts = useMemo(() => {
    if (!activeSubcategory) {
      // RANDOM products of category (initial state)
      return products
        .filter(p => p.categorySlug === slug)
        .sort(() => 0.5 - Math.random());
    }

    return products.filter(
      p =>
        p.categorySlug === slug &&
        p.subcategoryId === activeSubcategory.id
    );
  }, [slug, activeSubcategory]);

  return (
    <Box display="flex" minHeight="100vh">
      <CategoriesSidebar
        category={activeCategory}
        subcategories={categorySubcategories}
        activeSubcategory={activeSubcategory}
        onSelect={setActiveSubcategory}
      />

      <CategoryContent
        category={activeCategory}
        products={filteredProducts}
        activeSubcategory={activeSubcategory}
      />
    </Box>
  );
};

export default CategoriesPage;
