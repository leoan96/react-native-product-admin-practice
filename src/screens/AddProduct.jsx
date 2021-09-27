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

const AddProduct = ({ navigation, route }) => {
  const [productName, setProductName] = useState("");
  const [productCode, setProductCode] = useState("");
  const [productType, setProductType] = useState(null);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [modalVisible, setModalVisible] = useState(true);

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
    } catch (err) {
      console.log(err);
    }
  };

  const productTypeValues = [
    {
      label: "Apparel",
      value: "apparel",
    },
    {
      label: "Sporting",
      value: "sporting",
    },
    {
      label: "Health",
      value: "health",
    },
    {
      label: "Electronic",
      value: "electronic",
    },
    {
      label: "Outdoor",
      value: "outdoor",
    },
    {
      label: "Food",
      value: "food",
    },
  ];

  return (
    <SafeAreaView>
      {/* <View
        style={{
          paddingLeft: 40,
        }}
      >
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello World!</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View> */}
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
          />
        </View>
        <View>
          <Text style={styles.label}>Product Code:</Text>
          <TextInput
            style={styles.input}
            placeholder="code"
            onChangeText={setProductCode}
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
