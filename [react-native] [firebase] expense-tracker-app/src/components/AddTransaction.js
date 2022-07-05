import React, { useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import {
  imageStorage,
  icons,
  images,
  COLORS,
  FONTS,
  SIZES,
} from "../constants";
import { Picker } from "@react-native-picker/picker";
import { auth, db, addTransactionFirebase } from "../../firebase";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import firebase from "firebase/compat";

const AddTransaction = ({ customContainerStyle, addTransaction }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = React.useState(null);
  const [category, setCategory] = useState("food");
  const [type, setType] = useState("E");
  const [date, setDate] = useState("");

  return (
    <KeyboardAvoidingView style={{ backgroundColor: COLORS.warmGray }}>
      <Text style={styles.header}>New Transaction</Text>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={[
            styles.inputContainer,
            { customContainerStyle },
            styles.shadow,
          ]}
        >
          <Text style={styles.inputLabel}>Description</Text>
          <TextInput
            placeholder="puppy, apple,..."
            placeholderTextColor={COLORS.lightGray}
            style={styles.input}
            value={description}
            onChangeText={(text) => setDescription(text)}
            underlineColorAndroid={COLORS.lightGray}
          />
          <Text style={styles.inputLabel}>Value</Text>
          <TextInput
            placeholder="100, 200,..."
            placeholderTextColor={COLORS.lightGray}
            style={styles.input}
            value={amount}
            onChangeText={(text) => setAmount(text)}
            keyboardType="numeric"
            underlineColorAndroid={COLORS.lightGray}
          />
          <Text style={styles.inputLabel}>Type</Text>
          <Picker
            selectedValue={type}
            onValueChange={(itemValue, itemIndex) => setType(itemValue)}
            mode="dropdown"
          >
            <Picker.Item label="Expense" value="E" />
            <Picker.Item label="Income" value="I" />
          </Picker>
          <Text style={styles.inputLabel}>Categories</Text>
          <Picker
            selectedValue={category}
            onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
            mode="dropdown"
          >
            <Picker.Item label="Food" value="food" />
            <Picker.Item label="Medicine" value="medicine" />
            <Picker.Item label="Clothes" value="clothes" />
            <Picker.Item label="Gift" value="gift" />
            <Picker.Item label="Rent" value="rent" />
            <Picker.Item label="Pet" value="pet" />
          </Picker>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              addTransaction(description, amount, category, type, date);
              setDescription("");
              setAmount(null);
              addDoc(collection(db, auth.currentUser.uid), {
                description: description,
                amount: amount,
                category: String(category),
                type: String(type),
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
              });
            }}
          >
            <Text style={styles.btnText}>Save</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 6,
  },
  screenLabel: {
    ...FONTS.h2,
    color: COLORS.black,
    paddingBottom: SIZES.padding * 2,
  },
  inputLabel: {
    ...FONTS.body4,
    color: COLORS.black,
    padding: SIZES.base,
  },
  input: {
    ...FONTS.body4,
    color: COLORS.black,
    padding: SIZES.base,
  },
  btn: {
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.padding * 1.2,
    margin: SIZES.base,
    borderRadius: SIZES.radius * 1.5,
  },
  btnText: {
    color: COLORS.white,
    ...FONTS.h4,
    textAlign: "center",
  },
  inputContainer: {
    margin: SIZES.padding,
    padding: SIZES.padding * 2,
    borderRadius: SIZES.radius * 2,
    backgroundColor: COLORS.white,
  },
  header: {
    ...FONTS.h2,
    paddingBottom: SIZES.padding,
    color: COLORS.black,
    textAlign: "center",
  },
});

export default AddTransaction;
