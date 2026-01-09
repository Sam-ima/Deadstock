import { Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import makeSlug from "../../../utils/slugify";
import AuctionCardContent from "./auctionCardContent";
import BidDialog from "./placeBidDialog";

const AuctionProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [openBidDialog, setOpenBidDialog] = useState(false);

  return (
    <>
      <Card
        onClick={() =>
          navigate(`/product/${product.id}/${makeSlug(product.name)}`)
        }
        sx={{
          width: 280,
          borderRadius: 3,
          overflow: "hidden",
          transition: "0.3s ease",
          cursor: "pointer",
          "&:hover": {
            transform: "translateY(-6px)",
            boxShadow: "0 16px 40px rgba(0,0,0,0.15)",
          },
        }}
      >
        <AuctionCardContent
          product={product}
          onPlaceBid={() => setOpenBidDialog(true)}
        />
      </Card>

      <BidDialog
        open={openBidDialog}
        onClose={() => setOpenBidDialog(false)}
        product={product}
      />
    </>
  );
};

export default AuctionProductCard;
