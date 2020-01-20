import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

export default class ItemDetail extends Component {
  static navigationOptions = {
    title: "Banana"
  };
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.base}>
        <Text>{"Item detail"}</Text>
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
