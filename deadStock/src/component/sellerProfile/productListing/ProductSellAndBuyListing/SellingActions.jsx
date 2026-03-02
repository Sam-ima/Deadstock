import { useState } from "react";
import {
  Box,
  IconButton,
  Switch,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BID_DURATIONS = [
  { label: "2 hours", value: 2 },
  { label: "4 hours", value: 4 },
  { label: "8 hours", value: 8 },
  { label: "24 hours", value: 24 },
];

// ================= Auction Toggle =================
const AuctionToggle = ({ isAuction, onToggle, disabled }) => (
  <Box display="flex" alignItems="center" gap={0.5}>
    <Typography variant="caption" fontWeight={600} color="text.secondary">
      Bidding
    </Typography>
    <Switch
      size="small"
      color="success"
      checked={isAuction}
      onChange={onToggle}
      disabled={disabled}
    />
  </Box>
);

// ================= Action Buttons =================
const ActionButtons = ({ onEdit, onDelete }) => (
  <Box display="flex" gap={0.5}>
    <IconButton
      size="small"
      onClick={onEdit}
      sx={{
        bgcolor: "#e8f5e9",
        color: "#2e7d32",
        "&:hover": { bgcolor: "#2e7d32", color: "#fff" },
      }}
    >
      <EditIcon fontSize="small" />
    </IconButton>

    <IconButton
      size="small"
      onClick={onDelete}
      sx={{
        bgcolor: "#fdecea",
        color: "#d32f2f",
        "&:hover": { bgcolor: "#d32f2f", color: "#fff" },
      }}
    >
      <DeleteIcon fontSize="small" />
    </IconButton>
  </Box>
);

// ================= Auction Dialog =================
const AuctionDialog = ({
  open,
  onClose,
  duration,
  setDuration,
  minIncrement,
  setMinIncrement,
  onStartAuction,
}) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Set Auction Details</DialogTitle>
    <DialogContent
      sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}
    >
      <Select
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        displayEmpty
      >
        <MenuItem value="" disabled>
          Select duration
        </MenuItem>
        {BID_DURATIONS.map((d) => (
          <MenuItem key={d.value} value={d.value}>
            {d.label}
          </MenuItem>
        ))}
      </Select>

      <TextField
        label="Minimum Bid Increment"
        type="number"
        value={minIncrement}
        onChange={(e) => setMinIncrement(e.target.value)}
        inputProps={{ min: 10 }}
      />
    </DialogContent>

    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button
        variant="contained"
        onClick={onStartAuction}
        sx={{
          bgcolor: "linear-gradient(135deg, #2e7d32, #ff8f00)",
          color: "#fff",
          "&:hover": {
            bgcolor: "linear-gradient(135deg, #1b5e20, #ff6f00)",
          },
        }}
      >
        Start Auction
      </Button>
    </DialogActions>
  </Dialog>
);

// ================= Main Component =================
const SellingActions = ({ item, onEdit, onDelete, onToggleBidding }) => {
  const isAuctionStarted = item.saleType === "auction";
  const [isAuction, setIsAuction] = useState(isAuctionStarted);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState(
    item.auctionDuration || "",
  );
  const [minIncrement, setMinIncrement] = useState(item.minBidIncrement ?? 10);

  const handleToggleSwitch = () => {
    if (!isAuction) setDialogOpen(true); // open dialog when enabling
    setIsAuction(!isAuction);
  };

  const handleStartAuction = async () => {
    if (!selectedDuration || !minIncrement)
      return toast.error("Select duration and increment");

    try {
      await onToggleBidding(item, {
        durationHours: Number(selectedDuration),
        minBidIncrement: Number(minIncrement),
      });

      toast.success("Auction started successfully!");
      setDialogOpen(false);
    } catch (err) {
      toast.error("Failed to start auction!");
      console.error(err);
    }
  };

  return (
    <Box
      onClick={(e) => e.stopPropagation()}
      sx={{
        width: { xs: 270, sm: 280, md: 280 },
        px: 2,
        py: 1,
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <AuctionToggle
          isAuction={isAuction}
          onToggle={handleToggleSwitch}
          disabled={isAuctionStarted}
        />
        <ActionButtons
          onEdit={() => onEdit(item)}
          onDelete={() => onDelete(item.id)}
        />
      </Box>

      {isAuctionStarted && (
        <Typography variant="body2" color="success.main">
          Auction is active ⏳
        </Typography>
      )}

      <AuctionDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        duration={selectedDuration}
        setDuration={setSelectedDuration}
        minIncrement={minIncrement}
        setMinIncrement={setMinIncrement}
        onStartAuction={handleStartAuction}
      />
    </Box>
  );
};

export default SellingActions;
