// component/common/sectionCard.jsx
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const SectionCard = ({ title, children }) => {
  return (
    <Card
      sx={{
        mb: 2,
        backgroundColor: '#ffffff',
        borderRadius: 2,
        boxShadow: '0px 3px 8px rgba(0,0,0,0.1)',
        transition: 'transform 0.3s',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: '0px 5px 15px rgba(0,0,0,0.2)',
        },
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ mb: 1, color: '#4caf50' }}>{title}</Typography>
        {children}
      </CardContent>
    </Card>
  );
};

export default SectionCard;
