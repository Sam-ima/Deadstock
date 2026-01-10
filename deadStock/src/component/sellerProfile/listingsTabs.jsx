import { Box, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useState } from "react";
import ListingCard from "./ListingCard";
import SellerData from "../data/sellerData";

const ListingsTabs = () => {
  const [tab, setTab] = useState("selling");

  return (
    <>
      {/* TABS */}
      <Box
        mt={4}
        display="flex"
        justifyContent="center"
      >
        <ToggleButtonGroup
          value={tab}
          exclusive
          onChange={(_, v) => v && setTab(v)}
          sx={{
            bgcolor: "#F5F7F6",
            p: 0.7,
            borderRadius: "999px",
            gap: 1,
            // boxShadow: "0 8px 20px rgba(0,0,0,0.08)",

            "& .MuiToggleButton-root": {
              border: "none",
              px: 3,
              py: 1.2,
              borderRadius: "999px !important",
              fontWeight: 600,
              textTransform: "none",
              color: "#555",
              transition: "all 0.3s ease",
            },

            "& .Mui-selected": {
              color: "#fff !important",
              background:
                "linear-gradient(135deg, #2e7d32, #ff8f00)",
              boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
              transform: "scale(1.05)",
            },

            "& .MuiToggleButton-root:hover": {
              bgcolor: "#E8F5E9",
            },
          }}
        >
          <ToggleButton value="selling">
            🟢 Selling
          </ToggleButton>

          <ToggleButton value="sold">
            🟠 Sold
          </ToggleButton>

          <ToggleButton value="add">
            ➕ Add Product
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* LISTINGS */}
      <Box
        mt={4}
        display="grid"
        gridTemplateColumns={{
          xs: "1fr",
          sm: "2fr 1fr",
          md: "3fr 3fr 3fr",
        }}
        gap={3}
        sx={{
          animation: "fadeSlide 0.5s ease",
        }}
      >
        {SellerData[tab]?.map((item) => (
          <Box
            key={item.id}
            sx={{
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "translateY(-6px)",
              },
            }}
          >
            <ListingCard
              title={item.title}
              price={item.price}
              img={item.img}
            />
          </Box>
        ))}
      </Box>

      {/* SIMPLE KEYFRAME */}
      <style>
        {`
          @keyframes fadeSlide {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </>
  );
};

export default ListingsTabs;
