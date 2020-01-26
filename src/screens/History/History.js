import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import PTRView from "react-native-pull-to-refresh";
import { SafeAreaLayout } from "../../component/SafeAreaLayoutComponent/SafeAreaLayoutComponent";
import {
  TopNavigation,
  Spinner,
  Layout,
  Tab,
  TabView,
  Text,
  Input,
  Icon,
  List,
  ListItem
} from "@ui-kitten/components";

import { DatePickerDialog } from "react-native-datepicker-dialog";

import moment from "moment";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const History = props => {
  const { navigation } = props;

  const [loading, setLoading] = useState(false);

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());

  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

  const [incomeHistoryData, setIncomeHistoryData] = useState([]);
  const [expenseHistoryData, setExpenseHistoryData] = useState([]);

  const _fetchData = () => {
    setLoading(true);
    new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 300);
    }).then(() => {
      setLoading(false);
      if (selectedIndex == 0) {
        setIncomeHistoryData([
          {
            item_name: "Тоосго",
            warehouse_name: "Агуулах 1",
            amount: 159
          }
        ]);
      } else {
        setExpenseHistoryData([
          {
            item_name: "Тоосго",
            warehouse_name: "Агуулах 1",
            amount: 88
          }
        ]);
      }
    });
  };

  const _refresh = () => {
    _fetchData();
  };

  const showStartDateDialog = () => {
    startDateRef.current.open({
      date: startDate,
      maxDate: new Date() //To restirct future date
    });
  };

  const showEndDateDialog = () => {
    endDateRef.current.open({
      date: endDate,
      maxDate: new Date() //To restirct future date
    });
  };

  useEffect(() => {
    _fetchData();
  }, [selectedIndex]);

  const renderItemAccessory = (style, item, isIncome) => (
    <Text style={{ ...style, color: isIncome ? "green" : "red" }}>
      {isIncome ? "+" : "-"}
      {item.amount}
    </Text>
  );

  const renderIncomeList = ({ item, index }) => (
    <ListItem
      title={`${item.item_name}`}
      description={`${item.warehouse_name}`}
      accessory={style => renderItemAccessory(style, item, true)}
    />
  );

  const renderExpenseList = ({ item, index }) => (
    <ListItem
      title={`${item.item_name}`}
      description={`${item.warehouse_name}`}
      accessory={style => renderItemAccessory(style, item)}
    />
  );

  return (
    <SafeAreaLayout insets="top" level="2">
      <PTRView onRefresh={_refresh}>
        <TopNavigation title="Түүх" alignment="center" />
        <TabView selectedIndex={selectedIndex} onSelect={setSelectedIndex}>
          <Tab title="Орлого">
            <Layout style={styles.tabContainer}>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={styles.input}
                  onPress={showStartDateDialog}
                >
                  <View style={styles.datePickerBox}>
                    <View style={{ padding: 8, width: 35 }}>
                      <MaterialCommunityIcons name="calendar-blank" size={22} />
                    </View>
                    <Text style={styles.datePickerText}>
                      {moment(startDate).format("YYYY-MM-DD")}
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.input}
                  onPress={showEndDateDialog}
                >
                  <View style={styles.datePickerBox}>
                    <View style={{ padding: 8, width: 35 }}>
                      <MaterialCommunityIcons name="calendar-blank" size={22} />
                    </View>
                    <Text style={styles.datePickerText}>
                      {moment(endDate).format("YYYY-MM-DD")}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              {loading ? (
                <View
                  style={{
                    paddingVertical: 30,
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Spinner size="giant" />
                </View>
              ) : (
                <List data={incomeHistoryData} renderItem={renderIncomeList} />
              )}
            </Layout>
          </Tab>
          <Tab title="Зарлага">
            <Layout style={styles.tabContainer}>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={styles.input}
                  onPress={showStartDateDialog}
                >
                  <View style={styles.datePickerBox}>
                    <View style={{ padding: 8, width: 35 }}>
                      <MaterialCommunityIcons name="calendar-blank" size={22} />
                    </View>
                    <Text style={styles.datePickerText}>
                      {moment(startDate).format("YYYY-MM-DD")}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.input}
                  onPress={showEndDateDialog}
                >
                  <View style={styles.datePickerBox}>
                    <View style={{ padding: 8, width: 35 }}>
                      <MaterialCommunityIcons name="calendar-blank" size={22} />
                    </View>
                    <Text style={styles.datePickerText}>
                      {moment(endDate).format("YYYY-MM-DD")}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              {loading ? (
                <View
                  style={{
                    paddingVertical: 30,
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Spinner size="giant" />
                </View>
              ) : (
                <List
                  data={expenseHistoryData}
                  renderItem={renderExpenseList}
                />
              )}
            </Layout>
          </Tab>
        </TabView>
        <DatePickerDialog ref={startDateRef} onDatePicked={setStartDate} />
        <DatePickerDialog ref={endDateRef} onDatePicked={setEndDate} />
      </PTRView>
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    minHeight: 150
  },
  input: {
    flex: 1,
    margin: 8
  },
  datePickerBox: {
    marginTop: 9,
    borderColor: "#ABABAB",
    borderWidth: 0.5,
    padding: 0,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    height: 38,
    justifyContent: "center",
    flexDirection: "row"
  },
  datePickerText: {
    flex: 1,
    fontSize: 14,
    marginLeft: 5,
    borderWidth: 0,
    color: "#121212",
    alignSelf: "center"
  }
});

History.propTypes = {};

export default History;
