import React, { createContext, useReducer } from "react";
import { authInitialState, authReducer } from "./auth-reducer";
import * as SecureStore from "expo-secure-store";

export const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState);

  const context = {
    state,
    dispatch,
    signIn: async (data) => {
      const token = "dummy-auth-token";
      //   await SecureStore.setItemAsync("userToken", token);
      dispatch({
        type: "SIGN_IN",
        token,
      });
    },
    signOut: async () => {
      await SecureStore.deleteItemAsync("userToken");
      dispatch({
        type: "SIGN_OUT",
        token: null,
      });
    },
    signUp: async (data) => {
      dispatch({
        type: "SIGN_UP",
        token: "dummy-auth-token",
      });
    },
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
