import { Box, Stack, Typography } from "@mui/material";

const ProductPrice = ({ price, basePrice }) => {
  if (price == null) return null;

  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography fontWeight={700} fontSize="1.25rem" color="#2E7D32">
          Rs.{Number(price).toFixed(2)}
        </Typography>

        {basePrice > price && (
          <Typography
            fontSize="0.85rem"
            color="text.secondary"
            sx={{ textDecoration: "line-through", fontWeight: 500 }}
          >
            Rs.{Number(basePrice).toFixed(2)}
          </Typography>
        )}
      </Stack>
    </Box>
  );
};

export default ProductPrice;
