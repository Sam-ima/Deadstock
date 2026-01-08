import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  Badge, 
  IconButton,
  useTheme
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StoreIcon from '@mui/icons-material/Store';

const Header = () => {
  const theme = useTheme();

  return (
    <AppBar 
      position="sticky" 
      elevation={1}
      sx={{ 
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.warning.main} 100%)`,
        mb: 4
      }}
    >
      <Toolbar>
        <StoreIcon sx={{ mr: 2, fontSize: 32 }} />
        <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
          BusinessPro Store
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton color="inherit">
            <Badge badgeContent={3} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <Typography variant="body1">
            Premium Business Solutions
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;