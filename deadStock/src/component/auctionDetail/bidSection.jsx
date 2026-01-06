// src/components/auction/BidSection.jsx
import { Box, Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setBidAmount,
  showSnackbar,
} from "../../redux/slice/auctionSlice";

const BidSection = ({ product }) => {
  const dispatch = useDispatch();
  const { bidAmount } = useSelector((state) => state.auction);

  const placeBid = () => {
    if (bidAmount <= product.currentBid) {
      dispatch(
        showSnackbar({
          message: "Bid must be higher than current bid",
          type: "error",
        })
      );
      return;
    }

    dispatch(
      showSnackbar({
        message: "Bid placed successfully!",
        type: "success",
      })
    );
  };

  return (
    <Box>
      <TextField
        fullWidth
        type="number"
        label="Your Bid"
        value={bidAmount}
        onChange={(e) =>
          dispatch(setBidAmount(Number(e.target.value)))
        }
      />
      <Button fullWidth sx={{ mt: 2 }} onClick={placeBid}>
        Place Bid
      </Button>
    </Box>
  );
};

export default BidSection;
