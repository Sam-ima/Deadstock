// components/checkout/steps/ContactStep.jsx
import React from 'react';
import { Typography, TextField,Box } from '@mui/material';
import { colors } from './Constants';

const ContactStep = ({ user }) => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight={700} color={colors.textPrimary}>
        Contact Information
      </Typography>
      <Typography variant="body2" color={colors.textSecondary} sx={{ mb: 3 }}>
        We'll use this to send order confirmation and updates
      </Typography>
      
      <TextField
        fullWidth
        label="Email address"
        defaultValue={user?.email || ""}
        margin="normal"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            '&:hover fieldset': {
              borderColor: colors.primaryLight,
            },
          },
        }}
      />
    </Box>
  );
};

export default ContactStep;