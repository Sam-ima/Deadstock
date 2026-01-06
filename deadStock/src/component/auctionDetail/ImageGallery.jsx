// src/components/auction/ImageGallery.jsx
import { Box, Paper, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedImage } from "../../redux/slice/auctionSlice";

const ImageGallery = ({ product }) => {
  const dispatch = useDispatch();
  const { selectedImage } = useSelector((state) => state.auction);

  const images = product.galleryImages || [product.img];

  return (
    <>
      <Paper sx={{ borderRadius: 3, mb: 2 }}>
        <Box
          component="img"
          src={selectedImage || product.img}
          sx={{ width: "100%", height: 450, objectFit: "contain" }}
        />
      </Paper>

      <Stack direction="row" spacing={1}>
        {images.map((img, i) => (
          <Box
            key={i}
            component="img"
            src={img}
            onClick={() => dispatch(setSelectedImage(img))}
            sx={{
              width: 80,
              height: 80,
              borderRadius: 2,
              cursor: "pointer",
              border:
                selectedImage === img
                  ? "3px solid #2E7D32"
                  : "2px solid #e0e0e0",
            }}
          />
        ))}
      </Stack>
    </>
  );
};

export default ImageGallery;
