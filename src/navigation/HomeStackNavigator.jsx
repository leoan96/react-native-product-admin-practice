import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import ProductDetails from "../components/ProductDetails";

const Stack = createNativeStackNavigator();

const BottomTab = () => {
  return (
    <Stack.Navigator initialRouteName="AllProducts">
      <Stack.Screen
        name="AllProducts"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{
          headerStyle: { backgroundColor: "darkslateblue", height: 100 },
          headerTintColor: "white",
          title: "Product Details",
        }}
      />
    </Stack.Navigator>
  );
};

export default BottomTab;
