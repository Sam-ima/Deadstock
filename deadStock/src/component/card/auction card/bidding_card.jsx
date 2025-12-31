import { Card, Typography, Box } from "@mui/material";
import { useState } from "react";
import CardHoverOverlay from "./bidding_card_overlay";
import TimeBadge from "./time_badge";

const AuctionProductCard = ({ product }) => {
  const [hovered, setHovered] = useState(false);
  const [bidAmount, setBidAmount] = useState("");
  const [showBidForm, setShowBidForm] = useState(false);

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
        height: "250px",
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

      {/* Time Badge */}
      <TimeBadge timeLeft={product.timeLeft} />

      {/* Static Product Info */}
      {!hovered && (
        <Box sx={{ position: "absolute", bottom: 12, left: 12, right: 12, zIndex: 2 }}>
          <Typography sx={{ color: "#fff", fontWeight: 700, fontSize: "0.9rem" }}>
            {product.name}
          </Typography>
          <Typography sx={{ color: "#194638ff", fontWeight: "bold", fontSize: "0.85rem", mt: 0.5 }}>
            ${product.currentBid}
          </Typography>
        </Box>
      )}

      {/* Hover Overlay */}
      <CardHoverOverlay
        hovered={hovered}
        showBidForm={showBidForm}
        setShowBidForm={setShowBidForm}
        bidAmount={bidAmount}
        setBidAmount={setBidAmount}
        product={product}
        handleSubmitBid={handleSubmitBid}
      />
    </Card>
  );
};

export default AuctionProductCard;
