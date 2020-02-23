import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import PTRView from "react-native-pull-to-refresh";
import { SafeAreaLayout } from "../../component/SafeAreaLayoutComponent/SafeAreaLayoutComponent";
import {
  TopNavigation,
  Spinner,
  Layout,
  Tab,
  TabBar,
  Text,
  List,
  Card
} from "@ui-kitten/components";

import { DatePickerDialog } from "react-native-datepicker-dialog";

import moment from "moment";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import api from "../../provider/interceptors";
import { store } from "../../store";
import _ from "lodash";

const History = props => {
  const { navigation } = props;

  const _isMounted = useRef(true);

  const created_by = store.getState().token.userInfo.username;

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
    api
      .get("/get-item-trans", {
        params: {
          begin_date: moment(startDate).format("YYYY-MM-DD"),
          end_date: moment(endDate).format("YYYY-MM-DD"),
          created_by: created_by,
          warehouse_id: null
        }
      })
      .then(res => {
        setLoading(false);
        if (selectedIndex == 0) {
          setIncomeHistoryData(
            _.orderBy(
              _.filter(res.data.data, { is_income: 1 }),
              "created_date",
              "desc"
            )
          );
        } else {
          setExpenseHistoryData(
            _.orderBy(
              _.filter(res.data.data, { is_income: 0 }),
              "created_date",
              "desc"
            )
          );
        }
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
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
    const did_focus = navigation.addListener("didFocus", payload => {
      _isMounted.current = true;
      _fetchData();
    });
    const did_blur = navigation.addListener("didBlur", payload => {
      _isMounted.current = false;
      setIncomeHistoryData([]);
      setExpenseHistoryData([]);
    });
    _fetchData();
    return () => {
      console.log("screen unmounted");
      did_focus.remove();
      did_blur.remove();
    };
  }, [selectedIndex, startDate, endDate]);

  const RenderItemAccessory = ({ style, item, isIncome }) => (
    <Text style={{ ...style, color: isIncome ? "green" : "red" }}>
      {isIncome ? "+" : "-"}
      {isIncome ? item.in_count : item.out_count}
    </Text>
  );

  const renderIncomeList = ({ item, index }) => (
    // <ListItem
    //   title={`${item.item_name}`}
    //   description={`${item.warehouse_name}`}
    //   accessory={style => renderItemAccessory(style, item, true)}
    // />

    <Card style={styles.itemContainer} onPress={() => gotoHistory(item)}>
      <Text category="s1">{item.item_name}</Text>
      <Text style={styles.itemDescription} appearance="hint">
        {item.warehouse_name}
      </Text>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "flex-start",
          marginTop: 20
        }}
      >
        <View style={{ width: "50%" }}>
          <Text style={{ ...styles.itemDescription }} appearance="hint">
            {item.description}
          </Text>
        </View>
        <View style={{ width: "50%", textAlign: "right" }}>
          <Text style={{ textAlign: "right" }} appearance="hint">
            {moment(item.created_date).format("YYYY-MM-DD HH:mm")}
          </Text>
        </View>
      </View>
      <RenderItemAccessory
        style={{
          position: "absolute",
          right: 30,
          top: 33,
          fontSize: 20,
          zIndex: 1
        }}
        item={item}
        isIncome={true}
      />
    </Card>
  );

  const gotoHistory = item => {
    navigation.navigate("updateItemDetail", {
      item: { ...item, id: item.id, name: item.item_name }
    });
  };

  const renderExpenseList = ({ item, index }) => (
    // <ListItem
    //   title={`${item.item_name}`}
    //   description={`${item.warehouse_name}`}
    //   accessory={style => renderItemAccessory(style, item)}
    // />

    <Card style={styles.itemContainer} onPress={() => gotoHistory(item)}>
      <Text category="s1">{item.item_name}</Text>
      <Text style={styles.itemDescription} appearance="hint">
        {item.warehouse_name}
      </Text>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "flex-start",
          marginTop: 20
        }}
      >
        <View style={{ width: "50%" }}>
          <Text style={{ ...styles.itemDescription }} appearance="hint">
            {item.description}
          </Text>
        </View>
        <View style={{ width: "50%", textAlign: "right" }}>
          <Text style={{ textAlign: "right" }} appearance="hint">
            {moment(item.created_date).format("YYYY-MM-DD HH:mm")}
          </Text>
        </View>
      </View>
      <RenderItemAccessory
        style={{
          position: "absolute",
          right: 30,
          top: 33,
          fontSize: 20,
          zIndex: 1
        }}
        item={item}
        isIncome={false}
      />
    </Card>
  );

  const renderSelectedTab = () => {
    switch (selectedIndex) {
      case 0:
        return (
          <Layout style={styles.tabContainer}>
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
            ) : incomeHistoryData.length > 0 ? (
              <List data={incomeHistoryData} renderItem={renderIncomeList} />
            ) : (
              <View>
                <Text style={styles.noData}>Мэдээлэл алга</Text>
              </View>
            )}
          </Layout>
        );
      case 1:
        return (
          <Layout style={styles.tabContainer}>
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
            ) : expenseHistoryData.length > 0 ? (
              <List data={expenseHistoryData} renderItem={renderExpenseList} />
            ) : (
              <View>
                <Text style={styles.noData}>Мэдээлэл алга</Text>
              </View>
            )}
          </Layout>
        );
    }
  };

  return (
    <SafeAreaLayout insets="top" level="2" style={{ flex: 1 }}>
      <TopNavigation title="Түүх" alignment="center" />
      <TabBar selectedIndex={selectedIndex} onSelect={setSelectedIndex}>
        <Tab title="Орлого" />
        <Tab title="Зарлага" />
      </TabBar>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity style={styles.input} onPress={showStartDateDialog}>
          <View style={styles.datePickerBox}>
            <View style={{ padding: 8, width: 35 }}>
              <MaterialCommunityIcons name="calendar-blank" size={22} />
            </View>
            <Text style={styles.datePickerText}>
              {moment(startDate).format("YYYY-MM-DD")}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.input} onPress={showEndDateDialog}>
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
      <View
        style={{
          marginTop: 10,
          borderBottomColor: "#b7b7b7",
          borderBottomWidth: 2
        }}
      />
      <PTRView onRefresh={_refresh}>
        {renderSelectedTab()}
        <DatePickerDialog ref={startDateRef} onDatePicked={setStartDate} />
        <DatePickerDialog ref={endDateRef} onDatePicked={setEndDate} />
      </PTRView>
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    minHeight: 150,
    flex: 1
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
  },
  noData: {
    paddingVertical: 20,
    textAlign: "center"
  }
});

History.propTypes = {};

export default History;
