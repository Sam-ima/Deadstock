// src/components/BrowseByCategory/BrowseByCategory.jsx
import React, { useRef, useState } from 'react';
import {
  Box,
  Button,
  Container,
  useTheme,
  useMediaQuery,
} from '@mui/material';
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
    <Box
      sx={{
        py: { xs: 3, sm: 4, md: 6 },
        backgroundColor: '#ffffff',
      }}  
    >
      <Container maxWidth="xl">
        <BrowseHeader />

        {/* <Box position="relative"> */}
          {/* Left fade
          <Box
            sx={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: 60,
              // background:
              //   'linear-gradient(to right, #f8f9ff, transparent)',
              zIndex: 2,
              pointerEvents: 'none',
            }}
          /> */}

          {/* Right fade */}
          {/* <Box
            sx={{
              position: 'absolute',
              right: 0,
              top: 0,
              bottom: 0,
              width: 60,
              background:
                'linear-gradient(to left, #f8f9ff, transparent)',
              zIndex: 2,
              pointerEvents: 'none',
            }}
          /> */}

          <BrowseList
            browseData={browseData}
            scrollRef={scrollRef}
            cardWidth={cardWidth}
            onCategoryClick={slug => navigate(`/category/${slug}`)}
            onPause={() => setAutoScroll(false)}
            onResume={() => setAutoScroll(true)}
          />
        {/* </Box> */}

        <Box display="flex" justifyContent="center" mt={5}>
          <Button
            variant="outlined"
            size="large"
            endIcon={<KeyboardDoubleArrowRightIcon />}
            onClick={() => navigate('/category')}
            sx={{
              color: '#2E7D32',
              borderColor: '#2E7D32',
              borderRadius: 3,
              px: 4,
              py: 1.2,
              fontWeight: 600,
            }}
          >
            View All Categories
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default BrowseByCategory;
