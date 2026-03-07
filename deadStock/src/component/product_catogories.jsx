import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Card, CardContent, CardMedia, Typography, Button, TextField, Box } from '@mui/material';


function CategoryBidding() {
  const { category } = useParams();
  const items = mockItems[category] || [];
  const [bids, setBids] = useState({});

  const handleBidChange = (id, value) => {
    setBids({ ...bids, [id]: value });
  };

  const placeBid = (id, currentBid) => {
    const newBid = bids[id];
    if (newBid > currentBid) {
      alert(`Bid placed: $${newBid} for item ${id}`);
      // In real app, send to backend
    } else {
      alert('Bid must be higher than current bid.');
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Bidding on {category.charAt(0).toUpperCase() + category.slice(1)}
      </Typography>
      <Grid container spacing={3}>
        {items.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card>
              <CardMedia component="img" height="200" image={item.image} alt={item.name} />
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography>Current Bid: ${item.currentBid}</Typography>
                <TextField
                  label="Your Bid"
                  type="number"
                  value={bids[item.id] || ''}
                  onChange={(e) => handleBidChange(item.id, e.target.value)}
                  fullWidth
                  sx={{ mt: 2 }}
                />
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ mt: 1 }}
                  onClick={() => placeBid(item.id, item.currentBid)}
                >
                  Place Bid
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default CategoryBidding;