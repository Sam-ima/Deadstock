import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 12,
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  textAlign: 'center',
  padding: theme.spacing(3),
}));

const ProfileStats = ({ title, value, description }) => {
  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h4" fontWeight="bold">
          {value}
        </Typography>
        <Typography variant="h6" color="primary" fontWeight="bold" sx={{ mt: 1 }}>
          {title}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </StyledCard>
  );
};

export default ProfileStats;