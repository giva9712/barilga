import React, { Component, useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import PTRView from "react-native-pull-to-refresh";

import { TopNavigation, Spinner } from "@ui-kitten/components";
import { SafeAreaLayout } from "../component/SafeAreaLayoutComponent/SafeAreaLayoutComponent";
import { LayoutList, LayoutListElement } from "../component/ListItem/ListItem";

const WarehouseList = props => {
  const { navigation } = props;

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    _isMounted = true;
    _fetchData();
  }, []);

  const _fetchData = () => {
    setLoading(true);
    new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 300);
    }).then(() => {
      setData([
        {
          id: 1,
          title: "Агуулах 1",
          description: "Шугам, хоолой"
        },
        {
          id: 2,
          title: "Агуулах 2",
          description: "Шал"
        },
        {
          id: 3,
          title: "Агуулах 3",
          description: "Будаг"
        }
      ]);
      setLoading(false);
    });
  };
  const _gotoWarehouse = item => {
    navigation.navigate("WarehouseItems", {
      ...item
    });
  };
  const _refresh = () => {
    _fetchData();
  };

  return (
    <SafeAreaLayout insets="top" level="2">
      <PTRView onRefresh={_refresh}>
        <TopNavigation title="Агуулах" alignment="center" />
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
          <LayoutList data={data} onItemPress={_gotoWarehouse} />
        )}
      </PTRView>
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingTop: 15
  },
  badges: {
    marginTop: 10,
    marginLeft: 10,
    flexDirection: "row",
    alignSelf: "flex-start"
  }
});

WarehouseList.defaultProps = {};

export default WarehouseList;
