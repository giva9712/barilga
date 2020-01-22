import {
  // createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";

import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import WarehouseList from "../screens/WarehouseList";
import SearchWarehouse from "../screens/SearchWarehouse";
import WarehouseItems from "../screens/WarehouseItems";
import ItemDetail from "../screens/ItemDetail";
import Profile from "../screens/Profile";

import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

import React from "react";

const assetController = createStackNavigator({
  WarehouseList: {
    screen: WarehouseList
  },
  SearchWarehouse: {
    screen: SearchWarehouse
  },
  WarehouseItems: {
    screen: WarehouseItems
  },
  ItemDetail: {
    screen: ItemDetail
  }
});

const profileController = createStackNavigator({
  Profile: {
    screen: Profile
  }
});

const LoggedInNavigator = createMaterialBottomTabNavigator(
  {
    Dashboard: {
      screen: assetController,
      navigationOptions: {
        tabBarLabel: "Warehouses",
        tabBarIcon: ({ focused, horizontal, tintColor }) => (
          <MaterialCommunityIcons
            name="home-assistant"
            size={25}
            color={tintColor}
          />
        )
      }
    },
    Profile: {
      screen: profileController,
      navigationOptions: {
        tabBarLabel: "Profile",
        tabBarIcon: ({ focused, horizontal, tintColor }) => (
          <Ionicons name="md-settings" size={25} color={tintColor} />
        )
      }
    }
  },
  {
    labeled: false
  }
);

export default LoggedInNavigator;
