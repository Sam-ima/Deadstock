import { Box, Typography } from '@mui/material';

const CategoriesSidebar = ({ categories, active, onSelect }) => {
  return (
    <Box
      sx={{
        width: 260,
        borderRight: '1px solid',
        borderColor: 'grey.200',
        p: 3,
        backgroundColor: '#FAFAFA',
      }}
    >
      <Typography fontWeight={700} mb={2}>
        Categories
      </Typography>

      {categories.map(cat => (
        <Box
          key={cat.slug}
          onClick={() => onSelect(cat)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            px: 2,
            py: 1.2,
            borderRadius: 2,
            cursor: 'pointer',
            mb: 0.5,
            backgroundColor:
              active === cat.slug ? '#E8F5E9' : 'transparent',
            color:
              active === cat.slug ? '#2E7D32' : 'text.primary',
            fontWeight: active === cat.slug ? 600 : 500,
            '&:hover': {
              backgroundColor: '#F1F8E9',
            },
          }}
        >
          {cat.icon}
          {cat.name}
        </Box>
      ))}
    </Box>
  );
};

export default CategoriesSidebar;
