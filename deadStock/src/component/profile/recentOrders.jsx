import { Typography, Box, Button } from "@mui/material";
import { useState } from "react";
import SectionCard from "../common/sectionCard";
import OrderCard from "./orderCard";

const RecentOrders = () => {
  const [showAll, setShowAll] = useState(false);

  const orders = [
    {
      title: 'Nike Dunk Low "Panda"',
      size: "10 US",
      date: "Oct 24, 2023",
      price: "250",
      status: "Delivered",
    },
    {
      title: "Supreme Box Logo Tee",
      size: "L",
      date: "Oct 20, 2023",
      price: "120",
      status: "Shipped",
    },
    {
      title: "Nike Dunk Low Panda",
      size: "10 US",
      date: "Oct 24, 2023",
      price: "250",
      status: "Delivered",
    },
    {
      title: "Pant",
      size: "10 US",
      date: "Oct 24, 2025",
      price: "1000",
      status: "Delivered",
    },
  ];

  const visibleOrders = showAll ? orders : orders.slice(0, 3);

  return (
    <>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={1}
      >
        <Typography variant="h6">Orders</Typography>

        {orders.length > 3 && (
          <Button
            variant="text"
            size="small"
            onClick={() => setShowAll(!showAll)}
            sx={{ textTransform: "none" }}
          >
            {showAll ? "Show less" : "View all"}
          </Button>
        )}
      </Box>

      <SectionCard>
        {visibleOrders.map((order, index) => (
          <OrderCard key={index} {...order} />
        ))}
      </SectionCard>
    </>
  );
};

export default RecentOrders;
