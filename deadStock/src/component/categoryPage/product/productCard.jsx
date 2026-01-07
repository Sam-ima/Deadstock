// src/components/product/ProductCard.jsx
import { Box, Typography, Chip, Stack, LinearProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import { styled } from '@mui/material/styles';

// const ConditionChip = styled(Chip)(({ theme, condition }) => {
//   let color;
//   switch(condition?.toLowerCase()) {
//     case 'new': color = '#4CAF50'; break;
//     case 'like new': color = '#2196F3'; break;
//     case 'excellent': color = '#FF9800'; break;
//     case 'good': color = '#9C27B0'; break;
//     case 'vintage':
//     case 'antique':
//     case 'collectible': color = '#795548'; break;
//     case 'mixed': color = '#607D8B'; break;
//     default: color = '#757575';
//   }
//   return {
//     backgroundColor: `${color}15`,
//     color: color,
//     border: `1px solid ${color}30`,
//     fontWeight: 600,
//     fontSize: '0.7rem',
//     height: 20,
//   };
// });

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const discountPercent = product.basePrice > product.price
    ? Math.round(((product.basePrice - product.price) / product.basePrice) * 100)
    : 0;

  const totalItems = product.stock + product.sold;
  const stockPercentage = (product.stock / totalItems) * 100;
  const soldPercentage = (product.sold / totalItems) * 100;

  const renderRatingStars = () => {
    const stars = [];
    const fullStars = Math.floor(product.rating);
    const hasHalfStar = product.rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarIcon key={`star-${i}`} sx={{ fontSize: 14, color: '#FFC107' }} />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalfIcon key="half-star" sx={{ fontSize: 14, color: '#FFC107' }} />);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<StarIcon key={`empty-${i}`} sx={{ fontSize: 14, color: '#E0E0E0' }} />);
    }
    
    return stars;
  };

  return (
    <Box
      onClick={() => navigate(`/product/${product.slug}`)}
      sx={{
        width: '100%',
        maxWidth: 320,
        border: "1px solid",
        borderColor: "grey.200",
        borderRadius: 3,
        overflow: "hidden",
        backgroundColor: "#fff",
        cursor: "pointer",
        transition: "all 0.25s ease",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 12px 32px rgba(0,0,0,0.15)",
          borderColor: "primary.main",
        },
      }}
    >
      {/* Image Section */}
      <Box sx={{ position: "relative" }}>
        <Box
          component="img"
          src={product.image}
          alt={product.name}
          sx={{
            width: "100%",
            height: 200,
            objectFit: "cover",
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        />

        {/* Discount Badge */}
        {discountPercent > 0 && (
          <Chip
            label={`${discountPercent}% OFF`}
            size="small"
            sx={{
              position: "absolute",
              top: 12,
              left: 12,
              backgroundColor: "#2E7D32",
              color: "#fff",
              fontWeight: 700,
              fontSize: "0.75rem",
              height: 24,
              px: 1,
            }}
          />
        )}

        {/* Condition Badge */}
        {/* <Box sx={{ position: "absolute", top: 12, right: 12 }}>
          <ConditionChip
            label={product.condition}
            condition={product.condition}
            size="small"
          />
        </Box> */}
      </Box>

      {/* Content Section */}
      <Box p={2.5}>
        {/* Product Name */}
        <Typography
          fontWeight={700}
          fontSize="1rem"
          sx={{
            lineHeight: 1.3,
            mb: 1,
            height: 40,
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {product.name}
        </Typography>

        {/* Rating */}
        <Stack direction="row" alignItems="center" spacing={0.5} mb={1.5}>
          {renderRatingStars()}
          <Typography fontSize="0.8rem" color="text.secondary" ml={0.5}>
            ({product.rating})
          </Typography>
          <Typography fontSize="0.75rem" color="text.secondary" ml={0.5}>
            • {product.reviews} reviews
          </Typography>
        </Stack>

        {/* Price Section */}
        <Box mb={2}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography
              fontWeight={800}
              fontSize="1.4rem"
              color="#2E7D32"
              sx={{ lineHeight: 1 }}
            >
              ${product.price}
            </Typography>
            
            {product.basePrice > product.price && (
              <Typography
                fontSize="0.9rem"
                color="text.secondary"
                sx={{
                  textDecoration: "line-through",
                  fontWeight: 500,
                }}
              >
                ${product.basePrice}
              </Typography>
            )}
          </Stack>
          
          {/* Depreciation Info */}
          {product.basePrice > product.price && (
            <Typography
              fontSize="0.75rem"
              color="#FF9800"
              fontWeight={600}
              sx={{ mt: 0.5 }}
            >
              Save ${product.basePrice - product.price} (Depreciation Applied)
            </Typography>
          )}
        </Box>

        {/* Stock & Sold Progress Bar */}
        <Box mb={2}>
          <Stack direction="row" justifyContent="space-between" mb={0.5}>
            <Typography fontSize="0.75rem" fontWeight={600} color="text.secondary">
              Available: {product.stock} units
            </Typography>
            <Typography fontSize="0.75rem" fontWeight={600} color="text.secondary">
              Sold: {product.sold} units
            </Typography>
          </Stack>
          
          <Box sx={{ position: 'relative', height: 8, borderRadius: 4, backgroundColor: '#E0E0E0' }}>
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                height: '100%',
                width: `${stockPercentage}%`,
                backgroundColor: '#4CAF50',
                borderRadius: 4,
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                right: 0,
                height: '100%',
                width: `${soldPercentage}%`,
                backgroundColor: '#F44336',
                borderRadius: 4,
              }}
            />
          </Box>
          
          <Stack direction="row" justifyContent="space-between" mt={0.5}>
            <Typography fontSize="0.7rem" fontWeight={600} color="#4CAF50">
              {Math.round(stockPercentage)}% Available
            </Typography>
            <Typography fontSize="0.7rem" fontWeight={600} color="#F44336">
              {Math.round(soldPercentage)}% Sold
            </Typography>
          </Stack>
        </Box>

        {/* Stock Status */}
        <Box
          sx={{
            px: 2,
            py: 1,
            borderRadius: 2,
            backgroundColor: product.stock > 0 ? '#E8F5E9' : '#FFEBEE',
            textAlign: 'center',
          }}
        >
          <Typography
            fontSize="0.85rem"
            fontWeight={600}
            color={product.stock > 0 ? '#2E7D32' : '#D32F2F'}
          >
            {product.stock > 0 
              ? `🚚 ${product.stock} available for immediate shipping`
              : '⚠️ Out of stock - Backorder available'}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductCard;