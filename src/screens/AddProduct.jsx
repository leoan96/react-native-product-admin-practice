import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { productTypeValues } from "../constants/productType";

import CustomModal from "../components/CustomModal";

const AddProduct = ({ navigation, route }) => {
  const [productName, setProductName] = useState("");
  const [productCode, setProductCode] = useState("");
  const [productType, setProductType] = useState("apparel");
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onDateChangeHandler = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const onButtonPressHandler = async () => {
    const newProduct = {
      product_code: productCode,
      product_name: productName,
      product_type: productType,
      date: date.toISOString().split("T")[0],
    };
    try {
      await fetch("http://127.0.0.1:3001", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });
      setProductName("");
      setProductCode("");
      setProductType("apparel");
      setDate(new Date());
      setIsModalOpen(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView>
      {/* <CustomModal /> */}
      <Modal visible={isModalOpen} animationType="slide" transparent={true}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(52, 52, 52, 0.8)",
            height: "100%",
          }}
        >
          <View
            style={{
              padding: "6%",
              backgroundColor: "lightgrey",
              height: "23%",
              width: "75%",
            }}
          >
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
              <Text
                style={{ fontWeight: "bold", fontSize: 35, paddingLeft: "4%" }}
              >
                Notice
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  paddingLeft: "4%",
                  paddingBottom: "10%",
                }}
              >
                Product Added
              </Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <Pressable
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    paddingHorizontal: 32,
                    borderRadius: 15,
                    backgroundColor: "grey",
                  }}
                  onPress={() => setIsModalOpen((prevState) => !prevState)}
                >
                  <Text style={{ color: "blue", fontSize: 30 }}>Cancel</Text>
                </Pressable>
                <Pressable
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    paddingHorizontal: 32,
                    borderRadius: 15,
                    backgroundColor: "lightblue",
                  }}
                  onPress={() => setIsModalOpen((prevState) => !prevState)}
                >
                  <Text style={{ color: "white", fontSize: 30 }}>Ok</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.header}>
        <Text style={styles.headerText}>Add Product</Text>
      </View>
      <View style={styles.container}>
        <View>
          <Text style={styles.label}>Product Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="name"
            onChangeText={setProductName}
            value={productName}
          />
        </View>
        <View>
          <Text style={styles.label}>Product Code:</Text>
          <TextInput
            style={styles.input}
            placeholder="code"
            onChangeText={setProductCode}
            value={productCode}
          />
        </View>
        <View>
          <Text style={styles.label}>Product Type:</Text>
          <Picker
            selectedValue={productType}
            onValueChange={(itemValue, itemIndex) => setProductType(itemValue)}
          >
            {productTypeValues.map((type) => (
              <Picker.Item
                key={type.value}
                label={type.label}
                value={type.value}
              />
            ))}
          </Picker>
        </View>
        <View>
          <Text style={styles.label}>Date:</Text>
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onDateChangeHandler}
          />
        </View>
        <View
          style={{
            width: `100%`,
            marginTop: 20,
            alignItems: "flex-start",
          }}
        >
          <TouchableOpacity>
            <Button title="Add Product" onPress={onButtonPressHandler} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddProduct;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
    paddingLeft: 40,
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
  label: {
    paddingBottom: 10,
    fontSize: 20,
  },
  input: {
    height: 40,
    marginBottom: 35,
    borderWidth: 1,
    padding: 14,
    width: 335,
  },
});
