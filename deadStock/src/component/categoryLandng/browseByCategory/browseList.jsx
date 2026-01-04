// src/components/BrowseByCategory/BrowseList.jsx
import { Box } from '@mui/material';
import CategoryCard from '../categoryCard';

const BrowseList = ({
  browseData,
  scrollRef,
  onCategoryClick,
  onPause,
  onResume,
}) => {
  return (
    <Box
      ref={scrollRef}
      onMouseEnter={onPause}
      onMouseLeave={onResume}
      sx={{
        display: 'grid',
        gridAutoFlow: 'column',
        gridAutoColumns: 'max-content',
        gap: 1.5,

        overflowX: 'auto',
        scrollBehavior: 'smooth',

        justifyContent: 'center',   // ⭐ THIS CENTERS WHEN FEW ITEMS
        width: '100%',              // ⭐ TAKE FULL WIDTH

        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': { display: 'none' },
      }}
    >

      {browseData.map(cat => (
        <CategoryCard
          key={cat.slug}
          category={cat}
          onClick={() => onCategoryClick(cat.slug)}
        />
      ))}
    </Box>
  );
};

export default BrowseList;
