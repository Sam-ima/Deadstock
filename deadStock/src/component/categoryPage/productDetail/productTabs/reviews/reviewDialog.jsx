import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Rating,
  TextField,
  Stack,
} from "@mui/material";
import { useState, useContext } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../../../../firebase/firebase";
import { useAuth } from "../../../../../context/authContext/authContext.jsx"; // Correct import

const ReviewDialog = ({ open, onClose, product }) => {
  const { user } = useAuth(); // Fixed
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!rating || !comment || !user || !product?.id) return;

    setSubmitting(true);

    try {
      console.log("Submitting review:", {
        productId: product.id,
        userId: user.uid,
        rating,
        comment
      });

      await addDoc(collection(db, "reviews"), {
        productId: product.id,
        userId: user.uid,
        userName: user.name || user.email,
        rating,
        comment,
        createdAt: serverTimestamp(),
      });

      setRating(0);
      setComment("");
      onClose();
    } catch (err) {
      console.error("Error submitting review:", err.message);
      alert("Failed to submit review. Make sure Firestore is initialized and user is logged in.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Write a Review</DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <Rating value={rating} onChange={(e, v) => setRating(v)} />
          <TextField
            multiline
            rows={4}
            label="Your Review"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={submitting}>
          Cancel
        </Button>
        <Button
          variant="contained"
          disabled={!rating || !comment || submitting}
          onClick={handleSubmit}
        >
          {submitting ? "Submitting..." : "Submit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReviewDialog;
