import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";

import { icons, images, COLORS, FONTS, SIZES } from "../constants";
import { ListTransaction } from "../components";
import { auth, db } from "../../firebase";
import {
  doc,
  collection,
  Timestamp,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import firebase from "firebase/compat";

const History = ({ navigation }) => {
  const [transactionList, setTransactionList] = useState([]);

  useEffect(() => {
    // collection ref
    const colRef = collection(db, auth.currentUser.uid);

    // queries
    const q = query(colRef, orderBy("createdAt", "desc"));
    // real time collection data
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let listRef = [];
      snapshot.docs.forEach((doc) => {
        listRef.push({
          ...doc.data(),
          id: doc.id,
          description: doc.data().description,
          amount: doc.data().amount,
          type: doc.data().type,
          category: doc.data().category,
          // date: Date(doc.data().createdAt * 1000),
          date: String(
            doc.data({ serverTimestamps: "estimate" }).createdAt.toDate()
          ),
          // date: new Date(doc.data().createdAt.seconds *1000)
        });
      });
      setTransactionList(listRef);
    });
    return unsubscribe;
  }, []);

  function renderTransactionHistory() {
    return (
      <ListTransaction
        customContainerStyle={{ ...styles.shadow }}
        history={transactionList}
      />
    );
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ flex: 1, paddingBottom: 80 }}>
        {renderTransactionHistory()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: "15%",
    backgroundColor: COLORS.warmGray,
    paddingBottom: 90,
  },
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
});

export default History;
