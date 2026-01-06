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
      {/* Icon */}
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
          flexShrink: 0,
        }}
      >
        {category.icon}
      </Box>

      {/* Category Name */}
      <Typography
        fontSize="0.7rem"
        fontWeight={600}
        textAlign="center"
        sx={{
          mt: 1,
          px: 0.5,
          lineHeight: 1.2,
          maxWidth: '100%',
          display: '-webkit-box',
          WebkitLineClamp: 2,        // 👈 limit to 2 lines
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {category.name}
      </Typography>
    </Box>
  );
};

export default CategoryCard;
