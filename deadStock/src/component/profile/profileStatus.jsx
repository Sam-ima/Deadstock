// components/ProfileStats.jsx
import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import {
  ShoppingBag as SellingIcon,
  CheckCircle as SoldIcon,
  Star as StarIcon,
} from '@mui/icons-material';

const ProfileStats = () => {
  const stats = [
    { label: 'Selling', value: 24, icon: <SellingIcon />, color: '#2196f3' },
    { label: 'Sold', value: 158, icon: <SoldIcon />, color: '#4caf50' },
    { label: 'Rating', value: 4.9, icon: <StarIcon />, color: '#ff9800' },
  ];

  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      {stats.map((stat, index) => (
        <Grid item xs={4} key={index}>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              bgcolor: '#f5f5f5',
              borderRadius: 2,
              textAlign: 'center',
              height: '100%'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
              <Box sx={{ color: stat.color, mr: 1 }}>
                {stat.icon}
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {stat.value}
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary">
              {stat.label}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProfileStats;