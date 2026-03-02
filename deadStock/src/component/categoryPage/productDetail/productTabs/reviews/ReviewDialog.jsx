import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Rating, TextField, Stack, Typography, Box,
  LinearProgress, IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import StarIcon from "@mui/icons-material/Star";
import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../../../../firebase/firebase.jsx";
import { useAuth } from "../../../../../context/authContext/authContext.jsx";

const RATING_LABELS = {
  1: "Poor",
  2: "Fair",
  3: "Good",
  4: "Very Good",
  5: "Excellent",
};

const ReviewDialog = ({ open, onClose, product }) => {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(-1);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const activeRating = hover !== -1 ? hover : rating;
  const charLimit = 500;

  const handleClose = () => {
    if (submitting) return;
    setRating(0);
    setHover(-1);
    setComment("");
    setError("");
    onClose();
  };

  const handleSubmit = async () => {
    if (!rating) return setError("Please select a star rating.");
    if (!comment.trim()) return setError("Please write a comment.");
    if (!user) return setError("You must be logged in to submit a review.");
    if (!product?.id) return setError("Invalid product.");

    setSubmitting(true);
    setError("");

    try {
      await addDoc(collection(db, "reviews"), {
        productId: product.id,
        userId: user.uid,
        userName: user.displayName || user.name || user.email,
        rating,
        comment: comment.trim(),
        createdAt: serverTimestamp(),
      });
      handleClose();
    } catch (err) {
      console.error("Error submitting review:", err.message);
      setError("Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      {submitting && <LinearProgress />}

      <DialogTitle sx={{ pr: 6 }}>
        Write a Review
        <Typography variant="body2" color="text.secondary" fontWeight={400}>
          {product?.name}
        </Typography>
        <IconButton
          onClick={handleClose}
          disabled={submitting}
          sx={{ position: "absolute", right: 12, top: 12 }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Stack spacing={3} sx={{ pt: 1 }}>
          {/* Star Rating */}
          <Box>
            <Typography variant="body2" fontWeight={600} mb={1}>
              Your Rating <span style={{ color: "red" }}>*</span>
            </Typography>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Rating
                value={rating}
                onChange={(_, v) => { setRating(v); setError(""); }}
                onChangeActive={(_, v) => setHover(v)}
                size="large"
                emptyIcon={<StarIcon style={{ opacity: 0.35 }} fontSize="inherit" />}
              />
              {activeRating > 0 && (
                <Typography
                  variant="body2"
                  fontWeight={600}
                  color={
                    activeRating >= 4 ? "success.main" :
                    activeRating >= 3 ? "warning.main" : "error.main"
                  }
                >
                  {RATING_LABELS[activeRating]}
                </Typography>
              )}
            </Stack>
          </Box>

          {/* Comment */}
          <Box>
            <Typography variant="body2" fontWeight={600} mb={1}>
              Your Review <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              multiline
              rows={4}
              placeholder="Share your experience with this product..."
              value={comment}
              onChange={(e) => {
                if (e.target.value.length <= charLimit) {
                  setComment(e.target.value);
                  setError("");
                }
              }}
              fullWidth
              error={!!error && !comment.trim()}
            />
            <Stack direction="row" justifyContent="flex-end" mt={0.5}>
              <Typography variant="caption" color={comment.length > charLimit * 0.9 ? "warning.main" : "text.disabled"}>
                {comment.length}/{charLimit}
              </Typography>
            </Stack>
          </Box>

          {/* Error */}
          {error && (
            <Typography variant="body2" color="error.main" fontWeight={500}>
              {error}
            </Typography>
          )}
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={handleClose} disabled={submitting} color="inherit">
          Cancel
        </Button>
        <Button
          variant="contained"
          disabled={!rating || !comment.trim() || submitting}
          onClick={handleSubmit}
          sx={{ px: 3 }}
        >
          {submitting ? "Submitting..." : "Submit Review"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReviewDialog;