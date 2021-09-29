import React, { useContext } from "react";
import { Button, Text, View } from "react-native";
import Background from "../components/Background";
import Logo from "../components/Logo";
import { AuthContext } from "../context/auth/AuthContextProvider";

const SignIn = () => {
  const authContext = useContext(AuthContext);

  return (
    <Background>
      <View>
        <Logo />
        <View style={{ marginTop: "20%" }}>
          <Text style={{ fontSize: 40 }}>Log In</Text>
          <Button title="log me in" onPress={() => authContext.signIn()} />
        </View>
      </View>
    </Background>
  );
};

export default SignIn;
