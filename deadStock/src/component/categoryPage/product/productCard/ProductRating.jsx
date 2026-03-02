import { useEffect, useState } from "react";
import { Stack, Typography, Rating } from "@mui/material";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../../firebase/firebase"; // adjust path if needed

import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";

const ProductRating = ({ productId, variant = "info" }) => {
  const [avgRating, setAvgRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        if (!productId) return;

        const q = query(
          collection(db, "reviews"),
          where("productId", "==", productId)
        );

        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          let total = 0;

          snapshot.forEach((doc) => {
            total += doc.data().rating || 0;
          });

          const count = snapshot.size;
          const average = total / count;

          setAvgRating(Number(average.toFixed(1)));
          setReviewCount(count);
        } else {
          setAvgRating(0);
          setReviewCount(0);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setAvgRating(0);
        setReviewCount(0);
      }
    };

    fetchReviews();
  }, [productId]);

  // ⭐ Card-style star renderer (your previous logic)
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(avgRating || 0);
    const hasHalfStar = (avgRating || 0) % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <StarIcon key={`star-${i}`} sx={{ fontSize: 14, color: "#FFC107" }} />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <StarHalfIcon key="half-star" sx={{ fontSize: 14, color: "#FFC107" }} />
      );
    }

    const emptyStars = 5 - stars.length;

    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <StarIcon key={`empty-${i}`} sx={{ fontSize: 14, color: "#E0E0E0" }} />
      );
    }

    return stars;
  };

  // 🔹 Card Variant
  if (variant === "card") {
    return (
      <Stack direction="row" alignItems="center" spacing={0.5} mb={1}>
        {renderStars()}
        <Typography fontSize="0.75rem" color="text.secondary" ml={0.5}>
          ({avgRating})
        </Typography>
        <Typography fontSize="0.7rem" color="text.secondary" ml={0.5}>
          • {reviewCount} reviews
        </Typography>
      </Stack>
    );
  }

  // 🔹 Info Variant (Product Page)
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={1}
      alignItems={{ xs: "flex-start", sm: "center" }}
      mb={2}
    >
      <Rating value={avgRating} precision={0.5} readOnly size="small" />
      <Typography
        color="text.secondary"
        sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem" } }}
      >
        {avgRating} ({reviewCount} reviews)
      </Typography>
    </Stack>
  );
};

export default ProductRating;