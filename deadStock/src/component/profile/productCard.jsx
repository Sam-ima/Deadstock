// component/profile/productCard.jsx
import React from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';

const productCard = ({ product, onEdit, onDelete }) => {
  return (
    <Card
      sx={{
        backgroundColor: '#ffffff',
        borderRadius: 2,
        boxShadow: '0px 3px 8px rgba(0,0,0,0.1)',
        transition: 'transform 0.3s',
        '&:hover': { transform: 'scale(1.03)', boxShadow: '0px 5px 15px rgba(0,0,0,0.2)' },
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ color: '#4caf50' }}>{product.name}</Typography>
        <Typography color="text.secondary">${product.price}</Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          sx={{ color: '#4caf50', border: '1px solid #4caf50', '&:hover': { backgroundColor: '#4caf50', color: '#fff' } }}
          onClick={onEdit}
        >
          Edit
        </Button>
        <Button
          size="small"
          sx={{ color: '#ff5722', border: '1px solid #ff5722', '&:hover': { backgroundColor: '#ff5722', color: '#fff' } }}
          onClick={onDelete}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default productCard;
