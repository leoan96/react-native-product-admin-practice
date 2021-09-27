import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";

import AddProduct from "./src/screens/AddProduct";
import HomeScreen from "./src/screens/HomeScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: () => <FontAwesome name={"home"} size={24} />,
            title: "All Products",
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="AddProduct"
          component={AddProduct}
          options={{
            tabBarLabel: "Add Product",
            tabBarIcon: () => <FontAwesome name={"cart-plus"} size={24} />,
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

/*
Stack Navigator

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

return (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AddProduct" component={AddProduct} />
    </Stack.Navigator>
  </NavigationContainer>
);

*/
