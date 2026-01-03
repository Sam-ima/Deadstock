// src/components/Categories/CategoryCard.jsx
import { Box, Typography } from '@mui/material';

const CategoryCard = ({ category, onClick }) => {
  return (
    <Box
      onClick={() => onClick(category.slug)}
      sx={{
        border: '1px solid',
        borderColor: 'grey.200',
        borderRadius: 3,
        p: 3,
        cursor: 'pointer',
        textAlign: 'center',
        transition: '0.3s',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: 4,
        },
      }}
    >
      <Box mb={2}>{category.icon}</Box>

      <Typography variant="h6" fontWeight={600}>
        {category.name}
      </Typography>
    </Box>
  );
};

export default CategoryCard;
