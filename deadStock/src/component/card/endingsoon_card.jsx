// import React, { useState } from "react";
// import products from "../data/products_data";
// import styles from "../style";

// const EndingSoonCards = () => {
//   const [hoveredCard, setHoveredCard] = useState(null);

//   return (
//     <div style={styles.rightCards}>
//       <h3 style={styles.cardsSectionTitle}>Ending Soon</h3>

//       <div style={styles.cardsGrid}>
//         {products.map((item, i) => (
//           <div
//             key={i}
//             style={{
//               ...styles.productCard,
//               ...(hoveredCard === i ? styles.cardHover : {}),
//             }}
//             onMouseEnter={() => setHoveredCard(i)}
//             onMouseLeave={() => setHoveredCard(null)}
//           >
//             <img src={item.img} alt={item.name} style={styles.productImage} />
//             <div style={styles.cardOverlay}></div>

//             <div style={styles.productName}>{item.name}</div>
//             <div style={styles.priceTag}>{item.price}</div>

//             <div style={styles.timeTag}>
//               <span>Time Left</span>
//               <span style={styles.timeValue}>{item.time}</span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default EndingSoonCards;



import React, { useState } from "react";
import products from "../data/products_data";
import styles from "../style";
import AuctionProductCard from "./auction_product_card";

const EndingSoonCards = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div style={styles.rightCards}>
      <h3 style={styles.cardsSectionTitle}>Ending Soon</h3>

      <div style={styles.cardsGrid}>
        {products.map((item, i) => (
          <AuctionProductCard
            key={i}
            product={item}
            styles={styles}
            hovered={hoveredCard === i}
            onMouseEnter={() => setHoveredCard(i)}
            onMouseLeave={() => setHoveredCard(null)}
          />
        ))}
      </div>
    </div>
  );
};

export default EndingSoonCards;
