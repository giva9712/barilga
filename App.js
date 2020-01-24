import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { Provider } from "react-redux";
import { getRootNavigator } from "./src/navigator";
import store from "./src/store/index";
import { getUserToken } from "./src/store/actions";

import { AppLoading } from "expo";

import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { mapping, light as lightTheme } from "@eva-design/eva";

import { YellowBox } from "react-native";

import { default as appTheme } from "./custom-theme.json";

import { SafeAreaProvider } from "react-native-safe-area-context";

import {
  MaterialCommunityIcons,
  Ionicons
} from "./src/component/IconMapper/IconMapper";

const theme = { ...lightTheme, ...appTheme };
YellowBox.ignoreWarnings(["Warning: ..."]);

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
        <SafeAreaProvider>
          <IconRegistry
            icons={[EvaIconsPack, MaterialCommunityIcons, Ionicons]}
          />
          <View style={styles.container}>
            <ApplicationProvider mapping={mapping} theme={theme}>
              <RootNavigator />
            </ApplicationProvider>
          </View>
        </SafeAreaProvider>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
