import React from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  LogBox,
} from "react-native";

import {
  imageStorage,
  icons,
  images,
  COLORS,
  FONTS,
  SIZES,
} from "../constants";
import {
  TextSize,
  VictoryScatter,
  VictoryLine,
  VictoryChart,
  VictoryAxis,
  VictoryLabel,
  VictoryArea,
  VictoryBar,
} from "victory-native";
import { VictoryCustomTheme } from "../../styles";
// import { getPixelSizeForLayoutSize } from "react-native/Libraries/Utilities/PixelRatio";
// import { tintColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

const LineChart = ({ customContainerStyle, lineChart, monthName }) => {
  React.useEffect(() => {
    LogBox.ignoreAllLogs();
    // LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  }, []);

  const renderLineChart = () => (
    <TouchableOpacity
      style={{
        alignItems: "center",
        marginHorizontal: SIZES.radius,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.white,
      }}
    >
      <View>
        <VictoryChart
          theme={VictoryCustomTheme}
          height={240}
          width={(SIZES.width * 4) / 5}
          style={{
            background: { fill: COLORS.white },
          }}
        >
          <VictoryArea
            style={{
              data: {
                fill: COLORS.secondary,
                fillOpacity: 0.7,
                stroke: COLORS.primary,
                strokeWidth: 3,
              },
            }}
            data={lineChart}
          />
          <VictoryAxis offsetY={57} tickValues={monthName} />
          <VictoryAxis dependentAxis offsetX={48} />
        </VictoryChart>
        <Text style={{textAlign: "center", color: COLORS.black}}>Balance in latest 5 months</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        marginTop: SIZES.radius,
        paddingTop: SIZES.padding,
        borderRadius: SIZES.radius,
        // backgroundColor: COLORS.white,
        backgroundColor: COLORS.white,
      }}
    >
      {renderLineChart()}
    </View>
  );
};

export default LineChart;
