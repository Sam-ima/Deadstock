import {
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Box,
  Button,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";

const BidDialog = ({ open, onClose, product }) => {
  const [bidAmount, setBidAmount] = useState("");

  const minBid = product.highestBid + 1;
  const numericBid = Number(bidAmount);
  const isBidValid = bidAmount !== "" && numericBid >= minBid;

  const handleSubmit = () => {
    if (!isBidValid) return;

    toast.success("Bid Placed Successfully!");
    // 👉 API / WebSocket logic here

    setBidAmount("");
    onClose();
  };

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
      {/* Header */}
      <Box
        sx={{
          px: 3,
          py: 2.5,
          background: "linear-gradient(135deg, #194638, #2f7d5a)",
          color: "#fff",
        }}
      >
        <Typography fontSize="1.1rem" fontWeight={700}>
          Place Your Bid
        </Typography>
        <Typography fontSize="0.8rem" sx={{ opacity: 0.9 }}>
          Minimum bid: ${minBid}
        </Typography>
      </Box>

      {/* Content */}
      <DialogContent sx={{ px: 3, pt: 3 }}>
        <Stack spacing={2}>
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              background: "rgba(25,70,56,0.08)",
            }}
          >
            <Typography fontSize="0.8rem" color="text.secondary">
              Current Highest Bid
            </Typography>
            <Typography fontWeight={700} fontSize="1.1rem">
              ${product.highestBid}
            </Typography>
          </Box>

          <TextField
            autoFocus
            fullWidth
            type="number"
            label="Your Bid Amount"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            inputProps={{ min: minBid }}
            placeholder={`Min $${minBid}`}
            error={bidAmount !== "" && !isBidValid}
            helperText={
              bidAmount !== "" && !isBidValid
                ? `Bid must be at least $${minBid}`
                : " "
            }
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />
        </Stack>
      </DialogContent>

      {/* Actions */}
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          onClick={onClose}
          sx={{
            textTransform: "none",
            borderRadius: 2,
            color: "text.secondary",
          }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!isBidValid}
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
          }}
        >
          Submit Bid
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BidDialog;
