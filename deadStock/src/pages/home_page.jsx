import React from "react";
import { Box } from "@mui/material";

// import Navbar from "../component/nav_bar";
import Hero from "../component/hero";
import BiddingSection from "../component/section/bidding_section";
import BrowseByCategory from "../component/browse_category";
import HowItWorks from "../component/howitworks";

import styles from "../component/style";

const DeadstockMarketplace = () => {
  return (
    <Box sx={styles.container}>
      {/* <Navbar /> */}
      <Hero />
      <BrowseByCategory />  
      <BiddingSection />
       <HowItWorks />
       
    </Box>
  );
};

export default DeadstockMarketplace;
