import React, { useEffect, useState } from "react";
import { View, Image, ActivityIndicator } from "react-native";
import { Provider } from "react-redux";

import { store, persistor } from "./src/store/index";
import { PersistGate } from "redux-persist/integration/react";

import { AppLoading, SplashScreen } from "expo";
import { Asset } from "expo-asset";

import { YellowBox } from "react-native";

import { SafeAreaProvider } from "react-native-safe-area-context";

import { EvaIconsPack } from "@ui-kitten/eva-icons";

import {
  MaterialCommunityIcons,
  Ionicons,
  FeatherIcons
} from "./src/component/IconMapper/IconMapper";

import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { mapping, light as lightTheme } from "@eva-design/eva";

import Main from "./src/Main";

YellowBox.ignoreWarnings(["Warning: ..."]);

const App = () => {
  const [isSplashReady, setIsSplashReady] = useState(false);
  const [isAppReady, setIsAppReady] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  _cacheSplashResourcesAsync = async () => {
    const splashBackground = require("./assets/splash.png");
    return Asset.fromModule(splashBackground).downloadAsync();
  };

  _cacheResourcesAsync = async () => {
    SplashScreen.hide();
    const images = [
      require("./assets/images/bg.jpg"),
      require("./assets/images/logo.jpg")
    ];

    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    });

    await Promise.all(cacheImages);
    setIsAppReady(true);
  };

  useEffect(() => {
    console.log("mounted");
    setIsMounted(true);
  }, []);

  let MainApp = <Main />;

  if (!isSplashReady) {
    return (
      <View>
        <AppLoading
          startAsync={_cacheSplashResourcesAsync}
          onFinish={() => setIsSplashReady(true)}
          onError={console.warn}
          autoHideSplash={false}
        />
      </View>
    );
  }
  if (!isAppReady) {
    MainApp = (
      <View
        style={{
          flex: 1,
          backgroundColor: "#00aff0",
          justifyContent: "center"
        }}
      >
        <Image
          style={{
            flex: 1,
            resizeMode: "contain",
            width: undefined,
            height: undefined
          }}
          source={require("./assets/splash.png")}
          onLoad={_cacheResourcesAsync}
        />
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <ActivityIndicator size="large" color="#fff" />
        </View>
      </View>
    );
  } else {
    MainApp = <Main />;
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <SafeAreaProvider>
          <IconRegistry
            icons={[
              EvaIconsPack,
              MaterialCommunityIcons,
              Ionicons,
              FeatherIcons
            ]}
          />
          <ApplicationProvider mapping={mapping} theme={lightTheme}>
            {MainApp}
          </ApplicationProvider>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
