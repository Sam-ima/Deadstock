// src/pages/categories/CategoriesSidebar.jsx
import { Box, Typography, Tooltip, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const CategoriesSidebar = ({
  category,
  subcategories,
  activeSubcategory,
  onSelect,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        width: isMobile ? 80 : 240,
        borderRight: '1px solid',
        borderColor: 'grey.200',
        p: isMobile ? 1 : 3,
        backgroundColor: '#FAFAFA',
      }}
    >
      {/* Category Name → SHOW ALL */}
      {!isMobile && category && (
        <Typography
          onClick={() => onSelect(null)}   // 👈 IMPORTANT
          fontWeight={800}
          mb={2}
          fontSize="1.1rem"
          color={!activeSubcategory ? '#2E7D32' : 'text.primary'}
          sx={{
            cursor: 'pointer',
            '&:hover': {
              color: '#1B5E20',
            },
          }}
        >
          {category.name}
        </Typography>
      )}

      {subcategories.map(sub => {
        const isActive = activeSubcategory?.id === sub.id;

        return (
          <Tooltip
            key={sub.id}
            title={isMobile ? sub.name : ''}
            placement="right"
            arrow
          >
            <Box
              onClick={() => onSelect(sub)}
              sx={{
                px: 2,
                py: 1.2,
                borderRadius: 2,
                cursor: 'pointer',
                mb: 0.5,
                backgroundColor: isActive ? '#E8F5E9' : 'transparent',
                color: isActive ? '#2E7D32' : 'text.primary',
                fontWeight: isActive ? 600 : 500,
                '&:hover': {
                  backgroundColor: '#F1F8E9',
                },
              }}
            >
              {!isMobile && sub.name}
            </Box>
          </Tooltip>
        );
      })}
    </Box>
  );
};

export default CategoriesSidebar;
