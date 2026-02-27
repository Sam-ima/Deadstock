import { useEffect, useState } from "react";
import { Box, Typography, Stack, Paper } from "@mui/material";

const pad = (n) => String(n).padStart(2, "0");

/**
 * Safely converts a Firestore Timestamp OR a plain JS Date/string to a JS Date.
 * Firestore Timestamps have a .toDate() method.
 */
const toJsDate = (value) => {
  if (!value) return null;
  if (typeof value.toDate === "function") return value.toDate(); // Firestore Timestamp
  return new Date(value); // fallback
};

const getTimeLeft = (targetDate) => {
  if (!targetDate) return null;
  const diff = targetDate - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

const TimeUnit = ({ value, label }) => (
  <Paper
    elevation={0}
    sx={{
      bgcolor: "grey.100",
      borderRadius: 2,
      px: { xs: 1.5, sm: 2 },
      py: 1,
      minWidth: { xs: 52, sm: 64 },
      textAlign: "center",
      border: "1px solid",
      borderColor: "grey.200",
    }}
  >
    <Typography
      variant="h5"
      fontWeight="bold"
      sx={{ fontSize: { xs: "1.3rem", sm: "1.6rem" }, lineHeight: 1 }}
    >
      {pad(value)}
    </Typography>
    <Typography
      variant="caption"
      color="text.secondary"
      sx={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: 0.5 }}
    >
      {label}
    </Typography>
  </Paper>
);

const Colon = () => (
  <Typography
    variant="h5"
    fontWeight="bold"
    color="text.secondary"
    sx={{ mb: 1.5, lineHeight: 1 }}
  >
    :
  </Typography>
);

const AuctionCountdown = ({ product, status }) => {
  // Pick the target date based on status
  const rawTarget =
    status === "upcoming" ? product?.startTime : product?.endTime;

  const targetDate = toJsDate(rawTarget);

  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(targetDate));

  useEffect(() => {
    if (status === "ended" || !targetDate) return;
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate, status]);

  if (status === "ended") {
    return (
      <Box>
        <Typography variant="body2" color="text.secondary" fontWeight={500}>
          This auction has ended. No further bids are accepted.
        </Typography>
      </Box>
    );
  }

  const label =
    status === "upcoming" ? "Auction starts in" : "⏱ Auction ends in";
  const labelColor = status === "live" ? "error.main" : "warning.dark";

  return (
    <Box>
      <Typography
        variant="body2"
        fontWeight={600}
        color={labelColor}
        mb={1.5}
        sx={{ textTransform: "uppercase", letterSpacing: 0.5, fontSize: "0.78rem" }}
      >
        {label}
      </Typography>

      {timeLeft ? (
        <Stack direction="row" spacing={1} alignItems="center">
          {timeLeft.days > 0 && (
            <>
              <TimeUnit value={timeLeft.days} label="Days" />
              <Colon />
            </>
          )}
          <TimeUnit value={timeLeft.hours} label="Hrs" />
          <Colon />
          <TimeUnit value={timeLeft.minutes} label="Min" />
          <Colon />
          <TimeUnit value={timeLeft.seconds} label="Sec" />
        </Stack>
      ) : (
        <Typography variant="body2" color="text.secondary">
          Refreshing...
        </Typography>
      )}
    </Box>
  );
};

export default AuctionCountdown;