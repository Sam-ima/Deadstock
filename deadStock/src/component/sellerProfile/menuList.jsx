// components/MenuList.jsx
import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
  Typography,
  Box,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  Avatar,
  Chip,
  IconButton,
  Tooltip,
  Alert,
  Snackbar
} from '@mui/material';
import {
  Settings as SettingsIcon,
  CreditCard as CreditCardIcon,
  LocationOn as LocationIcon,
  Notifications as NotificationsIcon,
  Lock as LockIcon,
  ArrowForwardIos as ArrowIcon,
  Save as SaveIcon,
  Close as CloseIcon,
  Language as LanguageIcon,
  Palette as PaletteIcon,
  Visibility as VisibilityIcon,
  NotificationsActive as NotificationsActiveIcon,
  VolumeUp as VolumeIcon,
  Security as SecurityIcon,
  Backup as BackupIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

const MenuList = ({ items }) => {
  const [notifications, setNotifications] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settings, setSettings] = useState({
    theme: 'light',
    language: 'english',
    currency: 'USD',
    privacy: 'public',
    emailNotifications: true,
    pushNotifications: true,
    soundEnabled: true,
    autoSave: true,
    twoFactorAuth: true,
    showOnlineStatus: true,
    dataBackup: true
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  const iconMap = {
    '⚙️': <SettingsIcon sx={{ fontSize: 20 }} />,
    '💳': <CreditCardIcon sx={{ fontSize: 20 }} />,
    '📍': <LocationIcon sx={{ fontSize: 20 }} />,
    '🔔': <NotificationsIcon sx={{ fontSize: 20 }} />,
    '🔒': <LockIcon sx={{ fontSize: 20 }} />
  };

  const handleSettingsOpen = () => {
    setSettingsOpen(true);
  };

  const handleSettingsClose = () => {
    setSettingsOpen(false);
  };

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = () => {
    console.log('Settings saved:', settings);
    setSnackbar({ open: true, message: 'Settings saved successfully!' });
    setSettingsOpen(false);
  };

  const handleResetSettings = () => {
    setSettings({
      theme: 'light',
      language: 'english',
      currency: 'USD',
      privacy: 'public',
      emailNotifications: true,
      pushNotifications: true,
      soundEnabled: true,
      autoSave: true,
      twoFactorAuth: true,
      showOnlineStatus: true,
      dataBackup: true
    });
    setSnackbar({ open: true, message: 'Settings reset to defaults!' });
  };

  return (
    <>
      <Box sx={{ mb: 4 }}>
        <List sx={{ p: 0 }}>
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem 
                button
                onClick={item.text === 'Settings' ? handleSettingsOpen : undefined}
                sx={{ 
                  px: 0, 
                  py: 1.5,
                  '&:hover': { bgcolor: '#f8f9fa' }
                }}
                secondaryAction={
                  item.text === 'Notifications' ? (
                    <Switch
                      size="small"
                      checked={notifications}
                      onChange={() => setNotifications(!notifications)}
                      sx={{
                        '& .MuiSwitch-thumb': {
                          width: 16,
                          height: 16,
                        },
                        '& .MuiSwitch-track': {
                          height: 14,
                          borderRadius: 7,
                        }
                      }}
                    />
                  ) : (
                    <ArrowIcon sx={{ fontSize: 16, color: '#666' }} />
                  )
                }
              >
                <ListItemIcon sx={{ minWidth: 36, color: '#000' }}>
                  {iconMap[item.icon] || <SettingsIcon sx={{ fontSize: 20 }} />}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontWeight: 400,
                        color: '#000',
                        fontSize: '0.875rem'
                      }}
                    >
                      {item.text}
                    </Typography>
                  }
                  secondary={
                    item.badge && (
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: '#de450dff',
                          fontSize: '0.75rem',
                          mt: 0.5
                        }}
                      >
                        {item.badge}
                      </Typography>
                    )
                  }
                />
              </ListItem>
              {index < items.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Box>

      {/* Enhanced Settings Dialog */}
      <Dialog 
        open={settingsOpen} 
        onClose={handleSettingsClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            maxHeight: '90vh'
          }
        }}
      >
        <DialogTitle sx={{ 
          bgcolor: '#2E7D32', 
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          py: 2
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <SettingsIcon />
            <Typography variant="h6">Account Settings</Typography>
          </Box>
          <IconButton onClick={handleSettingsClose} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ py: 3 }}>
          {/* Settings in Tabs-like sections */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            
            {/* Display & Language */}
            <Box>
              <Typography variant="subtitle1" sx={{ 
                fontWeight: 600, 
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: '#2E7D32'
              }}>
                <PaletteIcon fontSize="small" />
                Display & Language
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 3, mb: 2 }}>
                <FormControl fullWidth>
                  <FormLabel sx={{ fontSize: '0.875rem', mb: 1 }}>Theme</FormLabel>
                  <Select
                    size="small"
                    value={settings.theme}
                    onChange={(e) => handleSettingChange('theme', e.target.value)}
                    sx={{ borderRadius: 2 }}
                  >
                    <MenuItem value="light">Light</MenuItem>
                    <MenuItem value="dark">Dark</MenuItem>
                    <MenuItem value="auto">Auto (System)</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <FormLabel sx={{ fontSize: '0.875rem', mb: 1 }}>Language</FormLabel>
                  <Select
                    size="small"
                    value={settings.language}
                    onChange={(e) => handleSettingChange('language', e.target.value)}
                    sx={{ borderRadius: 2 }}
                  >
                    <MenuItem value="english">English</MenuItem>
                    <MenuItem value="spanish">Spanish</MenuItem>
                    <MenuItem value="french">French</MenuItem>
                    <MenuItem value="german">German</MenuItem>
                    <MenuItem value="japanese">Japanese</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <FormControl fullWidth>
                <FormLabel sx={{ fontSize: '0.875rem', mb: 1 }}>Currency</FormLabel>
                <Select
                  size="small"
                  value={settings.currency}
                  onChange={(e) => handleSettingChange('currency', e.target.value)}
                  sx={{ borderRadius: 2 }}
                >
                  <MenuItem value="USD">USD ($)</MenuItem>
                  <MenuItem value="EUR">EUR (€)</MenuItem>
                  <MenuItem value="GBP">GBP (£)</MenuItem>
                  <MenuItem value="JPY">JPY (¥)</MenuItem>
                  <MenuItem value="CAD">CAD (C$)</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Divider />

            {/* Notifications */}
            <Box>
              <Typography variant="subtitle1" sx={{ 
                fontWeight: 600, 
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: '#f46224ff'
              }}>
                <NotificationsActiveIcon fontSize="small" />
                Notifications
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.emailNotifications}
                      onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                      size="small"
                    />
                  }
                  label={
                    <Box>
                      <Typography variant="body2">Email Notifications</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Receive updates via email
                      </Typography>
                    </Box>
                  }
                />
                
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.pushNotifications}
                      onChange={(e) => handleSettingChange('pushNotifications', e.target.checked)}
                      size="small"
                    />
                  }
                  label={
                    <Box>
                      <Typography variant="body2">Push Notifications</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Get real-time updates on your device
                      </Typography>
                    </Box>
                  }
                />
                
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.soundEnabled}
                      onChange={(e) => handleSettingChange('soundEnabled', e.target.checked)}
                      size="small"
                    />
                  }
                  label={
                    <Box>
                      <Typography variant="body2">Sound Alerts</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Play sounds for notifications
                      </Typography>
                    </Box>
                  }
                />
              </Box>
            </Box>

            <Divider />

            {/* Privacy & Security */}
            <Box>
              <Typography variant="subtitle1" sx={{ 
                fontWeight: 600, 
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: '#c77d1cff'
              }}>
                <SecurityIcon fontSize="small" />
                Privacy & Security
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <FormControl>
                  <FormLabel sx={{ fontSize: '0.875rem', mb: 1 }}>Profile Privacy</FormLabel>
                  <RadioGroup
                    value={settings.privacy}
                    onChange={(e) => handleSettingChange('privacy', e.target.value)}
                    row
                  >
                    <FormControlLabel value="public" control={<Radio size="small" />} label="Public" />
                    <FormControlLabel value="friends" control={<Radio size="small" />} label="Friends Only" />
                    <FormControlLabel value="private" control={<Radio size="small" />} label="Private" />
                  </RadioGroup>
                </FormControl>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.twoFactorAuth}
                      onChange={(e) => handleSettingChange('twoFactorAuth', e.target.checked)}
                      size="small"
                    />
                  }
                  label={
                    <Box>
                      <Typography variant="body2">Two-Factor Authentication</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Extra layer of security for your account
                      </Typography>
                    </Box>
                  }
                />
                
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.showOnlineStatus}
                      onChange={(e) => handleSettingChange('showOnlineStatus', e.target.checked)}
                      size="small"
                    />
                  }
                  label={
                    <Box>
                      <Typography variant="body2">Show Online Status</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Let others see when you're online
                      </Typography>
                    </Box>
                  }
                />
                
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.dataBackup}
                      onChange={(e) => handleSettingChange('dataBackup', e.target.checked)}
                      size="small"
                    />
                  }
                  label={
                    <Box>
                      <Typography variant="body2">Automatic Data Backup</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Backup your data automatically
                      </Typography>
                    </Box>
                  }
                />
              </Box>
            </Box>

            <Divider />

            {/* Account Actions */}
            <Box>
              <Typography variant="subtitle1" sx={{ 
                fontWeight: 600, 
                mb: 2,
                color: '#2E7D32'
              }}>
                Account Actions
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="outlined"
                  startIcon={<BackupIcon />}
                  sx={{ borderRadius: 2 }}
                >
                  Export Data
                </Button>
                
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  sx={{ borderRadius: 2 }}
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                      alert('Account deletion requested');
                    }
                  }}
                >
                  Delete Account
                </Button>
              </Box>
            </Box>
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2, justifyContent: 'space-between' }}>
          <Button
            onClick={handleResetSettings}
            variant="outlined"
            color="inherit"
            sx={{ borderRadius: 2 }}
          >
            Reset to Defaults
          </Button>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              onClick={handleSettingsClose}
              variant="outlined"
              sx={{ borderRadius: 2 }}
            >
              Cancel
            </Button>
            
            <Button
              onClick={handleSaveSettings}
              variant="contained"
              startIcon={<SaveIcon />}
              sx={{ borderRadius: 2, bgcolor: '#2E7D32' }}
            >
              Save Changes
            </Button>
          </Box>
        </DialogActions>
      </Dialog>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity="success"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default MenuList;