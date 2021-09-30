import React from "react";
import { Image, StyleSheet } from "react-native";

const Logo = () => {
  return (
    <Image
      source={require("../../assets/logo.png")}
      style={styles.image}
    ></Image>
  );
};

export default Logo;

const styles = StyleSheet.create({
  image: {
    height: 110,
    width: 110,
    // height: "80%",
    // width: "80%",
    marginTop: "-40%",
  },
});
