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
import PTRView from "react-native-pull-to-refresh";

class WarehouseItems extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.name}`
  });
  constructor(props) {
    super(props);
  }

  seeDetail = item_id => {
    this.props.navigation.navigate("ItemDetail");
  };
  render() {
    return (
      <PTRView onRefresh={this._refresh}>
        <View style={styles.container}>
          <Text>
            List of item in warehouse
            <Text onPress={this.seeDetail}>
              Click here to see detail of Item
            </Text>
          </Text>
        </View>
      </PTRView>
    );
  }

  _refresh = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 2000);
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
