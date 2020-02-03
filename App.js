import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Provider } from "react-redux";

import { store, persistor } from "./src/store/index";
import { PersistGate } from "redux-persist/integration/react";

import { AppLoading, SplashScreen } from "expo";
import { Asset } from "expo-asset";

import { YellowBox } from "react-native";

import Main from "./src/Main";

YellowBox.ignoreWarnings(["Warning: ..."]);

const App = () => {
  const [loading, setLoading] = useState(true);

  _cacheResourcesAsync = async () => {
    const images = [
      require("./assets/images/bg.jpg"),
      require("./assets/images/logo.jpg")
    ];

    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    });

    await Promise.all(cacheImages);
    SplashScreen.hide();
  };

  useEffect(() => {
    setLoading(false);
    _cacheResourcesAsync();
  }, []);

  if (loading) {
    return (
      <View>
        <AppLoading size="small" autoHideSplash={false} />
      </View>
    );
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <Main />
      </PersistGate>
    </Provider>
  );
};

export default App;
