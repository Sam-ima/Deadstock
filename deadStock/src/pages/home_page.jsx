// import React from 'react';
// // import Navbar from '../component/nav_bar';
// import HeroSection from '../component/hero_section';

// const Homepage = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
//       {/* <Navbar /> */}
//       <HeroSection />
      
//       {/* Additional sections can be added here */}
//       <section className="py-20 px-4">
//         <div className="max-w-7xl mx-auto">
//           <h2 className="text-3xl font-bold text-white text-center mb-12">
//             Featured Categories
//           </h2>
//           {/* Categories grid will go here */}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Homepage;




import React from "react";
import Navbar from "../component/nav_bar";
import Hero from "../component/hero_section";
// import DealsSection from "../component/section/DealsSection";
// import CategoryBidding from "../component/CategoryBidding";
import BiddingSection from "../component/section/bidding_section";
// import FeaturedItems from "../component/featured_items";

import styles from "../component/style";

const DeadstockMarketplace = () => {
  return (
    <div style={styles.container}>
      <Navbar />
      <Hero />
      {/* <DealsSection /> */}
       {/* <CategoryBidding /> */}
      <BiddingSection />
      {/* <FeaturedItems /> */}

    </div>
  );
};

export default DeadstockMarketplace;
