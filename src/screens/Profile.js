import React, { Component } from "react";
import { View, StyleSheet, Button } from "react-native";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    // this.onLogout = this.onLogout.bind(this);
  }

  // async onLogout() {
  //   await logout();
  //   this.props.navigation.navigate("Login");
  // }

  render() {
    return (
      <View style={styles.base}>
        <Button title="Logout" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
