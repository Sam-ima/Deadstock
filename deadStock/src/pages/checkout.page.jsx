import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  TextField,
  Button,
  Stack,
  Divider,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputAdornment,
} from "@mui/material";
import {
  CreditCard as CreditCardIcon,
  Money as MoneyIcon,
  AccountBalanceWallet as WalletIcon,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";

const Checkout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { product, quantity = 1 } = state || {};

  if (!product) {
    return (
      <Container sx={{ py: 10, textAlign: "center" }}>
        <Typography variant="h5">No product selected</Typography>
        <Button sx={{ mt: 3 }} variant="contained" onClick={() => navigate("/")}>
          Go Back
        </Button>
      </Container>
    );
  }

  const subtotal = product.price * quantity;
  const shipping = 20;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight={700} mb={4}>
        Checkout
      </Typography>

      <Grid container spacing={4}>
        {/* LEFT SECTION */}
        <Grid item xs={12} md={7}>
          <Stack spacing={4}>
            {/* Customer Info */}
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" mb={2}>
                Customer Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="First Name" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Last Name" />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Email Address" />
                </Grid>
              </Grid>
            </Card>

            {/* Shipping Address */}
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" mb={2}>
                Shipping Address
              </Typography>
              <Stack spacing={2}>
                <TextField fullWidth label="Street Address" />
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="City" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Postal Code" />
                  </Grid>
                </Grid>
                <TextField fullWidth label="Country" />
              </Stack>
            </Card>

            {/* Payment */}
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" mb={2}>
                Payment Method
              </Typography>
              <RadioGroup defaultValue="card">
                <FormControlLabel
                  value="card"
                  control={<Radio color="success" />}
                  label={
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <CreditCardIcon color="success" />
                      <Typography>Credit / Debit Card</Typography>
                    </Stack>
                  }
                />
                <FormControlLabel
                  value="cod"
                  control={<Radio color="success" />}
                  label={
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <MoneyIcon color="success" />
                      <Typography>Cash on Delivery</Typography>
                    </Stack>
                  }
                />
                <FormControlLabel
                  value="wallet"
                  control={<Radio color="success" />}
                  label={
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <WalletIcon color="success" />
                      <Typography>Digital Wallet</Typography>
                    </Stack>
                  }
                />
              </RadioGroup>
            </Card>
          </Stack>
        </Grid>

        {/* RIGHT SECTION */}
        <Grid item xs={12} md={5}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" mb={2}>
              Order Summary
            </Typography>

            <Stack direction="row" spacing={2}>
              <CardMedia
                component="img"
                image={product.image}
                sx={{ width: 100, borderRadius: 2 }}
              />
              <Box>
                <Typography fontWeight={600}>{product.name}</Typography>
                <Typography variant="body2">Quantity: {quantity}</Typography>
                <Typography fontWeight={700}>${subtotal.toFixed(2)}</Typography>
              </Box>
            </Stack>

            <Divider sx={{ my: 3 }} />

            <Stack spacing={1}>
              <Box display="flex" justifyContent="space-between">
                <Typography>Subtotal</Typography>
                <Typography>${subtotal.toFixed(2)}</Typography>
              </Box>

              <Box display="flex" justifyContent="space-between">
                <Typography>Shipping</Typography>
                <Typography>${shipping}</Typography>
              </Box>

              <Box display="flex" justifyContent="space-between">
                <Typography>Tax</Typography>
                <Typography>${tax.toFixed(2)}</Typography>
              </Box>

              <Divider />

              <Box display="flex" justifyContent="space-between">
                <Typography fontWeight={700}>Total</Typography>
                <Typography fontWeight={700}>${total.toFixed(2)}</Typography>
              </Box>
            </Stack>

            <Button
              variant="contained"
              color="success"
              size="large"
              fullWidth
              sx={{ mt: 3 }}
              onClick={() => alert("Order placed successfully!")}
            >
              Place Order
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Checkout;
