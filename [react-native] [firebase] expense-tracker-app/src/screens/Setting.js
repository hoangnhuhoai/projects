import React, { useState, useEffect } from "react";
import {
  View,
  KeyboardAvoidingView,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import {
  imageStorage,
  icons,
  images,
  COLORS,
  FONTS,
  SIZES,
} from "../constants";
import { auth } from "../../firebase";

const Setting = ({ customContainerStyle }) => {
  const navigation = useNavigation();
  const handleSignout = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("LogIn");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.header}>Setting</Text>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={[
            styles.inputContainer,
            { customContainerStyle },
            styles.shadow,
          ]}
        >
          <View style={{ paddingBottom: SIZES.padding }}>
            <Text style={styles.inputLabel}>
              {" "}
              Hello, {auth.currentUser?.email}
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.btn, styles.btn2]}
            onPress={handleSignout}
          >
            <Text style={[styles.btnText, { color: COLORS.primary }]}>
              Sign Out
            </Text>
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
    paddingVertical: SIZES.padding * 1.2,
    margin: SIZES.base * 0.7,
    borderRadius: SIZES.radius * 1.5,
  },
  btn2: {
    borderColor: COLORS.primary,
    borderWidth: 3,
    color: COLORS.black,
    backgroundColor: COLORS.white,
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
  container: {
    flex: 1,
    paddingTop: "20%",
    backgroundColor: COLORS.warmGray,
  },
  textInput: {
    paddingBottom: SIZES.padding,
  },
});

export default Setting;
