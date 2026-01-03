// src/components/BrowseByCategory/BrowseByCategory.jsx
import React, { useRef, useState } from 'react';
import { Box, Button, Container, useTheme, useMediaQuery } from '@mui/material';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useNavigate } from 'react-router-dom';

import browseData from '../../data/browse_data';
import BrowseHeader from './browseHeader';
import BrowseList from './browseList';
import useBrowseAutoScroll from './useBrowseAutoScroll';
import { getCardWidth } from './browse.utils';

const BrowseByCategory = () => {
  const scrollRef = useRef(null);
  const theme = useTheme();
  const navigate = useNavigate();
  const [autoScroll, setAutoScroll] = useState(true);

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isDesktop = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isLarge = useMediaQuery(theme.breakpoints.up('lg'));

  const cardWidth = getCardWidth({ isLarge, isDesktop, isTablet });

  useBrowseAutoScroll({
    scrollRef,
    enabled: autoScroll,
    isMobile,
    cardWidth,
    dataLength: browseData.length,
    setCurrentIndex: () => {},
  });

  return (
    <Container maxWidth="xl">
      <Box py={5}>
        <BrowseHeader />

        <BrowseList
          browseData={browseData}
          scrollRef={scrollRef}
          cardWidth={cardWidth}
          onCategoryClick={slug => navigate(`/category/${slug}`)}
          onPause={() => setAutoScroll(false)}
          onResume={() => setAutoScroll(true)}
        />

        <Box display="flex" justifyContent="center" mt={4}>
          <Button
            variant="outlined"
            endIcon={<KeyboardDoubleArrowRightIcon />}
            onClick={() => navigate('/categories')}
            sx={{ borderRadius: 3 }}
          >
            View All Categories
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default BrowseByCategory;
