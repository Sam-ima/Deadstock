// reviewList.jsx
import { useEffect, useState } from "react";
import { Grid, Typography, CircularProgress } from "@mui/material";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../../../../../firebase/firebase";
import ReviewCard from "./ReviewCard";

const ReviewList = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) {
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, "reviews"),
      where("productId", "==", productId),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setReviews(data);
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching reviews:", err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [productId]);

  if (loading) return <CircularProgress sx={{ mt: 2 }} />;

  if (reviews.length === 0)
    return <Typography color="text.secondary">No reviews yet. Be the first to write one!</Typography>;

  return (
    <Grid container spacing={3}>
      {reviews.map((review) => (
        <Grid item xs={12} key={review.id}>
          <ReviewCard review={review} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ReviewList;
