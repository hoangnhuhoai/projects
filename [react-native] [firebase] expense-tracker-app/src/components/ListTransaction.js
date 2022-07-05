import React from "react";
import { View, Text, FlatList, Image, LogBox, StyleSheet } from "react-native";

import {
  imageStorage,
  icons,
  images,
  COLORS,
  FONTS,
  SIZES,
} from "../constants";
import { TextSize } from "victory-native";
import { getPixelSizeForLayoutSize } from "react-native/Libraries/Utilities/PixelRatio";
import { tintColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import { ScrollView } from "react-native-gesture-handler";

const ListTransaction = ({ customContainerStyle, history }) => {
  React.useEffect(() => {
    LogBox.ignoreAllLogs();
  }, []);

  const renderItem = ({ item }) => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: SIZES.padding,
      }}
    >
      <Image
        source={icons.transaction}
        style={{
          width: 30,
          height: 30,
          tintColor: item.type == "I" ? COLORS.green : COLORS.red,
        }}
      />
      {/* date: Date({item.date}.seconds*1000), */}

      <View style={{ flex: 1, marginLeft: SIZES.radius }}>
        <Text style={{ color: COLORS.black, ...FONTS.body4 }}>
          {item.description}
        </Text>
        <View style={{ marginRight: SIZES.radius }}>
          <Text style={{ color: COLORS.gray, ...FONTS.body4 }}>
            {item.date}
          </Text>
        </View>
      </View>

      <View
        style={{ flexDirection: "row", height: "100%", alignItems: "center" }}
      >
        <Text
          style={{
            ...FONTS.body4,
            color: item.type == "I" ? COLORS.green : COLORS.red,
          }}
        >
          ${item.amount}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={{ backgroundColor: COLORS.warmGray }}>
      <Text
        style={styles.header}
      >
        History
      </Text>
      <View
        style={[
          styles.inputContainer,
          { customContainerStyle },
          styles.shadow,
        ]}
      >
        <FlatList
          contentContainerStyle={{ marginTop: SIZES.base }}
          data={history}
          keyExtractor={(item) => "${item.id}"}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => {
            return (
              <View
                style={{
                  width: "100%",
                  height: 1,
                  backgroundColor: COLORS.lightGray1,
                }}
              ></View>
            );
          }}
        />
      </View>
    </View>
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

export default ListTransaction;
