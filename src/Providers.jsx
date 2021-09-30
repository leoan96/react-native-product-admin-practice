import React from "react";
import AuthContextProvider from "./context/auth/AuthContextProvider";
import Routes from "./navigation/Routes";

export const Providers = () => {
  return (
    <AuthContextProvider>
      <Routes />
    </AuthContextProvider>
  );
};
