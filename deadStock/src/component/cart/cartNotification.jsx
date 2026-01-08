import React, { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Avatar,
  IconButton,
  Paper,
  Fade,
  Slide,
  useTheme,
  Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import StoreIcon from '@mui/icons-material/Store';

const CartNotification = ({ 
  open, 
  product, 
  onClose, 
  onContinueShopping, 
  onCheckout 
}) => {
  const theme = useTheme();

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        // Auto-close after 8 seconds
        onClose();
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  if (!product) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      TransitionComponent={Slide}
      TransitionProps={{ direction: 'up' }}
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: 'hidden',
        }
      }}
    >
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.warning.light} 100%)`,
          py: 2,
          px: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CheckCircleIcon sx={{ color: 'white', fontSize: 28 }} />
          <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
            Successfully Added to Cart!
          </Typography>
        </Box>
        <IconButton onClick={onClose} sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent sx={{ p: 0 }}>
        <Fade in={open} timeout={500}>
          <Box sx={{ p: 4 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                mb: 3,
                bgcolor: 'warning.light',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 2
              }}
            >
              <Avatar sx={{ bgcolor: 'white', width: 56, height: 56 }}>
                <ShoppingCartIcon sx={{ color: theme.palette.warning.main, fontSize: 32 }} />
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                  Your item is waiting!
                </Typography>
                <Typography variant="body2" sx={{ color: 'white' }}>
                  Ready to complete your purchase?
                </Typography>
              </Box>
            </Paper>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4 }}>
              <Avatar
                src={product.image}
                variant="rounded"
                sx={{ width: 100, height: 100, borderRadius: 2 }}
              />
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  {product.name}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                  {product.description}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography variant="h5" color="primary" sx={{ fontWeight: 700 }}>
                    ${product.price.toFixed(2)}
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    bgcolor: 'success.light', 
                    color: 'white',
                    px: 2,
                    py: 0.5,
                    borderRadius: 1,
                    fontWeight: 500
                  }}>
                    In Stock
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <StoreIcon color="primary" />
              <Typography variant="body2" color="text.secondary">
                Free shipping on orders over $500 • 30-day return policy • 24/7 support
              </Typography>
            </Box>
          </Box>
        </Fade>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0, gap: 2 }}>
        <Button
          variant="outlined"
          onClick={onContinueShopping}
          fullWidth
          sx={{
            borderColor: 'primary.main',
            color: 'primary.main',
            py: 1.5,
            borderRadius: 2,
            '&:hover': {
              borderColor: 'primary.dark',
              bgcolor: 'primary.light',
              color: 'white'
            }
          }}
        >
          Continue Shopping
        </Button>
        
        <Button
          variant="contained"
          onClick={onCheckout}
          fullWidth
          endIcon={<ArrowForwardIcon />}
          sx={{
            bgcolor: 'secondary.main',
            py: 1.5,
            borderRadius: 2,
            fontWeight: 600,
            fontSize: '1rem',
            '&:hover': {
              bgcolor: 'secondary.dark',
              transform: 'translateY(-2px)',
              boxShadow: 3
            }
          }}
        >
          Proceed to Checkout
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CartNotification;