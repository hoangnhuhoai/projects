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
  LogBox,
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

const LogIn = ({ customContainerStyle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  LogBox.ignoreLogs(["Setting a timer"]);

  const navigation = useNavigation();
  useEffect(() => {
    const unsubscriber = auth.onAuthStateChanged((user) => {
      if (user) navigation.navigate("Home");
    });
    return unsubscriber;
  }, []);

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with:", user.email);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.header}>Welcome</Text>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={[
            styles.inputContainer,
            { customContainerStyle },
            styles.shadow,
          ]}
        >
          <View style={{ paddingBottom: SIZES.padding }}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              placeholder="johndoe@gmail.com"
              placeholderTextColor={COLORS.lightGray}
              style={styles.input}
              value={email}
              onChangeText={(text) => setEmail(text)}
              underlineColorAndroid={COLORS.lightGray}
              style={styles.textInput}
            />
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              placeholder="*********"
              placeholderTextColor={COLORS.lightGray}
              style={styles.input}
              onChangeText={(text) => setPassword(text)}
              value={password}
              keyboardType="numeric"
              underlineColorAndroid={COLORS.lightGray}
              secureTextEntry
            />
          </View>

          <TouchableOpacity style={styles.btn} onPress={handleLogin}>
            <Text style={styles.btnText}>Log in</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, styles.btn2]}
            onPress={() => navigation.push("SignUp")}
          >
            <Text style={[styles.btnText, { color: COLORS.black }]}>
              Don't have an account? Sign up
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
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.padding * 1.2,
    margin: SIZES.base * 0.7,
    borderRadius: SIZES.radius * 1.5,
  },
  btn2: {
    borderColor: COLORS.black,
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

export default LogIn;
