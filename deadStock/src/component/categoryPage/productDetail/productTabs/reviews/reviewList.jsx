import { Grid } from '@mui/material';
import ReviewCard from './reviewCard';
// import { sampleReviews } from '../utils/sampleReviews';

const ReviewList = () => (
  <Grid container spacing={3}>
    {/* {sampleReviews.map(r => ( */}
      <Grid item xs={12} key={r.id}>
        <ReviewCard review={r} />
      </Grid>
    {/* ))} */}
  </Grid>
);

export default ReviewList;
