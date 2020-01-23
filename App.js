import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { Provider } from "react-redux";
import { getRootNavigator } from "./src/navigator";
import store from "./src/store/index";
import { getUserToken } from "./src/store/actions";

import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";

import { Root } from "native-base";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;

    this.state = {
      loading: true,
      loggedIn: false
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font
    });
    const loggedIn = (await getUserToken()) ? true : false;
    this.setState({ loggedIn: loggedIn, loading: false });
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.base}>
          <AppLoading size="small" />
        </View>
      );
    }

    const RootNavigator = getRootNavigator(this.state.loggedIn);
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Root>
            <RootNavigator />
          </Root>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
