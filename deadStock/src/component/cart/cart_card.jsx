import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
  Rating,
  IconButton,
  useTheme
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

const ProductCard = ({ product, onAddToCart }) => {
  const theme = useTheme();

  const getCategoryColor = (category) => {
    const colors = {
      'Electronics': theme.palette.primary.main,
      'Audio': theme.palette.secondary.main,
      'Office': theme.palette.warning.main,
      'Wearables': '#9C27B0',
    };
    return colors[category] || theme.palette.primary.main;
  };

  return (
    <Card 
      elevation={2}
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          '& .product-image': {
            transform: 'scale(1.05)'
          }
        }
      }}
    >
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        <CardMedia
          component="img"
          height="200"
          image={product.image}
          alt={product.name}
          className="product-image"
          sx={{ 
            objectFit: 'cover',
            transition: 'transform 0.5s ease'
          }}
        />
        <Chip 
          label="HOT"
          size="small"
          sx={{ 
            position: 'absolute',
            top: 12,
            left: 12,
            bgcolor: theme.palette.error.main,
            color: 'white',
            fontWeight: 700,
            fontSize: '0.75rem'
          }}
        />
        <Box sx={{ 
          position: 'absolute', 
          top: 12, 
          right: 12,
          display: 'flex',
          flexDirection: 'column',
          gap: 1
        }}>
          <IconButton 
            size="small" 
            sx={{ 
              bgcolor: 'white',
              '&:hover': { bgcolor: 'grey.100' }
            }}
          >
            <FavoriteBorderIcon fontSize="small" />
          </IconButton>
          <IconButton 
            size="small" 
            sx={{ 
              bgcolor: 'white',
              '&:hover': { bgcolor: 'grey.100' }
            }}
          >
            <CompareArrowsIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
      
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Typography variant="h6" component="div" sx={{ 
            fontWeight: 700,
            fontSize: '1.1rem',
            lineHeight: 1.3
          }}>
            {product.name}
          </Typography>
          <Chip 
            label={product.category}
            size="small"
            sx={{ 
              bgcolor: getCategoryColor(product.category),
              color: 'white',
              fontWeight: 600,
              fontSize: '0.7rem'
            }}
          />
        </Box>
        
        <Typography variant="body2" color="text.secondary" sx={{ 
          mb: 2,
          fontSize: '0.875rem',
          lineHeight: 1.5,
          height: '42px',
          overflow: 'hidden'
        }}>
          {product.description}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Rating value={4.5} precision={0.5} readOnly size="small" />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            (24 reviews)
          </Typography>
        </Box>
        
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'space-between',
          mt: 'auto'
        }}>
          <Box>
            <Typography 
              variant="h5" 
              color="primary"
              sx={{ 
                fontWeight: 800,
                fontSize: '1.5rem'
              }}
            >
              ${product.price.toFixed(2)}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              + Free Shipping
            </Typography>
          </Box>
          
          {product.price > 500 && (
            <Chip 
              label="FREE DELIVERY"
              size="small"
              sx={{ 
                bgcolor: 'success.light',
                color: 'white',
                fontWeight: 600
              }}
            />
          )}
        </Box>
      </CardContent>
      
      <CardActions sx={{ p: 3, pt: 0 }}>
        <Button
          fullWidth
          variant="contained"
          endIcon={<AddShoppingCartIcon />}
          onClick={() => onAddToCart(product)}
          sx={{
            bgcolor: 'primary.main',
            '&:hover': {
              bgcolor: 'primary.dark',
              transform: 'scale(1.02)',
            },
            py: 1.5,
            borderRadius: 2,
            fontWeight: 700,
            fontSize: '0.95rem',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            transition: 'all 0.2s'
          }}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;