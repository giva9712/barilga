import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, ToastAndroid } from "react-native";
import { Button, Input, Text, Icon } from "@ui-kitten/components";
import { ImageOverlay } from "./extra/image-overlay.component";
import { KeyboardAvoidingView } from "./extra/3rd-party";

import { connect } from "react-redux";
import { rememberLogin, saveToken, saveUserInfo } from "../../store/actions";
import api from "../../provider/interceptors";
import Loader from "../../component/Loader/Loader";

import CheckBox from "react-native-check-box";

import { MaterialIcons } from "@expo/vector-icons";

const PersonIcon = style => (
  <Icon {...style} name="ios-person" pack="ionicons" />
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

  return (
    <KeyboardAvoidingView>
      <Loader loading={loading} onRequestClose={onRequestClose} />
      <ImageOverlay
        style={styles.container}
        source={require("../../../assets/images/bg.jpg")}
      >
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
            style={{ justifyContent: "center", flex: 1, flexDirection: "row" }}
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
  }
});

const mapStateToProps = state => ({
  loginInfo: state.token.loginInfo
});

const mapDispatchToProps = dispatch => ({
  rememberLogin: loginInfo => dispatch(rememberLogin(loginInfo)),
  saveToken: token => dispatch(saveToken(token)),
  saveUserInfo: userInfo => dispatch(saveUserInfo(userInfo))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
// export default Login;
