import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";


const RecentActivity = () => {
  return (
    <Box mt={4}>
      <Typography fontWeight={700} mb={1}>
        Recent Activity
      </Typography>

      <List sx={{ bgcolor: "#F9FAFB", borderRadius: 3, transition:0.6}}>
        <ListItem>
          <ListItemText
            primary="Purchase: Luxury Slides"
            secondary="Oct 18 • Processing"
            
          />
        </ListItem>
      </List>


      </Box>
  );
};

export default RecentActivity;
