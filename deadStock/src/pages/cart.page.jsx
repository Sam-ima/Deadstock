// src/components/cart/CartDrawer.jsx
import {
  Box,
  Typography,
  IconButton,
  Divider,
  Button,
  Stack,
  Badge,
  Chip,
  Card,
  Slide,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import SecurityIcon from "@mui/icons-material/Security";
import { useSelector, useDispatch } from "react-redux";
import { addItem, decreaseItem, removeItem } from "../store/slice/cartSlice";

const CartDrawer = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const cartItems = Object.values(items);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.product.unitPrice * item.quantity,
    0
  );

  return (
    <>
      {/* Backdrop overlay */}
      {open && (
        <Box
          onClick={onClose}
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1199,
            animation: 'fadeIn 0.3s ease',
          }}
        />
      )}
      
      {/* Cart Drawer */}
      <Slide direction="left" in={open} mountOnEnter unmountOnExit>
        <Box
          sx={{
            position: 'fixed',
            top: 64, // Position below navbar
            right: 0,
            width: 420,
            height: 'calc(100vh - 64px)',
            backgroundColor: 'white',
            background: 'linear-gradient(135deg, #2E7D32 0%, #1B5E20 50%, #F57C00 100%)',
            zIndex: 1200,
            boxShadow: '-5px 0 25px rgba(0, 0, 0, 0.3)',
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Header with gradient */}
          <Box sx={{ 
            p: 3, 
            pb: 2,
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            flexShrink: 0,
          }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Stack direction="row" alignItems="center" spacing={2}>
                <Badge 
                  badgeContent={totalItems} 
                  color="error"
                  sx={{
                    '& .MuiBadge-badge': {
                      fontSize: '0.7rem',
                      fontWeight: 'bold',
                      border: '2px solid white',
                    }
                  }}
                >
                  <Box sx={{
                    width: 50,
                    height: 50,
                    borderRadius: 12,
                    background: 'rgba(255, 255, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                  }}>
                    <ShoppingBagIcon sx={{ fontSize: 26, color: 'white' }} />
                  </Box>
                </Badge>
                <Box>
                  <Typography variant="h5" fontWeight={800} color="white" letterSpacing={0.5}>
                    Your Cart
                  </Typography>
                  <Typography variant="caption" color="rgba(255,255,255,0.9)">
                    {totalItems} item{totalItems !== 1 ? 's' : ''} • ${cartTotal.toFixed(2)}
                  </Typography>
                </Box>
              </Stack>
              <IconButton 
                onClick={onClose}
                sx={{
                  color: 'white',
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.3)',
                  }
                }}
              >
                <CloseIcon />
              </IconButton>
            </Stack>
          </Box>

          {/* Cart Items Section - Scrollable */}
          <Box sx={{ 
            flex: 1, 
            overflowY: 'auto', 
            px: 2.5,
            py: 2,
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '10px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(255, 255, 255, 0.3)',
              borderRadius: '10px',
            },
          }}>
            {cartItems.length === 0 ? (
              <Box textAlign="center" mt={8} p={3}>
                <Box sx={{
                  width: 100,
                  height: 100,
                  margin: '0 auto 20px',
                  background: 'rgba(255, 255, 255, 0.15)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                }}>
                  <ShoppingBagIcon sx={{ fontSize: 50, color: 'rgba(255,255,255,0.9)' }} />
                </Box>
                <Typography variant="h5" color="white" fontWeight={600} mb={1}>
                  Cart is Empty
                </Typography>
                <Typography variant="body2" color="rgba(255,255,255,0.8)" mb={3}>
                  Add items to get started with your shopping
                </Typography>
                <Button 
                  variant="contained" 
                  onClick={onClose}
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    background: 'white',
                    color: '#2E7D32',
                    fontWeight: 700,
                    borderRadius: 3,
                    px: 4,
                    py: 1.2,
                    '&:hover': {
                      background: '#f5f5f5',
                    }
                  }}
                >
                  Browse Products
                </Button>
              </Box>
            ) : (
              <Stack spacing={2.5}>
                {cartItems.map(({ product, quantity }) => (
                  <Card
                    key={product.id}
                    sx={{
                      p: 2.5,
                      borderRadius: 3,
                      background: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                      }
                    }}
                  >
                    <Stack direction="row" spacing={2.5} alignItems="center">
                      {/* Product Image with quantity badge */}
                      <Box sx={{ position: 'relative' }}>
                        <Box
                          sx={{
                            width: 85,
                            height: 85,
                            borderRadius: 2,
                            overflow: 'hidden',
                            flexShrink: 0,
                          }}
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                          />
                        </Box>
                        <Chip
                          size="small"
                          label={quantity}
                          sx={{
                            position: 'absolute',
                            top: -8,
                            right: -8,
                            fontWeight: 'bold',
                            background: '#F57C00',
                            color: 'white',
                            fontSize: '0.75rem',
                          }}
                        />
                      </Box>

                      {/* Product Details */}
                      <Box flex={1}>
                        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                          <Box>
                            <Typography fontWeight={700} variant="subtitle1" color="#2E7D32">
                              {product.name}
                            </Typography>
                            <Stack direction="row" spacing={1} alignItems="center" mt={0.5}>
                              <LocalOfferIcon sx={{ fontSize: 14, color: '#F57C00' }} />
                              <Typography variant="body2" color="#666">
                                ${product.unitPrice.toFixed(2)}
                              </Typography>
                            </Stack>
                          </Box>
                          <IconButton
                            size="small"
                            onClick={() => dispatch(removeItem(product.id))}
                            sx={{
                              color: '#d32f2f',
                              '&:hover': {
                                background: 'rgba(211, 47, 47, 0.1)',
                              }
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Stack>

                        {/* Quantity Controls and Price */}
                        <Stack direction="row" alignItems="center" justifyContent="space-between" mt={2.5}>
                          <Stack direction="row" alignItems="center" spacing={1.5}>
                            <IconButton
                              size="small"
                              onClick={() => dispatch(decreaseItem(product.id))}
                              disabled={quantity <= 1}
                              sx={{
                                background: '#2E7D32',
                                color: 'white',
                                width: 30,
                                height: 30,
                                '&:hover': {
                                  background: '#1B5E20',
                                },
                                '&.Mui-disabled': {
                                  background: '#bdbdbd',
                                }
                              }}
                            >
                              <RemoveIcon fontSize="small" />
                            </IconButton>
                            <Typography fontWeight={700} sx={{ 
                              minWidth: 35, 
                              textAlign: 'center',
                              color: '#2E7D32'
                            }}>
                              {quantity}
                            </Typography>
                            <IconButton
                              size="small"
                              onClick={() => dispatch(addItem(product))}
                              sx={{
                                background: '#F57C00',
                                color: 'white',
                                width: 30,
                                height: 30,
                                '&:hover': {
                                  background: '#EF6C00',
                                }
                              }}
                            >
                              <AddIcon fontSize="small" />
                            </IconButton>
                          </Stack>
                          <Typography variant="h6" fontWeight={800} color="#2E7D32">
                            ${(product.unitPrice * quantity).toFixed(2)}
                          </Typography>
                        </Stack>
                      </Box>
                    </Stack>
                  </Card>
                ))}
              </Stack>
            )}
          </Box>

          {/* Footer - Only show when there are items */}
          {cartItems.length > 0 && (
            <Box
              sx={{
                p: 3,
                pt: 2,
                background: 'rgba(0, 0, 0, 0.1)',
                borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                flexShrink: 0,
              }}
            >
              <Stack spacing={2.5}>
                {/* Order Summary */}
                <Box sx={{
                  p: 2.5,
                  borderRadius: 2,
                  background: 'rgba(255, 255, 255, 0.9)',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                }}>
                  <Stack spacing={1.5}>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2" color="#666">
                        Subtotal ({totalItems} items)
                      </Typography>
                      <Typography variant="body2" fontWeight={600}>
                        ${cartTotal.toFixed(2)}
                      </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2" color="#666">
                        Shipping
                      </Typography>
                      <Typography variant="body2" fontWeight={600} color="#2E7D32">
                        FREE
                      </Typography>
                    </Stack>
                    <Divider sx={{ my: 0.5 }} />
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="h6" fontWeight={800}>
                        Total Amount
                      </Typography>
                      <Typography variant="h5" fontWeight={800} color="#F57C00">
                        ${cartTotal.toFixed(2)}
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>

                {/* Action Buttons */}
                <Stack spacing={1.5}>
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    startIcon={<ShoppingCartCheckoutIcon />}
                    sx={{
                      py: 1.8,
                      borderRadius: 3,
                      background: 'linear-gradient(90deg, #2E7D32 0%, #1B5E20 100%)',
                      color: 'white',
                      fontWeight: 700,
                      textTransform: 'none',
                      fontSize: '1rem',
                      boxShadow: '0 4px 15px rgba(46, 125, 50, 0.4)',
                      '&:hover': {
                        background: 'linear-gradient(90deg, #1B5E20 0%, #2E7D32 100%)',
                        boxShadow: '0 6px 20px rgba(46, 125, 50, 0.5)',
                      }
                    }}
                  >
                    Proceed to Checkout
                  </Button>
                  
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={onClose}
                    sx={{
                      py: 1.5,
                      borderRadius: 3,
                      textTransform: 'none',
                      fontWeight: 600,
                      color: 'white',
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                      '&:hover': {
                        borderColor: 'white',
                        background: 'rgba(255, 255, 255, 0.1)',
                      }
                    }}
                  >
                    Continue Shopping
                  </Button>
                </Stack>

                {/* Security Badge */}
                <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
                  <SecurityIcon sx={{ fontSize: 16, color: 'rgba(255,255,255,0.8)' }} />
                  <Typography variant="caption" color="rgba(255,255,255,0.8)">
                    Secure Checkout • SSL Encrypted
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          )}
        </Box>
      </Slide>
    </>
  );
};

export default CartDrawer;