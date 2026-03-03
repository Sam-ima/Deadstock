import { Box, Typography, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";

import ProductImageCarousel from "./ProductImageCarousel";
import ProductPrice from "./ProductPrice";
import ProductStock from "./ProductStock";
import { resolveProductImages } from "./utils/ProductImages";
import ProductRating from "./ProductRating";

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

  return (
    <Box
      onClick={() => navigate(`/product/${product.slug}`)}
      sx={{
        width: { xs: "270px", sm: "280px", md: "280px" },
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
            lineHeight: 1,
            textTransform:"capitalize",
            fontSize: { xs: "16px", md: "18px", lg: "20px" },
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {product.name}
        </Typography>

        {/* ⭐ Reusable Rating */}
        <ProductRating productId={product.id} variant="card" />

        <ProductPrice price={price} basePrice={basePrice} />
        <ProductStock stock={product.stock} sold={product.sold} />
      </Box>
    </Box>
  );
};

export default ProductCard;