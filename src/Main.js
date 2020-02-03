import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { getRootNavigator } from "./navigator";

// import { getUserToken } from "./store/actions";

import { AppLoading } from "expo";

import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { mapping, light as lightTheme } from "@eva-design/eva";

import { YellowBox } from "react-native";

import { default as appTheme } from "../custom-theme.json";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { SplashScreen } from "expo";

import {
  MaterialCommunityIcons,
  Ionicons,
  FeatherIcons
} from "./component/IconMapper/IconMapper";

const theme = { ...lightTheme, ...appTheme };
YellowBox.ignoreWarnings(["Warning: ..."]);

const Main = props => {
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {}, []);

  if (loading) {
    return (
      <View style={styles.base}>
        <AppLoading size="small" />
      </View>
    );
  }
  const RootNavigator = getRootNavigator(loggedIn);

  return (
    <SafeAreaProvider>
      <IconRegistry
        icons={[EvaIconsPack, MaterialCommunityIcons, Ionicons, FeatherIcons]}
      />
      <View style={styles.container}>
        <ApplicationProvider mapping={mapping} theme={theme}>
          <RootNavigator />
        </ApplicationProvider>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Main;
