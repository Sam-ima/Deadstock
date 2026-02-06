import {
  Box,
  Typography,
  Stack,
  Button,
  IconButton,
  Chip,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { getTimeLeft } from "./utils/auctionTime";

const AuctionCardContent = ({ product, onPlaceBid }) => {
  const auction = product?.auction;
  const images = product?.images || [];

  const isLive = auction?.status === "live";            // ⭐ NEW
  const isScheduled = auction?.status === "scheduled"; // ⭐ NEW

  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeText, setTimeText] = useState("--");       // ⭐ RENAMED

  // ⏳ Timer logic (LIVE vs UPCOMING)
  useEffect(() => {
    if (!auction) return;

    const targetTime = isLive ? auction.endTime : auction.startTime; // ⭐ NEW
    if (!targetTime) return;

    const interval = setInterval(() => {
      setTimeText(getTimeLeft(targetTime));
    }, 1000);

    return () => clearInterval(interval);
  }, [auction, isLive]);

  if (!auction) return null;

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <>
      {/* 🖼 Image Slider */}
      <Box sx={{ position: "relative" }}>
        <Box
          component="img"
          src={images[currentIndex]?.url}
          alt={product.name}
          sx={{
            width: "100%",
            height: 180,
            objectFit: "cover",
          }}
        />

        {/* ⭐ STATUS BADGE */}
        <Chip
          label={isLive ? "LIVE" : "UPCOMING"}             // ⭐ NEW
          size="small"
          sx={{
            position: "absolute",
            top: 10,
            left: 10,
            bgcolor: isLive ? "#d32f2f" : "#ed6c02",
            color: "#fff",
            fontWeight: 700,
          }}
        />

        {/* ⏳ TIMER */}
        <Box
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            px: 1.5,
            py: 0.5,
            borderRadius: 20,
            bgcolor: "rgba(0,0,0,0.75)",
            color: "#fff",
            fontSize: "0.75rem",
            fontWeight: 600,
          }}
        >
          {isLive ? "Ends In:" : "Starts In:"} ⏳ {timeText} {/* ⭐ UPDATED */}
        </Box>

        {/* ⬅➡ Image Controls */}
        {images.length > 1 && (
          <>
            <IconButton
              size="small"
              onClick={handlePrev}
              sx={{
                position: "absolute",
                top: "50%",
                left: 8,
                transform: "translateY(-50%)",
                bgcolor: "rgba(0,0,0,0.5)",
                color: "#fff",
              }}
            >
              <ArrowBackIos fontSize="inherit" />
            </IconButton>

            <IconButton
              size="small"
              onClick={handleNext}
              sx={{
                position: "absolute",
                top: "50%",
                right: 8,
                transform: "translateY(-50%)",
                bgcolor: "rgba(0,0,0,0.5)",
                color: "#fff",
              }}
            >
              <ArrowForwardIos fontSize="inherit" />
            </IconButton>
          </>
        )}
      </Box>

      {/* 📦 Content */}
      <Box sx={{ p: 2 }}>
        <Typography fontWeight={700} noWrap>
          {product.name}
        </Typography>

        <Stack spacing={0.6} mt={1}>
          <Typography fontSize="0.85rem">
            {isLive ? "Highest Bid:" : "Starting Price:"}{" "}
            <b>
              Rs. {isLive ? auction.highestBid : auction.startingBid}
            </b> {/* ⭐ UPDATED */}
          </Typography>

          <Typography fontSize="0.8rem" color="text.secondary">
            Available Stock: <b>{product.availableStock}</b>
          </Typography>
        </Stack>

        {/* ⭐ PLACE BID ONLY FOR LIVE */}
        {isLive && (
          <Button
            fullWidth
            variant="contained"
            onClick={(e) => {
              e.stopPropagation();
              onPlaceBid();
            }}
            sx={{
              mt: 2,
              background: "#194638",
              "&:hover": { background: "#163b30" },
            }}
          >
            Place Bid
          </Button>
        )}
      </Box>
    </>
  );
};

export default AuctionCardContent;
