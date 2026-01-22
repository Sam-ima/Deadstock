import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Divider,
  Checkbox,
  FormControlLabel,
  Card,
  CardContent,
  Radio,
  RadioGroup,
  FormControl,
  InputAdornment,
} from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PaymentIcon from '@mui/icons-material/Payment';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LockIcon from '@mui/icons-material/Lock';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SecurityIcon from '@mui/icons-material/Security';
import DiscountIcon from '@mui/icons-material/Discount';

// Vibrant, eye-catching color palette
const colors = {
  primary: '#196638',          // Electric green
  primaryLight: '#588157',     // Lighter green
  primaryGradient: 'linear-gradient(135deg, #196638 0%, #588157 100%)',
  accent: '#F57C00',           // Coral pink
  accentLight: '#FFA0B5',      // Light coral
  accentGradient: 'linear-gradient(135deg, #FFC83D 0%, #F57C00 100%)',
  success: '#00C896',          // Mint green
  warning: '#FFC83D',          // Sunny yellow
  textPrimary: '#2D2D5B',      // Deep blue-gray
  textSecondary: '#6A6A8F',    // Medium blue-gray
  textLight: '#FFFFFF',        // White
  paper: '#FFFFFF',            // White
  paperLight: '#F8F9FF',       // Very light blue
  border: '#E6E8FF',           // Light blue border
  bg: '#F5F7FF',               // Light blue background
  shadow: 'rgba(58, 54, 224, 0.1)', // Blue shadow
};

const steps = ['Contact', 'Shipping', 'Payment'];

function CheckoutPage() {
  const [activeStep, setActiveStep] = useState(1); // start at shipping like screenshot
  const [paymentMethod, setPaymentMethod] = useState('card');

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

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
        <Box sx={{ textAlign: 'center', mb: 6 }}>
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
            Secure Checkout
          </Typography>
          <Typography variant="body1" color={colors.textSecondary} sx={{ maxWidth: 600, mx: 'auto' }}>
            Complete your purchase in just a few steps. Your items are waiting!
          </Typography>
        </Box>

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
                    defaultValue="alex.morgan@deadstock.com"
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
                    defaultValue="Alex Morgan"
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

                      {/* Crypto */}
                      <Card
                        variant="outlined"
                        sx={{
                          bgcolor: paymentMethod === 'crypto' ? colors.paperLight : 'transparent',
                          border: `2px solid ${paymentMethod === 'crypto' ? colors.primary : colors.border}`,
                          borderRadius: 3,
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            borderColor: colors.primaryLight,
                            transform: 'translateY(-2px)',
                          },
                        }}
                        onClick={() => setPaymentMethod('crypto')}
                      >
                        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Radio value="crypto" sx={{ color: colors.primary }} />
                            <Box
                              sx={{
                                width: 40,
                                height: 40,
                                borderRadius: '10px',
                                bgcolor: '#F7931A',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mr: 2,
                              }}
                            >
                              <AccountBalanceWalletIcon sx={{ color: colors.textLight }} />
                            </Box>
                            <Typography variant="subtitle1" fontWeight={600}>Cryptocurrency</Typography>
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
                  disabled={activeStep === 0}
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
                  onClick={handleNext}
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
                    '&:hover': {
                      boxShadow: `0 6px 30px ${colors.shadow}`,
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  {activeStep === steps.length - 1 ? 'Pay $204.40' : 'Continue'}
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
                {/* Item 1 */}
                <Box sx={{ display: 'flex', gap: 2, mb: 3, p: 2, bgcolor: colors.paperLight, borderRadius: 3 }}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: 2,
                      bgcolor: colors.primaryLight,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: colors.textLight,
                      fontWeight: 700,
                      fontSize: '1.5rem',
                    }}
                  >
                    👟
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Typography fontWeight={600}>Nike Dunk Low Retro</Typography>
                      <Typography fontWeight={700} color={colors.primary}>$109.00</Typography>
                    </Box>
                    <Typography variant="body2" color={colors.textSecondary}>
                      Green / US 10
                    </Typography>
                    <Typography variant="caption" color={colors.textSecondary}>
                      Qty: 1
                    </Typography>
                  </Box>
                </Box>

                {/* Item 2 */}
                <Box sx={{ display: 'flex', gap: 2, p: 2, bgcolor: colors.paperLight, borderRadius: 3 }}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: 2,
                      bgcolor: colors.accentLight,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: colors.textLight,
                      fontWeight: 700,
                      fontSize: '1.5rem',
                    }}
                  >
                    ⌚
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Typography fontWeight={600}>Vintage Seiko 5</Typography>
                      <Typography fontWeight={700} color={colors.primary}>$65.00</Typography>
                    </Box>
                    <Typography variant="body2" color={colors.textSecondary}>
                      Automatic / Excellent condition
                    </Typography>
                    <Typography variant="caption" color={colors.textSecondary}>
                      Qty: 1
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Divider sx={{ my: 3, borderColor: colors.border }} />

              {/* Cost breakdown */}
              <Box sx={{ '& > *': { display: 'flex', justifyContent: 'space-between', mb: 2 } }}>
                <Box>
                  <Typography color={colors.textSecondary}>Subtotal</Typography>
                  <Typography fontWeight={500}>$174.00</Typography>
                </Box>
                <Box>
                  <Typography color={colors.textSecondary}>Shipping</Typography>
                  <Typography fontWeight={500}>
                    <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      $25.00 <LocalShippingIcon sx={{ fontSize: 16 }} />
                    </Box>
                  </Typography>
                </Box>
                <Box>
                  <Typography color={colors.textSecondary}>Estimated tax</Typography>
                  <Typography fontWeight={500}>$5.40</Typography>
                </Box>
                <Box sx={{ color: colors.success }}>
                  <Typography>
                    <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <DiscountIcon sx={{ fontSize: 16 }} /> Deadstock Savings
                    </Box>
                  </Typography>
                  <Typography fontWeight={600}>–$10.00</Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 3, borderColor: colors.border }} />

              {/* Total */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6" fontWeight={700} color={colors.textPrimary}>
                  Total Due
                </Typography>
                <Typography variant="h4" fontWeight={800} sx={{ background: colors.accentGradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  $204.40
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
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Complete Payment
              </Button>

              {/* Trust badges */}
              <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: colors.success }} />
                  <Typography variant="caption" color={colors.textSecondary}>
                    30-Day Returns
                  </Typography>
                </Box>
                <Box component="span" sx={{ color: colors.border }}>•</Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: colors.success }} />
                  <Typography variant="caption" color={colors.textSecondary}>
                    Authenticity Guaranteed
                  </Typography>
                </Box>
              </Box>
            </Paper>

            {/* Promo Card */}
            <Paper
              sx={{
                mt: 3,
                p: 2.5,
                bgcolor: colors.warning,
                borderRadius: 3,
                color: colors.textPrimary,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ fontSize: '2rem' }}>🎁</Box>
                <Box>
                  <Typography variant="subtitle2" fontWeight={700}>
                    Free shipping on orders over $200!
                  </Typography>
                  <Typography variant="caption">
                    Add $26 more to qualify for free shipping.
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Box>

        {/* Footer */}
        <Box sx={{ mt: 8, textAlign: 'center', color: colors.textSecondary }}>
          <Typography variant="caption">
            © 2023–2026 Deadstock Market Inc. All rights reserved.
          </Typography>
          <Box component="span" sx={{ mx: 2, color: colors.border }}>
            •
          </Box>
          <Typography variant="caption" component="a" href="#" color={colors.primary} sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
            Privacy Policy
          </Typography>
          <Box component="span" sx={{ mx: 1.5, color: colors.border }}>
            •
          </Box>
          <Typography variant="caption" component="a" href="#" color={colors.primary} sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
            Terms of Service
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default CheckoutPage;