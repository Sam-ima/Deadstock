// src/components/product/ProductCard.jsx
import { Box, Typography, Chip, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const discountPercent = product.basePrice > product.price
    ? Math.round(((product.basePrice - product.price) / product.basePrice) * 100)
    : 0;

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
        width: { xs: '270px', sm: '280px', md: '280px' },
        maxWidth: 320,
        border: "1px solid",
        borderColor: "grey.200",
        borderRadius: 3,
        overflow: "hidden",
        backgroundColor: "#fff",
        cursor: "pointer",
        transition: "all 0.25s ease", 
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
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
            // height: 200,
            height: { xs: 180, sm: 200, md: 220 },
            objectFit: "cover",
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
      </Box>

      {/* Content Section */}
      <Box p={2}>
        {/* Product Name */}
        <Typography
          fontWeight={600}
          // fontSize="0.95rem"
          sx={{
            lineHeight: 1.3,
            // mb: 1,
            fontSize: {
            xs: "16px",   // mobile
            // sm: "16px",   // small tablets
            md: "18px",   // tablets / small laptop
            lg: "20px",   // desktop
          },
            height: {xs:28 , sm:30, md: 32 },
            // backgroundColor:'red',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {product.name}
        </Typography>

        {/* Rating */}
        <Stack direction="row" alignItems="center" spacing={0.5} mb={1}>
          {renderRatingStars()}
          <Typography fontSize="0.75rem" color="text.secondary" ml={0.5}>
            ({product.rating})
          </Typography>
          {/* <Typography fontSize="0.7rem" color="text.secondary" ml={0.5}>
            • {product.reviews} reviews
          </Typography> */}
        </Stack>

        {/* Price Section */}
        <Box 
        // sx={{backgroundColor:'blue'}}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography
              fontWeight={700}
              fontSize="1.25rem"
              color="#2E7D32"
              sx={{ lineHeight: 1 }}
            >
              ${product.price}
            </Typography>
            
            {product.basePrice > product.price && (
              <Typography
                fontSize="0.85rem"
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
        </Box>

        {/* Stock Status - Simplified */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mt: 1,
            pt: { xs: 1, sm: 1.2, md: 1.5 },
            borderTop: '1px solid #f0f0f0'
          }}
        >
          <Typography 
            sx={{fontSize:{xs:'0.8rem',sm:'0.85rem',md:'0.9rem'},}}
            color="text.secondary"
            fontWeight={500}
          >
            {product.stock > 0 
              ? `In Stock: ${product.stock}`
              : 'Out of Stock'
            }
          </Typography>
          
          <Typography
            sx={{fontSize:{xs:'0.8rem',sm:'0.85rem',md:'0.9rem'},}}
            color="text.secondary"
            fontWeight={500}
          >
            Sold: {product.sold}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductCard;