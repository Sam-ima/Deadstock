import React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography } from '@mui/material';

// Mock team data
const teamMembers = [
  { name: 'John Doe', role: 'CEO', image: 'https://via.placeholder.com/150?text=John+Doe' },
  { name: 'Jane Smith', role: 'CTO', image: 'https://via.placeholder.com/150?text=Jane+Smith' },
  { name: 'Alice Johnson', role: 'Marketing Lead', image: 'https://via.placeholder.com/150?text=Alice+Johnson' },
];

function MeetOurTeam() {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Meet Our Team
      </Typography>
      <Grid container spacing={3}>
        {teamMembers.map((member) => (
          <Grid item xs={12} sm={6} md={4} key={member.name}>
            <Card>
              <CardMedia component="img" height="200" image={member.image} alt={member.name} />
              <CardContent>
                <Typography variant="h6">{member.name}</Typography>
                <Typography>{member.role}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default MeetOurTeam;