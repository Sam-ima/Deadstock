// src/pages/product/components/ActionButtons.jsx
import { useState, useContext } from 'react';
import { Stack, Button, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@mui/material';
import { ShoppingCart, ShoppingBag, Business } from '@mui/icons-material';
import { CartContext } from './cartContext';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './authContext';

const ActionButtons = ({ product, quantity }) => {
  const [showB2BPrompt, setShowB2BPrompt] = useState(false);
  const [isProcessingBulk, setIsProcessingBulk] = useState(false);
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Check if quantity meets MOQ and user needs B2B verification
  const shouldShowB2BPrompt = () => {
    if (!product.moq || product.moq <= 1) return false;
    if (quantity < product.moq) return false;
    if (!product.requiresB2BVerification) return false;
    if (user?.isB2BVerified) return false;
    return true;
  };

  const calculateFinalPrice = () => {
    if (product.bulkPrice && quantity >= product.moq) {
      return product.bulkPrice;
    }
    return product.price;
  };

  const handleAddToCart = () => {
    if (shouldShowB2BPrompt()) {
      setShowB2BPrompt(true);
      return;
    }

    const finalPrice = calculateFinalPrice();
    const isBulkOrder = quantity >= product.moq;
    
    const cartItem = {
      ...product,
      quantity,
      unitPrice: finalPrice,
      totalPrice: finalPrice * quantity,
      isBulkOrder,
      requiresB2BVerification: isBulkOrder && product.requiresB2BVerification,
      originalPrice: product.price,
      bulkDiscount: isBulkOrder ? product.bulkDiscount : 0,
      moq: product.moq
    };

    addToCart(cartItem);
    console.log(`Added ${quantity} of ${product.name} to cart at $${finalPrice}/unit`);
  };

  const handleBuyNow = () => {
    if (shouldShowB2BPrompt()) {
      setShowB2BPrompt(true);
      return;
    }

    const finalPrice = calculateFinalPrice();
    const isBulkOrder = quantity >= product.moq;
    
    const orderItem = {
      ...product,
      quantity,
      unitPrice: finalPrice,
      totalPrice: finalPrice * quantity,
      isBulkOrder,
      requiresB2BVerification: isBulkOrder && product.requiresB2BVerification
    };

    // Store order in session for checkout page
    sessionStorage.setItem('directOrder', JSON.stringify([orderItem]));
    
    // Navigate to checkout
    navigate('/checkout', { 
      state: { 
        isDirectPurchase: true,
        items: [orderItem]
      }
    });
    console.log(`Proceeding to buy ${quantity} of ${product.name} at $${finalPrice}/unit`);
  };

  const handleB2BVerify = () => {
    setShowB2BPrompt(false);
    setIsProcessingBulk(true);
    
    // Navigate to B2B verification page
    navigate('/b2b-verification', { 
      state: { 
        returnTo: window.location.pathname,
        productId: product.id,
        quantity
      }
    });
  };

  const handleContinueAsRegular = () => {
    setShowB2BPrompt(false);
    const finalPrice = product.price; // Regular price
    const isBulkOrder = false;
    
    const cartItem = {
      ...product,
      quantity,
      unitPrice: finalPrice,
      totalPrice: finalPrice * quantity,
      isBulkOrder,
      requiresB2BVerification: false,
      originalPrice: product.price,
      bulkDiscount: 0,
      moq: product.moq
    };

    if (isProcessingBulk) {
      // User was trying to "Buy Now"
      sessionStorage.setItem('directOrder', JSON.stringify([cartItem]));
      navigate('/checkout', { 
        state: { 
          isDirectPurchase: true,
          items: [cartItem]
        }
      });
    } else {
      // User was trying to "Add to Cart"
      addToCart(cartItem);
    }
    
    setIsProcessingBulk(false);
    console.log(`Continuing as regular customer for ${quantity} of ${product.name}`);
  };

  const isOutOfStock = product.stock === 0;
  const isMOQMet = quantity >= product.moq;
  const hasBulkPricing = product.bulkPrice && product.moq > 1;
  const showBulkBadge = hasBulkPricing && isMOQMet;

  return (
    <>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={4}>
        <Button 
          variant="contained" 
          size="large" 
          startIcon={<ShoppingCart />} 
          onClick={handleAddToCart} 
          disabled={isOutOfStock}
          sx={{ 
            flex: 1,
            bgcolor: showBulkBadge ? 'success.main' : 'primary.main',
            '&:hover': {
              bgcolor: showBulkBadge ? 'success.dark' : 'primary.dark',
            }
          }}
        >
          {showBulkBadge ? `Add to Cart (Bulk Price)` : `Add to Cart`}
        </Button>
        
        <Button 
          variant="outlined" 
          size="large"
          startIcon={<ShoppingBag />}
          onClick={handleBuyNow} 
          disabled={isOutOfStock}
          sx={{ 
            flex: 1,
            borderColor: showBulkBadge ? 'success.main' : 'primary.main',
            color: showBulkBadge ? 'success.main' : 'primary.main',
            '&:hover': {
              borderColor: showBulkBadge ? 'success.dark' : 'primary.dark',
              bgcolor: showBulkBadge ? 'success.light' : 'primary.light',
            }
          }}
        >
          {showBulkBadge ? `Buy Now (Bulk Price)` : `Buy Now`}
        </Button>
      </Stack>

      {/* Bulk Order Info */}
      {hasBulkPricing && !isMOQMet && quantity > 0 && (
        <Stack direction="row" spacing={1} alignItems="center" mb={2}>
          <Business fontSize="small" color="warning" />
          <span style={{ fontSize: '0.875rem', color: '#ed6c02' }}>
            Add {product.moq - quantity} more to qualify for bulk pricing (${product.bulkPrice}/unit)
          </span>
        </Stack>
      )}

      {/* B2B Verification Dialog */}
      <Dialog open={showB2BPrompt} onClose={() => setShowB2BPrompt(false)}>
        <DialogTitle>
          <Stack direction="row" spacing={1} alignItems="center">
            <Business color="primary" />
            <span>B2B Verification Required</span>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            You're ordering <strong>{quantity} units</strong> of "{product.name}" which meets the 
            Minimum Order Quantity (MOQ) of <strong>{product.moq} units</strong>.
          </DialogContentText>
          <DialogContentText sx={{ mt: 2 }}>
            To get bulk pricing of <strong>${product.bulkPrice}/unit</strong> (save {product.bulkDiscount}%), 
            you need to verify your business account.
          </DialogContentText>
          <DialogContentText sx={{ mt: 2, mb: 1 }}>
            <strong>Regular price:</strong> ${product.price}/unit = ${(product.price * quantity).toFixed(2)}
          </DialogContentText>
          <DialogContentText sx={{ mb: 2 }}>
            <strong>Bulk price:</strong> ${product.bulkPrice}/unit = ${(product.bulkPrice * quantity).toFixed(2)}
          </DialogContentText>
          <DialogContentText variant="body2" color="text.secondary">
            B2B verification includes uploading business documents and takes 24-48 hours.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowB2BPrompt(false)}>Cancel</Button>
          <Button onClick={handleContinueAsRegular} variant="outlined">
            Continue as Regular Customer (${product.price}/unit)
          </Button>
          <Button onClick={handleB2BVerify} variant="contained" autoFocus>
            Verify Business Account
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ActionButtons;