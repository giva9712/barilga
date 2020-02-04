import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, ToastAndroid } from "react-native";
import { Button, Input, Text, Icon } from "@ui-kitten/components";
import { ImageOverlay } from "./extra/image-overlay.component";
import { KeyboardAvoidingView } from "./extra/3rd-party";

import { connect } from "react-redux";
import { saveToken, saveUserInfo } from "../../store/actions";
import api from "../../provider/interceptors";
import Loader from "../../component/Loader/Loader";

const PersonIcon = style => (
  <Icon {...style} name="ios-person" pack="ionicons" />
);

const EyeOffIcon = style => (
  <Icon {...style} name="md-eye-off" pack="ionicons" />
);

const Login = props => {
  const { navigation } = props;
  const [email, setEmail] = useState("Gdsc@test.com");
  const [password, setPassword] = useState("1234");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {}, []);

  const onSignInButtonPress = () => {
    setLoading(true);
    api
      .post("/login", {
        email,
        password,
        role: 3
      })
      .then(res => {
        setLoading(false);
        // console.log(res);

        if (res.data.error) {
          ToastAndroid.showWithGravityAndOffset(
            res.data.error,
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
            25,
            50
          );
        }
        if (res.data.token) {
          let { token, ...userInfo } = res.data;
          props.saveToken(token);
          props.saveUserInfo(userInfo);
          navigation.navigate("LoggedIn");
        }
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  const onPasswordIconPress = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <KeyboardAvoidingView>
      <Loader loading={loading} />
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
            placeholder="Имэйл"
            value={email}
            onChangeText={setEmail}
            icon={PersonIcon}
          />
          <Input
            style={styles.passwordInput}
            status="control"
            placeholder="Нүүц үг"
            value={password}
            secureTextEntry={!passwordVisible}
            onChangeText={setPassword}
            onIconPress={onPasswordIconPress}
            icon={EyeOffIcon}
          />
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

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  saveToken: token => dispatch(saveToken(token)),
  saveUserInfo: userInfo => dispatch(saveUserInfo(userInfo))
});

export default connect(null, mapDispatchToProps)(Login);
// export default Login;
