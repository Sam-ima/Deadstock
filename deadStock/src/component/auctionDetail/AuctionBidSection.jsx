import { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Button,
  TextField,
  Chip,
  Alert,
  Paper,
} from "@mui/material";
import GavelIcon from "@mui/icons-material/Gavel";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

/**
 * Reads from product root:
 *   product.highestBid        → current highest bid (number)
 *   product.startingBid       → starting bid (number)
 *   product.bidCount          → total number of bids (number)
 *   product.minBidIncrement   → minimum increment per bid (number)
 */
const AuctionBidSection = ({ product, status }) => {
  const [bidAmount, setBidAmount] = useState("");
  const [bidError, setBidError] = useState("");
  const [bidSuccess, setBidSuccess] = useState(false);

  const startingBid = product?.startingBid ?? 0;
  const highestBid = product?.highestBid ?? startingBid;
  const minIncrement = product?.minBidIncrement ?? 1;
  const bidCount = product?.bidCount ?? 0;

  // Minimum valid next bid
  const minNextBid = highestBid + minIncrement;

  const handleBid = () => {
    const amount = parseFloat(bidAmount);
    if (!amount || isNaN(amount)) {
      setBidError("Please enter a valid bid amount.");
      return;
    }
    if (amount < minNextBid) {
      setBidError(`Your bid must be at least Rs.${minNextBid}`);
      return;
    }
    setBidError("");
    setBidSuccess(true);
    // TODO: wire up your bid service
    // await placeBid(product.id, amount);
  };

  return (
    <Box>
      {/* Bid Stats Row */}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={2}>
        {/* Highest / Starting Bid */}
        <Paper
          elevation={0}
          sx={{
            flex: 1,
            px: 2.5,
            py: 1.5,
            borderRadius: 2,
            border: "1px solid",
            borderColor: status === "live" ? "error.light" : "grey.200",
            bgcolor: status === "live" ? "error.50" : "grey.50",
          }}
        >
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ textTransform: "uppercase", letterSpacing: 0.5, fontSize: "0.68rem" }}
          >
            {status === "upcoming" ? "Starting Bid" : "Highest Bid"}
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1} mt={0.5}>
            <TrendingUpIcon
              sx={{
                fontSize: 18,
                color: status === "live" ? "error.main" : "text.secondary",
              }}
            />
            <Typography
              variant="h5"
              fontWeight="bold"
              color={status === "live" ? "error.main" : "text.primary"}
            >
              Rs.{status === "upcoming" ? startingBid : highestBid}
            </Typography>
          </Stack>
        </Paper>

        {/* Total Bids */}
        <Paper
          elevation={0}
          sx={{
            flex: 1,
            px: 2.5,
            py: 1.5,
            borderRadius: 2,
            border: "1px solid",
            borderColor: "grey.200",
            bgcolor: "grey.50",
          }}
        >
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ textTransform: "uppercase", letterSpacing: 0.5, fontSize: "0.68rem" }}
          >
            Total Bids
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1} mt={0.5}>
            <GavelIcon sx={{ fontSize: 18, color: "text.secondary" }} />
            <Typography variant="h5" fontWeight="bold">
              {bidCount}
            </Typography>
          </Stack>
        </Paper>
      </Stack>

      {/* Min increment chip */}
      {status !== "ended" && (
        <Chip
          label={`Min. bid increment: Rs.${minIncrement}`}
          size="small"
          variant="outlined"
          sx={{ mb: 2, fontSize: "0.75rem" }}
        />
      )}

      {/* LIVE — show bid input */}
      {status === "live" && (
        <Box>
          {bidSuccess ? (
            <Alert severity="success">
              Your bid of Rs.{bidAmount} was placed successfully!
            </Alert>
          ) : (
            <>
              {bidError && (
                <Alert severity="error" sx={{ mb: 1 }}>
                  {bidError}
                </Alert>
              )}
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                <TextField
                  label={`Your Bid (min Rs.${minNextBid})`}
                  type="number"
                  size="small"
                  value={bidAmount}
                  onChange={(e) => {
                    setBidAmount(e.target.value);
                    setBidError("");
                    setBidSuccess(false);
                  }}
                  inputProps={{ min: minNextBid, step: minIncrement }}
                  sx={{ flex: 1 }}
                />
                <Button
                  variant="contained"
                  color="error"
                  size="large"
                  startIcon={<GavelIcon />}
                  onClick={handleBid}
                  sx={{ fontWeight: "bold", whiteSpace: "nowrap", px: 3 }}
                >
                  Place Bid
                </Button>
              </Stack>
              <Typography variant="caption" color="text.secondary" mt={0.5} display="block">
                Enter Rs.{minNextBid} or more to outbid the current highest bid.
              </Typography>
            </>
          )}
        </Box>
      )}

      {/* UPCOMING — not started yet */}
      {status === "upcoming" && (
        <Alert severity="info" icon={<GavelIcon />}>
          Bidding hasn't opened yet. Come back when the auction goes live!
        </Alert>
      )}

      {/* ENDED */}
      {status === "ended" && (
        <Alert severity="warning">
          This auction has ended. Final bid: <strong>Rs.{highestBid}</strong>
        </Alert>
      )}
    </Box>
  );
};

export default AuctionBidSection;