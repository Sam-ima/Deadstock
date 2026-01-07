import React from "react";
import { Container } from "@mui/material";
import ProductDetail from "../component/categoryPage/productDetail/productDetailPage";
const CategoryPage = () => {
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
      <ProductDetail/>
    </Container>
  );
};
export default CategoryPage;