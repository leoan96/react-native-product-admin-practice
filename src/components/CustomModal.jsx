import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Modal } from "react-native";

const CustomModal = ({ visible, setIsModalOpen, title, details }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.container}>
        <View style={styles.layout}>
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.details}>{details}</Text>
            <View style={styles.buttonContainer}>
              <Pressable
                style={styles.cancelButton}
                onPress={() => setIsModalOpen(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={styles.okButton}
                onPress={() => setIsModalOpen(false)}
              >
                <Text style={styles.okText}>Ok</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(52, 52, 52, 0.8)",
    height: "100%",
  },
  layout: {
    padding: "6%",
    backgroundColor: "#DCDCDC",
    height: "25%",
    width: "80%",
  },
  title: {
    fontWeight: "bold",
    fontSize: 35,
    paddingLeft: "4%",
  },
  details: {
    fontSize: 20,
    paddingLeft: "4%",
    paddingBottom: "10%",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "45%",
    width: "45%",
    borderRadius: 12,
    backgroundColor: "#F5F5F5",
  },
  cancelText: {
    color: "blue",
    fontSize: 30,
  },
  okButton: {
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "45%",
    width: "45%",
    borderRadius: 12,
    backgroundColor: "#24A0ED",
  },
  okText: {
    color: "white",
    fontSize: 30,
  },
});
