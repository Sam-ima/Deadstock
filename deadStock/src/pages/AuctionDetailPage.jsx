// import React, { useEffect, useState } from "react";
// import { Container, Box } from "@mui/material";
// import { useParams } from "react-router-dom";
// import { products } from "../component/data/products_data"; 
// import AuctionDetail from "../component/auctionDetai";

// const AuctionDetailPage = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const foundProduct = products.find((p) => p.id === parseInt(id));
//     setProduct(foundProduct);
//     setLoading(false);
//   }, [id]);

//   if (loading) {
//     return (
//       <Container
//         maxWidth
//         disableGutters
//         sx={{
//           paddingTop: "50px",
//           paddingBottom: "0px",
//           minHeight: "100vh",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <Box>Loading...</Box>
//       </Container>
//     );
//   }

//   if (!product) {
//     return (
//       <Container
//         maxWidth
//         disableGutters
//         sx={{
//           paddingTop: "50px",
//           paddingBottom: "0px",
//           minHeight: "100vh",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <Box>Product not found</Box>
//       </Container>
//     );
//   }

//   return (
//     <Container
//       maxWidth
//       disableGutters
//       sx={{
//         paddingTop: "50px",
//         paddingBottom: "0px",
//         minHeight: "100vh",
//       }}
//     >
//       <AuctionDetail product={product} />
//     </Container>
//   );
// };

// export default AuctionDetailPage;

import React from "react";
import { Container } from "@mui/material";
import AuctionDetail from "../component/auctionDetail/AuctionDetailPage.jsx";
const AuctionDetailPage = () => {
  return (
    <Container
      maxWidth
      disableGutters
      sx={
        {
          // backgroundColor: "#000000",
          paddingTop: {xs:"50px",sm:"50px",md:"50px",lg:"60px"},
          paddingBottom: "0px",
        }
      }
    >
      <AuctionDetail/>
    </Container>
  );
};
export default AuctionDetailPage;
