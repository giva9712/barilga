import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Button, Input, Text, Icon } from "@ui-kitten/components";
import { ImageOverlay } from "./extra/image-overlay.component";
// import {
//   EyeIcon,
//   EyeOffIcon,
//   // FacebookIcon,
//   // GoogleIcon,
//   PersonIcon
//   // TwitterIcon
// } from "./extra/icons";
import { KeyboardAvoidingView } from "./extra/3rd-party";

export default ({ navigation }) => {
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const onSignInButtonPress = () => {
    navigation && navigation.navigate("LoggedIn");
  };

  const onSignUpButtonPress = () => {
    navigation && navigation.navigate("SignUp4");
  };

  const onForgotPasswordButtonPress = () => {
    navigation && navigation.navigate("ForgotPassword");
  };

  const onPasswordIconPress = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <KeyboardAvoidingView>
      <ImageOverlay
        style={styles.container}
        source={require("./assets/bg.jpg")}
      >
        <View style={styles.headerContainer}>
          <Image
            style={{
              width: 250,
              height: 200,
              resizeMode: "stretch"
            }}
            source={require("./assets/logo.jpg")}
          />
        </View>
        <View style={styles.formContainer}>
          <Input
            status="control"
            placeholder="Нэвтрэх нэр"
            value={email}
            onChangeText={setEmail}
          />
          <Input
            style={styles.passwordInput}
            status="control"
            placeholder="Нүүц үг"
            value={password}
            secureTextEntry={!passwordVisible}
            onChangeText={setPassword}
            onIconPress={onPasswordIconPress}
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
