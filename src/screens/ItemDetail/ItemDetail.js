import React, { Component, useState, useEffect } from "react";
import { StyleSheet, Image, View, ToastAndroid } from "react-native";
import { Platform, StatusBar } from "react-native";

import { SafeAreaLayout } from "../../component/SafeAreaLayoutComponent/SafeAreaLayoutComponent";
import PTRView from "react-native-pull-to-refresh";
import {
  TopNavigation,
  TopNavigationAction,
  Button,
  List,
  Text,
  Spinner,
  Icon
} from "@ui-kitten/components";

import ToggleSwitch from "toggle-switch-react-native";

import NumericInput from "react-native-numeric-input";

const IOSArrowBack = style => (
  <Icon {...style} name="ios-arrow-back" pack="ionicons" />
);

const ItemDetail = props => {
  const { navigation } = props;

  const renderBackAction = () => (
    <TopNavigationAction
      icon={IOSArrowBack}
      onPress={() => navigation.goBack()}
    />
  );

  const [loading, setLoading] = useState(false);
  const [itemDetail, setItemDetail] = useState({
    ...navigation.state.params.item
  });

  const [updating, setUpdating] = useState({ isIncome: false, value: 1 });

  useEffect(() => {
    _isMounted = true;
    // _fetchData();
  }, []);

  _saveUpdates = () => {
    ToastAndroid.show("Successfully saved!", ToastAndroid.SHORT);
    navigation.goBack();
  };

  const _refresh = () => {
    _fetchData();
  };

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

  const color = updating.isIncome ? "#7ED32E" : "#FF3A3A";
  return (
    <SafeAreaLayout insets="top" level="2">
      <PTRView onRefresh={_refresh}>
        <TopNavigation
          title="Барааны жагсаалт"
          alignment="center"
          leftControl={renderBackAction()}
        />
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
          <View>
            <View
              style={{
                paddingTop: 15,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Image
                source={itemDetail.image}
                style={{ height: 300, width: 300, flex: 1 }}
              />
            </View>
            <View
              style={{
                paddingTop: 20,
                paddingBottom: 20,
                flex: 1,
                width: "100%",
                flexWrap: "wrap",
                alignItems: "flex-start",
                flexDirection: "row",
                paddingLeft: 20,
                paddingRight: 30
              }}
            >
              <View style={{ width: "50%" }}>
                <ToggleSwitch
                  isOn={updating.isIncome}
                  onColor="#7ED32E"
                  offColor="#FF3A3A"
                  label={updating.isIncome ? "Орлого" : "Зарлага"}
                  labelStyle={{ color: "black", fontWeight: "900" }}
                  size="large"
                  onToggle={isOn =>
                    setUpdating({
                      ...updating,
                      isIncome: !updating.isIncome
                    })
                  }
                />
              </View>
              <View
                style={{
                  width: "50%",
                  flexDirection: "row",
                  justifyContent: "flex-end"
                }}
              >
                <Text
                  category="h1"
                  style={{
                    color: color
                  }}
                >
                  {updating.isIncome ? "+" : "-"}
                  {updating.value}
                </Text>
              </View>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <NumericInput
                value={updating.value}
                onChange={value => setUpdating({ ...updating, value })}
                onLimitReached={(isMax, msg) => console.log(isMax, msg)}
                totalWidth={240}
                totalHeight={50}
                iconSize={25}
                step={1}
                minValue={1}
                valueType="real"
                rounded
                textColor="#000"
                iconStyle={{ color: "white" }}
                rightButtonBackgroundColor={color}
                leftButtonBackgroundColor={color}
              />
            </View>
            <View
              style={{
                marginTop: 30,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Button onPress={() => _saveUpdates()}>Хадгалах</Button>
            </View>
          </View>
        )}
      </PTRView>
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      android: {
        marginTop: StatusBar.currentHeight
      }
    })
  },
  flex: {
    flex: 1
  }
});

ItemDetail.defaultProps = {
  detail: {
    title: "asd",
    image: "asd",
    stock: 0
  }
};

export default ItemDetail;
