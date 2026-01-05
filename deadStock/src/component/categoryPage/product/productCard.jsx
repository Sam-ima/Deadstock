import { Box, Typography, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const discountPercent =
    product.basePrice > product.price
      ? Math.round(
          ((product.basePrice - product.price) / product.basePrice) * 100
        )
      : 0;

  return (
    <Box
      onClick={() =>
        navigate(`/product/${product.slug}/${product.title}`)
      }
      sx={{
        width: 220,
        border: "1px solid",
        borderColor: "grey.200",
        borderRadius: 2.5,
        overflow: "hidden",
        backgroundColor: "#fff",
        cursor: "pointer",
        transition: "all 0.25s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 10px 24px rgba(0,0,0,0.12)",
        },
      }}
    >
      {/* Image */}
      <Box sx={{ position: "relative" }}>
        <Box
          component="img"
          src={product.image}
          alt={product.name}
          sx={{
            width: "100%",
            height: 140,
            objectFit: "cover",
          }}
        />

        {discountPercent > 0 && (
          <Chip
            label={`${discountPercent}% OFF`}
            size="small"
            sx={{
              position: "absolute",
              top: 8,
              left: 8,
              backgroundColor: "#2E7D32",
              color: "#fff",
              fontWeight: 600,
              fontSize: "0.7rem",
            }}
          />
        )}
      </Box>

      {/* Content */}
      <Box p={1.5}>
        <Typography fontWeight={600} fontSize="0.85rem" noWrap>
          {product.name}
        </Typography>

        <Typography fontSize="0.75rem" color="text.secondary">
          Available: {product.stock}
        </Typography>

        <Box display="flex" alignItems="center" gap={1} mt={0.5}>
          <Typography fontWeight={700} color="#2E7D32">
            ${product.price}
          </Typography>

          {product.basePrice > product.price && (
            <Typography
              fontSize="0.75rem"
              color="text.secondary"
              sx={{ textDecoration: "line-through" }}
            >
              ${product.basePrice}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ProductCard;
