import React from "react";
import { View, Text } from "react-native";

const ProductDetails = ({ navigation, route }) => {
  return (
    <View>
      <Text>Product Details: {route}</Text>
    </View>
  );
};

export default ProductDetails;
