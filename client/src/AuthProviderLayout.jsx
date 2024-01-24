import React from "react";
import { AuthContextProvider } from "./contexts/AuthContext";
import { Outlet } from "react-router-dom";

const AuthProviderLayout = () => {
  return (
    <AuthContextProvider>
      <Outlet />
    </AuthContextProvider>
  );
};

export default AuthProviderLayout;
