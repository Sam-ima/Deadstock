import { Box, Container, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import ProductImages from "./categoryPage/productDetail/ProductImages";
import ProductInfo from "./categoryPage/productDetail/ProductInfo";
import AuctionTimer from "./auctionDetail/auctionTimer";
import BidDialog from "./card/auctionCard/PlaceBidDialog";

import { setSelectedImage, toggleWishlist } from "../store/slice/auctionSlice";

const AuctionDetail = ({ product }) => {
  const dispatch = useDispatch();

  // ✅ FIX: dialog state
  const [openBidDialog, setOpenBidDialog] = useState(false);

  const selectedImage = useSelector(
    (state) => state.auction.selectedImages[product.id] ?? 0
  );

  const isFavorite = useSelector((state) =>
    state.auction.wishlist.includes(product.id)
  );

  const transformedProduct = {
    ...product,
   basePrice: product.currentBid,          
  currentPrice: product.highestBid,
    images: product.galleryImages || [product.img],
  };

  return (
    <Box sx={{ minHeight: "100vh", pt: { xs: 2, md: 4 } }}>
      <Container maxWidth="xl">

        {/* MOBILE */}
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            flexDirection: "column",
            gap: 3,
          }}
        >
          <ProductInfo product={transformedProduct} isAuction showPrice />

          <ProductImages
            product={transformedProduct}
            selectedImage={selectedImage}
            setSelectedImage={(index) =>
              dispatch(setSelectedImage({ productId: product.id, index }))
            }
            isFavorite={isFavorite}
            setIsFavorite={() => dispatch(toggleWishlist(product.id))}
          />

          <AuctionTimer
            product={product}
            onPlaceBid={() => setOpenBidDialog(true)}
          />
        </Box>

        {/* DESKTOP */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 4,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <ProductImages
              product={transformedProduct}
              selectedImage={selectedImage}
              setSelectedImage={(index) =>
                dispatch(setSelectedImage({ productId: product.id, index }))
              }
              isFavorite={isFavorite}
              setIsFavorite={() => dispatch(toggleWishlist(product.id))}
            />
          </Box>

          <Box sx={{ width: "40%" }}>
            <ProductInfo product={transformedProduct} isAuction showPrice />

            <Box >
              <AuctionTimer
                product={product}
                onPlaceBid={() => setOpenBidDialog(true)}
              />
            </Box>
          </Box>
        </Box>
      </Container>

      {/* ✅ Dialog */}
      <BidDialog
        open={openBidDialog}
        onClose={() => setOpenBidDialog(false)}
        product={product}
      />
    </Box>
  );
};

export default AuctionDetail;