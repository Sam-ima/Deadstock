import { Box, Typography, Stack, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';

import ProductImageCarousel from './productImageCarousel';
import ProductPrice from './productPrice';
import ProductStock from './productStock';
import { resolveProductImages } from "./utils/productImages";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const images = product.images?.length
    ? product.images
    : resolveProductImages(product);

  const price = product.currentPrice ?? product.basePrice ?? 0;
  const basePrice = product.basePrice ?? price;

  const discountPercent =
    basePrice > price
      ? Math.round(((basePrice - price) / basePrice) * 100)
      : 0;

  const renderRatingStars = () => {
    const stars = [];
    const fullStars = Math.floor(product.rating || 0);
    const hasHalfStar = (product.rating || 0) % 1 >= 0.5;

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
        border: "1px solid grey.200",
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
      <Box sx={{ position: "relative" }}>
        <ProductImageCarousel images={images} />

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
              zIndex: 2,
            }}
          />
        )}
      </Box>

      <Box p={2}>
        <Typography
          fontWeight={600}
          sx={{
            lineHeight: 1.3,
            fontSize: { xs: "16px", md: "18px", lg: "20px" },
            height: { xs: 28, sm: 30, md: 32 },
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {product.name}
        </Typography>

        <Stack direction="row" alignItems="center" spacing={0.5} mb={1}>
          {renderRatingStars()}
          <Typography fontSize="0.75rem" color="text.secondary" ml={0.5}>
            ({product.rating || 0})
          </Typography>
          <Typography fontSize="0.7rem" color="text.secondary" ml={0.5}>
            • {product.reviews || 0} reviews
          </Typography>
        </Stack>

        <ProductPrice price={price} basePrice={basePrice} />
        <ProductStock stock={product.stock} sold={product.sold} />
      </Box>
    </Box>
  );
};

export default ProductCard;
