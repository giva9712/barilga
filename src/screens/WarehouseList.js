import React, { Component, useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import PTRView from "react-native-pull-to-refresh";

import { TopNavigation, Spinner } from "@ui-kitten/components";
import { SafeAreaLayout } from "../component/SafeAreaLayoutComponent/SafeAreaLayoutComponent";
import { LayoutList, LayoutListElement } from "../component/ListItem/ListItem";
import api from "../provider/interceptors";
import { connect } from "react-redux";

const WarehouseList = props => {
  const { navigation } = props;

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    _fetchData();
    return () => {
      //
    };
  }, []);

  const _fetchData = () => {
    setLoading(true);
    api(`/get-warehouses?user_id=${props.user_id}`)
      .then(res => {
        setData(res.data.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
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
    <SafeAreaLayout insets="top" level="2" style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
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
          <PTRView onRefresh={_refresh}>
            <View>
              {data.length > 0 ? (
                <LayoutList data={data} onItemPress={_gotoWarehouse} />
              ) : (
                <View>
                  <Text style={styles.noData}>Мэдээлэл алга</Text>
                </View>
              )}
            </View>
          </PTRView>
        )}
      </View>
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
  },
  noData: {
    paddingVertical: 20,
    textAlign: "center"
  }
});

WarehouseList.defaultProps = {};

const mapStateToProps = state => ({
  user_id: state.token.userInfo.id
});

export default connect(mapStateToProps)(WarehouseList);
