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

  const [isHouseTransaction, setIsHouseTransaction] = useState(false);

  const [selectedHouseValue, setSelectedHouseValue] = useState({
    name: null,
  });
  const [houses, setHouses] = useState([]);
  const [autocompleteData, setAutocompleteData] = useState([]);
  const onSelectedItemsChange = (selectedItems) => {
    setAutocompleteData(selectedItems);
  };

  const [updating, setUpdating] = useState({
    isIncome: itemDetail.is_income ? true : false,
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
          setAutocompleteData(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err.request.body);
        setLoading(false);
      });
  };

  const isNotEmpty =
    controlInputChanges.value && controlInputChanges.value.length > 0;

  const color = updating.isIncome ? "#7ED32E" : "#FF3A3A";
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
                source={
                  !!itemDetail.img_path
                    ? { uri: itemDetail.img_path }
                    : noAvailableImage
                }
              />
            </View>
            <View
              style={{
                width: "100%",
                flex: 1,
                flexDirection: "row",
                marginBottom: 15,
                justifyContent: "center",
              }}
            >
              <CheckBox
                style={styles.checkbox}
                checked={isHouseTransaction}
                onChange={(nextChecked) => {
                  setIsHouseTransaction(nextChecked);
                  if (nextChecked) {
                    setUpdating({
                      ...updating,
                      isIncome: false,
                    });
                  }
                }}
              >
                Агуулах хоорондын шилжүүлэг
              </CheckBox>
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
                  onColor="#7ED32E"
                  offColor="#FF3A3A"
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
            <View style={styles.controlContainer}>
              {isHouseTransaction ? (
                <SectionedMultiSelect
                  items={houses}
                  single={true}
                  IconRenderer={MaterialIcons}
                  uniqueKey="id"
                  subKey="children"
                  selectText="Шилжүүлэх агуулах сонгох..."
                  onSelectedItemsChange={onSelectedItemsChange}
                  selectedItems={autocompleteData}
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
              ) : (
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
                style={{ width: 230 }}
                onPress={() => _saveUpdates()}
              >
                {loading
                  ? "Түр хүлээнэ үү ..."
                  : itemDetail.id
                  ? "Засах/Өөрчлөх"
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
    borderRadius: 4,
    margin: 8,
    marginHorizontal: 30,
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
