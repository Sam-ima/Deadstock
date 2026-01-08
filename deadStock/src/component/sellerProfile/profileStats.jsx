// components/ProfileStats.jsx
import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';

const ProfileStats = ({ stats }) => {
  return (
    <Grid container spacing={2} sx={{ mb: 4 }}>
      {stats.map((stat, index) => (
        <Grid item xs={4} key={index}>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              bgcolor: '#f8f9fa',
              borderRadius: 2,
              textAlign: 'center',
              height: '100%',
              border: '1px solid #e9ecef'
            }}
          >
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 600,
                mb: 0.5,
                fontSize: '1.25rem'
              }}
            >
              {stat.value}
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                color: '#666',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
            >
              {stat.label}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProfileStats;