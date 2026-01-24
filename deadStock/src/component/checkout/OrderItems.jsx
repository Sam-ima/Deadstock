// components/checkout/OrderItem.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import { colors } from './Constants';

const OrderItem = ({ item, index }) => {
  const itemName = item.name || 'Product';
  const itemImage = item.product?.images?.[0] || item.image;
  const unitPrice = item.unitPrice || 0;
  const quantity = item.quantity || 1;
  const isBulk = item.isBulkOrder || false;
  
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        gap: 2, 
        mb: 3, 
        p: 2, 
        bgcolor: colors.paperLight, 
        borderRadius: 3,
        border: `1px solid ${colors.border}`,
      }}
    >
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
          overflow: 'hidden',
          flexShrink: 0,
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
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Typography 
            fontWeight={600} 
            sx={{ 
              fontSize: '0.95rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {itemName}
          </Typography>
          <Typography fontWeight={700} color={colors.primary} sx={{ ml: 1, flexShrink: 0 }}>
            ${(unitPrice * quantity).toFixed(2)}
          </Typography>
        </Box>
        <Typography variant="body2" color={colors.textSecondary} sx={{ mt: 0.5 }}>
          {isBulk ? 'Bulk Order • ' : ''}
          Unit Price: ${unitPrice.toFixed(2)}
        </Typography>
        <Typography variant="caption" color={colors.textSecondary}>
          Qty: {quantity} • Total: ${(unitPrice * quantity).toFixed(2)}
        </Typography>
        {isBulk && (
          <Typography variant="caption" color={colors.success} sx={{ display: 'block', mt: 0.5 }}>
            ✓ Bulk discount applied
          </Typography>
        )}
        {item.isDirectPurchase && (
          <Typography variant="caption" color={colors.primary} sx={{ display: 'block', mt: 0.5 }}>
            ⚡ Direct Purchase
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default OrderItem;