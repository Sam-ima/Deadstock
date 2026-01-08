// components/ProductsSection.jsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  Divider
} from '@mui/material';

const ProductsSection = ({ products }) => {
  const [activeTab, setActiveTab] = useState('selling');

  return (
    <Box sx={{ mb: 4 }}>
      <Typography 
        variant="subtitle1" 
        sx={{ 
          fontWeight: 600, 
          mb: 2,
          fontSize: '0.875rem'
        }}
      >
        My Products
      </Typography>
      
      {/* Tabs */}
      <Box sx={{ 
        display: 'flex', 
        gap: 1, 
        mb: 2,
        borderBottom: '1px solid #e9ecef',
        pb: 1
      }}>
        {['Selling', 'Saved'].map((tab) => (
          <Button
            key={tab}
            variant="text"
            onClick={() => setActiveTab(tab.toLowerCase())}
            sx={{
              textTransform: 'none',
              color: activeTab === tab.toLowerCase() ? '#000' : '#666',
              fontWeight: activeTab === tab.toLowerCase() ? 600 : 400,
              fontSize: '0.875rem',
              minWidth: 'auto',
              px: 0,
              mr: 2,
              position: 'relative',
              '&::after': activeTab === tab.toLowerCase() ? {
                content: '""',
                position: 'absolute',
                bottom: '-9px',
                left: 0,
                right: 0,
                height: '2px',
                bgcolor: '#000'
              } : {}
            }}
          >
            {tab}
          </Button>
        ))}
      </Box>
      
      {/* Product List */}
      <Paper elevation={0} sx={{ border: '1px solid #e9ecef', borderRadius: 2 }}>
        <List sx={{ p: 0 }}>
          {products[activeTab].map((product, index) => (
            <React.Fragment key={index}>
              <ListItem 
                alignItems="center"
                sx={{ 
                  px: 2, 
                  py: 1.5,
                  '&:hover': { bgcolor: '#f8f9fa' }
                }}
                secondaryAction={
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontWeight: 600,
                      color: '#000'
                    }}
                  >
                    {product.price}
                  </Typography>
                }
              >
                <ListItemAvatar>
                  <Avatar 
                    sx={{ 
                      width: 40, 
                      height: 40, 
                      bgcolor: '#f8f9fa',
                      color: '#000'
                    }}
                  >
                    {product.name.charAt(0)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontWeight: 500,
                        color: '#000'
                      }}
                    >
                      {product.name}
                    </Typography>
                  }
                />
              </ListItem>
              {index < products[activeTab].length - 1 && (
                <Divider sx={{ mx: 2 }} />
              )}
            </React.Fragment>
          ))}
          
          {products[activeTab].length === 0 && (
            <ListItem sx={{ py: 3, justifyContent: 'center' }}>
              <Typography variant="body2" color="#666">
                No {activeTab} items
              </Typography>
            </ListItem>
          )}
        </List>
      </Paper>
      
      {/* List Button */}
      <Button
        variant="outlined"
        fullWidth
        sx={{
          mt: 2,
          textTransform: 'none',
          borderRadius: 2,
          borderColor: '#000',
          color: '#000',
          fontWeight: 500,
          fontSize: '0.875rem',
          py: 1,
          '&:hover': {
            borderColor: '#000',
            bgcolor: '#f8f9fa'
          }
        }}
      >
        List
      </Button>
    </Box>
  );
};

export default ProductsSection;