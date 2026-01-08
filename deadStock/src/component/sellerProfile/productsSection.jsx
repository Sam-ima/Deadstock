// components/ProductsSection.jsx
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  Button,
  Box,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

const ProductsSection = () => {
  const [activeCategory, setActiveCategory] = useState('Selling');
  
  const categories = ['Selling', 'Saved'];
  
  const products = {
    Selling: [
      { name: 'Nike Dunk Low', price: '$250', initial: 'N' },
      { name: 'Supreme Tee', price: '$120', initial: 'S' },
    ],
    Saved: [
      { name: 'Yeezy Boost', price: '$300', initial: 'Y' },
      { name: 'Jordan 1', price: '$280', initial: 'J' },
    ],
  };

  return (
    <Card sx={{ mb: 3, borderRadius: 2, boxShadow: 1 }}>
      <CardContent>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
          My Products
        </Typography>

        {/* Category Tabs */}
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? 'contained' : 'outlined'}
              size="small"
              onClick={() => setActiveCategory(category)}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                flex: 1,
                fontSize: '0.875rem'
              }}
            >
              {category}
            </Button>
          ))}
        </Box>

        {/* Product List */}
        <List>
          {products[activeCategory].map((product, index) => (
            <React.Fragment key={index}>
              <ListItem
                sx={{
                  borderRadius: 1,
                  '&:hover': { bgcolor: '#f5f5f5' },
                  py: 1.5
                }}
                secondaryAction={
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    {product.price}
                  </Typography>
                }
              >
                <ListItemIcon>
                  <Avatar sx={{ bgcolor: '#e0e0e0', width: 40, height: 40 }}>
                    {product.initial}
                  </Avatar>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                      {product.name}
                    </Typography>
                  }
                />
              </ListItem>
              {index < products[activeCategory].length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>

        {/* Add Button */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              width: '100%'
            }}
          >
            List
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductsSection;