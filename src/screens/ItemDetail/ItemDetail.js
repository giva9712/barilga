import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  Image,
  View,
  ToastAndroid,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";
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
  Icon,
  Input
} from "@ui-kitten/components";

import ToggleSwitch from "toggle-switch-react-native";

import NumericInput from "react-native-numeric-input";

import api from "../../provider/interceptors";

import { store } from "../../store";

import ImageLoader from "../../component/ImageLoader/ImageLoader";

const noAvailableImage = require("../../../assets/images/No_picture_available.png");

const IOSArrowBack = style => (
  <Icon {...style} name="ios-arrow-back" pack="ionicons" />
);

const ItemDetail = props => {
  const { navigation } = props;

  const created_by = store.getState().token.userInfo.username;

  const renderBackAction = () => (
    <TopNavigationAction
      icon={IOSArrowBack}
      onPress={() => {
        if (itemDetail.id) {
          navigation.navigate("WarehouseList");
        } else {
          navigation.navigate("WarehouseItems");
        }
      }}
    />
  );

  const [loading, setLoading] = useState(false);
  const [itemDetail, setItemDetail] = useState({
    ...navigation.state.params.item
  });
  // console.log("-------------", navigation.state.params);

  const [updating, setUpdating] = useState({
    isIncome: itemDetail.is_income ? true : false,
    value: itemDetail.is_income
      ? itemDetail.in_count
        ? itemDetail.in_count
        : 1
      : itemDetail.out_count
      ? itemDetail.out_count
      : 1
  });

  useEffect(() => {
    _isMounted = true;
    // _fetchData();
  }, []);

  _saveUpdates = () => {
    api
      .post("/save-item-tran", {
        item_id: itemDetail.item_id,
        warehouse_id: itemDetail.warehouse_id,
        in_count: updating.isIncome ? updating.value : 0,
        out_count: !updating.isIncome ? updating.value : 0,
        is_income: updating.isIncome,
        description: controlInputChanges.value,
        created_by: created_by,
        ...(itemDetail.id && { id: itemDetail.id })
      })
      .then(res => {
        if (itemDetail.id == null)
          ToastAndroid.show("Амжилттай нэмэгдлээ!", ToastAndroid.SHORT);
        else {
          ToastAndroid.show("Амжилттай шинэчлэгдлээ!", ToastAndroid.SHORT);
        }
        navigation.goBack();
      })
      .catch(err => {
        console.log(err.response);
        console.log(err.response.data.error);

        ToastAndroid.show(err.response.data.error, ToastAndroid.SHORT);
      });
  };

  const useInputChanges = (initialValue = "") => {
    const [value, setValue] = React.useState(initialValue);
    return {
      value,
      onChangeText: setValue
    };
  };

  const controlInputChanges = useInputChanges(itemDetail.description);

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
  scrollRef = React.createRef();
  return (
    <SafeAreaLayout insets="top" level="2" style={{ flex: 1 }}>
      <TopNavigation
        title={navigation.state.params.item.name}
        alignment="center"
        leftControl={renderBackAction()}
      />
      <PTRView onRefresh={_refresh}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior="position"
          enabled
          keyboardVerticalOffset={130}
        >
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
                {/* <ImageLoader
                imageStyle={{
                  height: 260,
                  width: 260,
                  justifyContent: "center"
                }}
                source={
                  itemDetail.img_path.length > 0
                    ? { uri: itemDetail.img_path[0] }
                    : noAvailableImage
                }
              /> */}
                <Image
                  style={{
                    height: 160,
                    width: 160,
                    justifyContent: "center"
                  }}
                  source={
                    !!itemDetail.img_path
                      ? { uri: itemDetail.img_path }
                      : noAvailableImage
                  }
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
              <View style={styles.controlContainer}>
                <Input
                  style={styles.input}
                  status="control"
                  placeholder="Гүйлгээний утга"
                  {...controlInputChanges}
                />
              </View>
              <View
                style={{
                  // marginTop: 30,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: 30
                }}
              >
                <Button style={{ width: 230 }} onPress={() => _saveUpdates()}>
                  {itemDetail.id ? "Шинэчлэх" : "Хадгалах"}
                </Button>
              </View>
            </View>
          )}
        </KeyboardAvoidingView>
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
  },
  input: {
    margin: 8
  },
  controlContainer: {
    borderRadius: 4,
    margin: 8,
    marginHorizontal: 30,
    backgroundColor: "#3366FF"
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
