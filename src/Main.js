import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";

import { getRootNavigator } from "./navigator";
import { store } from "./store";
import NavigationService from "./navigator/NavigationService";

// import { getUserToken } from "./store/actions";

const Main = props => {
  const { rootReducer } = store.getState();
  const [loggedIn, setLoggedIn] = useState(
    !!rootReducer.token && rootReducer.userInfo != {}
  );

  useEffect(() => {}, []);

  const RootNavigator = getRootNavigator(loggedIn);

  return (
    <View style={styles.container}>
      <RootNavigator
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Main;
