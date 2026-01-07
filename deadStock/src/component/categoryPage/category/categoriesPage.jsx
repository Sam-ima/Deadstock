// src/pages/categories/CategoriesPage.jsx
import { Box, IconButton, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useMemo, useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

import categories from '../../data/categories';
import { subcategories } from '../../data/subcategories';
import products from '../../data/products';

import CategoriesSidebar from './categoriesSidebar';
import CategoryContent from './categoryContent';

const CategoriesPage = () => {
  const { slug } = useParams(); // category slug from URL
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

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

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 200;
      const newScrollLeft = container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      container.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
      
      // Update arrow visibility after scroll
      setTimeout(() => {
        updateArrowVisibility();
      }, 100);
    }
  };

  const updateArrowVisibility = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(container.scrollLeft < (container.scrollWidth - container.clientWidth));
    }
  };

  const handleScroll = () => {
    updateArrowVisibility();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      {/* SLIDEABLE CATEGORIES BAR */}
      <Box 
        sx={{ 
          position: 'relative',
          backgroundColor: '#f8f9fa',
          borderBottom: '1px solid #e0e0e0',
          py: 2,
          px: { xs: 1, sm: 2 }
        }}
      >
        <Typography 
          variant="subtitle1" 
          fontWeight={600} 
          sx={{ 
            mt:{sm:1.5},
            mb: 1.5, 
            px: 2,
            color: 'text.secondary',
            fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' }
          }}
        >
          Quick Categories
        </Typography>

        {/* LEFT ARROW */}
        {showLeftArrow && (
          <IconButton
            onClick={() => scroll('left')}
            size="small"
            sx={{
              position: 'absolute',
              left: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              backgroundColor: 'white',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              '&:hover': {
                backgroundColor: 'grey.100',
              },
              display: { xs: 'none', sm: 'flex' }
            }}
          >
            <ChevronLeft fontSize="small" />
          </IconButton>
        )}

        {/* RIGHT ARROW */}
        {showRightArrow && (
          <IconButton
            onClick={() => scroll('right')}
            size="small"
            sx={{
              position: 'absolute',
              right: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              backgroundColor: 'white',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              '&:hover': {
                backgroundColor: 'grey.100',
              },
              display: { xs: 'none', sm: 'flex' }
            }}
          >
            <ChevronRight fontSize="small" />
          </IconButton>
        )}

        {/* SLIDEABLE CATEGORIES */}
        <Box
          ref={scrollContainerRef}
          onScroll={handleScroll}
          sx={{
            display: 'flex',
            gap: 1,
            overflowX: 'auto',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': {
              display: 'none'
            },
            px: 2,
          }}
        >
          {categories.map((category) => (
            <Box
              key={category.id}
              onClick={() => navigate(`/category/${category.slug}`)}
              sx={{
                flex: '0 0 auto',
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                px: { xs: 1, sm: 2, md: 2 },
                py: { xs: 0.5, md: 0.8 },
                borderRadius: '12px',
                backgroundColor: category.slug === slug ? category.color + '15' : 'white',
                border: category.slug === slug 
                  ? `2px solid ${category.color}` 
                  : '1px solid #e0e0e0',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                minWidth: 150,
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  backgroundColor: category.slug === slug ? category.color + '15' : '#f5f5f5',
                }
              }}
            >
              {/* Category Icon */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  backgroundColor: category.slug === slug ? category.color + '30' : '#f0f0f0',
                  color: category.slug === slug ? category.color : '#666',
                }}
              >
                {category.icon}
              </Box>

              {/* Category Name */}
              <Box>
                <Typography
                  fontWeight={600}
                  sx={{
                    fontSize: '0.95rem',
                    color: category.slug === slug ? category.color : 'text.primary',
                    lineHeight: 1.2
                  }}
                >
                  {category.name}
                </Typography>
                {/* <Typography
                  sx={{
                    fontSize: '0.75rem',
                    color: 'text.secondary',
                    lineHeight: 1.2,
                    mt: 0.25
                  }}
                >
                  {products.filter(p => p.categorySlug === category.slug).length} items
                </Typography> */}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* MAIN CONTENT */}
      <Box sx={{ display: 'flex', flex: 1, minHeight: 0 }}>
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
          categories={categories}
        />
      </Box>
    </Box>
  );
};

export default CategoriesPage;