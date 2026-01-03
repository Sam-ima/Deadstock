// src/pages/CategoriesPage.jsx
import { Container } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import browseData from '../../component/data/browse_data';
import CategoriesHeader from './categoriesHeader';
import CategoriesSearchBar from './categoriesSearchBar';
import CategoriesGrid from './categoriesGrid';

const CategoriesPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = browseData.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <CategoriesHeader />

      <CategoriesSearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        clearFilters={() => setSearchQuery('')}
      />

      <CategoriesGrid
        categories={filteredCategories}
        onCategoryClick={(slug) => navigate(`/category/${slug}`)}
      />
    </Container>
  );
};

export default CategoriesPage;
