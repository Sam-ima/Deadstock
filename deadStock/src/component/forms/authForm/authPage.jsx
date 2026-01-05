import { useState } from "react";
import AuthContainer from "./authContainer";
import { AuthHeader } from "./authHeader";
import { RoleSelector } from "./roleSelector";
import { AuthForm } from "./authForm";

const AuthPage = () => {
  const [role, setRole] = useState("buyer");
  const [mode, setMode] = useState("login");

  return (
    <AuthContainer>
      <AuthHeader />
      <RoleSelector role={role} setRole={setRole} />
      <AuthForm mode={mode} setMode={setMode} role={role} />
    </AuthContainer>
  );
};

export default AuthPage;
