import { Typography } from "@mui/material";
import SectionCard from "../../common/sectionCard";
import OrderCard from "./orderCard";

const RecentOrders = () => {
  return (
    <>
      <Typography variant="h6" mb={1}>
        Recent Orders
      </Typography>

      <SectionCard>
        <OrderCard
          title='Nike Dunk Low "Panda"'
          size="10 US"
          date="Oct 24, 2023"
          price="250"
          status="Delivered"
        />
        <OrderCard
          title="Supreme Box Logo Tee"
          size="L"
          date="Oct 20, 2023"
          price="120"
          status="Shipped"
        />
         <OrderCard
        title="Nike Dunk Low Panda"
        size="10 US"
        date="Oct 24, 2023"
        price="250"
        status="Delivered"
      />
      </SectionCard>
    </>
  );
};

export default RecentOrders;
