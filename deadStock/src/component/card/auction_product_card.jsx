import { Card, Typography, Box, Button } from "@mui/material";
import { useState } from "react";

const AuctionProductCard = ({ product }) => {
  const [hovered, setHovered] = useState(false);
  const [bidAmount, setBidAmount] = useState("");
  const [showBidForm, setShowBidForm] = useState(false);

  const handleBidClick = (e) => {
    e.stopPropagation();
    setShowBidForm((prev) => !prev);
  };

  const handleSubmitBid = () => {
    if (bidAmount) {
      alert(`Bid of $${bidAmount} placed on ${product.name}`);
      setBidAmount("");
      setShowBidForm(false);
    }
  };

  return (
    <Card
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setShowBidForm(false);
      }}
      sx={{
        position: "relative",
        width: "230px",
        height: "320px",
        borderRadius: "16px",
        overflow: "hidden",
        cursor: "pointer",
        transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: hovered ? "translateY(-10px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 15px 30px rgba(0,0,0,0.3)"
          : "0 4px 10px rgba(0,0,0,0.1)",
        margin: "0 auto",
      }}
    >
      {/* Product Image */}
      <Box
        component="img"
        src={product.img}
        alt={product.name}
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
          top: 0,
          left: 0,
          transition: "transform 1.2s ease",
          transform: hovered ? "scale(1.1)" : "scale(1)",
        }}
      />

      {/* Gradient Overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.8) 100%)",
          zIndex: 1,
        }}
      />

      {/* Time Badge on top */}
      <Box
        sx={{
          position: "absolute",
          top: "8px",
          right: "8px",
          backgroundColor: "#f97316",
          color: "#fff",
          padding: "2px 8px",
          borderRadius: "12px",
          fontSize: "0.7rem",
          fontWeight: 700,
          zIndex: 3,
        }}
      >
        {product.timeLeft}
      </Box>

      {/* Product Info (Visible Initially) */}
      {!hovered && (
        <Box sx={{ position: "absolute", bottom: 12, left: 12, right: 12, zIndex: 2 }}>
          <Typography sx={{ color: "#fff", fontWeight: 700, fontSize: "0.9rem" }}>
            {product.name}
          </Typography>
          <Typography sx={{ color: "#4caf50", fontWeight: "bold", fontSize: "0.85rem", mt: 0.5 }}>
            ${product.currentBid}
          </Typography>
        </Box>
      )}

      {/* Hover Overlay */}
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
              backgroundColor: '#ea580c',
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
    </Card>
  );
};

export default AuctionProductCard;
