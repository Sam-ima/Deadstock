import { Box, Button, Divider } from '@mui/material';
import ReviewList from '../reviews/reviewList';
import ReviewDialog from '../reviews/reviewDialog';

const ReviewsTab = ({ product, openReviewDialog, setOpenReviewDialog }) => (
  <Box>
    <Button
      variant="contained"
      onClick={() => setOpenReviewDialog(true)}
      sx={{ mb: 3 }}
    >
      Write a Review
    </Button>

    <Divider sx={{ mb: 3 }} />

    {/* Pass product.id to ReviewList */}
    <ReviewList productId={product?.id} />

    <ReviewDialog
      open={openReviewDialog}
      onClose={() => setOpenReviewDialog(false)}
      product={product}
    />
  </Box>
);

export default ReviewsTab;
