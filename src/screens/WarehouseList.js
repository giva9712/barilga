import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

export default class WarehouseList extends Component {
  static navigationOptions = {
    title: "Хянах самбар"
  };
  gotoWarehouse = warehouse_id => {
    this.props.navigation.navigate("WarehouseItems");
  };
  render() {
    return (
      <View style={styles.base}>
        <Text>
          WareHoust list
          <Text onPress={this.gotoWarehouse}>Click here</Text>
        </Text>
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
