// pages/AuctionCheckout.jsx
import React, { useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import {
  Box, Container, Typography, Button,
  Paper, Stepper, Step, StepLabel, CircularProgress,
} from "@mui/material";
import CheckCircleIcon  from "@mui/icons-material/CheckCircle";
import ArrowBackIcon    from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { toast } from "react-toastify";

import ShippingStep from "../checkout/ShippingDetails/ShippingSteps";
import PaymentStep  from "../checkout/payment/PaymentStep";
import { colors }   from "../checkout/Constants";

import useCountdown from "./hooks/useAuctionCountdown";
import useAuctionCheckoutData from "./hooks/useAuctionData";
import useAuctionEsewaPayment from "./hooks/useAuctionPayment";
import AuctionStatusScreen from "./auctionStatus";
import AuctionWinnerBanner from "./AuctionWinnerBanner";
import AuctionSummaryStep from "./AuctionSummarySteps";
import AuctionConfirmStep from "./AuctionConfirmSteps";
import AuctionOrderSidebar from "./AuctionOrderSidebar";

const STEPS = ["Order Summary", "Shipping", "Payment", "Confirm"];

const STATUS_SCREENS = new Set(["not-winner", "not-found", "not-ended", "paid", "expired", "error"]);

// ─── Main Component ───────────────────────────────────────────────────────────
const AuctionCheckout = () => {
  const { productId } = useParams();
  const auth          = getAuth();
  const currentUser   = auth.currentUser;

  const [step,          setStep]          = useState(0);
  const [placing,       setPlacing]       = useState(false);
  const [errors,        setErrors]        = useState({});
  const [paymentMethod, setPaymentMethod] = useState("");

  // ── Data fetching ──────────────────────────────────────────────────────────
  const {
    product, auction,
    pageStatus, setPageStatus,
    deliveryDetails, setDeliveryDetails,
  } = useAuctionCheckoutData(productId, currentUser);

  // ── Countdown ──────────────────────────────────────────────────────────────
  const timeLeft = useCountdown(
    auction?.paymentDeadline,
    () => setPageStatus("expired")
  );

  // ── eSewa payment ──────────────────────────────────────────────────────────
  const { handleEsewaPayment } = useAuctionEsewaPayment({
    product, auction, currentUser, deliveryDetails, setPlacing,
  });

  // ── Derived ────────────────────────────────────────────────────────────────
  const productImage = product?.images?.find((i) => i.isMain)?.url || product?.images?.[0]?.url;

  const deadline = auction?.paymentDeadline?.toDate
    ? auction.paymentDeadline.toDate()
    : new Date(auction?.paymentDeadline);

  const timerColor = timeLeft
    ? timeLeft.hours < 2 ? "#e74c3c" : timeLeft.hours < 6 ? "#f39c12" : "#27ae60"
    : "#e74c3c";

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setDeliveryDetails((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  }, [errors, setDeliveryDetails]);

  const validateShipping = () => {
    const required = { fullName: "Full name", email: "Email", phone: "Phone", address: "Address", city: "City" };
    const newErrors = {};
    Object.entries(required).forEach(([key, label]) => {
      if (!deliveryDetails[key]?.trim()) newErrors[key] = `${label} is required`;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && !validateShipping()) return;
    if (step === 2 && !paymentMethod) {
      toast.warning("Please select a payment method to continue.");
      return;
    }
    setStep((s) => s + 1);
  };

  // ── Loading ────────────────────────────────────────────────────────────────
  if (pageStatus === "loading") {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", gap: 2 }}>
        <CircularProgress sx={{ color: colors.primary }} />
        <Typography color={colors.textSecondary}>Loading your auction details...</Typography>
      </Box>
    );
  }

  // ── Status screens (access denied, expired, paid, etc.) ───────────────────
  if (STATUS_SCREENS.has(pageStatus)) {
    return <AuctionStatusScreen status={pageStatus} />;
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <Box sx={{ bgcolor: "#f5f6fa", minHeight: "100vh", py: 4, mt: 6 }}>
      <Container maxWidth="lg">

        {/* Banner */}
        <AuctionWinnerBanner
          productName={product?.name}
          timeLeft={timeLeft}
          timerColor={timerColor}
        />

        {/* Stepper */}
        <Paper elevation={0} sx={{ borderRadius: 3, p: 3, mb: 3 }}>
          <Stepper activeStep={step} alternativeLabel>
            {STEPS.map((label, i) => (
              <Step key={label}>
                <StepLabel StepIconProps={{ sx: {
                  "&.Mui-active":    { color: colors.primary },
                  "&.Mui-completed": { color: colors.primary },
                }}}>
                  <Typography variant="caption" fontWeight={step === i ? 700 : 400}>
                    {label}
                  </Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Paper>

        {/* Main layout */}
        <Box sx={{ display: "flex", gap: 3, alignItems: "flex-start", flexWrap: { xs: "wrap", md: "nowrap" } }}>

          {/* Left: step content */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Paper elevation={0} sx={{ borderRadius: 3, p: 3, mb: 2 }}>

              {step === 0 && (
                <AuctionSummaryStep
                  product={product}
                  auction={auction}
                  productImage={productImage}
                  deadline={deadline}
                />
              )}

              {step === 1 && (
                <ShippingStep
                  user={currentUser}
                  deliveryDetails={deliveryDetails}
                  errors={errors}
                  handleChange={handleChange}
                />
              )}

              {step === 2 && (
                <PaymentStep
                  paymentMethod={paymentMethod}
                  onPaymentMethodChange={setPaymentMethod}
                  showValidation={true}
                />
              )}

              {step === 3 && (
                <AuctionConfirmStep
                  product={product}
                  auction={auction}
                  deliveryDetails={deliveryDetails}
                  paymentMethod={paymentMethod}
                  submitError={errors.submit}
                />
              )}
            </Paper>

            {/* Navigation */}
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                variant="outlined"
                onClick={() => setStep((s) => s - 1)}
                disabled={step === 0}
                startIcon={<ArrowBackIcon />}
                sx={{ borderRadius: 2, borderColor: colors.border, color: colors.textPrimary, "&:hover": { borderColor: colors.primary } }}
              >
                Back
              </Button>

              {step < STEPS.length - 1 ? (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  endIcon={<ArrowForwardIcon />}
                  sx={{ borderRadius: 2, bgcolor: colors.primary, px: 4, "&:hover": { bgcolor: "#c0392b" } }}
                >
                  Continue
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleEsewaPayment}
                  disabled={placing}
                  startIcon={placing ? <CircularProgress size={16} color="inherit" /> : <CheckCircleIcon />}
                  sx={{ borderRadius: 2, bgcolor: "#27ae60", px: 4, "&:hover": { bgcolor: "#219a52" }, "&:disabled": { bgcolor: "#ccc" } }}
                >
                  {placing ? "Redirecting to eSewa..." : `Pay Rs. ${auction.highestBid} via eSewa`}
                </Button>
              )}
            </Box>
          </Box>

          {/* Right: sticky sidebar */}
          <AuctionOrderSidebar
            product={product}
            auction={auction}
            productImage={productImage}
            timeLeft={timeLeft}
            timerColor={timerColor}
          />

        </Box>
      </Container>
    </Box>
  );
};

export default AuctionCheckout;