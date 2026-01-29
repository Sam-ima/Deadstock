import { Box, Container, Typography, Paper } from "@mui/material";
import UserEmailDisplay from "./UserEmailDispay";
import CheckoutForm from "./CheckoutForm";
import OrderSummary from "./orderSummary";
import { colors } from "./Constants";

const CheckoutLayout = ({
  directPurchaseItem,
  displayItems,
  user,
  activeStep,
  paymentMethod,
  loading,
  totals,
  onNext,
  onBack,
  onPayment,
  onPaymentMethodChange,
  deliveryDetails,
  setDeliveryDetails,
}) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: colors.bg,
        color: colors.textPrimary,
        py: { xs: 4, md: 8 },
        mt: 4,
      }}
    >
      <Container maxWidth="lg">
        {/* Title */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h6"
            component="h1"
            fontWeight={800}
            sx={{
              background: colors.primaryGradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              mb: 2,
            }}
          >
            {directPurchaseItem ? "Direct Purchase" : "Secure Checkout"}
          </Typography>
          <Typography
            variant="body1"
            color={colors.textSecondary}
            sx={{ maxWidth: 600, mx: "auto" }}
          >
            {directPurchaseItem
              ? "You're purchasing this item directly. Complete your purchase below."
              : `Complete your purchase for ${displayItems.length} item(s) in just a few steps.`}
          </Typography>
        </Box>

        {/* User Email Display */}
        <UserEmailDisplay user={user} />

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            gap: 4,
          }}
        >
          {/* Left - Form Section */}
          <Box sx={{ flex: "1 1 65%" }}>
            <CheckoutForm
              activeStep={activeStep}
              paymentMethod={paymentMethod}
              loading={loading}
              user={user}
              onNext={onNext}
              onBack={onBack}
              onPayment={onPayment}
              onPaymentMethodChange={onPaymentMethodChange}
              deliveryDetails={deliveryDetails}
              setDeliveryDetails={setDeliveryDetails}
            />
          </Box>

          {/* Right - Order Summary */}
          <Box sx={{ flex: "1 1 35%" }}>
            <OrderSummary
              directPurchaseItem={directPurchaseItem}
              displayItems={displayItems}
              totals={totals}
              loading={loading}
              hasItems={displayItems.length > 0}
              user={user}
              onPayment={onPayment}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default CheckoutLayout;
