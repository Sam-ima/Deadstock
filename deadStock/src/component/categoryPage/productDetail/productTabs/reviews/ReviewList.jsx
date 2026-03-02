import { useEffect, useState } from "react";
import {
  Stack, Typography, CircularProgress, Box,
  Divider, Rating, LinearProgress, Button, Alert,
} from "@mui/material";
import {
  collection, query, where, onSnapshot, doc, getDoc,
} from "firebase/firestore";
import { db } from "../../../../../firebase/firebase";
import ReviewCard from "./ReviewCard";
import RateReviewIcon from "@mui/icons-material/RateReview";

/* ── Main list ── */
const ReviewList = ({ productId, onWriteReview }) => {
  const [reviews, setReviews]       = useState([]);
  const [userPhotos, setUserPhotos] = useState({});
  const [loading, setLoading]       = useState(true);
  const [fetchError, setFetchError] = useState("");

  /* 1️⃣ Real-time reviews listener — no orderBy to avoid composite index requirement */
  useEffect(() => {
    if (!productId) { setLoading(false); return; }

    const q = query(
      collection(db, "reviews"),
      where("productId", "==", productId)
      // ⚠️ orderBy("createdAt", "desc") removed — requires a composite Firestore index.
      // Once you create the index in Firebase Console, you can add it back.
      // The link to create it will appear in your browser console as a Firebase error.
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs
          .map((d) => ({ id: d.id, ...d.data() }))
          // Sort client-side by createdAt descending as a temporary workaround
          .sort((a, b) => {
            const aTime = a.createdAt?.toDate?.() ?? new Date(a.createdAt ?? 0);
            const bTime = b.createdAt?.toDate?.() ?? new Date(b.createdAt ?? 0);
            return bTime - aTime;
          });

        setReviews(data);
        setFetchError("");
        setLoading(false);
      },
      (err) => {
        console.error("Firestore reviews error:", err);
        setFetchError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [productId]);

  /* 2️⃣ Fetch user photos for unique userIds not yet loaded */
  useEffect(() => {
    if (!reviews.length) return;

    const newIds = [
      ...new Set(
        reviews.map((r) => r.userId).filter((id) => id && !(id in userPhotos))
      ),
    ];

    if (!newIds.length) return;

    const fetchPhotos = async () => {
      const results = await Promise.all(
        newIds.map(async (uid) => {
          try {
            const snap = await getDoc(doc(db, "users", uid));
            // Update field name to match your Firestore users collection
            const photo = snap.exists()
              ? snap.data().photoURL || snap.data().profilePhoto || null
              : null;
            return [uid, photo];
          } catch {
            return [uid, null];
          }
        })
      );

      setUserPhotos((prev) => ({
        ...prev,
        ...Object.fromEntries(results),
      }));
    };

    fetchPhotos();
  }, [reviews]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Render ── */
  if (loading) return (
    <Box display="flex" justifyContent="center" py={4}>
      <CircularProgress size={32} />
    </Box>
  );

  if (fetchError) return (
    <Alert severity="error" sx={{ mt: 2 }}>
      <Typography variant="body2" fontWeight={600}>Failed to load reviews</Typography>
      <Typography variant="caption">{fetchError}</Typography>
    </Alert>
  );

  return (
    <Box>

      {reviews.length === 0 ? (
        <Box textAlign="center" py={6}>
          <RateReviewIcon sx={{ fontSize: 48, color: "grey.300", mb: 1 }} />
          <Typography color="text.secondary" fontWeight={500}>
            No reviews yet. Be the first to share your thoughts!
          </Typography>
          {onWriteReview && (
            <Button variant="outlined" sx={{ mt: 2 }} onClick={onWriteReview}>
              Write a Review
            </Button>
          )}
        </Box>
      ) : (
        <Stack spacing={2}>
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              userPhoto={userPhotos[review.userId] || null}
            />
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default ReviewList;