import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { Provider } from "react-redux";
import { getRootNavigator } from "./src/navigator";
import store from "./src/store/index";
import { getUserToken } from "./src/store/actions";

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
          <ActivityIndicator size="small" />
        </View>
      );
    }

    const RootNavigator = getRootNavigator(this.state.loggedIn);
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <RootNavigator />
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
