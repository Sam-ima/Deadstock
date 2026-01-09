import { Card, CardContent, Typography, Rating, Avatar, Stack } from '@mui/material';

const ReviewCard = ({ review }) => (
  <Card variant="outlined">
    <CardContent>
      <Stack direction="row" spacing={2}>
        <Avatar>{review.avatar}</Avatar>
        <Stack>
          <Typography fontWeight={600}>{review.user}</Typography>
          <Rating value={review.rating} readOnly size="small" />
          <Typography variant="body2">{review.comment}</Typography>
        </Stack>
      </Stack>
    </CardContent>
  </Card>
);

export default ReviewCard;
