import {
  Card, CardContent, Typography, Rating, Avatar, Stack, Box, Chip,
} from "@mui/material";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

const getInitials = (name = "") => {
  if (name.includes("@")) {
    // email → take part before @ and use first 2 chars
    return name.split("@")[0].slice(0, 2).toUpperCase();
  }
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const getAvatarColor = (name = "") => {
  const colors = ["#2196F3", "#9C27B0", "#E91E63", "#FF5722", "#4CAF50", "#FF9800", "#009688"];
  const index = (name.charCodeAt(0) || 0) % colors.length;
  return colors[index];
};

const timeAgo = (timestamp) => {
  if (!timestamp) return "";
  const date = timestamp?.toDate ? timestamp.toDate() : new Date(timestamp);
  const diff = Date.now() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 30) return `${days} days ago`;
  if (days < 365) return `${Math.floor(days / 30)} months ago`;
  return `${Math.floor(days / 365)} years ago`;
};

const ReviewCard = ({ review, userPhoto }) => {
  const name = review.userName || "Anonymous";

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 3,
        transition: "box-shadow 0.2s",
        "&:hover": { boxShadow: 3 },
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Stack direction="row" spacing={2} alignItems="flex-start">
          {/* Avatar — real photo or colored initial fallback */}
          <Avatar
            src={userPhoto || undefined}
            sx={{
              bgcolor: userPhoto ? "transparent" : getAvatarColor(name),
              width: 44,
              height: 44,
              fontWeight: 700,
              fontSize: "0.95rem",
            }}
          >
            {!userPhoto && getInitials(name)}
          </Avatar>

          <Box sx={{ flex: 1, minWidth: 0 }}>
            {/* Name + timestamp row */}
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              flexWrap="wrap"
              gap={1}
            >
              <Stack direction="row" alignItems="center" spacing={0.8}>
                <Typography fontWeight={700} fontSize="0.95rem">
                  {name}
                </Typography>
                <VerifiedUserIcon sx={{ fontSize: 14, color: "primary.main" }} />
              </Stack>
              <Typography variant="caption" color="text.disabled">
                {timeAgo(review.createdAt)}
              </Typography>
            </Stack>

            {/* Rating + score chip */}
            <Stack direction="row" alignItems="center" spacing={1} mt={0.5} mb={1}>
              <Rating value={review.rating} readOnly size="small" precision={0.5} />
              <Chip
                label={`${review.rating}/5`}
                size="small"
                sx={{
                  height: 18,
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  bgcolor:
                    review.rating >= 4
                      ? "success.50"
                      : review.rating >= 3
                      ? "warning.50"
                      : "error.50",
                  color:
                    review.rating >= 4
                      ? "success.dark"
                      : review.rating >= 3
                      ? "warning.dark"
                      : "error.dark",
                }}
              />
            </Stack>

            {/* Comment */}
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ lineHeight: 1.7, wordBreak: "break-word" }}
            >
              {review.comment}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;