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

// Custom color palette
const colors = {
  primary: '#194638',
  primaryDark: '#112f2a',
  primaryLight: '#2a6b5c',
  accent: '#d4a017',          // warm gold / mustard accent
  accentLight: '#e8c07a',
  textPrimary: '#f0f4f2',
  textSecondary: '#b0c4b8',
  paper: '#142c25',
  paperDark: '#0f221c',
  border: '#2a4a40',
  bg: '#0a1814',
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
        <Typography
          variant="h4"
          component="h1"
          align="center"
          fontWeight={700}
          color={colors.accent}
          gutterBottom
          sx={{ mb: 5, letterSpacing: '-0.5px' }}
        >
          Secure Checkout
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 4 }}>
          {/* Left - Form Section */}
          <Box sx={{ flex: '1 1 65%' }}>
            <Paper
              elevation={6}
              sx={{
                p: { xs: 3, md: 4 },
                bgcolor: colors.paper,
                borderRadius: 3,
                border: `1px solid ${colors.border}`,
              }}
            >
              <Stepper
                activeStep={activeStep}
                alternativeLabel
                sx={{
                  mb: 5,
                  '& .MuiStepLabel-label': {
                    color: colors.textSecondary,
                    fontSize: '0.9rem',
                  },
                  '& .Mui-active .MuiStepIcon-root': {
                    color: colors.primaryLight,
                  },
                  '& .Mui-completed .MuiStepIcon-root': {
                    color: colors.primary,
                  },
                }}
              >
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              {/* Step Content */}
              {activeStep === 0 && (
                <Box>
                  <Typography variant="h6" gutterBottom color={colors.accent}>
                    Contact Information
                  </Typography>
                  <TextField
                    fullWidth
                    label="Email address"
                    defaultValue="alex.morgan@deadstock.com"
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                  />
                </Box>
              )}

              {activeStep === 1 && (
                <Box component="form" noValidate>
                  <Typography variant="h6" gutterBottom color={colors.accent}>
                    Shipping Details
                  </Typography>

                  <TextField
                    fullWidth
                    label="Full name"
                    defaultValue="Alex Morgan"
                    margin="normal"
                    variant="outlined"
                  />

                  <TextField
                    fullWidth
                    label="Street address"
                    margin="normal"
                    variant="outlined"
                  />

                  <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                    <TextField fullWidth label="City" margin="normal" variant="outlined" />
                    <TextField
                      fullWidth
                      label="Postal / ZIP code"
                      margin="normal"
                      variant="outlined"
                    />
                  </Box>

                  <FormControlLabel
                    control={<Checkbox defaultChecked color="primary" />}
                    label="Save this address for future purchases"
                    sx={{ mt: 2, color: colors.textSecondary }}
                  />
                </Box>
              )}

              {activeStep === 2 && (
                <Box>
                  <Typography variant="h6" gutterBottom color={colors.accent}>
                    Payment Method
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
                          bgcolor: paymentMethod === 'card' ? colors.border : 'transparent',
                          borderColor: paymentMethod === 'card' ? colors.primaryLight : colors.border,
                          borderRadius: 2,
                        }}
                      >
                        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Radio value="card" />
                            <CreditCardIcon sx={{ mr: 2, color: colors.primaryLight }} />
                            <Typography variant="subtitle1">Credit / Debit Card</Typography>
                          </Box>
                        </CardContent>
                      </Card>

                      {/* PayPal */}
                      <Card
                        variant="outlined"
                        sx={{
                          mb: 2,
                          bgcolor: paymentMethod === 'paypal' ? colors.border : 'transparent',
                          borderColor: paymentMethod === 'paypal' ? colors.primaryLight : colors.border,
                          borderRadius: 2,
                        }}
                      >
                        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Radio value="paypal" />
                            <PaymentIcon sx={{ mr: 2, color: '#ffc107' }} />
                            <Typography variant="subtitle1">PayPal</Typography>
                          </Box>
                        </CardContent>
                      </Card>

                      {/* Crypto */}
                      <Card
                        variant="outlined"
                        sx={{
                          bgcolor: paymentMethod === 'crypto' ? colors.border : 'transparent',
                          borderColor: paymentMethod === 'crypto' ? colors.primaryLight : colors.border,
                          borderRadius: 2,
                        }}
                      >
                        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Radio value="crypto" />
                            <AccountBalanceWalletIcon sx={{ mr: 2, color: colors.primaryLight }} />
                            <Typography variant="subtitle1">Cryptocurrency</Typography>
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
                              <CreditCardIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                      <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                        <TextField
                          fullWidth
                          label="Expiration (MM/YY)"
                          defaultValue="12/28"
                          margin="normal"
                          variant="outlined"
                        />
                        <TextField
                          fullWidth
                          label="CVC"
                          defaultValue="123"
                          margin="normal"
                          variant="outlined"
                          type="password"
                          inputProps={{ maxLength: 4 }}
                        />
                      </Box>
                    </Box>
                  )}

                  <FormControlLabel
                    required
                    control={<Checkbox color="primary" />}
                    label="This is a business purchase (Required for invoice)"
                    sx={{ mt: 3, color: colors.textSecondary }}
                  />
                </Box>
              )}

              {/* Navigation buttons */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 5 }}>
                <Button
                  variant="outlined"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{
                    borderColor: colors.primaryLight,
                    color: colors.textPrimary,
                    px: 4,
                  }}
                >
                  Back
                </Button>

                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{
                    bgcolor: colors.primary,
                    color: 'white',
                    px: 5,
                    '&:hover': { bgcolor: colors.primaryDark },
                  }}
                >
                  {activeStep === steps.length - 1 ? 'Pay $204.40 →' : 'Continue'}
                </Button>
              </Box>
            </Paper>
          </Box>

          {/* Right - Order Summary */}
          <Box sx={{ flex: '1 1 35%' }}>
            <Paper
              elevation={6}
              sx={{
                p: 3,
                bgcolor: colors.paper,
                borderRadius: 3,
                border: `1px solid ${colors.border}`,
                position: { lg: 'sticky' },
                top: 32,
              }}
            >
              <Typography variant="h6" gutterBottom color={colors.accent}>
                Order Summary
              </Typography>

              <Box sx={{ my: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography>Nike Dunk Low Retro</Typography>
                  <Typography fontWeight={500}>$109.00</Typography>
                </Box>
                <Typography variant="body2" color={colors.textSecondary}>
                  Green / US 10
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3, mb: 0.5 }}>
                  <Typography>Vintage Seiko 5</Typography>
                  <Typography fontWeight={500}>$65.00</Typography>
                </Box>
                <Typography variant="body2" color={colors.textSecondary}>
                  Automatic / Excellent condition
                </Typography>
              </Box>

              <Divider sx={{ my: 2.5, borderColor: colors.border }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Subtotal</Typography>
                <Typography>$174.00</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Shipping</Typography>
                <Typography>$25.00</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Estimated tax</Typography>
                <Typography>$5.40</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', color: colors.accentLight }}>
                <Typography>Deadstock Savings</Typography>
                <Typography>–$10.00</Typography>
              </Box>

              <Divider sx={{ my: 2.5, borderColor: colors.border }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" color={colors.accent}>
                  Total Due
                </Typography>
                <Typography variant="h5" fontWeight={700} color={colors.accent}>
                  $204.40
                </Typography>
              </Box>

              <Button
                fullWidth
                variant="contained"
                size="large"
                startIcon={<LockIcon />}
                sx={{
                  mt: 4,
                  py: 1.8,
                  bgcolor: colors.primary,
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  '&:hover': { bgcolor: colors.primaryDark },
                }}
              >
                Pay $204.40 →
              </Button>

              <Typography
                variant="caption"
                color={colors.textSecondary}
                align="center"
                display="block"
                sx={{ mt: 3 }}
              >
                SSL Secured • Money-back Guarantee
              </Typography>
            </Paper>
          </Box>
        </Box>

        {/* Footer */}
        <Box sx={{ mt: 8, textAlign: 'center', color: colors.textSecondary }}>
          <Typography variant="caption">
            © 2023–2026 Deadstock Market Inc. All rights reserved.
          </Typography>
          <Box component="span" sx={{ mx: 2 }}>
            •
          </Box>
          <Typography variant="caption" component="a" href="#" color={colors.primaryLight}>
            Privacy Policy
          </Typography>
          <Box component="span" sx={{ mx: 1.5 }}>
            •
          </Box>
          <Typography variant="caption" component="a" href="#" color={colors.primaryLight}>
            Terms of Service
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default CheckoutPage;