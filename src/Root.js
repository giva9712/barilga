import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Provider } from "react-redux";
// import { getRootNavigator } from "./navigator";
import store from "./store/index";

export default class Root extends React.Component {
  //   constructor(props) {
  //     super(props);
  //     console.disableYellowBox = true;

  //     this.state = {
  //       loading: true,
  //       loggedIn: false
  //     };
  //   }

  //   async componentDidMount() {
  //     const loggedIn = await isLoggedIn();
  //     this.setState({ loggedIn: false, loading: false });
  //   }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>{/* <RootNavigator /> */}</View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
