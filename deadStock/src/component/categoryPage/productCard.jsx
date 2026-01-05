import { Box, Typography, Button, Chip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem } from '../../store/slice/cartSlice';
import QuantityControl from './quantityControl';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const quantity = useSelector(state => state.cart[product.id] || 0);

  return (
    <Box
      sx={{
        width: 220,
        border: '1px solid',
        borderColor: 'grey.200',
        borderRadius: 2.5,
        overflow: 'hidden',
        backgroundColor: '#fff',
        '&:hover': { boxShadow: 3 },
      }}
    >
      {/* Image */}
      <Box
        component="img"
        src={product.image}
        alt={product.name}
        onClick={() => navigate(`/product/${product.id}`)}
        sx={{
          width: '100%',
          height: 140,
          objectFit: 'cover',
          cursor: 'pointer',
        }}
      />

      <Box p={1.5}>
        <Typography fontWeight={600} noWrap>
          {product.name}
        </Typography>

        <Typography fontWeight={700} color="#2E7D32">
          ${product.price}
        </Typography>

        {/* Add / Quantity */}
        {quantity === 0 ? (
          <Button
            fullWidth
            size="small"
            variant="contained"
            onClick={() => dispatch(addItem(product))}
            sx={{ mt: 1, backgroundColor: '#F57C00' }}
          >
            Add
          </Button>
        ) : (
          <Box mt={1} display="flex" justifyContent="center">
            <QuantityControl
              quantity={quantity}
              onAdd={() => dispatch(addItem(product))}
              onRemove={() => dispatch(removeItem(product.id))}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProductCard;
