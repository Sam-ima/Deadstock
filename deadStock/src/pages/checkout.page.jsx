import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  TextField,
  Button,
  Stack,
  Divider,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputAdornment,
  IconButton,
  Alert,
  Chip,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Avatar,
  CircularProgress,
  alpha
} from "@mui/material";
import {
  CreditCard as CreditCardIcon,
  Money as MoneyIcon,
  AccountBalanceWallet as WalletIcon,
  LocalShipping,
  Security,
  CheckCircle,
  ArrowBack,
  Payment,
  LocationOn,
  Person,
  Email,
  Phone,
  Lock,
  Verified,
  ArrowForward,
  Close,
  ShoppingBag,
  Tag,
  Discount
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#2563EB", // Vibrant blue
      light: "#60A5FA",
      dark: "#1D4ED8",
      contrastText: "#FFFFFF"
    },
    secondary: {
      main: "#7C3AED", // Purple accent
      light: "#A78BFA",
      dark: "#5B21B6"
    },
    success: {
      main: "#059669", // Emerald green
      light: "#10B981",
      dark: "#047857"
    },
    info: {
      main: "#0EA5E9", // Sky blue
      light: "#38BDF8"
    },
    warning: {
      main: "#F59E0B", // Amber
      light: "#FBBF24"
    },
    background: {
      default: "#F8FAFC", // Light slate
      paper: "#FFFFFF"
    },
    text: {
      primary: "#1E293B", // Slate 800
      secondary: "#64748B", // Slate 500
      disabled: "#94A3B8" // Slate 400
    },
    grey: {
      50: "#F8FAFC",
      100: "#F1F5F9",
      200: "#E2E8F0",
      300: "#CBD5E1",
      400: "#94A3B8",
      500: "#64748B",
      600: "#475569",
      700: "#334155",
      800: "#1E293B",
      900: "#0F172A"
    }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica Neue", sans-serif',
    h4: {
      fontWeight: 800,
      fontSize: { xs: "1.75rem", md: "2.25rem" },
      letterSpacing: "-0.5px"
    },
    h5: {
      fontWeight: 700,
      fontSize: { xs: "1.5rem", md: "1.75rem" }
    },
    h6: {
      fontWeight: 600,
      fontSize: { xs: "1.125rem", md: "1.25rem" }
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.5
    },
    caption: {
      fontSize: "0.75rem",
      lineHeight: 1.4
    }
  },
  shape: {
    borderRadius: 12
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
          padding: "10px 24px",
          fontSize: "0.9375rem",
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "translateY(-1px)",
            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)"
          }
        },
        containedPrimary: {
          background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
          boxShadow: "0 4px 14px 0 rgba(37, 99, 235, 0.3)",
          "&:hover": {
            background: "linear-gradient(135deg, #1D4ED8 0%, #1E40AF 100%)",
            boxShadow: "0 6px 20px 0 rgba(37, 99, 235, 0.4)"
          }
        },
        outlined: {
          borderColor: "#E2E8F0",
          "&:hover": {
            borderColor: "#2563EB",
            backgroundColor: "rgba(37, 99, 235, 0.04)"
          }
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
            backgroundColor: "#FFFFFF",
            transition: "all 0.2s",
            "&:hover": {
              backgroundColor: "#F8FAFC"
            },
            "&.Mui-focused": {
              backgroundColor: "#FFFFFF",
              boxShadow: "0 0 0 3px rgba(37, 99, 235, 0.1)"
            }
          },
          "& .MuiInputLabel-root": {
            fontSize: "0.875rem",
            color: "#64748B"
          }
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none"
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
          border: "1px solid #E2E8F0",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
          }
        }
      }
    }
  }
});

const Checkout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const { product, quantity = 1 } = state || {};

  if (!product) {
    return (
      <Container sx={{ py: 10, textAlign: "center" }}>
        <Typography variant="h5" color="text.primary" mb={2}>
          No product selected
        </Typography>
        <Button sx={{ mt: 3 }} variant="contained" onClick={() => navigate("/")}>
          Continue Shopping
        </Button>
      </Container>
    );
  }

  const subtotal = product.price * quantity;
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;
  const discount = subtotal > 200 ? 25 : 0;
  const finalTotal = total - discount;

  const handlePlaceOrder = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOrderPlaced(true);
    }, 1500);
  };

  const steps = ["Cart", "Information", "Payment", "Confirmation"];

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  if (orderPlaced) {
    return (
      <Container maxWidth="sm" sx={{ py: { xs: 8, md: 10 }, textAlign: "center" }}>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
          <Avatar 
            sx={{ 
              bgcolor: "success.main", 
              width: { xs: 60, md: 80 }, 
              height: { xs: 60, md: 80 },
              boxShadow: "0 4px 20px rgba(5, 150, 105, 0.3)"
            }}
          >
            <CheckCircle sx={{ fontSize: { xs: 36, md: 48 } }} />
          </Avatar>
        </Box>
        <Typography variant="h4" fontWeight={800} mb={2} color="text.primary">
          Order Confirmed!
        </Typography>
        <Typography color="text.secondary" mb={4} sx={{ maxWidth: 400, mx: "auto" }}>
          Your order has been successfully placed. You will receive a confirmation email shortly with tracking details.
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
          <Button variant="contained" onClick={() => navigate("/")} sx={{ px: 4 }}>
            Continue Shopping
          </Button>
          <Button variant="outlined" onClick={() => navigate("/orders")}>
            View Orders
          </Button>
        </Stack>
      </Container>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
        bgcolor: "background.default", 
        minHeight: "100vh", 
        py: { xs: 2, md: 4 }
      }}>
        <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
          {/* Header with Stepper */}
          <Box sx={{ mb: { xs: 4, md: 6 } }}>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate(-1)}
              sx={{ 
                mb: 3,
                color: "text.secondary",
                "&:hover": {
                  color: "primary.main",
                  backgroundColor: "rgba(37, 99, 235, 0.04)"
                }
              }}
            >
              Back to Cart
            </Button>
            
            <Typography 
              variant="h4" 
              fontWeight={800} 
              mb={{ xs: 3, md: 4 }}
              sx={{
                background: "linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}
            >
              Complete Your Purchase
            </Typography>
            
            <Stepper 
              activeStep={1} 
              alternativeLabel 
              sx={{ 
                display: { xs: "none", md: "flex" },
                "& .MuiStepLabel-root .Mui-active": {
                  color: "primary.main"
                },
                "& .MuiStepLabel-root .Mui-completed": {
                  color: "success.main"
                }
              }}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel 
                    sx={{
                      "& .MuiStepLabel-label": {
                        fontSize: "0.875rem",
                        fontWeight: 500
                      }
                    }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
            
            {/* Mobile Progress */}
            <Box sx={{ 
              display: { xs: "flex", md: "none" }, 
              alignItems: "center", 
              justifyContent: "space-between",
              mb: 3,
              p: 2,
              bgcolor: "background.paper",
              borderRadius: 2,
              border: "1px solid",
              borderColor: "grey.200"
            }}>
              <Typography variant="body2" fontWeight={600} color="primary.main">
                Step 2 of 4
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Payment Information
              </Typography>
            </Box>
          </Box>

          <Grid container spacing={{ xs: 3, md: 4 }}>
            {/* LEFT COLUMN */}
            <Grid item xs={12} lg={8}>
              <Stack spacing={{ xs: 3, md: 4 }}>
                {/* Contact Information */}
                <Paper elevation={0} sx={{ 
                  p: { xs: 2.5, md: 3.5 }, 
                  borderRadius: 3, 
                  bgcolor: "background.paper",
                  border: "1px solid",
                  borderColor: "grey.200"
                }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <Avatar sx={{ 
                      bgcolor: "primary.light", 
                      mr: 2, 
                      width: { xs: 32, md: 36 }, 
                      height: { xs: 32, md: 36 }
                    }}>
                      <Person sx={{ fontSize: { xs: 18, md: 20 } }} />
                    </Avatar>
                    <Typography variant="h6" fontWeight={600} color="text.primary">
                      Contact Information
                    </Typography>
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="First Name"
                        size="small"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Person fontSize="small" sx={{ color: "grey.500" }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Last Name"
                        size="small"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Person fontSize="small" sx={{ color: "grey.500" }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        size="small"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Email fontSize="small" sx={{ color: "grey.500" }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        size="small"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Phone fontSize="small" sx={{ color: "grey.500" }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>
                </Paper>

                {/* Shipping Address */}
                <Paper elevation={0} sx={{ 
                  p: { xs: 2.5, md: 3.5 }, 
                  borderRadius: 3, 
                  bgcolor: "background.paper",
                  border: "1px solid",
                  borderColor: "grey.200"
                }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <Avatar sx={{ 
                      bgcolor: "info.light", 
                      mr: 2, 
                      width: { xs: 32, md: 36 }, 
                      height: { xs: 32, md: 36 }
                    }}>
                      <LocationOn sx={{ fontSize: { xs: 18, md: 20 } }} />
                    </Avatar>
                    <Typography variant="h6" fontWeight={600} color="text.primary">
                      Shipping Address
                    </Typography>
                  </Box>
                  <Stack spacing={2}>
                    <TextField
                      fullWidth
                      label="Street Address"
                      multiline
                      rows={2}
                      size="small"
                    />
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          fullWidth
                          label="City"
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          fullWidth
                          label="State"
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          fullWidth
                          label="ZIP Code"
                          size="small"
                        />
                      </Grid>
                    </Grid>
                    <TextField
                      fullWidth
                      label="Country"
                      defaultValue="United States"
                      size="small"
                    />
                  </Stack>
                </Paper>

                {/* Payment Method */}
                <Paper elevation={0} sx={{ 
                  p: { xs: 2.5, md: 3.5 }, 
                  borderRadius: 3, 
                  bgcolor: "background.paper",
                  border: "1px solid",
                  borderColor: "grey.200"
                }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <Avatar sx={{ 
                      bgcolor: "secondary.light", 
                      mr: 2, 
                      width: { xs: 32, md: 36 }, 
                      height: { xs: 32, md: 36 }
                    }}>
                      <Payment sx={{ fontSize: { xs: 18, md: 20 } }} />
                    </Avatar>
                    <Typography variant="h6" fontWeight={600} color="text.primary">
                      Payment Method
                    </Typography>
                  </Box>

                  <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                    <Stack spacing={2}>
                      {/* Credit Card Option */}
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          border: paymentMethod === "card" ? "2px solid" : "1px solid",
                          borderColor: paymentMethod === "card" ? "primary.main" : "grey.200",
                          borderRadius: 2,
                          cursor: "pointer",
                          transition: "all 0.2s",
                          backgroundColor: paymentMethod === "card" ? "rgba(37, 99, 235, 0.03)" : "transparent",
                          "&:hover": {
                            borderColor: "primary.main",
                            backgroundColor: "rgba(37, 99, 235, 0.02)"
                          }
                        }}
                        onClick={() => setPaymentMethod("card")}
                      >
                        <FormControlLabel
                          value="card"
                          control={<Radio color="primary" />}
                          label={
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <CreditCardIcon color="primary" />
                              <Box>
                                <Typography fontWeight={600} color="text.primary">
                                  Credit/Debit Card
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  Pay with your card securely
                                </Typography>
                              </Box>
                            </Stack>
                          }
                          sx={{ m: 0, width: "100%" }}
                        />
                        {paymentMethod === "card" && (
                          <Box sx={{ mt: 3, pl: { xs: 3, sm: 4 } }}>
                            <Stack spacing={2}>
                              <TextField
                                fullWidth
                                label="Card Number"
                                value={formatCardNumber(cardNumber)}
                                onChange={(e) => setCardNumber(e.target.value)}
                                placeholder="1234 5678 9012 3456"
                                size="small"
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Verified color="success" />
                                    </InputAdornment>
                                  ),
                                }}
                              />
                              <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                  <TextField
                                    fullWidth
                                    label="Expiry Date"
                                    placeholder="MM/YY"
                                    value={expiry}
                                    onChange={(e) => setExpiry(e.target.value)}
                                    size="small"
                                  />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                  <TextField
                                    fullWidth
                                    label="CVV"
                                    placeholder="123"
                                    value={cvv}
                                    onChange={(e) => setCvv(e.target.value)}
                                    size="small"
                                    InputProps={{
                                      endAdornment: (
                                        <InputAdornment position="end">
                                          <Lock fontSize="small" sx={{ color: "grey.500" }} />
                                        </InputAdornment>
                                      ),
                                    }}
                                  />
                                </Grid>
                              </Grid>
                            </Stack>
                          </Box>
                        )}
                      </Paper>

                      {/* Other Payment Methods */}
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          border: paymentMethod === "cod" ? "2px solid" : "1px solid",
                          borderColor: paymentMethod === "cod" ? "primary.main" : "grey.200",
                          borderRadius: 2,
                          cursor: "pointer",
                          transition: "all 0.2s",
                          backgroundColor: paymentMethod === "cod" ? "rgba(37, 99, 235, 0.03)" : "transparent",
                          "&:hover": {
                            borderColor: "primary.main",
                            backgroundColor: "rgba(37, 99, 235, 0.02)"
                          }
                        }}
                        onClick={() => setPaymentMethod("cod")}
                      >
                        <FormControlLabel
                          value="cod"
                          control={<Radio color="primary" />}
                          label={
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <MoneyIcon color="warning" />
                              <Box>
                                <Typography fontWeight={600} color="text.primary">
                                  Cash on Delivery
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  Pay when you receive
                                </Typography>
                              </Box>
                            </Stack>
                          }
                          sx={{ m: 0, width: "100%" }}
                        />
                      </Paper>

                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          border: paymentMethod === "wallet" ? "2px solid" : "1px solid",
                          borderColor: paymentMethod === "wallet" ? "primary.main" : "grey.200",
                          borderRadius: 2,
                          cursor: "pointer",
                          transition: "all 0.2s",
                          backgroundColor: paymentMethod === "wallet" ? "rgba(37, 99, 235, 0.03)" : "transparent",
                          "&:hover": {
                            borderColor: "primary.main",
                            backgroundColor: "rgba(37, 99, 235, 0.02)"
                          }
                        }}
                        onClick={() => setPaymentMethod("wallet")}
                      >
                        <FormControlLabel
                          value="wallet"
                          control={<Radio color="primary" />}
                          label={
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <WalletIcon color="secondary" />
                              <Box>
                                <Typography fontWeight={600} color="text.primary">
                                  Digital Wallet
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  PayPal, Apple Pay, Google Pay
                                </Typography>
                              </Box>
                            </Stack>
                          }
                          sx={{ m: 0, width: "100%" }}
                        />
                      </Paper>
                    </Stack>
                  </RadioGroup>

                  <Alert 
                    severity="info" 
                    icon={<Security />} 
                    sx={{ 
                      mt: 3, 
                      borderRadius: 2,
                      backgroundColor: "rgba(14, 165, 233, 0.08)",
                      border: "1px solid",
                      borderColor: "info.light"
                    }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Your payment information is encrypted and secure. We never store your card details.
                    </Typography>
                  </Alert>
                </Paper>
              </Stack>
            </Grid>

            {/* RIGHT COLUMN - ORDER SUMMARY */}
            <Grid item xs={12} lg={4}>
              <Paper elevation={0} sx={{ 
                p: { xs: 2.5, md: 3 }, 
                borderRadius: 3, 
                bgcolor: "background.paper",
                border: "1px solid",
                borderColor: "grey.200",
                position: "sticky",
                top: { xs: 16, md: 24 },
                maxHeight: { xs: "calc(100vh - 32px)", md: "calc(100vh - 48px)" },
                overflow: "auto"
              }}>
                <Typography variant="h6" fontWeight={700} mb={3} color="text.primary">
                  Order Summary
                </Typography>

                {/* Product Preview */}
                <Box sx={{ 
                  display: "flex", 
                  mb: 3, 
                  p: 2, 
                  bgcolor: "grey.50", 
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "grey.200"
                }}>
                  <CardMedia
                    component="img"
                    image={product.image}
                    sx={{ 
                      width: 80, 
                      height: 80, 
                      borderRadius: 2, 
                      objectFit: "cover",
                      flexShrink: 0
                    }}
                  />
                  <Box sx={{ ml: 2, flex: 1, minWidth: 0 }}>
                    <Typography fontWeight={600} variant="body2" color="text.primary" noWrap>
                      {product.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Quantity: {quantity}
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center" mt={0.5}>
                      <Typography variant="body2" fontWeight={700} color="primary.main">
                        ${subtotal.toFixed(2)}
                      </Typography>
                      {product.originalPrice && (
                        <Typography variant="caption" color="text.disabled" sx={{ textDecoration: "line-through" }}>
                          ${product.originalPrice}
                        </Typography>
                      )}
                    </Stack>
                  </Box>
                  <IconButton 
                    size="small" 
                    onClick={() => navigate(-1)}
                    sx={{ 
                      alignSelf: "flex-start",
                      color: "grey.500",
                      "&:hover": {
                        color: "error.main",
                        backgroundColor: "rgba(239, 68, 68, 0.1)"
                      }
                    }}
                  >
                    <Close fontSize="small" />
                  </IconButton>
                </Box>

                {/* Price Breakdown */}
                <Stack spacing={1.5} mb={3}>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography color="text.secondary">Subtotal</Typography>
                    <Typography fontWeight={500}>${subtotal.toFixed(2)}</Typography>
                  </Box>
                  
                  {discount > 0 && (
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography color="text.secondary">
                        <Discount fontSize="small" sx={{ verticalAlign: "middle", mr: 0.5 }} />
                        Discount
                      </Typography>
                      <Typography fontWeight={500} color="success.main">
                        -${discount.toFixed(2)}
                      </Typography>
                    </Box>
                  )}
                  
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography color="text.secondary">Shipping</Typography>
                    <Typography fontWeight={500} color={shipping === 0 ? "success.main" : "text.primary"}>
                      {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography color="text.secondary">Tax</Typography>
                    <Typography fontWeight={500}>${tax.toFixed(2)}</Typography>
                  </Box>
                  
                  <Divider sx={{ my: 1 }} />
                  
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography fontWeight={700} color="text.primary">Total</Typography>
                    <Typography variant="h6" fontWeight={800} color="text.primary">
                      ${finalTotal.toFixed(2)}
                    </Typography>
                  </Box>
                </Stack>

                {/* Promo Code */}
                <Box sx={{ mb: 3 }}>
                  <TextField
                    fullWidth
                    placeholder="Enter promo code"
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Tag fontSize="small" sx={{ color: "grey.500" }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button size="small" sx={{ fontSize: "0.75rem" }}>
                            Apply
                          </Button>
                        </InputAdornment>
                      )
                    }}
                    sx={{ mb: 1 }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    Try code: <strong style={{ color: theme.palette.primary.main }}>SAVE10</strong> for 10% off
                  </Typography>
                </Box>

                {/* Trust Badges */}
                <Stack 
                  direction="row" 
                  spacing={1} 
                  mb={3}
                  flexWrap="wrap"
                  rowGap={1}
                >
                  <Chip
                    icon={<Security fontSize="small" />}
                    label="Secure"
                    size="small"
                    variant="outlined"
                    sx={{ 
                      borderRadius: 1,
                      borderColor: "success.light",
                      color: "success.dark",
                      backgroundColor: "rgba(5, 150, 105, 0.08)"
                    }}
                  />
                  <Chip
                    icon={<LocalShipping fontSize="small" />}
                    label="Free Shipping"
                    size="small"
                    variant="outlined"
                    sx={{ 
                      borderRadius: 1,
                      borderColor: "info.light",
                      color: "info.dark",
                      backgroundColor: "rgba(14, 165, 233, 0.08)"
                    }}
                  />
                  <Chip
                    icon={<Verified fontSize="small" />}
                    label="Guaranteed"
                    size="small"
                    variant="outlined"
                    sx={{ 
                      borderRadius: 1,
                      borderColor: "warning.light",
                      color: "warning.dark",
                      backgroundColor: "rgba(245, 158, 11, 0.08)"
                    }}
                  />
                </Stack>

                {/* Place Order Button */}
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  disabled={loading}
                  onClick={handlePlaceOrder}
                  endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <ArrowForward />}
                  sx={{
                    py: 1.75,
                    borderRadius: 2,
                    fontWeight: 700,
                    fontSize: "1rem"
                  }}
                >
                  {loading ? "Processing..." : `Place Order • $${finalTotal.toFixed(2)}`}
                </Button>

                <Typography 
                  variant="caption" 
                  color="text.secondary" 
                  align="center" 
                  display="block" 
                  mt={2}
                  sx={{ lineHeight: 1.4 }}
                >
                  By placing your order, you agree to our Terms of Service and Privacy Policy
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Checkout;