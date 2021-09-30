import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { productTypeValues } from "../constants/productType";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomModal from "./CustomModal";

const ProductDetails = ({ navigation, route }) => {
  const [productName, setProductName] = useState("");
  const [productCode, setProductCode] = useState("");
  const [productType, setProductType] = useState(null);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:3001/${route.params.productCode}`
        );
        const data = await response.json();
        setProductName(data.product_name);
        setProductCode(data.product_code);
        setProductType(data.product_type);
        setDate(new Date(data.date));
      } catch (err) {
        console.log(err);
      }
    };
    getProductDetails();
  }, []);

  const onDateChangeHandler = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const onButtonPressHandler = async () => {
    const updateProduct = {
      product_code: productCode,
      product_name: productName,
      product_type: productType,
      date: date.toISOString().split("T")[0],
    };

    try {
      await fetch(`http://127.0.0.1:3001/${route.params.productCode}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateProduct),
      });
      setIsModalOpen(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView>
      <CustomModal
        visible={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        title="Notice"
        details="Product Edited"
      />
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
            <Button title="Edit Product" onPress={onButtonPressHandler} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 40,
    maxWidth: "90%",
    marginTop: -10,
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
