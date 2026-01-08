// components/RecentActivity.jsx
import React from 'react';
import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
} from '@mui/material';
import {
  History as HistoryIcon,
  LocalShipping as ShippingIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';

const RecentActivity = () => {
  const recentActivity = [
    {
      title: 'Purchase: Yeezy Slide',
      date: 'Oct 18',
      status: 'Processing',
      icon: <ShippingIcon />,
    },
  ];

  const handleSignOut = () => {
    console.log('Signing out...');
    // Add your sign out logic here
  };

  return (
    <Card sx={{ borderRadius: 2, boxShadow: 1 }}>
      <CardContent sx={{ p: 0 }}>
        <List>
          {/* Recent Activity Header */}
          <Box sx={{ borderBottom: '1px solid #e0e0e0' }}>
            <ListItem sx={{ px: 3, py: 1.5 }}>
              <ListItemIcon sx={{ minWidth: 40, color: 'text.secondary' }}>
                <HistoryIcon />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                    Recent Activity
                  </Typography>
                }
              />
            </ListItem>
          </Box>
          
          {/* Activity Items Container */}
          <Box sx={{ borderBottom: '1px solid #e0e0e0' }}>
            {recentActivity.map((activity, index) => (
              <ListItem
                key={index}
                sx={{
                  px: 3,
                  py: 1.5,
                  '&:hover': { bgcolor: '#f5f5f5' }
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: 'text.secondary' }}>
                  {activity.icon}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body2">
                      {activity.title}
                    </Typography>
                  }
                  secondary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="caption" color="text.secondary">
                        {activity.date}
                      </Typography>
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: '#ff9800',
                          fontWeight: 'medium'
                        }}
                      >
                        • {activity.status}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </Box>
          
          {/* Sign Out Button Container */}
          <Box>
            <ListItem
              button={true}
              onClick={handleSignOut}
              sx={{
                px: 3,
                py: 1.5,
                color: '#f44336',
                '&:hover': { bgcolor: '#ffebee' }
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                    Sign Out
                  </Typography>
                }
              />
            </ListItem>
          </Box>
        </List>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;