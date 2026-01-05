import { Box, Typography, Button } from "@mui/material";
import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addItem } from "../../../store/slice/cartSlice";
import QuantityControl from "./quantityControl";

const ProductDetailPage = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();

  // get all products from redux
  const products = useSelector(state => state.products.products);

  // find product by slug
  const product = useMemo(
    () => products.find(p => p.slug === slug),
    [products, slug]
  );

  const [quantity, setQuantity] = useState(1);

  // 🔒 SAFETY CHECK
  if (!product) {
    return (
      <Box p={4}>
        <Typography variant="h6">Product not found</Typography>
      </Box>
    );
  }

  const handleAddToCart = () => {
    dispatch(addItem({ ...product, quantity }));
  };

  return (
    <Box p={{ xs: 2, md: 4 }} maxWidth={900} mx="auto">
      {/* Image */}
      <Box
        component="img"
        src={product.image}
        alt={product.name}
        sx={{
          width: "100%",
          maxWidth: 400,
          mb: 3,
          borderRadius: 2,
        }}
      />

      {/* Info */}
      <Typography variant="h4" fontWeight={700}>
        {product.name}
      </Typography>

      <Typography color="text.secondary" mb={1}>
        Available Stock: {product.stock}
      </Typography>

      <Typography variant="h5" color="#2E7D32" mb={2}>
        ${product.price}
      </Typography>

      <Typography mb={3}>{product.description}</Typography>

      {/* Quantity + Add */}
      <Box display="flex" alignItems="center" gap={3}>
        <QuantityControl
          quantity={quantity}
          onAdd={() =>
            setQuantity(q => Math.min(q + 1, product.stock))
          }
          onRemove={() =>
            setQuantity(q => Math.max(q - 1, 1))
          }
        />

        <Button
          variant="contained"
          size="large"
          onClick={handleAddToCart}
          disabled={product.stock === 0}
        >
          Add to Cart
        </Button>
      </Box>
    </Box>
  );
};

export default ProductDetailPage;
