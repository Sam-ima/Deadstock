import { Card, Typography, Box, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import makeSlug from "../../../utils/slugify";
// import { products } from "../../component/data/products_data";

const AuctionProductCard = ({ product }) => {
  const navigate = useNavigate();
  return (
    <Card
      onClick={() =>
        navigate(`/product/${product.id}/${makeSlug(product.name)}`)
      }
      sx={{
        width: 280,
        borderRadius: 3,
        overflow: "hidden",
        transition: "0.3s ease",
        cursor:"pointer",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 16px 40px rgba(0,0,0,0.15)",
        },
      }}
    >
      {/* Image */}
      <Box sx={{ position: "relative" }}>
        <Box
          component="img"
          src={product.img}
          alt={product.name}
          loading="lazy"
          sx={{
            width: "100%",
            height: 180,
            objectFit: "cover",
          }}
        />

        {/* Timer */}
        <Box
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            px: 1.5,
            py: 0.5,
            borderRadius: 20,
            background: "rgba(0,0,0,0.7)",
            color: "#fff",
            fontSize: "0.75rem",
            fontWeight: 600,
          }}
        >
          ⏳ {product.timeLeft}
        </Box>
      </Box>

      {/* Content */}
      <Box sx={{ p: 2 }}>
        <Typography fontWeight={700} fontSize="1rem">
          {product.name}
        </Typography>

        <Stack spacing={0.8} mt={1}>
          {/* <Typography fontSize="0.85rem" color="text.secondary">
            Current Bid: <b>${product.currentBid}</b>
          </Typography> */}

          <Typography fontSize="0.85rem" color="text.secondary">
            Highest Bid: <b>${product.highestBid}</b>
          </Typography>

          <Typography fontSize="0.8rem" color="text.secondary">
            Highest Bidder:{" "}
            <span style={{ fontWeight: 600 }}>{product.highestBidder}</span>
          </Typography>
        </Stack>

        <Button
          onClick={(e) => {
            e.stopPropagation();
            // bid logic here
          }}
          fullWidth
          sx={{
            mt: 2,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
            background: "#194638",
            "&:hover": {
              background: "#163b30",
            },
          }}
          variant="contained"
        >
          Place Bid
        </Button>
      </Box>
    </Card>
  );
};

export default AuctionProductCard;
