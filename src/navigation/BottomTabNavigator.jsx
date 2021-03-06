import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";

import AddProduct from "../screens/AddProduct";
import HomeStackNavigator from "./HomeStackNavigator";

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
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
  );
};

export default BottomTab;
