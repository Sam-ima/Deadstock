// CartDrawerHeader.jsx
import {
  Box,
  Typography,
  IconButton,
  Stack,
  Badge,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { formatPrice } from "./cart_utils";

const CartDrawerHeader = ({ user, totalItems, cartTotal, onClose }) => {
  return (
    <Box 
      sx={{ 
        p: { xs: 2, sm: 3 },
        backgroundColor: "rgba(25, 58, 45, 0.95)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <Stack 
        direction="row" 
        justifyContent="space-between" 
        alignItems="center"
        sx={{ flexWrap: 'nowrap' }}
      >
        {/* Left side: Cart icon and info */}
        <Stack 
          direction="row" 
          spacing={{ xs: 1.5, sm: 2 }} 
          alignItems="center"
          sx={{ 
            flex: 1,
            minWidth: 0, // Allows text truncation
          }}
        >
          <Badge 
            badgeContent={totalItems} 
            color="error"
            sx={{
              '& .MuiBadge-badge': {
                fontSize: { xs: '0.7rem', sm: '0.75rem' },
                height: { xs: 18, sm: 20 },
                minWidth: { xs: 18, sm: 20 },
              }
            }}
          >
            <ShoppingBagIcon 
              sx={{ 
                fontSize: { xs: 28, sm: 32, md: 34 },
                color: "#FFFFFF" 
              }} 
            />
          </Badge>
          
          <Typography 
            fontWeight={700} 
            sx={{ 
              color: "#FFFFFF",
              fontSize: { 
                xs: '0.95rem', 
                sm: '1.1rem',
                md: '1.2rem' 
              },
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {user
              ? `${totalItems} ${totalItems === 1 ? 'item' : 'items'} • Rs.${formatPrice(cartTotal)}`
              : "Please Login"}
          </Typography>
        </Stack>

        {/* Close button */}
        <IconButton 
          onClick={onClose} 
          sx={{ 
            color: "#FFFFFF",
            ml: 1,
            flexShrink: 0,
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.1)',
            },
          }}
        >
          <CloseIcon 
            sx={{ 
              fontSize: { xs: 24, sm: 28 } 
            }} 
          />
        </IconButton>
      </Stack>

      {/* Mobile-only subtitle */}
      {user && (
        <Typography
          variant="caption"
          sx={{
            display: { xs: 'block', sm: 'none' },
            color: 'rgba(255,255,255,0.7)',
            mt: 0.5,
            fontSize: '0.75rem',
          }}
        >
          Tap items to view details
        </Typography>
      )}
    </Box>
  );
};

export default CartDrawerHeader;