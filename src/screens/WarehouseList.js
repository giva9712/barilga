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
          title: "Агуулах 1",
          description: "Шугам, хоолой"
        },
        {
          title: "Агуулах 2",
          description: "Шал"
        },
        {
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

WarehouseList.defaultProps = {
  warehouses: [
    {
      id: 1,
      name: "Warehouse 1",
      description: "Bairshil 1",
      types: 1,
      total_items: 123
    },
    {
      id: 2,
      name: "Warehouse 2",
      description: "Bairshil 2",
      types: 4,
      total_items: 521
    },
    {
      id: 3,
      name: "Warehouse 3",
      description: "Bairshil 3",
      types: 9,
      total_items: 2313
    },
    {
      id: 4,
      name: "Warehouse 4",
      description: "Bairshil 4",
      types: 4,
      total_items: 341
    },
    {
      id: 5,
      name: "Warehouse 5",
      description: "Bairshil 5",
      types: 7,
      total_items: 5133
    },
    {
      id: 6,
      name: "Warehouse 6",
      description: "Bairshil 6",
      types: 2,
      total_items: 5123
    },
    {
      id: 7,
      name: "Warehouse 7",
      description: "Bairshil 7",
      types: 8,
      total_items: 412
    }
  ]
};

export default WarehouseList;
