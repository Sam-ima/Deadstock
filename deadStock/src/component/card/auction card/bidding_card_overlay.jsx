import { Box, Typography, Button } from "@mui/material";

const CardHoverOverlay = ({ hovered, showBidForm, setShowBidForm, bidAmount, setBidAmount, product, handleSubmitBid }) => {

  const handleBidClick = (e) => {
    e.stopPropagation();
    setShowBidForm((prev) => !prev);
  };

  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: hovered ? "100%" : "0%",
        background: "rgba(0,0,0,0.85)",
        backdropFilter: "blur(4px)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        zIndex: 3,
        overflow: "hidden",
        transition: "height 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
          width: "100%",
          alignItems: "center",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(50px)",
          transition: "all 0.6s ease 0.3s",
        }}
      >
        <Typography sx={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: 1, color: "#f97316" }}>
          {product.category}
        </Typography>

        <Typography sx={{ fontSize: "1.2rem", fontWeight: 800, color: "#10b981" }}>
          Current: ${product.currentBid}
        </Typography>

        <Box sx={{ width: "100%", height: "1px", bgcolor: "rgba(255,255,255,0.2)" }} />

        <Typography sx={{ fontSize: "0.75rem", color: "#ff9800" }}>
          Total Bids: {product.bids}
        </Typography>

        <Button
          variant="contained"
          fullWidth
          onClick={handleBidClick}
          sx={{
            backgroundColor: "#ea580c",
            "&:hover": { bgcolor: "#d97706" },
            borderRadius: "20px",
            fontWeight: "bold",
            fontSize: "0.75rem",
          }}
        >
          {showBidForm ? "Close" : "Place Bid"}
        </Button>

        {showBidForm && (
          <Box sx={{ width: "100%", mt: 1, display: "flex", flexDirection: "column", gap: 1 }}>
            <input
              type="number"
              placeholder="Enter Bid"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              style={{
                padding: "8px",
                borderRadius: "20px",
                border: "none",
                textAlign: "center",
                outline: "none",
              }}
            />
            <Button
              onClick={handleSubmitBid}
              variant="outlined"
              size="small"
              sx={{ color: "#fff", borderColor: "#fff", borderRadius: "20px" }}
            >
              Submit
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CardHoverOverlay;
