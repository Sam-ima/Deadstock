import React from 'react';
import { Box, Typography, Chip, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';

const ActivityItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(1.5, 0),
}));

const ActivityList = ({ activities }) => {
  return (
    <Box>
      {activities.map((activity, index) => (
        <React.Fragment key={activity.id}>
          <ActivityItem>
            <Box>
              <Typography variant="body2" fontWeight="medium">
                {activity.type}: {activity.description}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {activity.date}
              </Typography>
            </Box>
            <Chip 
              label={activity.status} 
              size="small"
              sx={{
                backgroundColor: activity.status === 'Processing' ? '#fff3e0' : '#e8f5e9',
                color: activity.status === 'Processing' ? '#f57c00' : '#2e7d32',
              }}
            />
          </ActivityItem>
          {index < activities.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default ActivityList;