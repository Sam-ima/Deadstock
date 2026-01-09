import { Container } from "@mui/material";
import AddProductPage from "../component/addProduct/addProductPage";

const AuthPageMain = () => {
  return (
    <Container maxWidth="lg" sx={{ paddingTop: {xs:"50px",sm:"50px",md:"50px",lg:"60px"},
          paddingBottom: "0px",}}>
      <AddProductPage />
    </Container>
  );
};

export default AuthPageMain;
