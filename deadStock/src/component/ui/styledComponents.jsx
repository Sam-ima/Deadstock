import { styled } from "@mui/material/styles";
import { Box, Card, Button } from "@mui/material";
import { fadeInUp, floatAnimation, pulseAnimation } from "./animations";

export const AnimatedBox = styled(Box)(({ delay = '0s' }) => ({
  animation: `${fadeInUp} 0.8s ease-out ${delay} forwards`,
  opacity: 0,
}));

export const FloatingImage = styled(Box)({
  animation: `${floatAnimation} 6s ease-in-out infinite`,
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    background: 'radial-gradient(circle at center, rgba(251, 146, 60, 0.3) 0%, transparent 70%)',
    zIndex: -1,
    animation: `${pulseAnimation} 4s ease-in-out infinite`,
  },
});

export const GlowingCard = styled(Card)({
  background: 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255,255,255,0.1)',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(251, 146, 60, 0.1), transparent)',
    transition: 'left 0.7s ease',
  },
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 40px rgba(251, 146, 60, 0.2)',
    borderColor: 'rgba(251, 146, 60, 0.3)',
    '&::before': {
      left: '100%',
    },
  },
});

export const PrimaryButton = styled(Button)({
  bgcolor: "#FB923C",
  color: "white",
  px: { xs: 3, md: 4 },
  py: 1.5,
  fontSize: { xs: '0.9rem', md: '1rem' },
  fontWeight: 700,
  borderRadius: "12px",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  minWidth: { xs: '100%', sm: 'auto' },
  "&:hover": {
    bgcolor: "#F97316",
    transform: "translateY(-2px)",
    boxShadow: "0 10px 20px rgba(251, 146, 60, 0.3)"
  },
  transition: "all 0.3s ease",
  animation: `${pulseAnimation} 3s ease-in-out infinite`,
});

export const SecondaryButton = styled(Button)({
  borderColor: 'rgba(255,255,255,0.3)',
  color: "white",
  px: { xs: 3, md: 4 },
  py: 1.5,
  fontSize: { xs: '0.9rem', md: '1rem' },
  fontWeight: 600,
  borderRadius: "12px",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  minWidth: { xs: '100%', sm: 'auto' },
  "&:hover": {
    borderColor: "#FB923C",
    color: "#FB923C",
    bgcolor: 'rgba(251, 146, 60, 0.1)',
    transform: "translateY(-2px)",
  },
  transition: "all 0.3s ease",
});