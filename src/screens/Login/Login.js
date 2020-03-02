import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  ToastAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal
} from "react-native";
import { Button, Input, Text, Icon } from "@ui-kitten/components";
import { ImageOverlay } from "./extra/image-overlay.component";
import { KeyboardAvoidingView } from "./extra/3rd-party";

import { connect } from "react-redux";
import {
  rememberLogin,
  saveToken,
  saveUserInfo,
  saveServerIP
} from "../../store/actions";
import api from "../../provider/interceptors";
import Loader from "../../component/Loader/Loader";

import CheckBox from "react-native-check-box";

import { MaterialIcons } from "@expo/vector-icons";

import { SafeAreaLayout } from "../../component/SafeAreaLayoutComponent/SafeAreaLayoutComponent";
import { AntDesign } from "@expo/vector-icons";
import { store } from "../../store";

const PersonIcon = style => (
  <Icon {...style} name="ios-person" pack="ionicons" />
);

const SettingsIcon = style => (
  <Icon
    style={{ height: 40, width: 40, color: "white" }}
    {...style}
    name="md-settings"
    pack="ionicons"
  />
);

const Login = props => {
  const { navigation } = props;
  const [username, setUsername] = useState(
    !!props.loginInfo ? props.loginInfo.username : ""
  );
  const [password, setPassword] = useState(
    !!props.loginInfo ? props.loginInfo.password : ""
  );
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(!!props.loginInfo);

  const [showPassword, setShowPassword] = useState(false);

  const EyeOffIcon = style => (
    <Icon
      {...style}
      onPress={() => setShowPassword(!showPassword)}
      name={showPassword ? "md-eye" : "md-eye-off"}
      pack="ionicons"
    />
  );
  useEffect(() => {}, []);

  const onSignInButtonPress = () => {
    setLoading(true);
    api
      .post("/login", {
        username: username,
        password: password,
        role: 3
      })
      .then(res => {
        setLoading(false);
        if (res.data.token) {
          let { token, ...userInfo } = res.data;
          if (remember) {
            props.rememberLogin({
              username,
              password: null
            });
          } else {
            props.rememberLogin(null);
          }
          props.saveToken(token);
          props.saveUserInfo(userInfo);
          navigation.navigate("LoggedIn");
        }
      })
      .catch(err => {
        if (err.response && err.response.data.error)
          ToastAndroid.showWithGravityAndOffset(
            err.response.data.error,
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
            25,
            50
          );
        setLoading(false);
      });
  };

  const onCheckedChange = () => {
    setRemember(!remember);
  };

  const onPasswordIconPress = () => {
    setPasswordVisible(!passwordVisible);
  };
  const onRequestClose = () => {
    setLoading(false);
  };

  const [showModal, setShowModal] = useState(false);

  const handleSaveServerIP = () => {
    props.saveServerIP(serverIP);
    setShowModal(false);
    ToastAndroid.showWithGravityAndOffset(
      "Server ip амжилттай солигдлоо!",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
      25,
      50
    );
  };

  const [serverIP, setServerIP] = useState(
    store.getState().rootReducer.serverIP
  );

  return (
    <SafeAreaLayout insets="top" level="2" style={{ flex: 1 }}>
      <KeyboardAvoidingView>
        <Modal
          transparent={true}
          animationType={"none"}
          visible={showModal}
          onRequestClose={() => setShowModal(false)}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={styles.modalBackground}
            onPress={() => setShowModal(false)}
          >
            <TouchableWithoutFeedback>
              <View style={styles.activityIndicatorWrapper}>
                <View
                  style={{
                    position: "absolute",
                    zIndex: 99,
                    top: 20,
                    right: 20
                  }}
                >
                  <AntDesign
                    onPress={() => setShowModal(false)}
                    name="closecircle"
                    size={32}
                  />
                </View>
                <View>
                  <Input
                    style={{
                      marginHorizontal: 16,
                      marginTop: 16,
                      marginBottom: 8,

                      width: 300
                    }}
                    placeholder="http://host-address/api"
                    value={serverIP}
                    onChangeText={setServerIP}
                  />
                </View>
                <View>
                  <Button
                    style={styles.doneButton}
                    onPress={handleSaveServerIP}
                  >
                    Хадгалах
                  </Button>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>
        <Loader loading={loading} onRequestClose={onRequestClose} />
        <ImageOverlay
          style={styles.container}
          source={require("../../../assets/images/bg.jpg")}
        >
          <Button
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: 80
            }}
            appearance="ghost"
            onPress={() => setShowModal(true)}
            icon={SettingsIcon}
          />

          <View style={styles.headerContainer}>
            <Image
              style={{
                width: 250,
                height: 200,
                resizeMode: "stretch"
              }}
              source={require("../../../assets/images/logo.jpg")}
            />
          </View>
          <View style={styles.formContainer}>
            <Input
              status="control"
              placeholder="Нэвтрэх"
              value={username}
              onChangeText={setUsername}
              icon={PersonIcon}
            />
            <Input
              style={styles.passwordInput}
              status="control"
              placeholder="Нүүц үг"
              value={password}
              secureTextEntry={!showPassword}
              onChangeText={setPassword}
              icon={EyeOffIcon}
            />
            <View
              style={{
                justifyContent: "center",
                flex: 1,
                flexDirection: "row"
              }}
            >
              <CheckBox
                style={{ padding: 10, width: 150 }}
                checkBoxColor="#fff"
                leftTextStyle={{ color: "#fff" }}
                checkedImage={
                  <MaterialIcons color="#fff" size={40} name="check-box" />
                }
                unCheckedImage={
                  <MaterialIcons
                    color="#fff"
                    size={40}
                    name="check-box-outline-blank"
                  />
                }
                onClick={onCheckedChange}
                isChecked={remember}
                leftText={"Сануулах"}
              />
            </View>
          </View>

          <Button
            style={styles.signInButton}
            size="giant"
            onPress={onSignInButtonPress}
          >
            Нэвтрэх
          </Button>
        </ImageOverlay>
      </KeyboardAvoidingView>
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerContainer: {
    minHeight: 216,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    padding: 30
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 16
  },
  signInLabel: {
    marginTop: 16
  },
  passwordInput: {
    marginTop: 16
  },
  signInButton: {
    marginHorizontal: 16,
    marginVertical: 50
  },
  doneButton: {
    margin: 24
  },
  modalBackground: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "#00000040"
  },
  activityIndicatorWrapper: {
    backgroundColor: "#FFFFFF",
    height: 400,
    width: 330,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  }
});

const mapStateToProps = state => ({
  loginInfo: state.rootReducer.loginInfo
});

const mapDispatchToProps = dispatch => ({
  rememberLogin: loginInfo => dispatch(rememberLogin(loginInfo)),
  saveToken: token => dispatch(saveToken(token)),
  saveUserInfo: userInfo => dispatch(saveUserInfo(userInfo)),
  saveServerIP: serverIP => dispatch(saveServerIP(serverIP))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
// export default Login;
