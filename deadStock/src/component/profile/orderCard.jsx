import React from 'react';
import { Card, CardContent, Box, Typography, Chip, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 12,
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  marginBottom: theme.spacing(2),
}));

const StatusChip = styled(Chip)(({ status, theme }) => ({
  backgroundColor: status === 'DELIVERED' ? '#e8f5e9' : 
                   status === 'SHIPPED' ? '#e3f2fd' : '#fff3e0',
  color: status === 'DELIVERED' ? '#2e7d32' : 
         status === 'SHIPPED' ? '#1565c0' : '#f57c00',
  fontWeight: 600,
  fontSize: '0.75rem',
}));

const OrderCard = ({ order }) => {
  return (
    <StyledCard>
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              {order.productName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ${order.price}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Size: {order.size} • {order.date}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <StatusChip label={order.status} status={order.status} size="small" />
            <IconButton size="small">
              <ArrowForwardIosIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default OrderCard;