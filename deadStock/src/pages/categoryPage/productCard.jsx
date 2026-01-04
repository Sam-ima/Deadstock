import { Box, Typography, Button } from '@mui/material';

const ProductCard = ({ product }) => {
  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: 'grey.200',
        borderRadius: 3,
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        backgroundColor: '#fff',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 30px rgba(0,0,0,0.12)',
        },
      }}
    >
      <Box
        component="img"
        src={product.image}
        alt={product.name}
        sx={{
          width: '100%',
          height: 180,
          objectFit: 'cover',
        }}
      />

      <Box p={2}>
        <Typography fontWeight={600} fontSize="0.95rem" noWrap>
          {product.name}
        </Typography>

        <Typography fontWeight={700} color="#2E7D32" mt={0.5}>
          ${product.price}
        </Typography>

        <Button
          fullWidth
          size="small"
          variant="contained"
          sx={{ mt: 1, borderRadius: 2 }}
        >
          Add to Cart
        </Button>
      </Box>
    </Box>
  );
};

export default ProductCard;
