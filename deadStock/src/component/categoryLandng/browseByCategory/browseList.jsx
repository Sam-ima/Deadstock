// src/components/BrowseByCategory/BrowseList.jsx
import { Box } from '@mui/material';
import CategoryCard from '../categoryCard';

const BrowseList = ({
  categories,
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
        justifyContent: 'center',
        width: '100%',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': { display: 'none' },
      }}
    >
      {categories.map(category => (
        <CategoryCard
          key={category.id}
          category={category}
          onClick={() => onCategoryClick(category.slug)}
        />
      ))}
    </Box>
  );
};

export default BrowseList;
