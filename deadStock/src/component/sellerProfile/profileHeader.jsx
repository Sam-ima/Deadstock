// components/ProfileHeader.jsx
import React from 'react';
import { Card, CardContent, Typography, Avatar, Box, Chip } from '@mui/material';
import { Verified as VerifiedIcon } from '@mui/icons-material';

const ProfileHeader = () => {
  return (
    <Card sx={{ mb: 3, borderRadius: 2, boxShadow: 1 }}>
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, textAlign: 'left' }}>
          My Profile
        </Typography>
        
        <Avatar
          sx={{
            width: 80,
            height: 80,
            margin: '0 auto 16px',
            bgcolor: '#1976d2',
            fontSize: '1.5rem'
          }}
        >
          JS
        </Avatar>
        
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Jordan Smith
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
            @jordankicks
          </Typography>
          <VerifiedIcon color="primary" fontSize="small" />
        </Box>
        
        <Chip
          label="VERIFIED SELLER"
          size="small"
          sx={{
            fontSize: '0.7rem',
            height: 24,
            bgcolor: '#e3f2fd',
            color: '#1976d2',
            fontWeight: 'bold'
          }}
        />
      </CardContent>
    </Card>
  );
};

export default ProfileHeader;