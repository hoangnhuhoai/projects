import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
  primary: "#EA8C70", // Dark orange
  secondary: "#F2B98B", // Light orange
  warmGray: "#F8F7F5", // screen background color
  white: "#fff",
  black: "#707070",
  green: "#81EA70",
  red: "#EA7070",
  gray: "#A6ADB8",
  lightGray: "#dbdbdb",
  lightGray1: "#f5f6fa",
};

export const chartColors = [
  "#cd6155",
  "#d98880",
  "#aed6f1",
  "#85c1e9",
  "#f7dc6f",
  "#a9dfbf",
  "#a2d9ce",
  "#7fb3d5",
  "#5499c7",
  "#e6b0aa",
  "#af7ac5",
  "#c39bd3",
  "#8e44ad",
  "#a9dfbf",
  "#f9e79f",
  "#e59866",
  "#f7dc6f",
  "#7fb3d5",
  "#a9cce3",
  "#f5cba7",
  "#fad7a0",
  "#f8c471",
  "#f4d03f",
  "#f5cba7",
];

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 20,
  padding: 15,

  // font sizes
  h1: 30,
  h2: 25,
  h3: 20,
  h4: 15,
  body1: 30,
  body2: 25,
  body3: 20,
  body4: 15,
  body5: 10,

  // app dimensions
  width,
  height,
};
export const FONTS = {
  h1: { fontFamily: "Roboto-Black", fontSize: SIZES.h1, lineHeight: 36 },
  h2: { fontFamily: "Roboto-Bold", fontSize: SIZES.h2, lineHeight: 30 },
  h3: { fontFamily: "Roboto-Bold", fontSize: SIZES.h3, lineHeight: 22 },
  h4: { fontFamily: "Roboto-Bold", fontSize: SIZES.h4, lineHeight: 22 },
  body1: {
    fontFamily: "Roboto-Semibold",
    fontSize: SIZES.body1,
    lineHeight: 36,
  },
  body2: {
    fontFamily: "Roboto-Semibold",
    fontSize: SIZES.body2,
    lineHeight: 30,
  },
  body3: {
    fontFamily: "Roboto-Semibold",
    fontSize: SIZES.body3,
    lineHeight: 22,
  },
  body4: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.body4,
    lineHeight: 22,
  },
  body5: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.body5,
    lineHeight: 22,
  },
};

const appTheme = { COLORS, SIZES, FONTS, chartColors, chartColors };

export default appTheme;
