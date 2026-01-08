// src/pages/product/components/ProductInfo.jsx
import { Box, Typography, Stack, Button, Chip, Rating } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import QuantitySelector from './quantitySelector';
import ActionButtons from './actionButtons';

const ProductInfo = ({ product, quantity, setQuantity }) => {
    const discountPercent = product.basePrice > product.price
        ? Math.round(((product.basePrice - product.price) / product.basePrice) * 100)
        : 0;

    return (
        <Box flex={1} sx={{
            // backgroundColor: 'red', 
            justifyContent: 'center',
            // alignItems: 'center', 
            display: 'flex', 
            flexDirection: 'column'
        }}>
            <Typography variant="h4" fontWeight="bold"
                sx={{
                    fontSize: {
                        xs: "24px",   // mobile
                        sm: "28px",   // small tablets
                        md: "32px",   // tablets / small laptop
                        lg: "40px",   // desktop
                        xl: "48px",   // large screens
                    },
                }}
                gutterBottom>
                {product.name}
            </Typography>

            <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                <Rating value={product.rating} precision={0.5} readOnly size="medium" />
                <Typography color="text.secondary">{product.rating} ({product.reviews} reviews)</Typography>
                <Chip label={`${product.sold} sold`} size="small" variant="outlined" />
            </Stack>

            <Box mb={3}>
                <Stack direction="row" spacing={2} alignItems="center">
                    <Typography variant="h3" fontWeight="bold"
                        sx={{
                            fontSize: {
                                xs: "18px",   // mobile
                                sm: "20px",   // small tablets
                                md: "24px",   // tablets / small laptop
                            },
                        }}
                        color="primary.main">
                        ${product.price}
                    </Typography>
                    {product.basePrice > product.price && (
                        <>
                            <Typography variant="h5" color="text.secondary" sx={{
                                textDecoration: 'line-through',
                                fontSize: {
                                    xs: "18px",   // mobile
                                    sm: "20px",   // small tablets
                                    md: "24px",   // tablets / small laptop
                                },
                            }}>
                                ${product.basePrice}
                            </Typography>
                            <Chip label={`Save $${product.basePrice - product.price}`} color="error" size="medium" />
                        </>
                    )}
                </Stack>
                {discountPercent > 0 && (
                    <Typography variant="body2" color="text.secondary" mt={1}>
                        Depreciation applied: {discountPercent}% off original price
                    </Typography>
                )}
            </Box>

            <Box mb={3}>
                <Typography variant="body1" gutterBottom>
                    Availability: {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.stock} units available • {product.sold} units sold
                </Typography>
            </Box>

            <QuantitySelector quantity={quantity} setQuantity={setQuantity} stock={product.stock} />
            <ActionButtons product={product} quantity={quantity} />
        </Box>
    );
};

export default ProductInfo;
