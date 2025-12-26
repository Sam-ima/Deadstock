import styles from "../style";
import { Card, CardMedia, Typography, Box } from "@mui/material";

const AuctionProductCard = ({
  product,
  hovered,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <Card
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      sx={{
        ...styles.productCard,
        ...(hovered ? styles.cardHover : {}),
      }}
    >
      <CardMedia
        component="img"
        image={product.img}
        alt={product.name}
        sx={styles.productImage}
      />

      <Box sx={styles.cardOverlay} />

      <Typography sx={styles.productName}>{product.name}</Typography>

      <Typography sx={styles.priceTag}>
        {product.currentBid ?? product.price}
      </Typography>

      <Box sx={styles.timeTag}>
        <span>Time Left</span>
        <span style={styles.timeValue}>
          {product.timeLeft ?? product.time}
        </span>
      </Box>
    </Card>
  );
};

export default AuctionProductCard;
