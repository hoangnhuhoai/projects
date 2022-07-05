import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
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
import { LineChart } from "../components";
import { ScrollView } from "react-native-gesture-handler";
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

const Home = ({ navigation }) => {
  const balanceAsset = imageStorage.balanceAsset;
  const incomeAsset = imageStorage.incomeAsset;
  var processData = function (currentMonth, l) {
    var dataFilter = l.filter(function (x) {
      return x.month === String(currentMonth);
    });
    const dataReduce = dataFilter.reduce((res, x) => res + Number(x.amount), 0);
    return dataReduce;
  };

  React.useEffect(() => {
    LogBox.ignoreAllLogs();
  }, []);

  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [lineChartData, setLineChartData] = useState([]);
  const [res, setRes] = useState();
  const monthData = [];
  const [monthNameData, setMonthNameData] = useState([]);
  const monthName = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  useEffect(() => {
    // Get current month
    const currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    // let lineChartData = [];
    setMonthNameData([
      monthName[currentMonth - 4],
      monthName[currentMonth - 3],
      monthName[currentMonth - 2],
      monthName[currentMonth - 1],
      monthName[currentMonth],
    ]);

    // collection ref
    const colRef = collection(db, auth.currentUser.uid);
    // queries income
    const qIncome = query(colRef, where("type", "==", "I"));
    // queries expense
    const qExpense = query(colRef, where("type", "==", "E"));

    // real time collection data Income
    const unsubscriberIncome = onSnapshot(qIncome, (snapshot) => {
      let totalRef = 0;
      let l = [];
      snapshot.docs.forEach((doc) => {
        totalRef = totalRef + Number(doc.data().amount);

        l.push({
          amount: doc.data().amount,
          month: String(
            doc
              .data({ serverTimestamps: "estimate" })
              .createdAt.toDate()
              .getMonth() + 1
          ),
          monthName:
            monthName[
              parseInt(
                doc
                  .data({ serverTimestamps: "estimate" })
                  .createdAt.toDate()
                  .getMonth()
              )
            ],
          year: String(
            doc
              .data({ serverTimestamps: "estimate" })
              .createdAt.toDate()
              .getFullYear()
          ),
        });
      });
      setTotalIncome(totalRef);
      // Calculate total income of first month in line chart
      var filterIncome1 = l.filter(function (x) {
        if (currentMonth == 1) {
          return x.month == "12" && x.year == String(currentYear - 1);
        }
        return x.month == String(currentMonth - 1);
      });
      const incomeMonth1 = filterIncome1.reduce(
        (res, x) => res + Number(x.amount),
        0
      );

      monthData.push(incomeMonth1);

      const incomeMonth2 = processData(currentMonth, l);
      monthData.push(incomeMonth2);

      // Calculate total income of third month in line chart
      const incomeMonth3 = processData(currentMonth + 1, l);
      monthData.push(incomeMonth3);

      // Calculate total expense of second month in line chart
      const incomeMonth4 = processData(currentMonth - 2, l);
      monthData.push(incomeMonth4);

      // Calculate total expense of second month in line chart
      const incomeMonth5 = processData(currentMonth - 3, l);
      monthData.push(incomeMonth5);

      // Calculate total expense of second month in line chart
      const incomeMonth6 = processData(currentMonth - 4, l);
      monthData.push(incomeMonth6);
    });

    // real time collection data Expense
    const unsubscriberExpense = onSnapshot(qExpense, (snapshot) => {
      let totalReff = 0;
      let l = [];
      snapshot.docs.forEach((doc) => {
        // {serverTimestamps: 'estimate'}
        totalReff = totalReff + Number(doc.data().amount);

        l.push({
          amount: doc.data().amount,
          month: String(
            doc
              .data({ serverTimestamps: "estimate" })
              .createdAt.toDate()
              .getMonth() + 1
          ),
          monthName:
            monthName[
              parseInt(
                doc
                  .data({ serverTimestamps: "estimate" })
                  .createdAt.toDate()
                  .getMonth()
              )
            ],
          year: String(
            doc
              .data({ serverTimestamps: "estimate" })
              .createdAt.toDate()
              .getFullYear()
          ),
        });
      });
      setTotalExpense(totalReff);
      // Calculate total income of first month in line chart
      var filterExpense1 = l.filter(function (x) {
        if (currentMonth == 1) {
          return x.month == "12" && x.year == String(currentYear - 1);
        }
        return x.month == String(currentMonth - 1);
      });
      const expenseMonth1 = filterExpense1.reduce(
        (res, x) => res + Number(x.amount),
        0
      );
      monthData.push(expenseMonth1);

      // Calculate total expense of second month in line chart
      const expenseMonth2 = processData(currentMonth, l);
      monthData.push(expenseMonth2);

      // Calculate total expense of second month in line chart
      const expenseMonth3 = processData(currentMonth + 1, l);
      monthData.push(expenseMonth3);

      // Calculate total expense of second month in line chart
      const expenseMonth4 = processData(currentMonth - 2, l);
      monthData.push(expenseMonth4);

      // Calculate total expense of second month in line chart
      const expenseMonth5 = processData(currentMonth - 3, l);
      monthData.push(expenseMonth5);

      // Calculate total expense of second month in line chart
      const expenseMonth6 = processData(currentMonth - 4, l);
      monthData.push(expenseMonth6);

      // Adding data to lineChartData
      setLineChartData([
        { x: currentMonth - 1, y: monthData[0] - monthData[6] },
        { x: currentMonth, y: monthData[1] - monthData[7] },
        { x: currentMonth + 1, y: monthData[2] - monthData[8] },
        { x: currentMonth - 2, y: monthData[3] - monthData[9] },
        { x: currentMonth - 3, y: monthData[4] - monthData[10] },
        { x: currentMonth - 4, y: monthData[5] - monthData[11] },
      ]);
    });
    return unsubscriberIncome, unsubscriberExpense;
  }, []);

  console.log(lineChartData);

  function renderHeader() {
    return (
      <View style={{ width: "100%", height: 220, ...styles.shadow }}>
        <ImageBackground
          source={images.banner}
          resizeMode="cover"
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          {/* Balance header */}
          <View style={styles.headerBoxText}>
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.h2,
              }}
            >
              Your Balance
            </Text>
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.h1,
                marginTop: SIZES.base,
              }}
            >
              ${totalIncome - totalExpense}
            </Text>
          </View>
        </ImageBackground>
      </View>
    );
  }

  function renderBalanceDetail() {
    const renderItem = ({ item, index }) => (
      <View
        style={[
          styles.detailBox,
          styles.shadow,
          { marginRight: index == 0 ? SIZES.padding : 0 },
        ]}
      >
        <View>
          <Image
            source={item.image}
            resizeMode="cover"
            style={styles.detailBoxIcon}
          />
        </View>

        {/* Values */}
        <View style={{ marginTop: 10 }}>
          <Text style={{ ...FONTS.h3, color: COLORS.black }}>{item.name}</Text>
          <Text
            style={{
              color: item.type == "I" ? COLORS.green : COLORS.red,
              ...FONTS.h3,
              paddingTop: SIZES.base,
            }}
          >
            ${item.type == "I" ? totalIncome : totalExpense}
          </Text>
        </View>
      </View>
    );

    return (
      <View style={{ width: "100%", height: 220, ...styles.shadow }}>
        {/* Balance Detail */}
        <View>
          <FlatList
            contentContainerStyle={{ marginTop: SIZES.base }}
            data={balanceAsset}
            renderItem={renderItem}
            keyExtractor={(item) => "${item.id}"}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    );
  }

  function renderLineChart() {
    return (
      <View>
        <LineChart
          customContainerStyle={{ ...styles.shadow }}
          lineChart={lineChartData}
          monthName={monthNameData}
        />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.screenContainer}>
      <View style={styles.headerBox}>{renderHeader()}</View>
      <View style={[styles.chartBox, styles.shadow]}>{renderLineChart()}</View>
      <View style={styles.detailContainer}>{renderBalanceDetail()}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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

  detailBoxIcon: {
    marginTop: 5,
    width: 32,
    height: 32,
  },
  headerBoxText: {
    marginTop: SIZES.padding,
    paddingTop: SIZES.padding * 3,
    alignItems: "center",
    justifyContent: "center",
  },
  screenContainer: {
    backgroundColor: COLORS.warmGray,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  headerBox: {
    flex: 1,
    overflow: "hidden",
  },
  chartBox: {
    marginHorizontal: SIZES.padding,
    // marginVertical: SIZES.base / 4,
    borderRadius: SIZES.radius * 2,
    backgroundColor: COLORS.white,
    top: -50,
  },
  detailContainer: {
    top: -17,
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    marginHorizontal: SIZES.radius,
  },
  detailBox: {
    width: 164,
    flex: 1,
    padding: SIZES.radius,
    borderRadius: SIZES.radius * 2,
    backgroundColor: COLORS.white,
    marginBottom: SIZES.radius,
  },
});

export default Home;
