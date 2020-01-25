import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import PTRView from "react-native-pull-to-refresh";
import { SafeAreaLayout } from "../../component/SafeAreaLayoutComponent/SafeAreaLayoutComponent";
import {
  TopNavigation,
  Spinner,
  Layout,
  Tab,
  TabView,
  Text,
  Input
} from "@ui-kitten/components";

import { DatePickerDialog } from "react-native-datepicker-dialog";

const History = props => {
  const { navigation } = props;

  const [loading, setLoading] = useState(false);

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);

  const startDateRef = React.createRef();

  const _fetchData = () => {
    setLoading(true);
    new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 300);
    }).then(() => {
      setLoading(false);
    });
  };

  const _refresh = () => {
    _fetchData();
  };

  useEffect(() => {
    _fetchData();
  }, []);

  return (
    <SafeAreaLayout insets="top" level="2">
      <PTRView onRefresh={_refresh}>
        <TopNavigation title="Түүх" alignment="center" />
        <TabView selectedIndex={selectedIndex} onSelect={setSelectedIndex}>
          <Tab title="Орлого">
            <Layout style={styles.tabContainer}>
              <View style={{ flexDirection: "row" }}>
                <Input
                  style={styles.input}
                  value={startDate}
                  disabled={true}
                  placeholder="Start Date"
                />

                <Input
                  style={styles.input}
                  value={endDate}
                  disabled={true}
                  placeholder="End Date"
                />
              </View>
              <DatePickerDialog ref={startDateRef} />
            </Layout>
          </Tab>
          <Tab title="Зарлага">
            <Layout style={styles.tabContainer}>
              <Text>List of orders.</Text>
            </Layout>
          </Tab>
        </TabView>
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
  }
});

History.propTypes = {};

export default History;
