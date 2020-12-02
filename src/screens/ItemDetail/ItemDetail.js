import {
  Button,
  CheckBox,
  Icon,
  Input,
  Text,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  ToastAndroid,
  View,
} from "react-native";
import NumericInput from "react-native-numeric-input";
import PTRView from "react-native-pull-to-refresh";
import { connect } from "react-redux";
import ToggleSwitch from "toggle-switch-react-native";
import { SafeAreaLayout } from "../../component/SafeAreaLayoutComponent/SafeAreaLayoutComponent";
import api from "../../provider/interceptors";
import { store } from "../../store";
import { changeRefresh } from "../../store/actions";
import SectionedMultiSelect from "react-native-sectioned-multi-select";

import { MaterialIcons } from "@expo/vector-icons";
import _ from "lodash";

const noAvailableImage = require("../../../assets/images/No_picture_available.png");

const IOSArrowBack = (style) => (
  <Icon {...style} name="ios-arrow-back" pack="ionic" />
);

const ItemDetail = (props) => {
  const { navigation } = props;

  const created_by = store.getState().rootReducer.userInfo.username;

  const renderBackAction = () => (
    <TopNavigationAction
      icon={IOSArrowBack}
      onPress={() => {
        navigation.goBack();
      }}
    />
  );

  const [loading, setLoading] = useState(false);
  const [itemDetail, setItemDetail] = useState({
    ...navigation.state.params.item,
  });

  const _isMounted = useRef(null);

  const [isHouseTransaction, setIsHouseTransaction] = useState(
    itemDetail.is_income === 2 ? true : false
  );
  const [selectedHouseValue, setSelectedHouseValue] = useState([]);
  const [houses, setHouses] = useState([]);

  const onSelectedItemsChange = (selectedItems) => {
    setSelectedHouseValue(selectedItems);
  };
  const [updating, setUpdating] = useState({
    isIncome: itemDetail.is_income === 1 ? true : false,
    value: itemDetail.is_income
      ? itemDetail.in_count
        ? itemDetail.in_count
        : 1
      : itemDetail.out_count
      ? itemDetail.out_count
      : 1,
  });

  useEffect(() => {
    _isMounted.current = true;
    // _fetchData();
    return () => {
      _isMounted.current = false;
    };
  }, []);

  _saveUpdates = () => {
    setLoading(true);
    if (isHouseTransaction) {
      if (!selectedHouseValue.length > 0) {
        ToastAndroid.showWithGravityAndOffset(
          "Шилжүүлэх агуулга сонгоно уу!",
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
          25,
          50
        );
        setLoading(false);
      } else if (!updating.value > 0) {
        ToastAndroid.showWithGravityAndOffset(
          "Гүйлгээний утга хоосон байж болохгүй!",
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
          25,
          50
        );
        setLoading(false);
      } else if (selectedHouseValue.length > 0 && updating.value > 0) {
        api
          .post("/transfer-item-tran", {
            item_id: itemDetail.item_id,
            warehouse_id: itemDetail.warehouse_id,
            to_warehouse_id: selectedHouseValue[0],
            out_count: updating.value,
            created_by: created_by,
            ...(itemDetail.id && { id: itemDetail.id }),
          })
          .then((res) => {
            if (itemDetail.id == null)
              ToastAndroid.show("Амжилттай нэмэгдлээ!", ToastAndroid.SHORT);
            else {
              ToastAndroid.show("Амжилттай шинэчлэгдлээ!", ToastAndroid.SHORT);
            }
            props.changeRefresh(true);
            navigation.goBack();
            setLoading(false);
          })
          .catch((err) => {
            console.log(err.response);
            console.log(err.response.data.error);
            setLoading(false);
            ToastAndroid.show(err.response.data.error, ToastAndroid.SHORT);
          });
      }
    } else {
      if (
        ((!updating.isIncome && isNotEmpty) || updating.isIncome) &&
        updating.value > 0
      ) {
        api
          .post("/save-item-tran", {
            item_id: itemDetail.item_id,
            warehouse_id: itemDetail.warehouse_id,
            in_count: updating.isIncome ? updating.value : 0,
            out_count: !updating.isIncome ? updating.value : 0,
            is_income: updating.isIncome,
            description: controlInputChanges.value,
            created_by: created_by,
            ...(itemDetail.id && { id: itemDetail.id }),
          })
          .then((res) => {
            if (itemDetail.id == null)
              ToastAndroid.show("Амжилттай нэмэгдлээ!", ToastAndroid.SHORT);
            else {
              ToastAndroid.show("Амжилттай шинэчлэгдлээ!", ToastAndroid.SHORT);
            }
            props.changeRefresh(true);
            navigation.goBack();
            setLoading(false);
          })
          .catch((err) => {
            console.log(err.response);
            console.log(err.response.data.error);
            setLoading(false);
            ToastAndroid.show(err.response.data.error, ToastAndroid.SHORT);
          });
      } else if (updating.value <= 0) {
        ToastAndroid.showWithGravityAndOffset(
          "Гүйлгээний тоо буруу байна!",
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
          25,
          50
        );

        setLoading(false);
      } else {
        ToastAndroid.showWithGravityAndOffset(
          "Гүйлгээний утга хоосон байж болохгүй!",
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
          25,
          50
        );
        setLoading(false);
      }
    }
  };

  const useInputChanges = (initialValue = "") => {
    const [value, setValue] = React.useState(initialValue);
    return {
      value,
      onChangeText: setValue,
    };
  };

  const controlInputChanges = useInputChanges(itemDetail.description);

  const _refresh = () => {
    _fetchData();
  };

  const _fetchData = () => {
    setLoading(true);
    api
      .get("/get-warehouses")
      .then((res) => {
        if (_isMounted.current) {
          setLoading(false);
          setHouses(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const isNotEmpty =
    controlInputChanges.value && controlInputChanges.value.length > 0;
  const color = updating.isIncome ? "#28a745" : "#dc3545";
  scrollRef = React.createRef();
  return (
    <SafeAreaLayout insets="top" level="2" style={{ flex: 1 }}>
      <TopNavigation
        title={navigation.state.params.item.name}
        alignment="center"
        accessoryLeft={renderBackAction}
      />
      <PTRView onRefresh={_refresh}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior="position"
          enabled
          keyboardVerticalOffset={80}
        >
          <View>
            <View
              style={{
                paddingTop: 0,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={{
                  height: 240,
                  width: 240,
                  justifyContent: "center",
                }}
                resizeMode={"cover"}
                key={
                  itemDetail && itemDetail.img_path
                    ? itemDetail.img_path
                    : noAvailableImage
                }
                source={
                  itemDetail && itemDetail.img_path
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
                paddingRight: 30,
              }}
            >
              <View style={{ width: "50%" }}>
                <ToggleSwitch
                  isOn={updating.isIncome}
                  onColor="#28a745"
                  offColor="#dc3545"
                  label={updating.isIncome ? "Орлого" : `Зарлага`}
                  labelStyle={{ color: "black", fontWeight: "900" }}
                  size="large"
                  onToggle={(isOn) => {
                    if (!isHouseTransaction) {
                      setUpdating({
                        ...updating,
                        isIncome: !updating.isIncome,
                      });
                    } else {
                      ToastAndroid.showWithGravityAndOffset(
                        "Агуулах хоорондын шилжүүлэг үед орлого хийж болохгүй!",
                        ToastAndroid.LONG,
                        ToastAndroid.CENTER,
                        25,
                        50
                      );
                    }
                  }}
                />
              </View>
              <View
                style={{
                  width: "50%",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <Text
                  category="h1"
                  style={{
                    color: color,
                  }}
                >
                  {updating.isIncome ? "+" : "-"}
                  {updating.value}
                </Text>
              </View>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <NumericInput
                value={parseInt(updating.value)}
                onChange={(value) => setUpdating({ ...updating, value })}
                onLimitReached={(isMax, msg) => {
                  ToastAndroid.showWithGravityAndOffset(
                    "Гүйлгээний тоо буруу байна!",
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                    25,
                    50
                  );
                }}
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
                width: "100%",
                flex: 1,
                flexDirection: "row",
                marginVertical: 15,
                // marginBottom: 15,
                justifyContent: "center",
              }}
            >
              <CheckBox
                style={styles.checkbox}
                checked={isHouseTransaction}
                disabled={itemDetail.is_income === 2}
                onChange={(nextChecked) => {
                  if (itemDetail.is_income !== 2) {
                    setIsHouseTransaction(nextChecked);
                    if (nextChecked) {
                      setUpdating({
                        ...updating,
                        isIncome: false,
                      });
                    }
                  } else {
                    ToastAndroid.showWithGravityAndOffset(
                      "Агуулга хоорондох шилжүүлэг учир төрөл өөрчлөх боломжгүй!",
                      ToastAndroid.LONG,
                      ToastAndroid.CENTER,
                      25,
                      50
                    );
                  }
                }}
              >
                Агуулах хоорондын шилжүүлэг
              </CheckBox>
            </View>
            <View style={styles.controlContainer}>
              {isHouseTransaction ? (
                <View
                  style={{
                    width: 250,
                    borderRadius: 4,
                    // flexDirection: "row",
                    // justifyContent: "center",
                    borderWidth: 1,
                    borderColor:
                      selectedHouseValue.length > 0 ? "#28a745" : "#dc3545",
                  }}
                >
                  <SectionedMultiSelect
                    items={houses}
                    single={true}
                    IconRenderer={MaterialIcons}
                    uniqueKey="id"
                    subKey="children"
                    selectText="Шилжүүлэх агуулах сонгох..."
                    onSelectedItemsChange={onSelectedItemsChange}
                    selectedItems={selectedHouseValue}
                    loading={loading}
                    searchPlaceholderText="Агуулах хайх..."
                    noResultsComponent={<Text>Ямар ч үр дүн алга.</Text>}
                    noItemsComponent={<Text>Бүртгэгдсэн агуулга алга.</Text>}
                    confirmText="Хаах"
                    onToggleSelector={(selected) => {
                      if (selected) {
                        _fetchData();
                      }
                    }}
                  />
                </View>
              ) : (
                <View
                  style={{
                    width: 250,
                  }}
                >
                  <Input
                    status={
                      isNotEmpty || updating.isIncome ? "primary" : "danger"
                    }
                    caption={
                      isNotEmpty || updating.isIncome
                        ? ""
                        : "Хоосон байж болохгүй!"
                    }
                    placeholder="Гүйлгээний утга"
                    {...controlInputChanges}
                  />
                </View>
              )}
            </View>
            <View
              style={{
                // marginTop: 30,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                disabled={loading}
                status={
                  itemDetail.id
                    ? "warning"
                    : updating.isIncome
                    ? "success"
                    : "danger"
                }
                style={{ width: 230 }}
                onPress={() => _saveUpdates()}
              >
                {loading
                  ? "Түр хүлээнэ үү ..."
                  : itemDetail.id
                  ? "Засах"
                  : updating.isIncome
                  ? "Орлогдох"
                  : "Зарлагдах"}
              </Button>
            </View>
          </View>
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
        marginTop: StatusBar.currentHeight,
      },
    }),
  },
  flex: {
    flex: 1,
  },
  input: {
    margin: 8,
  },
  controlContainer: {
    marginVertical: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    // backgroundColor: "#3366FF"
  },
  checkbox: {
    margin: 2,
  },
});

ItemDetail.defaultProps = {
  detail: {
    title: "asd",
    image: "asd",
    stock: 0,
  },
};

const mapStateToProps = (state) => ({
  force_refresh: state.helperReducer.force_refresh,
});

const mapDispatchToProps = (dispatch) => ({
  changeRefresh: (force_refresh) => dispatch(changeRefresh(force_refresh)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetail);
