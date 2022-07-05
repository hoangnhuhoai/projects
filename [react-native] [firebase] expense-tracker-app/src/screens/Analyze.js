import React, { useRef, useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Animated,
  Platform,
} from "react-native";
import { VictoryPie, VictoryLabel } from "victory-native";
import { Svg } from "react-native-svg";
import LinearGradient from "react-native-linear-gradient";
import { COLORS, FONTS, SIZES, icons, images, chartColors } from "../constants";
import { a } from "caniuse-lite/dist/lib/supported";
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

const Analyze = ({ navigation }) => {
  const [listIncome, setListIncome] = useState([]);
  const [listExpense, setListExpense] = useState([]);
  const [categoriesExpense, setCategoriesExpense] = React.useState([]);
  const [categoriesIncome, setCategoriesIncome] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState(null);

  var groupBy = function (xs, key) {
    const newKeys = [];
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  useEffect(() => {
    // collection ref
    const colRef = collection(db, auth.currentUser.uid);
    
    // queries income
    const qIncome = query(colRef, where("type", "==", "I"));
    // queries expense
    const qExpense = query(colRef, where("type", "==", "E"));
    // real time collection data income
    const unsubscribeIncome = onSnapshot(qIncome, (snapshot) => {
      let listIncomeRef = [];
      snapshot.docs.forEach((doc) => {
        listIncomeRef.push({
          id: doc.id,
          amount: doc.data().amount,
          type: doc.data().type,
          category: doc.data().category,
        });
      });
      listIncomeRef = groupBy(listIncomeRef, "category");
      setListIncome(listIncomeRef);

      var listCategoriesIncome = [];
      let i = 1;
      Object.keys(listIncomeRef).forEach((key) => {
        var obj = {};
        obj["id"] = String(i);
        i = i + 1;
        obj["name"] = key;
        obj["type"] = "I";
        obj["color"] =
          chartColors[Math.floor(Math.random() * chartColors.length)];
        obj["transactions"] = JSON.parse(JSON.stringify(listIncomeRef[key]));
        listCategoriesIncome.push(obj);
      });
      setCategoriesIncome(listCategoriesIncome);
      
    });

    // real time collection data expense
    const unsubscribeExpense = onSnapshot(qExpense, (snapshot) => {
      let listExpenseRef = [];
      snapshot.docs.forEach((doc) => {
        listExpenseRef.push({
          id: doc.id,
          amount: doc.data().amount,
          type: doc.data().type,
          category: doc.data().category,
        });
      });
      listExpenseRef = groupBy(listExpenseRef, "category");
      setListExpense(listExpenseRef);

      var listCategoriesExpense = [];
      let i = 1;
      Object.keys(listExpenseRef).forEach((key) => {
        var obj = {};
        obj["id"] = String(i);
        i = i + 1;
        obj["name"] = key;
        obj["type"] = "I";
        obj["color"] =
          chartColors[Math.floor(Math.random() * chartColors.length)];
        obj["transactions"] = JSON.parse(JSON.stringify(listExpenseRef[key]));
        listCategoriesExpense.push(obj);
      });
      setCategoriesExpense(listCategoriesExpense);
    });
    return unsubscribeIncome, unsubscribeExpense;
  }, []);

  function processCategoryDataToDisplay(categories) {
    // total amount of each categories
    let chartData = categories.map((item) => {
      var total = item.transactions.reduce(
        (a, b) => a + (Number(b.amount) || 0),
        0
      );

      return {
        name: item.name,
        y: Number(total),
        transactionCount: item.transactions.length,
        color: item.color,
        id: item.id,
        type: item.type,
      };
    });

    // filter out categories with no data/transactions
    let filterChartData = chartData.filter((a) => a.y > 0);

    // Calculate the total transactions of all categories
    let totalTransaction = filterChartData.reduce((a, b) => a + (b.y || 0), 0);

    // Calculate percentage and repopulate chart data
    let finalChartData = filterChartData.map((item) => {
      let percentage = ((item.y / totalTransaction) * 100).toFixed(0);
      return {
        label: `${percentage}%`,
        y: Number(item.y),
        transactionCount: item.transactionCount,
        color: item.color,
        name: item.name,
        id: item.id,
        type: item.type,
      };
    });

    return finalChartData;
  }

  function setSelectCategoryByName(name, categories) {
    let category = categories.filter((a) => a.name == name);
    setSelectedCategory(category[0]);
  }

  function renderChart(chartData, categories) {
    let colorScales = chartData.map((item) => item.color);
    let totalTransactionCount = chartData.reduce(
      (a, b) => a + (b.transactionCount || 0),
      0
    );

    let transactionType = chartData.map((item) => item.type);

    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Svg
          width={SIZES.width}
          height={SIZES.width}
          style={{ width: "100%", height: "auto" }}
        >
          <VictoryPie
            standalone={false} // android workaround
            data={chartData}
            labels={(datum) => `${datum.y}`}
            radius={({ datum }) =>
              selectedCategory && selectedCategory.name == datum.name
                ? SIZES.width * 0.4
                : SIZES.width * 0.4 - 10
            }
            innerRadius={70}
            labelRadius={({ innerRadius }) =>
              (SIZES.width * 0.4 + innerRadius) / 2.5
            }
            style={{
              labels: { fill: "white", ...FONTS.body3 },
              parent: {
                ...styles.shadow,
              },
            }}
            width={SIZES.width}
            height={SIZES.width}
            colorScale={colorScales}
            events={[
              {
                target: "data",
                eventHandlers: {
                  onPress: () => {
                    return [
                      {
                        target: "labels",
                        mutation: (props) => {
                          let categoryName = chartData[props.index].name;
                          setSelectCategoryByName(categoryName, categories);
                        },
                      },
                    ];
                  },
                },
              },
            ]}
          />
        </Svg>
        <View
          style={{ position: "absolute", top: "43%", justifyContent: "center" }}
        >
          <Text style={styles.chartText}>{totalTransactionCount}</Text>
          {/* <Text style={styles.chartText}>{transactionType}</Text> */}
        </View>
      </View>
    );
  }

  function renderChartSummary(data) {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          height: 40,
          paddingHorizontal: SIZES.radius,
          borderTopLeftRadius: item.id == 1 ? SIZES.radius : 0,
          borderTopRightRadius: item.id == 1 ? SIZES.radius : 0,
          borderBottomLeftRadius: item.id == data.length ? SIZES.radius : 0,
          borderBottomRightRadius: item.id == data.length ? SIZES.radius : 0,
          backgroundColor:
            selectedCategory && selectedCategory.name == item.name
              ? item.color
              : COLORS.warmGray,
        }}
        onPress={() => {
          let categoryName = item.name;
          setSelectCategoryByName(categoryName, data);
        }}
      >
        {/* categories's name */}
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 20,
              height: 20,
              backgroundColor:
                selectedCategory && selectedCategory.name == item.name
                  ? COLORS.white
                  : item.color,
              borderRadius: SIZES.radius * 2,
            }}
          />

          <Text
            style={{
              marginLeft: SIZES.base,
              color:
                selectedCategory && selectedCategory.name == item.name
                  ? COLORS.white
                  : COLORS.black,
              ...FONTS.body4,
            }}
          >
            {item.name}
          </Text>
        </View>

        {/* Categories's total amount - percenteage */}
        <View style={{ justifyContent: "center" }}>
          <Text
            style={{
              color:
                selectedCategory && selectedCategory.name == item.name
                  ? COLORS.white
                  : COLORS.black,
              ...FONTS.body4,
            }}
          >
            {item.y} USD - {item.label}
          </Text>
        </View>
      </TouchableOpacity>
    );

    return (
      <View style={{ padding: SIZES.padding }}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.id}`}
        />
      </View>
    );
  }

  function renderLabel(str) {
    return (
      <View>
        <Text style={[styles.chartText, { top: 213 }]}>{str}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.screenContainer}>
      <Text style={styles.header}>Analyze</Text>

      <View style={[styles.chartContainer, styles.shadow]}>
        <View>
          {renderLabel("incomes")}
          {renderChart(
            processCategoryDataToDisplay(categoriesIncome),
            categoriesIncome
          )}

          {renderChartSummary(processCategoryDataToDisplay(categoriesIncome))}
        </View>

        <View>
          {renderLabel("expenses")}
          {renderChart(
            processCategoryDataToDisplay(categoriesExpense),
            categoriesExpense
          )}
          {renderChartSummary(processCategoryDataToDisplay(categoriesExpense))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 6,
  },
  screenContainer: {
    paddingTop: "15%",
    backgroundColor: COLORS.warmGray,
    paddingBottom: 90,
  },
  chartContainer: {
    margin: SIZES.padding,
    padding: SIZES.padding * 2,
    borderRadius: SIZES.radius * 2,
    backgroundColor: COLORS.white,
  },
  chartText: {
    ...FONTS.h3,
    textAlign: "center",
    color: COLORS.gray,
  },
  header: {
    ...FONTS.h2,
    paddingBottom: SIZES.padding,
    color: COLORS.black,
    textAlign: "center",
  },
});

export default Analyze;
