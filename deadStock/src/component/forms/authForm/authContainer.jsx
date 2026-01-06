import { Box, Paper, Typography } from "@mui/material";
import AuthImage from "../../../assets/sellBuy-removebg-preview.png";

const AuthContainer = ({ children }) => {
  return (
    <Box
      sx={{
        // maxWidth: 1200,
        // width: "100%",
        minHeight: "90vh",
        display: "grid",
        placeItems: "center",
        px: 2,
        m: { xs: 0, sm: 10, md: 5,lg:10 },
        py: { xs: 9, sm: 0 },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          maxWidth: 900,
          minHeight: 560,
          display: "flex",
          borderRadius: 4,
          overflow: "hidden",
          backgroundColor: "#fff",
          boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
        }}
      >
        {/* ===== LEFT IMAGE SECTION ===== */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            width: "40%",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            px: 4,
            bgcolor: "#f6f2e9",
          }}
        >
          <Box
            component="img"
            src={AuthImage}
            alt="Buy Sell Illustration"
            sx={{
              width: "100%",
              maxWidth: 350,
              mb: 3,
              height: 300,
            }}
          />

          <Typography
            variant="h5"
            fontWeight={800}
            textAlign="center"
            sx={{
              color: "#EF6C00",
            }}
          >
            Buy • Sell • Bid
          </Typography>

          <Typography
            variant="body2"
            textAlign="center"
            color="text.secondary"
            maxWidth={260}
            mt={1}
          >
            Trade smarter and grow your business with confidence.
          </Typography>
        </Box>

        {/* ===== RIGHT FORM SECTION ===== */}
        <Box
          sx={{
            width: { xs: "100%", md: "60%" },
            p: { xs: 3, sm: 4 },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "#fff",
          }}
        >
          <Box width="100%" maxWidth={440}>
            {children}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default AuthContainer;
