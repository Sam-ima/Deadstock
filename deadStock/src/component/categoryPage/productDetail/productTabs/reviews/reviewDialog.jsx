import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Rating, TextField, Stack
} from '@mui/material';
import { useState } from 'react';

const ReviewDialog = ({ open, onClose }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Write a Review</DialogTitle>
      <DialogContent>
        <Stack spacing={3}>
          <Rating value={rating} onChange={(e, v) => setRating(v)} />
          <TextField
            multiline
            rows={4}
            label="Your Review"
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" disabled={!rating || !comment}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReviewDialog;
