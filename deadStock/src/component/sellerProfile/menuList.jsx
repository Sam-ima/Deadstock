// components/MenuList.jsx
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Switch,
  IconButton,
  Typography,
} from '@mui/material';
import {
  Settings as SettingsIcon,
  CreditCard as CreditCardIcon,
  LocationOn as LocationIcon,
  Notifications as NotificationsIcon,
  Lock as LockIcon,
  Logout as LogoutIcon,
  Add as AddIcon,
} from '@mui/icons-material';

const MenuList = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const menuItems = [
    {
      text: 'Settings',
      icon: <SettingsIcon />,
      action: () => console.log('Settings clicked'),
    },
    {
      text: 'Payment Methods',
      icon: <CreditCardIcon />,
      badge: 'Visa ending in 4242',
      action: () => console.log('Payment Methods clicked'),
    },
    {
      text: 'Shipping Addresses',
      icon: <LocationIcon />,
      badge: '2 addresses saved',
      action: () => console.log('Shipping Addresses clicked'),
    },
    {
      text: 'Notifications',
      icon: <NotificationsIcon />,
      action: () => setNotificationsEnabled(!notificationsEnabled),
      hasSwitch: true,
      switchState: notificationsEnabled,
    },
    {
      text: 'Privacy & Security',
      icon: <LockIcon />,
      badge: 'Password · 2FA',
      action: () => console.log('Privacy clicked'),
    },
  ];

  return (
    <Card sx={{ mb: 3, borderRadius: 2, boxShadow: 1 }}>
      <CardContent sx={{ p: 0 }}>
        <List>
          {menuItems.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem
                button
                onClick={item.action}
                sx={{
                  px: 3,
                  py: 1.5,
                  '&:hover': { bgcolor: '#f5f5f5' }
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: 'text.secondary' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body2">
                      {item.text}
                    </Typography>
                  }
                  secondary={
                    item.badge && (
                      <Typography variant="caption" color="text.secondary">
                        {item.badge}
                      </Typography>
                    )
                  }
                />
                {item.hasSwitch ? (
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={item.switchState}
                      onChange={item.action}
                      size="small"
                    />
                  </ListItemSecondaryAction>
                ) : (
                  <ListItemSecondaryAction>
                    <IconButton edge="end" size="small">
                      <AddIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                )}
              </ListItem>
              {index < menuItems.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default MenuList;