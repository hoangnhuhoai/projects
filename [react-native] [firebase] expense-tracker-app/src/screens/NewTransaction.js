import React, { useState } from "react";
import {
  View as KeyboardAvodingView,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
import { AddTransaction } from "../components";
import {
  imageStorage,
  icons,
  images,
  COLORS,
  FONTS,
  SIZES,
} from "../constants";
import { v4 as uuid } from "uuid";
import { auth, db, colRef } from "../../firebase";
import { isNull } from "lodash";

const NewTransaction = () => {

  const [items, setItems] = useState([
    {
      id: uuid(),
      description: "",
      amount: null,
      category: null,
      type: null,
      date: [],
    },
  ]);

  // Flag true if user is currently editing an item
  const [editStatus, editStatusChange] = useState(false);

  const addTransactionAlert = (description, amount, category, type, date) => {
    if (!description || amount == null) {
      Alert.alert(
        "Alert",
        "Please check your input",
        [
          {
            text: "OK",
            style: "cancel",
          },
        ],
        { cancelable: true }
      );
    } else {
      setItems((prevItems) => {
        return [
          {
            id: uuid(),
            description: prevItems.description,
            amount: prevItems.amount,
            category: prevItems.category,
            type: prevItems.type,
            date: prevItems.date,
          },
          ...prevItems,
        ];
      });
    }
  };

  return (
    <KeyboardAvodingView style={styles.container}>
      <AddTransaction
        customContainerStyle={{ ...styles.shadow }}
        addTransaction={addTransactionAlert}
      />
    </KeyboardAvodingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "15%",
    backgroundColor: COLORS.warmGray,
  },
});

export default NewTransaction;
