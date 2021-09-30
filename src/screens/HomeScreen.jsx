import React, { useState, useEffect, useContext } from "react";
import { FontAwesome } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Pressable,
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
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>All Products</Text>
          <View style={styles.logoutView}>
            <Pressable onPress={signOutHandler}>
              <Text style={styles.logout}>Log Out</Text>
            </Pressable>
          </View>
        </View>
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.product_code}
        style={{
          marginBottom: 140,
        }}
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
  headerContainer: {
    paddingTop: 24,
    paddingLeft: "1.7%",
    paddingBottom: 20,
    marginTop: "8%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  headerText: {
    fontSize: 40,
    color: "#444",
  },
  logoutView: {
    marginTop: "4%",
  },
  logout: {
    color: "blue",
    fontSize: 20,
    fontWeight: "400",
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
