import React, { useState, useEffect, useContext } from "react";
import { FontAwesome } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Button,
} from "react-native";
import { useIsFocused } from "@react-navigation/core";
import { AuthContext } from "../context/auth/AuthContextProvider";

const HomeScreen = ({ navigation, route }) => {
  const [products, setProducts] = useState([]);
  const isFocused = useIsFocused();
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        if (isFocused) {
          const response = await fetch("http://127.0.0.1:3001");
          const data = await response.json();
          setProducts(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getAllProducts();
  }, [isFocused]);

  const signOutHandler = async () => {
    await authContext.signOut();
  };

  const deleteHandler = async (product_code) => {
    try {
      await fetch(`http://127.0.0.1:3001/${product_code}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const updatedProductList = products.filter(
        (product) => product.product_code !== product_code
      );
      setProducts(updatedProductList);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Text style={styles.headerText}>All Products</Text>
        <Button title="Log out" onPress={signOutHandler} />
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.product_code}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity style={styles.itemView}>
              <Text
                style={styles.itemText}
                onPress={() =>
                  navigation.navigate("ProductDetails", {
                    productCode: item.product_code,
                  })
                }
              >
                {item.product_name}
              </Text>
              <FontAwesome
                name={"times"}
                size={17}
                onPress={() => deleteHandler(item.product_code)}
              />
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    paddingTop: 24,
    paddingLeft: 40,
    paddingBottom: 20,
  },
  headerText: {
    fontSize: 40,
    color: "#444",
  },
  itemView: {
    paddingTop: 7,
    paddingLeft: 40,
    paddingRight: 40,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemText: {
    fontSize: 20,
    color: "#444",
    paddingBottom: 5,
  },
});
