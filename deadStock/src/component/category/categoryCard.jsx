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
        position: 'relative',

        transition:
          'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s ease, border-color 0.25s ease, background-color 0.25s ease',

        '&:hover': {
          transform: 'translateY(-1px)', // softer lift
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
      {/* Icon wrapper */}
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

          transition:
            'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.25s ease, color 0.25s ease',
        }}
      >
        {category.icon}
      </Box>

      {/* Category name */}
      <Typography
        fontSize="0.7rem"
        fontWeight={600}
        mt={1}
        textAlign="center"
        lineHeight={1.2}
        sx={{
          px: 0.5,
          maxWidth: '100%',
          whiteSpace: 'nowrap',
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
