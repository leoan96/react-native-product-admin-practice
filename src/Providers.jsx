import React from "react";
import AuthContextProvider from "./context/auth/AuthContextProvider";
import Routes from "./Routes";

export const Providers = () => {
  return (
    <AuthContextProvider>
      <Routes />
    </AuthContextProvider>
  );
};
