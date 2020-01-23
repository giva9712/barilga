import React, { Component } from "react";
import { StyleSheet, Platform, View } from "react-native";
import PTRView from "react-native-pull-to-refresh";

import {
  Right,
  Left,
  Content,
  List,
  ListItem,
  H3,
  Text,
  Body,
  Badge,
  Icon,
  Spinner
} from "native-base";
import { BorderlessButton } from "react-native-gesture-handler";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import SearchLayout from "react-navigation-addon-search-layout";

class WarehouseList extends Component {
  _isMounted = false;
  static navigationOptions = ({ navigation }) => ({
    title: "Warehouses",
    headerRight: (
      <BorderlessButton
        onPress={() => navigation.navigate("SearchWarehouse")}
        style={{ marginRight: 15 }}
      >
        <Ionicons
          name="md-search"
          size={Platform.OS === "ios" ? 22 : 25}
          color={SearchLayout.DefaultTintColor}
        />
      </BorderlessButton>
    )
  });

  constructor(props) {
    super(props);
  }
  state = {
    loading: false
  };

  componentDidMount() {
    this._isMounted = true;
    this._fetchData();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  _fetchData = () => {
    this.setState({
      loading: true
    });
    new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 300);
    }).then(() => {
      this.setState({
        loading: false
      });
    });
  };
  _gotoWarehouse = item => {
    this.props.navigation.navigate("WarehouseItems", {
      ...item
    });
  };
  _refresh = () => {
    this._fetchData();
  };
  render() {
    return (
      <PTRView onRefresh={this._refresh}>
        <Content>
          {this.state.loading ? (
            <Spinner />
          ) : (
            <List>
              {this.props.warehouses.map((item, index) => (
                <ListItem
                  button={true}
                  onPress={() => this._gotoWarehouse(item)}
                  key={index}
                >
                  <Body>
                    <H3>{item.name}</H3>
                    {/* <View>
                      <Text>Types:</Text>
                      <Badge>{item.category_count}</Badge>
                      <Text>Items: {item.total_items_count}</Text>
                    </View> */}
                    {/* <View style={styles.badges}>
                      <Badge>
                        <Text>{item.description}</Text>
                      </Badge>
                    </View> */}
                  </Body>
                  <Right>
                    {/* <Icon name="arrow-forward" /> */}
                    {/* <Badge info>
                      <Text>{item.types}</Text>
                    </Badge> */}
                    <Badge style={{ backgroundColor: "black" }}>
                      <Text style={{ color: "white" }}>{item.total_items}</Text>
                    </Badge>
                  </Right>
                </ListItem>
              ))}
            </List>
          )}
        </Content>
      </PTRView>
    );
  }
}

const styles = StyleSheet.create({
  base: {
    paddingTop: 15
  },
  badges: {
    marginTop: 10,
    marginLeft: 10,
    flexDirection: "row",
    alignSelf: "flex-start"
  }
});

WarehouseList.defaultProps = {
  warehouses: [
    {
      id: 1,
      name: "Warehouse 1",
      description: "Bairshil 1",
      types: 1,
      total_items: 123
    },
    {
      id: 2,
      name: "Warehouse 2",
      description: "Bairshil 2",
      types: 4,
      total_items: 521
    },
    {
      id: 3,
      name: "Warehouse 3",
      description: "Bairshil 3",
      types: 9,
      total_items: 2313
    },
    {
      id: 4,
      name: "Warehouse 4",
      description: "Bairshil 4",
      types: 4,
      total_items: 341
    },
    {
      id: 5,
      name: "Warehouse 5",
      description: "Bairshil 5",
      types: 7,
      total_items: 5133
    },
    {
      id: 6,
      name: "Warehouse 6",
      description: "Bairshil 6",
      types: 2,
      total_items: 5123
    },
    {
      id: 7,
      name: "Warehouse 7",
      description: "Bairshil 7",
      types: 8,
      total_items: 412
    }
  ]
};

export default WarehouseList;
