// components/checkout/CostBreakdown.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DiscountIcon from '@mui/icons-material/Discount';
import { colors } from './Constants';

const CostBreakdown = ({ totals }) => {
  return (
    <Box sx={{ '& > *': { display: 'flex', justifyContent: 'space-between', mb: 2 } }}>
      <Box>
        <Typography color={colors.textSecondary}>Subtotal</Typography>
        <Typography fontWeight={500}>Rs. {totals.subtotal.toFixed(2)}</Typography>
      </Box>
      <Box>
        <Typography color={colors.textSecondary}>Shipping</Typography>
        <Typography fontWeight={500}>
          <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            Rs. {totals.shipping.toFixed(2)} <LocalShippingIcon sx={{ fontSize: 16 }} />
          </Box>
        </Typography>
      </Box>
      {/* <Box>
        <Typography color={colors.textSecondary}>Estimated tax</Typography>
        <Typography fontWeight={500}>Rs. {totals.tax.toFixed(2)}</Typography>
      </Box> */}
      {totals.discount > 0 && (
        <Box sx={{ color: colors.success }}>
          <Typography>
            <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <DiscountIcon sx={{ fontSize: 16 }} /> Discount
            </Box>
          </Typography>
          <Typography fontWeight={600}>Rs. {totals.discount.toFixed(2)}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default CostBreakdown;