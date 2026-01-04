import { Box, Typography, Tooltip, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const CategoriesSidebar = ({ categories, active, onSelect }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        width: isMobile ? 72 : 200,
        borderRight: '1px solid',
        borderColor: 'grey.200',
        p: isMobile ? 1 : 3,
        backgroundColor: '#FAFAFA',
        transition: 'width 0.3s ease',
      }}
    >
      {!isMobile && (
        <Typography fontWeight={700} mb={2} fontSize="1.1rem">
          Categories
        </Typography>
      )}

      {categories.map(cat => {
        const isActive = active === cat.slug;

        return (
          <Tooltip
            key={cat.slug}
            title={isMobile ? cat.name : ''}
            placement="right"
            arrow
          >
            <Box
              onClick={() => onSelect(cat)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: isMobile ? 'center' : 'flex-start',
                gap: 1.5,
                px: isMobile ? 1 : 2,
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
              {cat.icon}

              {!isMobile && (
                <Typography fontSize="0.95rem">
                  {cat.name}
                </Typography>
              )}
            </Box>
          </Tooltip>
        );
      })}
    </Box>
  );
};

export default CategoriesSidebar;
