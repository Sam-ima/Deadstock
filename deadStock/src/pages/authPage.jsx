import { Container } from "@mui/material";
import AuthPage from "../component/forms/authForm/authPage";

const AuthPageMain = () => {
  return (
    <Container maxWidth="lg" sx={{minHeight:"100vh"}}>
      <AuthPage />
    </Container>
  );
};

export default AuthPageMain;
