import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Divider,
  IconButton,
  Badge,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardMedia,
  Chip,
  TextField,
  InputAdornment,
  Alert,
  Fade,
  Avatar,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Fab
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SecurityIcon from "@mui/icons-material/Security";
import ReplayIcon from "@mui/icons-material/Replay";
import DiscountIcon from "@mui/icons-material/Discount";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import VerifiedIcon from "@mui/icons-material/Verified";
import StoreIcon from "@mui/icons-material/Store";
import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LockIcon from "@mui/icons-material/Lock";

const theme = createTheme({
  palette: {
    primary: { 
      main: "#1B5E20", 
      light: "#4CAF50", 
      dark: "#0D3B0F" 
    },
    secondary: { 
      main: "#2E7D32", 
      light: "#66BB6A", 
      dark: "#1B5E20" 
    },
    success: { 
      main: "#388E3C", 
      light: "#81C784", 
      dark: "#1B5E20" 
    },
    warning: { 
      main: "#FFA000", 
      light: "#FFD54F", 
      dark: "#FF8F00" 
    },
    info: {
      main: "#1976D2",
      light: "#42A5F5"
    },
    background: { 
      default: "#F8FCF8", 
      paper: "#FFFFFF" 
    },
    text: {
      primary: "#1A3C1E",
      secondary: "#5A716C"
    }
  },
  typography: {
    fontFamily: '"Poppins", "Inter", "Roboto", sans-serif',
    h4: { 
      fontWeight: 700,
      color: "#0D3B0F",
      fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' }
    },
    h5: { 
      fontWeight: 600,
      color: "#1B5E20"
    },
    h6: {
      fontWeight: 600,
      color: "#1B5E20",
      fontSize: { xs: '1rem', sm: '1.125rem' }
    },
    body1: {
      fontSize: "0.95rem",
      lineHeight: 1.6
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.5
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
          textTransform: 'none',
          fontWeight: 600,
          padding: { xs: '8px 16px', sm: '10px 24px' },
          fontSize: { xs: '0.875rem', sm: '0.95rem' }
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)',
          boxShadow: '0 4px 12px rgba(27, 94, 32, 0.2)',
          '&:hover': {
            background: 'linear-gradient(135deg, #0D3B0F 0%, #1B5E20 100%)',
            boxShadow: '0 6px 16px rgba(27, 94, 32, 0.3)',
            transform: 'translateY(-2px)'
          },
          transition: 'all 0.2s ease'
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.05)',
          border: '1px solid rgba(76, 175, 80, 0.08)',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 12px 28px rgba(0, 0, 0, 0.08)'
          }
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none'
        }
      }
    }
  }
});

const SAMPLE_PRODUCTS = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    description: "Noise-cancelling professional headphones with 30hr battery life, perfect for business calls and focused work sessions.",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&fit=crop",
    category: "Audio",
    quantity: 1,
    rating: 4.5,
    reviews: 128
  },
  {
    id: 2,
    name: "Ergonomic Office Chair",
    description: "Executive mesh chair with lumbar support and adjustable armrests for all-day comfort.",
    price: 499.99,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&fit=crop",
    category: "Office",
    quantity: 1,
    rating: 4.8,
    reviews: 89
  },
  {
    id: 3,
    name: "4K Business Monitor",
    description: "27-inch 4K UHD monitor with USB-C connectivity and color accuracy for professional work.",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&fit=crop",
    category: "Electronics",
    quantity: 1,
    rating: 4.6,
    reviews: 56
  }
];

const CartHeader = ({ toggleSidebar }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Paper 
      elevation={0}
      sx={{
        background: 'linear-gradient(135deg, #0D3B0F 0%, #1B5E20 100%)',
        borderRadius: 0,
        px: { xs: 2, sm: 4, md: 6 },
        py: { xs: 2, sm: 2.5 },
        position: 'sticky',
        top: 0,
        zIndex: 1100,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        maxWidth: '1400px',
        mx: 'auto'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 2 } }}>
          {isMobile && (
            <IconButton 
              onClick={toggleSidebar}
              sx={{ 
                color: 'white',
                mr: 1
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <StoreIcon sx={{ 
            color: 'white', 
            fontSize: { xs: 28, sm: 32 },
            display: { xs: 'none', sm: 'block' }
          }} />
          
          <Box>
            <Typography variant="h5" sx={{ 
              color: 'white', 
              fontWeight: 700,
              fontSize: { xs: '1.25rem', sm: '1.5rem' }
            }}>
              EcoBiz Pro
            </Typography>
            <Typography variant="body2" sx={{ 
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: { xs: '0.75rem', sm: '0.875rem' }
            }}>
              Business Solutions
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 2, sm: 3 } }}>
          <Tooltip title="Your Cart">
            <Badge 
              badgeContent={SAMPLE_PRODUCTS.length} 
              color="warning"
              sx={{
                '& .MuiBadge-badge': {
                  fontSize: '0.7rem',
                  height: 20,
                  minWidth: 20,
                  borderRadius: 10
                }
              }}
            >
              <IconButton sx={{ color: 'white' }}>
                <ShoppingCartIcon sx={{ fontSize: { xs: 24, sm: 28 } }} />
              </IconButton>
            </Badge>
          </Tooltip>
          
          <IconButton sx={{ 
            color: 'white',
            display: { xs: 'none', sm: 'flex' }
          }}>
            <AccountCircleIcon />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
};

const Sidebar = ({ open, onClose }) => {
  const menuItems = [
    { icon: <HomeIcon />, text: "Home" },
    { icon: <CategoryIcon />, text: "Products" },
    { icon: <ShoppingCartIcon />, text: "Cart", active: true },
    { icon: <ContactSupportIcon />, text: "Support" },
  ];

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: 280,
          background: 'linear-gradient(180deg, #1B5E20 0%, #2E7D32 100%)',
          color: 'white',
          p: 3
        }
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Navigation
        </Typography>
        <IconButton onClick={onClose} sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </Box>
      
      <List>
        {menuItems.map((item, index) => (
          <ListItem 
            key={index}
            sx={{ 
              borderRadius: 2,
              mb: 1,
              bgcolor: item.active ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text}
              primaryTypographyProps={{ 
                fontWeight: item.active ? 600 : 400,
                fontSize: '0.95rem'
              }}
            />
          </ListItem>
        ))}
      </List>
      
      <Box sx={{ mt: 'auto', pt: 3 }}>
        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.2)', mb: 3 }} />
        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
          EcoBiz Pro © 2024
          <br />
          Professional Business Solutions
        </Typography>
      </Box>
    </Drawer>
  );
};

const CartItem = ({ product, onUpdateQuantity, onRemove }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [itemQuantity, setItemQuantity] = useState(product.quantity);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setItemQuantity(newQuantity);
      onUpdateQuantity(product.id, newQuantity);
    }
  };

  return (
    <Card sx={{ p: { xs: 2, sm: 2.5 }, mb: 2 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={3}>
          <Box sx={{ position: 'relative', borderRadius: 2, overflow: 'hidden' }}>
            <CardMedia
              component="img"
              height="140"
              image={product.image}
              alt={product.name}
              sx={{ 
                objectFit: 'cover',
                height: { xs: 140, sm: 160 },
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)'
                }
              }}
            />
            <Chip
              label={product.category}
              size="small"
              sx={{
                position: 'absolute',
                top: 12,
                left: 12,
                bgcolor: 'primary.main',
                color: 'white',
                fontWeight: 600,
                fontSize: '0.7rem'
              }}
            />
          </Box>
        </Grid>
        
        <Grid item xs={12} sm={5}>
          <Box>
            <Typography variant="h6" sx={{ 
              fontWeight: 600, 
              mb: 1,
              fontSize: { xs: '1rem', sm: '1.125rem' }
            }}>
              {product.name}
            </Typography>
            
            <Typography variant="body2" color="text.secondary" sx={{ 
              mb: 2,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>
              {product.description}
            </Typography>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
              <Chip 
                icon={<VerifiedIcon fontSize="small" />}
                label="In Stock"
                size="small"
                sx={{ 
                  bgcolor: 'success.light', 
                  color: 'white',
                  fontWeight: 500
                }}
              />
              <Chip 
                icon={<LocalShippingIcon fontSize="small" />}
                label="Free Shipping"
                size="small"
                sx={{ 
                  bgcolor: 'info.light', 
                  color: 'white',
                  fontWeight: 500
                }}
              />
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" color="text.secondary">
                {product.rating} ⭐ ({product.reviews} reviews)
              </Typography>
            </Box>
          </Box>
        </Grid>
        
        <Grid item xs={12} sm={4}>
          <Box sx={{ 
            textAlign: { xs: 'left', sm: 'right' },
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            justifyContent: 'space-between'
          }}>
            <Box>
              <Typography variant="h5" sx={{ 
                color: 'primary.main', 
                fontWeight: 700, 
                mb: 1,
                fontSize: { xs: '1.25rem', sm: '1.5rem' }
              }}>
                ${(product.price * itemQuantity).toFixed(2)}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                ${product.price.toFixed(2)} each
              </Typography>
            </Box>
            
            <Box>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1, 
                mb: 2,
                justifyContent: { xs: 'flex-start', sm: 'flex-end' }
              }}>
                <IconButton 
                  size="small"
                  onClick={() => handleQuantityChange(itemQuantity - 1)}
                  disabled={itemQuantity <= 1}
                  sx={{ 
                    bgcolor: 'grey.100',
                    '&:hover': { bgcolor: 'grey.200' }
                  }}
                >
                  <RemoveIcon fontSize="small" />
                </IconButton>
                
                <TextField
                  value={itemQuantity}
                  size="small"
                  sx={{ 
                    width: 60,
                    '& .MuiInputBase-root': { 
                      height: 32,
                      textAlign: 'center'
                    }
                  }}
                  inputProps={{ 
                    style: { textAlign: 'center' }
                  }}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                />
                
                <IconButton 
                  size="small"
                  onClick={() => handleQuantityChange(itemQuantity + 1)}
                  disabled={itemQuantity >= 10}
                  sx={{ 
                    bgcolor: 'grey.100',
                    '&:hover': { bgcolor: 'grey.200' }
                  }}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              </Box>
              
              <Box sx={{ 
                display: 'flex', 
                gap: 1,
                justifyContent: { xs: 'flex-start', sm: 'flex-end' }
              }}>
                <IconButton 
                  onClick={() => onRemove(product.id)}
                  size="small"
                  sx={{ 
                    color: 'error.main',
                    bgcolor: 'error.50',
                    '&:hover': { bgcolor: 'error.100' }
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
                
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    borderColor: 'primary.main',
                    color: 'primary.main',
                    '&:hover': {
                      borderColor: 'primary.dark',
                      bgcolor: 'primary.50'
                    }
                  }}
                >
                  Save for Later
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

const OrderSummary = ({ subtotal, shipping, tax, discount = 0 }) => {
  const total = subtotal + shipping + tax - discount;

  return (
    <Card sx={{ p: { xs: 2, sm: 3 } }}>
      <Typography variant="h6" sx={{ 
        fontWeight: 700, 
        mb: 3, 
        color: 'primary.dark',
        fontSize: { xs: '1rem', sm: '1.125rem' }
      }}>
        Order Summary
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        {[
          { label: "Subtotal", value: `$${subtotal.toFixed(2)}` },
          { label: "Shipping", value: shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`, 
            color: shipping === 0 ? "success.main" : undefined },
          { label: "Tax", value: `$${tax.toFixed(2)}` },
          discount > 0 && { label: "Discount", value: `-$${discount.toFixed(2)}`, color: "success.main" }
        ].filter(Boolean).map((item, index) => (
          <Box key={index} sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            mb: 2,
            alignItems: 'center'
          }}>
            <Typography variant="body2" color="text.secondary">
              {item.label}
            </Typography>
            <Typography variant="body1" fontWeight={600} color={item.color}>
              {item.value}
            </Typography>
          </Box>
        ))}
        
        <Divider sx={{ my: 2 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Total
          </Typography>
          <Typography variant="h5" sx={{ 
            color: 'primary.main', 
            fontWeight: 800,
            fontSize: { xs: '1.5rem', sm: '1.75rem' }
          }}>
            ${total.toFixed(2)}
          </Typography>
        </Box>
      </Box>
      
      <Button
        fullWidth
        variant="contained"
        size="large"
        endIcon={<ArrowForwardIcon />}
        sx={{
          py: 1.5,
          fontSize: { xs: '0.875rem', sm: '1rem' },
          fontWeight: 700
        }}
        onClick={() => alert("Proceeding to checkout...")}
      >
        Proceed to Checkout
      </Button>
      
      <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
        <LockIcon color="success" fontSize="small" />
        <Typography variant="caption" color="text.secondary">
          Secure SSL encrypted payment
        </Typography>
      </Box>
    </Card>
  );
};

const PromoCode = () => {
  const [promoCode, setPromoCode] = useState('');
  const [applied, setApplied] = useState(false);

  return (
    <Card sx={{ p: { xs: 2, sm: 3 }, mt: 3 }}>
      <Typography variant="h6" sx={{ 
        fontWeight: 700, 
        mb: 2, 
        color: 'primary.dark',
        fontSize: { xs: '1rem', sm: '1.125rem' }
      }}>
        Promo Code
      </Typography>
      
      {applied ? (
        <Alert 
          severity="success" 
          sx={{ mb: 2 }}
          icon={<CheckCircleIcon />}
          action={
            <IconButton size="small" onClick={() => setApplied(false)}>
              <ReplayIcon />
            </IconButton>
          }
        >
          <Typography variant="body2">
            <strong>SAVE25</strong> applied! You saved $25.00
          </Typography>
        </Alert>
      ) : (
        <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
          <TextField
            fullWidth
            placeholder="Enter promo code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <DiscountIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
          <Button 
            variant="outlined" 
            onClick={() => {
              if (promoCode.trim()) setApplied(true);
            }}
            disabled={!promoCode.trim()}
            sx={{ minWidth: { xs: '100%', sm: 'auto' } }}
          >
            Apply
          </Button>
        </Box>
      )}
      
      <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
        Try: <strong>SAVE25</strong> for $25 off orders over $300
      </Typography>
    </Card>
  );
};

const TrustBadges = () => {
  const badges = [
    { icon: <SecurityIcon />, text: "SSL Secure", subtext: "256-bit encryption" },
    { icon: <LocalShippingIcon />, text: "Free Shipping", subtext: "Orders over $500" },
    { icon: <ReplayIcon />, text: "Easy Returns", subtext: "30-day policy" },
    { icon: <CreditCardIcon />, text: "Flexible Payments", subtext: "Multiple options" },
  ];

  return (
    <Box sx={{ 
      display: 'grid', 
      gridTemplateColumns: { 
        xs: 'repeat(2, 1fr)', 
        sm: 'repeat(4, 1fr)' 
      },
      gap: 2,
      mt: 4
    }}>
      {badges.map((badge, index) => (
        <Paper 
          key={index}
          elevation={0}
          sx={{ 
            p: 2,
            textAlign: 'center',
            bgcolor: 'background.paper',
            border: '1px solid rgba(76, 175, 80, 0.1)',
            borderRadius: 2
          }}
        >
          <Avatar sx={{ 
            bgcolor: 'primary.50', 
            color: 'primary.main',
            width: 48,
            height: 48,
            mx: 'auto',
            mb: 1
          }}>
            {badge.icon}
          </Avatar>
          <Typography variant="body2" sx={{ 
            color: 'text.primary', 
            fontWeight: 600,
            mb: 0.5
          }}>
            {badge.text}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {badge.subtext}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
};

const RecommendedProducts = () => {
  const recommended = [
    {
      name: "Wireless Mouse",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=200&fit=crop"
    },
    {
      name: "Laptop Stand",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=200&fit=crop"
    },
    {
      name: "USB-C Hub",
      price: 39.99,
      image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=200&fit=crop"
    }
  ];

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ mb: 2, color: 'primary.dark' }}>
        You Might Also Like
      </Typography>
      <Grid container spacing={2}>
        {recommended.map((product, index) => (
          <Grid item xs={4} key={index}>
            <Card sx={{ p: 1, textAlign: 'center', height: '100%' }}>
              <CardMedia
                component="img"
                image={product.image}
                alt={product.name}
                sx={{ 
                  height: 80,
                  width: '100%',
                  objectFit: 'cover',
                  borderRadius: 1,
                  mb: 1
                }}
              />
              <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5 }}>
                {product.name}
              </Typography>
              <Typography variant="body2" color="primary" sx={{ fontWeight: 600 }}>
                ${product.price}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const AddToCart = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cartItems, setCartItems] = useState(SAMPLE_PRODUCTS);

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0);
  
  const shipping = subtotal > 500 ? 0 : 29.99;
  const tax = subtotal * 0.08;
  const discount = subtotal > 300 ? 25 : 0;

  const handleUpdateQuantity = (id, quantity) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const steps = ['Cart', 'Shipping', 'Payment', 'Confirmation'];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        minHeight: '100vh', 
        bgcolor: 'background.default',
        background: 'linear-gradient(135deg, #F8FCF8 0%, #E8F5E9 50%, #F1F8E9 100%)',
        pb: 4
      }}>
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <CartHeader toggleSidebar={toggleSidebar} />
        
        <Container maxWidth="xl" sx={{ 
          py: { xs: 2, sm: 3, md: 4 },
          px: { xs: 2, sm: 3, md: 4 }
        }}>
          <Fade in timeout={600}>
            <Box>
              {/* Progress Stepper - Hidden on mobile, shown on tablet+ */}
              {!isMobile && (
                <Stepper 
                  activeStep={0} 
                  alternativeLabel
                  sx={{ 
                    mb: { xs: 4, md: 6 },
                    '& .MuiStepLabel-label': {
                      fontWeight: 500,
                      fontSize: { xs: '0.75rem', sm: '0.875rem' }
                    }
                  }}
                >
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              )}

              <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
                {/* Left Column - Cart Items */}
                <Grid item xs={12} lg={8}>
                  <Box sx={{ 
                    mb: { xs: 3, sm: 4 },
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 2
                  }}>
                    <Typography variant="h4">
                      Shopping Cart
                    </Typography>
                    
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 2,
                      flexWrap: 'wrap'
                    }}>
                      <Typography variant="body1" color="text.secondary">
                        {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                      </Typography>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => setCartItems([])}
                        startIcon={<DeleteIcon />}
                        sx={{ 
                          display: { xs: 'none', sm: 'flex' },
                          borderColor: 'grey.400',
                          color: 'text.secondary'
                        }}
                      >
                        Clear All
                      </Button>
                    </Box>
                  </Box>

                  {cartItems.length === 0 ? (
                    <Paper sx={{ 
                      p: { xs: 4, sm: 6 }, 
                      textAlign: 'center',
                      bgcolor: 'background.paper'
                    }}>
                      <ShoppingCartIcon sx={{ 
                        fontSize: { xs: 48, sm: 64 }, 
                        color: 'grey.400', 
                        mb: 2 
                      }} />
                      <Typography variant="h6" color="text.secondary" gutterBottom>
                        Your cart is empty
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        Add some products to get started
                      </Typography>
                      <Button 
                        variant="contained"
                        startIcon={<ArrowBackIcon />}
                        sx={{ mt: 2 }}
                      >
                        Continue Shopping
                      </Button>
                    </Paper>
                  ) : (
                    <Box>
                      {cartItems.map((item) => (
                        <CartItem
                          key={item.id}
                          product={item}
                          onUpdateQuantity={handleUpdateQuantity}
                          onRemove={handleRemoveItem}
                        />
                      ))}

                      <Box sx={{ 
                        display: 'flex', 
                        gap: 2, 
                        mt: 4,
                        flexDirection: { xs: 'column', sm: 'row' }
                      }}>
                        <Button
                          variant="outlined"
                          startIcon={<ArrowBackIcon />}
                          sx={{ flex: { xs: 1, sm: 'none' } }}
                        >
                          Continue Shopping
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={() => setCartItems([])}
                          startIcon={<DeleteIcon />}
                          sx={{ 
                            flex: { xs: 1, sm: 'none' },
                            borderColor: 'error.main',
                            color: 'error.main',
                            '&:hover': {
                              bgcolor: 'error.50',
                              borderColor: 'error.dark'
                            }
                          }}
                        >
                          Clear Cart
                        </Button>
                      </Box>
                      
                      {/* Recommended Products */}
                      <RecommendedProducts />
                    </Box>
                  )}
                </Grid>

                {/* Right Column - Order Summary */}
                <Grid item xs={12} lg={4}>
                  <Box sx={{ position: 'sticky', top: { xs: 0, md: 20 } }}>
                    <OrderSummary 
                      subtotal={subtotal}
                      shipping={shipping}
                      tax={tax}
                      discount={discount}
                    />
                    
                    <PromoCode />
                    
                    <Card sx={{ p: { xs: 2, sm: 3 }, mt: 3 }}>
                      <Typography variant="h6" sx={{ 
                        fontWeight: 700, 
                        mb: 2, 
                        color: 'primary.dark',
                        fontSize: { xs: '1rem', sm: '1.125rem' }
                      }}>
                        Need Help?
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Our support team is available 24/7
                      </Typography>
                      <Button 
                        variant="text" 
                        fullWidth
                        startIcon={<ContactSupportIcon />}
                        sx={{ 
                          justifyContent: 'flex-start',
                          color: 'primary.main'
                        }}
                      >
                        Contact Support
                      </Button>
                    </Card>
                  </Box>
                </Grid>
              </Grid>

              {/* Trust Badges */}
              <TrustBadges />

              {/* Floating Action Button for Mobile */}
              {isMobile && cartItems.length > 0 && (
                <Fab
                  color="primary"
                  sx={{
                    position: 'fixed',
                    bottom: 20,
                    right: 20,
                    zIndex: 1000,
                    bgcolor: 'primary.main',
                    '&:hover': {
                      bgcolor: 'primary.dark'
                    }
                  }}
                  onClick={() => {
                    const orderTotal = subtotal + shipping + tax - discount;
                    alert(`Proceeding to checkout. Total: $${orderTotal.toFixed(2)}`);
                  }}
                >
                  <ShoppingCartIcon />
                </Fab>
              )}
            </Box>
          </Fade>
        </Container>
        
        {/* Footer */}
        {/* <Paper 
          elevation={0}
          sx={{
            mt: 4,
            p: 3,
            bgcolor: 'primary.dark',
            color: 'white',
            textAlign: 'center'
          }}
        >
          <Typography variant="body2">
            © 2024 EcoBiz Pro. All rights reserved.
          </Typography>
          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)', display: 'block', mt: 1 }}>
            Professional Business Solutions • Secure Shopping • 24/7 Support
          </Typography>
        </Paper> */}
      </Box>
    </ThemeProvider>
  );
};

export default AddToCart;