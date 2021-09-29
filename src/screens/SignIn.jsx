import React, { useContext } from "react";
import { Button, Text, View } from "react-native";
import { AuthContext } from "../context/auth/AuthContextProvider";

const SignIn = () => {
  const authContext = useContext(AuthContext);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 40 }}>Log In</Text>
      {/* <Button title="log me in" /> */}
      <Button title="log me in" onPress={() => authContext.signIn()} />
    </View>
  );
};

export default SignIn;
