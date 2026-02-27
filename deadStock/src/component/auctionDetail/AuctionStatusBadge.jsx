import { Chip, Box } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const statusConfig = {
  live: {
    label: "🔴 Live Auction",
    color: "error",
    icon: (
      <FiberManualRecordIcon
        sx={{
          fontSize: 12,
          animation: "blink 1.2s ease-in-out infinite",
          "@keyframes blink": {
            "0%, 100%": { opacity: 1 },
            "50%": { opacity: 0.2 },
          },
        }}
      />
    ),
  },
  upcoming: {
    label: "Upcoming Auction",
    color: "warning",
    icon: <AccessTimeIcon sx={{ fontSize: 14 }} />,
  },
  ended: {
    label: "Auction Ended",
    color: "default",
    icon: <CheckCircleOutlineIcon sx={{ fontSize: 14 }} />,
  },
};

const AuctionStatusBadge = ({ status }) => {
  const config = statusConfig[status] ?? statusConfig.ended;

  return (
    <Box>
      <Chip
        icon={config.icon}
        label={config.label}
        color={config.color}
        variant="filled"
        sx={{
          fontWeight: "bold",
          fontSize: "0.85rem",
          px: 1,
          "& .MuiChip-icon": { ml: 1 },
        }}
      />
    </Box>
  );
};

export default AuctionStatusBadge;