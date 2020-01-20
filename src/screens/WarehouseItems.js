import React from "react";
import {
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
  Text
} from "react-native";

import { connect } from "react-redux";
import { removeUserToken } from "../store/actions";

class WarehouseItems extends React.Component {
  static navigationOptions = {
    title: "Items of Warehouse"
  };
  seeDetail = item_id => {
    this.props.navigation.navigate("ItemDetail");
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>
          List of item in warehouse
          <Text onPress={this.seeDetail}>Click here to see detail of Item</Text>
        </Text>
      </View>
    );
  }

  _signOutAsync = () => {
    this.props
      .removeUserToken()
      .then(() => {
        this.props.navigation.navigate("LoggedOut");
      })
      .catch(error => {
        this.setState({ error });
      });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

const mapStateToProps = state => ({
  token: state.token
});

const mapDispatchToProps = dispatch => ({
  removeUserToken: () => dispatch(removeUserToken())
});

export default connect(mapStateToProps, mapDispatchToProps)(WarehouseItems);
