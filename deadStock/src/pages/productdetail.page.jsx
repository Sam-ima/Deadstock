// src/pages/auctionDetail.page.jsx
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Container,
  Card,
  Button,
  Stack,
  Divider,
  Chip,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GavelIcon from "@mui/icons-material/Gavel";
import PersonIcon from "@mui/icons-material/Person";
import {products} from"../component/data/products_data";
// import { biddingItems } from "../component/data/bidding_data";

const ProductDetailPage = () => {
  const { id } = useParams();

  const product = products.find(
    (item) => item.id.toString() === id
  );

  if (!product) {
    return <Typography>Product not found</Typography>;
  }

  return (
    <Box sx={{ backgroundColor: "#f4f6f8", minHeight: "100vh", py: 6 }}>
      <Container maxWidth="lg">
        <Card
          sx={{
            borderRadius: 4,
            p: { xs: 2, md: 4 },
            boxShadow: "0 18px 40px rgba(0,0,0,0.12)",
          }}
        >
          <Stack direction={{ xs: "column", md: "row" }} spacing={5}>
            {/* Image Section */}
            <Box flex={1}>
              <Box
                component="img"
                src={product.img}
                alt={product.name}
                sx={{
                  width: "100%",
                  height: 360,
                  objectFit: "cover",
                  borderRadius: 3,
                }}
              />
            </Box>

            {/* Content Section */}
            <Box flex={1}>
              <Chip
                icon={<AccessTimeIcon />}
                label={`Ending in ${product.timeLeft}`}
                sx={{
                  mb: 2,
                  fontWeight: 600,
                  backgroundColor: "#194638",
                  color: "#fff",
                }}
              />

              <Typography variant="h4" fontWeight={800}>
                {product.name}
              </Typography>

              <Typography color="text.secondary" mt={1}>
                Premium auction item with verified bidders and secure
                transactions.
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Stack spacing={1.5}>
                <Typography fontSize="1rem">
                  <GavelIcon fontSize="small" /> Current Bid:{" "}
                  <b>${product.currentBid}</b>
                </Typography>

                <Typography fontSize="1rem">
                  Highest Bid: <b>${product.highestBid}</b>
                </Typography>

                <Typography fontSize="1rem">
                  <PersonIcon fontSize="small" /> Highest Bidder:{" "}
                  <b>{product.highestBidder}</b>
                </Typography>
              </Stack>

              <Divider sx={{ my: 3 }} />

              <Stack spacing={2}>
                <Button
                  size="large"
                  variant="contained"
                  sx={{
                    backgroundColor: "#194638",
                    fontWeight: 700,
                    borderRadius: 3,
                    py: 1.5,
                    "&:hover": {
                      backgroundColor: "#163b30",
                    },
                  }}
                >
                  Place Your Bid
                </Button>

                <Button
                  size="large"
                  variant="outlined"
                  sx={{
                    borderColor: "#194638",
                    color: "#194638",
                    fontWeight: 600,
                    borderRadius: 3,
                    py: 1.4,
                    "&:hover": {
                      backgroundColor: "#194638",
                      color: "#fff",
                    },
                  }}
                >
                  Add to Watchlist
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Card>
      </Container>
    </Box>
  );
};

export default  ProductDetailPage;
