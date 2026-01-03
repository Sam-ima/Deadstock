// src/components/BrowseByCategory/BrowseList.jsx
import { Box } from '@mui/material';
import CategoryCard from '../categoryCard';

const BrowseList = ({
  browseData,
  scrollRef,
  cardWidth,
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
        gridAutoColumns: `${cardWidth}px`,
        gap: 3,
        overflowX: 'auto',
        pb: 2,
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': { display: 'none' },
      }}
    >
      {browseData.map(cat => (
        <CategoryCard
          key={cat.slug}
          category={cat}
          width={cardWidth}
          onClick={() => onCategoryClick(cat.slug)}
        />
      ))}
    </Box>
  );
};

export default BrowseList;
