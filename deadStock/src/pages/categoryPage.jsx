import React from "react";
import { Container } from "@mui/material";
import Category from "../component/categoryPage/categoriesPage";
const CategoryPage = () => {
  return (
    <Container
      maxWidth
      disableGutters
      sx={
        {
          // backgroundColor: "#000000",
          padding: {xs:"30px 20px",sm:"40px 20px",md:"50px 40px",lg:"60px 0px"},
        }
      }
    >
      <Category/>
    </Container>
  );
};
export default CategoryPage;