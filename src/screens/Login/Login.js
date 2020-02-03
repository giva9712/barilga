import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Button, Input, Text, Icon } from "@ui-kitten/components";
import { ImageOverlay } from "./extra/image-overlay.component";
import { KeyboardAvoidingView } from "./extra/3rd-party";

import { connect } from "react-redux";
import { saveUserToken } from "../../store/actions";
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
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignInButtonPress = () => {
    setLoading(true);
    api
      .post("/login", {
        email,
        password,
        role: 3
      })
      .then(res => {
        props.saveAuthInfo(res.data);
        setLoading(false);
        navigation.navigate("LoggedIn");
      })
      .catch(err => {
        props.setLoading(false);
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
          <View style={styles.forgotPasswordContainer}>
            {/* <Button
              style={styles.forgotPasswordButton}
              appearance="ghost"
              status="control"
              onPress={onForgotPasswordButtonPress}
            >
              Forgot your password?
            </Button> */}
          </View>
        </View>
        <Button
          style={styles.signInButton}
          size="giant"
          onPress={onSignInButtonPress}
        >
          Нэвтрэх
        </Button>
        {/* <View style={styles.socialAuthContainer}>
          <Text style={styles.socialAuthHintText} status="control">
            Or Sign In using Social Media
          </Text>
          <View style={styles.socialAuthButtonsContainer}>
            <Button
              appearance="ghost"
              status="control"
              size="giant"
              icon={GoogleIcon}
            />
            <Button
              appearance="ghost"
              status="control"
              size="giant"
              icon={FacebookIcon}
            />
            <Button
              appearance="ghost"
              status="control"
              size="giant"
              icon={TwitterIcon}
            />
          </View>
        </View> */}
        {/* <Button
          style={styles.signUpButton}
          appearance="ghost"
          status="control"
          onPress={onSignUpButtonPress}
        >
          Don't have an account? Sign Up
        </Button> */}
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
  },
  forgotPasswordContainer: {
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  forgotPasswordButton: {
    paddingHorizontal: 0
  },
  signUpButton: {
    marginVertical: 12
  },
  socialAuthContainer: {
    marginTop: 32
  },
  socialAuthButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  socialAuthHintText: {
    alignSelf: "center",
    marginBottom: 16
  }
});

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  saveUserToken: authInfo => dispatch(saveUserToken(authInfo))
});

export default connect(null, mapDispatchToProps)(Login);
// export default Login;
