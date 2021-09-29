import React from "react";
import {
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";
import { theme } from "../core/theme";

const Background = ({ children }) => {
  return (
    <ImageBackground
      source={require("../../assets/background_dot.png")}
      resizeMode="repeat"
      style={styles.background}
    >
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        {children}
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default Background;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    maxWidth: "90%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    flex: 1,
    width: "100%",
    backgroundColor: theme.colors.surface,
  },
});
