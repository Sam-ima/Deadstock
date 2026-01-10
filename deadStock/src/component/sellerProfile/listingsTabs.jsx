import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";
import ListingCard from "./ListingCard";
import SellerData from "../data/sellerData";

const ListingsTabs = () => {
  const [tab, setTab] = useState("selling");

  return (
    <>
<Box display="flex" mt={4}>
  <ToggleButtonGroup
    value={tab}
    exclusive
    onChange={(e, v) => v && setTab(v)}
    sx={{
      gap: 2,               
      "& .MuiToggleButton-root": {
        borderRadius: "8px !important", 
        border: "1px solid #ddd",
      },
    }}
  >
    <ToggleButton value="selling">Selling</ToggleButton>
    <ToggleButton value="sold">Sold</ToggleButton>
    <ToggleButton value="">Add Product</ToggleButton>
  </ToggleButtonGroup>
</Box>


      <Box display="grid" gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }} gap={2} mt={2}>
        {SellerData[tab].map((item) => (
          <ListingCard
            key={item.id}
            title={item.title}
            price={item.price}
            img={item.img}
          />
        ))}
      </Box>
    </>
  );
};

export default ListingsTabs;
