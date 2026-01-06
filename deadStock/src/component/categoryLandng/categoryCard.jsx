// src/components/categoryCard.jsx
import { Box, Typography } from '@mui/material';

const CategoryCard = ({ category, onClick }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        width: 96,
        height: 96,
        borderRadius: 3,
        backgroundColor: '#FFFFFF',
        border: '1px solid',
        borderColor: 'grey.200',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.25s ease',

        '&:hover': {
          transform: 'translateY(-2px)',
          borderColor: '#2E7D32',
          backgroundColor: '#FAFFFB',
          boxShadow: '0 6px 16px rgba(46,125,50,0.18)',
        },

        '&:hover .icon-wrapper': {
          backgroundColor: '#2E7D32',
          color: '#FFFFFF',
          transform: 'scale(1.08)',
        },
      }}
    >
      <Box
        className="icon-wrapper"
        sx={{
          width: 40,
          height: 40,
          borderRadius: 2,
          backgroundColor: '#E8F5E9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#2E7D32',
          transition: 'all 0.3s ease',
        }}
      >
        {category.icon}
      </Box>

      <Typography
        fontSize="0.7rem"
        fontWeight={600}
        mt={1}
        textAlign="center"
        noWrap
      >
        {category.name}
      </Typography>
    </Box>
  );
};

export default CategoryCard;
