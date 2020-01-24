import React from "react";

import { Text, View } from "react-native";

class SearchWarehouse extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    searchText: null
  };

  _handleQueryChange = searchText => {
    this.setState({ searchText });
  };

  _executeSearch = () => {
    alert("do search!");
  };

  render() {
    let { searchText } = this.state;

    return (
      <View>
        <Text>Hi</Text>
      </View>
    );
  }
}

export default SearchWarehouse;
