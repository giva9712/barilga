import React, { Component } from "react";
import { StyleSheet } from "react-native";
import PTRView from "react-native-pull-to-refresh";

import { Right, Content, List, ListItem, Text, Body, Icon } from "native-base";

export default class WarehouseList extends Component {
  static navigationOptions = {
    title: "Warehouses"
  };
  constructor(props) {
    super(props);
  }
  _gotoWarehouse = item => {
    this.props.navigation.navigate("WarehouseItems", {
      ...item
    });
  };
  _refresh = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  };
  render() {
    return (
      <PTRView onRefresh={this._refresh}>
        <Content>
          <List>
            {this.props.warehouses.map((item, index) => (
              <ListItem
                button={true}
                onPress={() => this._gotoWarehouse(item)}
                key={index}
              >
                <Body>
                  <Text>{item.name}</Text>
                </Body>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
            ))}
          </List>
        </Content>
      </PTRView>
    );
  }
}

const styles = StyleSheet.create({
  base: {
    paddingTop: 15
  }
});

WarehouseList.defaultProps = {
  warehouses: [
    {
      id: 1,
      name: "Warehouse 1"
    },
    {
      id: 2,
      name: "Warehouse 2"
    },
    {
      id: 3,
      name: "Warehouse 3"
    },
    {
      id: 4,
      name: "Warehouse 4"
    },
    {
      id: 5,
      name: "Warehouse 5"
    },
    {
      id: 6,
      name: "Warehouse 6"
    }
  ]
};
