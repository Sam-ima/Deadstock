// src/components/categoryCard.jsx
import { Box, Typography } from '@mui/material';

const CategoryCard = ({ category, onClick, width = 180, isMobile }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        width,
        height: 140,
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'grey.200',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
          transform: 'translateY(-4px)',
        },
      }}
    >
      {/* Icon circle */}
      <Box
        sx={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          backgroundColor: 'grey.100',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 1.5,
        }}
      >
        {category.icon}
      </Box>

      <Typography
        fontWeight={600}
        fontSize="0.95rem"
        textAlign="center"
      >
        {category.name}
      </Typography>
    </Box>
  );
};

export default CategoryCard;
