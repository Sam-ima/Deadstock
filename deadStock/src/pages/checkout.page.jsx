// pages/checkout.page.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
  Checkbox,
  FormControlLabel,
  Card,
  CardContent,
  Radio,
  RadioGroup,
  FormControl,
  InputAdornment,
  Alert,
  CircularProgress,
} from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PaymentIcon from '@mui/icons-material/Payment';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LockIcon from '@mui/icons-material/Lock';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SecurityIcon from '@mui/icons-material/Security';
import DiscountIcon from '@mui/icons-material/Discount';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmailIcon from '@mui/icons-material/Email';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from '../context/authContext/authContext';
import { resolveProductImages } from '../component/categoryPage/product/productCard/utils/productImages';
import { clearDirectPurchaseItem } from '../store/slice/purchaseSlice';
import { toast } from 'react-toastify';

// Color constants
const colors = {
  primary: '#196638',
  primaryLight: '#588157',
  primaryGradient: 'linear-gradient(135deg, #196638 0%, #588157 100%)',
  accent: '#F57C00',
  accentLight: '#FFA0B5',
  accentGradient: 'linear-gradient(135deg, #FFC83D 0%, #F57C00 100%)',
  success: '#00C896',
  warning: '#FFC83D',
  textPrimary: '#2D2D5B',
  textSecondary: '#6A6A8F',
  textLight: '#FFFFFF',
  paper: '#FFFFFF',
  paperLight: '#F8F9FF',
  border: '#E6E8FF',
  bg: '#F5F7FF',
  shadow: 'rgba(58, 54, 224, 0.1)',
};

const steps = ['Contact', 'Shipping', 'Payment'];

function CheckoutPage() {
  const [activeStep, setActiveStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { user } = useAuth();
  const dispatch = useDispatch();
  
  // Get items from Redux
  const directPurchaseItem = useSelector((state) => state.directPurchase.directPurchaseItem);
  const cartItems = useSelector((state) => state.cart.items);
  
  // Create a safe array of items for display
 const getDisplayItems = () => {
  const sourceItems = directPurchaseItem
    ? [directPurchaseItem]
    : Array.isArray(cartItems)
    ? cartItems
    : [];

  return sourceItems.map((item) => {
    const product = item.product || item;

     const resolvedImages =
      product.images?.length > 0
        ? product.images
        : resolveProductImages(product);

    return {
      ...item,

       product: {
        ...product,
        images: resolvedImages,
      },

      // 🔑 Ensure unitPrice always exists
      unitPrice:
        item.unitPrice ??
        product.currentPrice ??
        product.price ??
        0,

      quantity: item.quantity ?? 1,
    };
  });
};

const displayItems = getDisplayItems();

  
  // Calculate totals safely
 const calculateTotals = () => {
  if (!Array.isArray(displayItems) || displayItems.length === 0) {
    return {
      subtotal: 0,
      shipping: 0,
      tax: 0,
      discount: 0,
      total: 0,
    };
  }

  const subtotal = displayItems.reduce((sum, item) => {
    const unitPrice =
      item.unitPrice ??
      item.product?.currentPrice ??
      item.product?.price ??
      0;

    const quantity = item.quantity || 1;

    return sum + unitPrice * quantity;
  }, 0);

  const shipping = subtotal > 200 ? 0 : 25;
  const tax = subtotal * 0.031;
  const discount = subtotal > 150 ? 10 : 0;
  const total = subtotal + shipping + tax - discount;

  return {
    subtotal: Number(subtotal.toFixed(2)),
    shipping: Number(shipping.toFixed(2)),
    tax: Number(tax.toFixed(2)),
    discount: Number(discount.toFixed(2)),
    total: Number(total.toFixed(2)),
  };
};

const totals = calculateTotals();

  const handleNext = () => {
    if (activeStep < 2) {
      setActiveStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(prev => prev - 1);
    }
  };

  const handlePayment = async () => {
    setLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      setPaymentSuccess(true);
      
      // Clear direct purchase item after successful payment
      if (directPurchaseItem) {
        dispatch(clearDirectPurchaseItem());
      }
      
      // Show success message
      toast.success("Payment successful! Order confirmed.", {
        position: "top-right",
        autoClose: 3000,
      });
    }, 2000);
  };

  // Check if we have items to display
  const hasItems = displayItems.length > 0;

  // User email display component
  const UserEmailDisplay = () => {
    if (!user) {
      return (
        <Alert 
          severity="warning"
          sx={{ 
            mb: 3,
            borderRadius: 2,
          }}
        >
          <Typography fontWeight={600}>
            Please login to complete your purchase
          </Typography>
        </Alert>
      );
    }
    
    return (
      <Alert 
        severity="info" 
        icon={<EmailIcon />}
        sx={{ 
          mb: 3,
          borderRadius: 2,
          bgcolor: `${colors.primary}10`,
          border: `1px solid ${colors.primary}30`,
        }}
      >
        <Typography fontWeight={600}>
          Logged in as: <Box component="span" sx={{ color: colors.primary }}>{user.email}</Box>
        </Typography>
        {user?.role === 'seller' && (
          <Typography variant="body2" sx={{ mt: 0.5 }}>
            Business account • Bulk pricing applied where applicable
          </Typography>
        )}
      </Alert>
    );
  };

  // Payment success component
  const PaymentSuccess = () => (
    <Box sx={{ textAlign: 'center', py: 6 }}>
      <CheckCircleIcon sx={{ fontSize: 80, color: colors.success, mb: 3 }} />
      <Typography variant="h4" fontWeight={700} color={colors.textPrimary} gutterBottom>
        Payment Successful! 🎉
      </Typography>
      <Typography variant="body1" color={colors.textSecondary} sx={{ mb: 4, maxWidth: 500, mx: 'auto' }}>
        Your order has been confirmed. A confirmation email has been sent to {user?.email || 'your email'}
      </Typography>
      <Button
        variant="contained"
        onClick={() => window.location.href = '/'}
        sx={{
          background: colors.primaryGradient,
          color: colors.textLight,
          px: 5,
          py: 1.5,
          borderRadius: 2,
          fontWeight: 700,
        }}
      >
        Continue Shopping
      </Button>
    </Box>
  );

  if (paymentSuccess) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: colors.bg,
          color: colors.textPrimary,
          py: { xs: 4, md: 8 },
        }}
      >
        <Container maxWidth="md">
          <PaymentSuccess />
        </Container>
      </Box>
    );
  }

  // If no items and user is not in direct purchase flow, show empty state
  if (!hasItems && !directPurchaseItem) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: colors.bg,
          color: colors.textPrimary,
          py: { xs: 4, md: 8 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" fontWeight={700} color={colors.textPrimary} gutterBottom>
            Your cart is empty
          </Typography>
          <Typography variant="body1" color={colors.textSecondary} sx={{ mb: 4 }}>
            Add items to your cart before proceeding to checkout
          </Typography>
          <Button
            variant="contained"
            onClick={() => window.location.href = '/'}
            sx={{
              background: colors.primaryGradient,
              color: colors.textLight,
              px: 5,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 700,
            }}
          >
            Continue Shopping
          </Button>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: colors.bg,
        color: colors.textPrimary,
        py: { xs: 4, md: 8 },
      }}
    >
      <Container maxWidth="lg">
        {/* Title */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography
            variant="h3"
            component="h1"
            fontWeight={800}
            sx={{
              background: colors.primaryGradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              mb: 2,
            }}
          >
            {directPurchaseItem ? 'Direct Purchase' : 'Secure Checkout'}
          </Typography>
          <Typography variant="body1" color={colors.textSecondary} sx={{ maxWidth: 600, mx: 'auto' }}>
            {directPurchaseItem 
              ? 'You\'re purchasing this item directly. Complete your purchase below.' 
              : 'Complete your purchase in just a few steps. Your items are waiting!'}
          </Typography>
        </Box>

        {/* User Email Display */}
        <UserEmailDisplay />

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 4 }}>
          {/* Left - Form Section */}
          <Box sx={{ flex: '1 1 65%' }}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 4 },
                bgcolor: colors.paper,
                borderRadius: 4,
                border: `2px solid ${colors.border}`,
                boxShadow: `0 8px 32px ${colors.shadow}`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: `0 12px 48px ${colors.shadow}`,
                },
              }}
            >
              {/* Progress Bar */}
              <Box sx={{ position: 'relative', mb: 6 }}>
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: 0,
                    right: 0,
                    height: 3,
                    bgcolor: colors.border,
                    transform: 'translateY(-50%)',
                    zIndex: 1,
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: 0,
                    width: `${(activeStep + 1) * 33.33}%`,
                    height: 3,
                    background: colors.primaryGradient,
                    transform: 'translateY(-50%)',
                    zIndex: 2,
                    transition: 'width 0.5s ease',
                  }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', position: 'relative', zIndex: 3 }}>
                  {steps.map((label, index) => (
                    <Box key={label} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          bgcolor: index <= activeStep ? colors.primary : colors.border,
                          color: index <= activeStep ? colors.textLight : colors.textSecondary,
                          fontWeight: 600,
                          fontSize: '1.1rem',
                          mb: 1,
                          transition: 'all 0.3s ease',
                        }}
                      >
                        {index === 0 ? '📧' : index === 1 ? '🚚' : '💳'}
                      </Box>
                      <Typography
                        variant="caption"
                        fontWeight={600}
                        color={index === activeStep ? colors.primary : colors.textSecondary}
                      >
                        {label}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* Step Content */}
              {activeStep === 0 && (
                <Box>
                  <Typography variant="h5" gutterBottom fontWeight={700} color={colors.textPrimary}>
                    Contact Information
                  </Typography>
                  <Typography variant="body2" color={colors.textSecondary} sx={{ mb: 3 }}>
                    We'll use this to send order confirmation and updates
                  </Typography>
                  
                  <TextField
                    fullWidth
                    label="Email address"
                    defaultValue={user?.email || ""}
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover fieldset': {
                          borderColor: colors.primaryLight,
                        },
                      },
                    }}
                  />
                </Box>
              )}

              {activeStep === 1 && (
                <Box component="form" noValidate>
                  <Typography variant="h5" gutterBottom fontWeight={700} color={colors.textPrimary}>
                    Shipping Details
                  </Typography>
                  <Typography variant="body2" color={colors.textSecondary} sx={{ mb: 3 }}>
                    Where should we deliver your amazing finds?
                  </Typography>

                  <TextField
                    fullWidth
                    label="Full name"
                    defaultValue={user?.displayName || ""}
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          👤
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover fieldset': {
                          borderColor: colors.primaryLight,
                        },
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Street address"
                    placeholder="123 Main Street"
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          🏠
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover fieldset': {
                          borderColor: colors.primaryLight,
                        },
                      },
                    }}
                  />

                  <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                    <TextField
                      fullWidth
                      label="City"
                      margin="normal"
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            🏙️
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          '&:hover fieldset': {
                            borderColor: colors.primaryLight,
                          },
                        },
                      }}
                    />
                    <TextField
                      fullWidth
                      label="Postal / ZIP code"
                      margin="normal"
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            📮
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          '&:hover fieldset': {
                            borderColor: colors.primaryLight,
                          },
                        },
                      }}
                    />
                  </Box>

                  <FormControlLabel
                    control={
                      <Checkbox
                        defaultChecked
                        sx={{
                          color: colors.primary,
                          '&.Mui-checked': {
                            color: colors.primary,
                          },
                        }}
                      />
                    }
                    label="Save this address for future purchases"
                    sx={{ mt: 2, color: colors.textPrimary }}
                  />
                </Box>
              )}

              {activeStep === 2 && (
                <Box>
                  <Typography variant="h5" gutterBottom fontWeight={700} color={colors.textPrimary}>
                    Payment Method
                  </Typography>
                  <Typography variant="body2" color={colors.textSecondary} sx={{ mb: 3 }}>
                    Choose how you'd like to pay
                  </Typography>

                  <FormControl component="fieldset" sx={{ width: '100%' }}>
                    <RadioGroup
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                      {/* Card */}
                      <Card
                        variant="outlined"
                        sx={{
                          mb: 2,
                          bgcolor: paymentMethod === 'card' ? colors.paperLight : 'transparent',
                          border: `2px solid ${paymentMethod === 'card' ? colors.primary : colors.border}`,
                          borderRadius: 3,
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            borderColor: colors.primaryLight,
                            transform: 'translateY(-2px)',
                          },
                        }}
                        onClick={() => setPaymentMethod('card')}
                      >
                        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Radio value="card" sx={{ color: colors.primary }} />
                            <Box
                              sx={{
                                width: 40,
                                height: 40,
                                borderRadius: '10px',
                                bgcolor: paymentMethod === 'card' ? colors.primary : colors.border,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mr: 2,
                              }}
                            >
                              <CreditCardIcon sx={{ color: paymentMethod === 'card' ? colors.textLight : colors.textPrimary }} />
                            </Box>
                            <Typography variant="subtitle1" fontWeight={600}>Credit / Debit Card</Typography>
                          </Box>
                        </CardContent>
                      </Card>

                      {/* PayPal */}
                      <Card
                        variant="outlined"
                        sx={{
                          mb: 2,
                          bgcolor: paymentMethod === 'paypal' ? colors.paperLight : 'transparent',
                          border: `2px solid ${paymentMethod === 'paypal' ? colors.primary : colors.border}`,
                          borderRadius: 3,
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            borderColor: colors.primaryLight,
                            transform: 'translateY(-2px)',
                          },
                        }}
                        onClick={() => setPaymentMethod('paypal')}
                      >
                        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Radio value="paypal" sx={{ color: colors.primary }} />
                            <Box
                              sx={{
                                width: 40,
                                height: 40,
                                borderRadius: '10px',
                                bgcolor: '#FFC439',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mr: 2,
                              }}
                            >
                              <PaymentIcon sx={{ color: '#003087' }} />
                            </Box>
                            <Typography variant="subtitle1" fontWeight={600}>PayPal</Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    </RadioGroup>
                  </FormControl>

                  {/* Card fields */}
                  {paymentMethod === 'card' && (
                    <Box mt={3}>
                      <TextField
                        fullWidth
                        label="Card number"
                        defaultValue="4242 4242 4242 4242"
                        margin="normal"
                        variant="outlined"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <CreditCardIcon sx={{ color: colors.primary }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            '&:hover fieldset': {
                              borderColor: colors.primaryLight,
                            },
                          },
                        }}
                      />
                      <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                        <TextField
                          fullWidth
                          label="Expiration (MM/YY)"
                          defaultValue="12/28"
                          margin="normal"
                          variant="outlined"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                              '&:hover fieldset': {
                                borderColor: colors.primaryLight,
                              },
                            },
                          }}
                        />
                        <TextField
                          fullWidth
                          label="CVC"
                          defaultValue="123"
                          margin="normal"
                          variant="outlined"
                          type="password"
                          inputProps={{ maxLength: 4 }}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                              '&:hover fieldset': {
                                borderColor: colors.primaryLight,
                              },
                            },
                          }}
                        />
                      </Box>
                    </Box>
                  )}

                  <Box sx={{ mt: 3, p: 2, bgcolor: colors.paperLight, borderRadius: 3, border: `1px solid ${colors.border}` }}>
                    <FormControlLabel
                      required
                      control={
                        <Checkbox
                          sx={{
                            color: colors.primary,
                            '&.Mui-checked': {
                              color: colors.primary,
                            },
                          }}
                        />
                      }
                      label="This is a business purchase (Required for invoice)"
                      sx={{ color: colors.textPrimary }}
                    />
                  </Box>
                </Box>
              )}

              {/* Navigation buttons */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 5 }}>
                <Button
                  variant="outlined"
                  disabled={activeStep === 0 || loading}
                  onClick={handleBack}
                  sx={{
                    borderColor: colors.primary,
                    color: colors.primary,
                    px: 4,
                    borderRadius: 2,
                    fontWeight: 600,
                    '&:hover': {
                      borderColor: colors.primaryDark,
                      bgcolor: colors.paperLight,
                    },
                  }}
                >
                  ← Back
                </Button>

                <Button
                  variant="contained"
                  onClick={activeStep === steps.length - 1 ? handlePayment : handleNext}
                  disabled={loading || !user}
                  endIcon={activeStep === steps.length - 1 ? null : <ArrowForwardIcon />}
                  sx={{
                    background: activeStep === steps.length - 1 ? colors.accentGradient : colors.primaryGradient,
                    color: colors.textLight,
                    px: 5,
                    borderRadius: 2,
                    fontWeight: 700,
                    fontSize: '1rem',
                    py: 1.5,
                    boxShadow: `0 4px 20px ${colors.shadow}`,
                    minWidth: 180,
                    '&:hover': {
                      boxShadow: `0 6px 30px ${colors.shadow}`,
                      transform: loading ? 'none' : 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} sx={{ color: colors.textLight }} />
                  ) : activeStep === steps.length - 1 ? (
                    `Pay $${totals.total.toFixed(2)}`
                  ) : (
                    'Continue'
                  )}
                </Button>
              </Box>

              {/* Security badge */}
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 4, gap: 1 }}>
                <SecurityIcon sx={{ color: colors.success, fontSize: 20 }} />
                <Typography variant="caption" color={colors.textSecondary}>
                  SSL Secured • 256-bit Encryption • PCI Compliant
                </Typography>
              </Box>
            </Paper>
          </Box>

          {/* Right - Order Summary */}
          <Box sx={{ flex: '1 1 35%' }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                bgcolor: colors.paper,
                borderRadius: 4,
                border: `2px solid ${colors.border}`,
                boxShadow: `0 8px 32px ${colors.shadow}`,
                position: { lg: 'sticky' },
                top: 32,
              }}
            >
              <Typography variant="h5" gutterBottom fontWeight={700} color={colors.textPrimary}>
                Order Summary
              </Typography>

              {/* Items */}
              <Box sx={{ my: 3 }}>
                {displayItems.map((item, index) => {
                  // Safely get item details
                  const itemName = item.name || item.product?.name || 'Product';
                  const itemImage = item.product?.images?.[0] || item.image;
                  const unitPrice = item.unitPrice || item.price || 0;
                  const quantity = item.quantity || 1;
                  const isBulk = item.isBulkOrder || false;
                  
                  return (
                    <Box 
                      key={item.cartItemId || item.id || index}
                      sx={{ 
                        display: 'flex', 
                        gap: 2, 
                        mb: 3, 
                        p: 2, 
                        bgcolor: colors.paperLight, 
                        borderRadius: 3 
                      }}
                    >
                      <Box
                        sx={{
                          width: 80,
                          height: 80,
                          borderRadius: 2,
                          bgcolor: index % 2 === 0 ? colors.primaryLight : colors.accentLight,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: colors.textLight,
                          fontWeight: 700,
                          fontSize: '1.5rem',
                          overflow: 'hidden',
                        }}
                      >
                        {itemImage ? (
                          <Box
                            component="img"
                            src={itemImage}
                            alt={itemName}
                            sx={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                          />
                        ) : (
                          '📦'
                        )}
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <Typography fontWeight={600}>{itemName}</Typography>
                          <Typography fontWeight={700} color={colors.primary}>
                            ${(unitPrice * quantity).toFixed(2)}
                          </Typography>
                        </Box>
                        <Typography variant="body2" color={colors.textSecondary}>
                          {isBulk ? 'Bulk Order • ' : ''}
                          Unit Price: ${unitPrice.toFixed(2)}
                        </Typography>
                        <Typography variant="caption" color={colors.textSecondary}>
                          Qty: {quantity}
                        </Typography>
                        {isBulk && (
                          <Typography variant="caption" color={colors.success} sx={{ display: 'block', mt: 0.5 }}>
                            ✓ Bulk discount applied
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  );
                })}
              </Box>

              {displayItems.length === 0 && (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography color={colors.textSecondary}>
                    No items in your order
                  </Typography>
                </Box>
              )}

              <Divider sx={{ my: 3, borderColor: colors.border }} />

              {/* Cost breakdown */}
              <Box sx={{ '& > *': { display: 'flex', justifyContent: 'space-between', mb: 2 } }}>
                <Box>
                  <Typography color={colors.textSecondary}>Subtotal</Typography>
                  <Typography fontWeight={500}>${totals.subtotal.toFixed(2)}</Typography>
                </Box>
                <Box>
                  <Typography color={colors.textSecondary}>Shipping</Typography>
                  <Typography fontWeight={500}>
                    <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      ${totals.shipping.toFixed(2)} <LocalShippingIcon sx={{ fontSize: 16 }} />
                    </Box>
                  </Typography>
                </Box>
                <Box>
                  <Typography color={colors.textSecondary}>Estimated tax</Typography>
                  <Typography fontWeight={500}>${totals.tax.toFixed(2)}</Typography>
                </Box>
                {totals.discount > 0 && (
                  <Box sx={{ color: colors.success }}>
                    <Typography>
                      <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <DiscountIcon sx={{ fontSize: 16 }} /> Discount
                      </Box>
                    </Typography>
                    <Typography fontWeight={600}>–${totals.discount.toFixed(2)}</Typography>
                  </Box>
                )}
              </Box>

              <Divider sx={{ my: 3, borderColor: colors.border }} />

              {/* Total */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6" fontWeight={700} color={colors.textPrimary}>
                  Total Due
                </Typography>
                <Typography variant="h4" fontWeight={800} sx={{ background: colors.accentGradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  ${totals.total.toFixed(2)}
                </Typography>
              </Box>
              <Typography variant="caption" color={colors.textSecondary}>
                Includes all taxes and fees
              </Typography>

              {/* Pay Button */}
              <Button
                fullWidth
                variant="contained"
                size="large"
                startIcon={<LockIcon />}
                endIcon={<ArrowForwardIcon />}
                onClick={handlePayment}
                disabled={loading || !hasItems || !user}
                sx={{
                  mt: 4,
                  py: 1.8,
                  background: colors.accentGradient,
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  borderRadius: 3,
                  boxShadow: `0 6px 24px ${colors.accent}40`,
                  '&:hover': {
                    boxShadow: `0 8px 32px ${colors.accent}60`,
                    transform: loading ? 'none' : 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: colors.textLight }} />
                ) : (
                  'Complete Payment'
                )}
              </Button>
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default CheckoutPage;