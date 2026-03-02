import {
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Box,
  Button,
  Stack,
  Divider,
} from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

// ⭐ NEW: import bid service
import { placeBid } from "../../../services/bidService";

// ⭐ NEW: import auth context (adjust path if needed)
import { useAuth } from "../../../context/authContext/authContext";

const BidDialog = ({ open, onClose, product }) => {
  const auction = product?.auction;

  const [bidAmount, setBidAmount] = useState("");
  const [error, setError] = useState("");

  // ⭐ NEW: loading state
  const [loading, setLoading] = useState(false);

  // ⭐ NEW: get logged-in user
  const { user } = useAuth();

  const isLive = auction?.status === "live";

  const minBid =
    auction?.highestBid + auction?.minBidIncrement;

  const numericBid = Number(bidAmount);
  const isBidValid =
    bidAmount !== "" &&
    !isNaN(numericBid) &&
    numericBid >= minBid;

  useEffect(() => {
    if (!open) {
      setBidAmount("");
      setError("");
      setLoading(false); // ⭐ NEW
    }
  }, [open]);

  const handleChange = (e) => {
    const value = e.target.value;

    if (value < 0) return;

    setBidAmount(value);

    if (value !== "" && Number(value) < minBid) {
      setError(`Minimum allowed bid is Rs. ${minBid}`);
    } else {
      setError("");
    }
  };

  const handleSubmit = async () => {
    if (!isLive) {
      toast.error("Auction is not live yet.");
      return;
    }

    if (!user?.uid) {
      toast.error("Please login to place a bid.");
      return;
    }

    if (!isBidValid) return;

    try {
      setLoading(true); // ⭐ NEW

      // ⭐ NEW: call Firestore transaction
      await placeBid({
        productId: product.id,
        bidderId: user.uid,
        bidAmount: numericBid,
      });

      toast.success("Bid placed successfully!");
      onClose();
    } catch (err) {
      console.error(err);

      toast.error(
        typeof err === "string"
          ? err
          : err.message || "Failed to place bid"
      );
    } finally {
      setLoading(false); // ⭐ NEW
    }
  };

  if (!auction) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        sx: {
          borderRadius: 4,
          overflow: "hidden",
          boxShadow: "0 24px 60px rgba(0,0,0,0.25)",
        },
      }}
    >
      {/* 🟢 HEADER */}
      <Box
        sx={{
          px: 3,
          py: 2.5,
          background: "linear-gradient(135deg, #194638, #2f7d5a)",
          color: "#fff",
        }}
      >
        <Typography fontSize="1.15rem" fontWeight={700}>
          Place Your Bid
        </Typography>

        <Typography fontSize="0.8rem" sx={{ opacity: 0.9 }}>
          {product.name}
        </Typography>
      </Box>

      {/* 📦 CONTENT */}
      <DialogContent sx={{ px: 3, pt: 3 }}>
        <Stack spacing={2.2}>
          {/* Auction Info */}
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              background: "rgba(25,70,56,0.08)",
            }}
          >
            <Stack spacing={0.5}>
              <Typography fontSize="0.75rem" color="text.secondary">
                Current Highest Bid
              </Typography>
              <Typography fontWeight={700} fontSize="1.1rem">
                Rs. {auction.highestBid}
              </Typography>

              <Divider sx={{ my: 1 }} />

              <Typography fontSize="0.75rem" color="text.secondary">
                Minimum Increment
              </Typography>
              <Typography fontWeight={600}>
                + Rs. {auction.minBidIncrement}
              </Typography>
            </Stack>
          </Box>

          <Typography fontSize="0.8rem" color="text.secondary">
            Available Stock: <b>{product.availableStock}</b>
          </Typography>

          {/* Bid Input */}
          <TextField
            autoFocus
            fullWidth
            type="number"
            label="Your Bid Amount"
            value={bidAmount}
            onChange={handleChange}
            inputProps={{
              min: minBid,
              step: auction.minBidIncrement,
            }}
            placeholder={`Minimum Rs. ${minBid}`}
            error={Boolean(error)}
            helperText={error || " "}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />
        </Stack>
      </DialogContent>

      {/* 🔘 ACTIONS */}
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          onClick={onClose}
          sx={{
            textTransform: "none",
            borderRadius: 2,
            color: "text.secondary",
          }}
          disabled={loading} // ⭐ NEW
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!isBidValid || !isLive || loading} // ⭐ NEW
          sx={{
            px: 3,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
            color: "#fff",
            background: "linear-gradient(135deg, #194638, #2f7d5a)",
            boxShadow: "0 10px 20px rgba(25,70,56,0.35)",
            "&:hover": {
              background: "linear-gradient(135deg, #163b30, #276b4d)",
            },
            "&:disabled": {
              background: "#cfcfcf",
              boxShadow: "none",
            },
          }}
        >
          {loading ? "Placing..." : "Place Bid"} {/* ⭐ NEW */}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BidDialog;
