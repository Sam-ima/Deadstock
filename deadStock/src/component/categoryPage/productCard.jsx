import { Box, Typography, Button, Chip } from '@mui/material';

const ProductCard = ({ product }) => {
  const { name, image, basePrice, price } = product;

  const discountPercent =
    basePrice > price
      ? Math.round(((basePrice - price) / basePrice) * 100)
      : 0;

  return (
    <Box
      sx={{
        width: 220, // ⬅️ reduced size
        border: '1px solid',
        borderColor: 'grey.200',
        borderRadius: 2.5,
        overflow: 'hidden',
        backgroundColor: '#fff',
        transition: 'all 0.25s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 10px 24px rgba(0,0,0,0.12)',
        },
      }}
    >
      {/* Image */}
      <Box sx={{ position: 'relative' }}>
        <Box
          component="img"
          src={image}
          alt={name}
          sx={{
            width: '100%',
            height: 140,
            objectFit: 'cover',
          }}
        />

        {discountPercent > 0 && (
          <Chip
            label={`${discountPercent}% OFF`}
            size="small"
            sx={{
              position: 'absolute',
              top: 8,
              left: 8,
              backgroundColor: '#2E7D32',
              color: '#fff',
              fontWeight: 600,
              fontSize: '0.7rem',
            }}
          />
        )}
      </Box>

      {/* Content */}
      <Box p={1.5}>
        <Typography
          fontWeight={600}
          fontSize="0.85rem"
          noWrap
          mb={0.5}
        >
          {name}
        </Typography>

        {/* Price Section */}
        <Box display="flex" alignItems="center" gap={1}>
          <Typography
            fontWeight={700}
            color="#2E7D32"
            fontSize="0.95rem"
          >
            ${price}
          </Typography>

          {basePrice > price && (
            <Typography
              fontSize="0.75rem"
              color="text.secondary"
              sx={{ textDecoration: 'line-through' }}
            >
              ${basePrice}
            </Typography>
          )}
        </Box>

        <Button
          fullWidth
          size="small"
          variant="contained"
          sx={{
            mt: 1,
            borderRadius: 1.8,
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '0.75rem',
          }}
        >
          Add to Cart
        </Button>
      </Box>
    </Box>
  );
};

export default ProductCard;
  