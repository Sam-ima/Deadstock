import React, { useState } from "react";
import {
  CssBaseline,
  Box,
  AppBar,              
  Toolbar,
  Typography,
  Container,
  ToggleButton,
  ToggleButtonGroup,
  Paper,
} from "@mui/material";

import BuyerProfile from "../component/profile/buyerProfile";
import SellerProfile from "../component/profile/sellerProfile";
import { buyerData } from "../component/data/buyerData";
import { sellerData } from "../component/data/sellerData";
import { ROLES } from "../component/constants/roles";

function ProfilePage() {
  const [role, setRole] = useState(ROLES.BUYER);

  const handleRoleChange = (event, newRole) => {
    if (newRole !== null) {
      setRole(newRole);
    }
  };

  return (
    <>
      <CssBaseline />
      <Box
   sx={{
        paddingTop: { xs: "50px", sm: "50px", md: "50px", lg: "60px" },
        paddingBottom: "0px",
      }}
      >
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "white",
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <Toolbar>
  
            <Paper
              elevation={0}
              sx={{
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              {/* <ToggleButtonGroup
                value={role}
                exclusive
                onChange={handleRoleChange}
                size="small"
              >
                <ToggleButton value={ROLES.BUYER} sx={{ px: 3 }}>
                  Buyer Profile
                </ToggleButton>
                <ToggleButton value={ROLES.SELLER} sx={{ px: 3 }}>
                  Seller Profile
                </ToggleButton>
              </ToggleButtonGroup> */}
            </Paper>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ mt: 4 }}>
          {role === ROLES.BUYER ? (
            <BuyerProfile data={buyerData} />
          ) : (
            <SellerProfile data={sellerData} />
          )}
        </Container>
      </Box>
    </>
  );
}

export default ProfilePage;