import React, { useContext, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "./context/auth/AuthContextProvider";
import { ActivityIndicator, Text, View } from "react-native";
import * as SecureStore from "expo-secure-store";

import BottomTab from "./navigators/BottomTabNavigator";
import ProductDetails from "./components/ProductDetails";
import SignIn from "./screens/SignIn";

const Stack = createNativeStackNavigator();

const Routes = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    let userToken;
    const bootstrapAsync = async () => {
      try {
        userToken = await SecureStore.getItemAsync("userToken");
        await authContext.signIn();
        console.log(userToken);
        console.log(authContext);
      } catch (err) {
        console.log(err);
      }
      authContext.dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };
    bootstrapAsync();
  }, []);

  if (authContext.state.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text style={{ paddingTop: 20, paddingLeft: 15, fontSize: 20 }}>
          Loading...
        </Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {!authContext.state.userToken ? (
        <SignIn />
      ) : (
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={BottomTab}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ProductDetails"
            component={ProductDetails}
            options={{
              headerStyle: { backgroundColor: "darkslateblue", height: 100 },
              headerTintColor: "white",
            }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Routes;
