import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";

import WarehouseList from "../screens/WarehouseList";
import WarehouseItems from "../screens/WarehouseItems";
import ItemDetail from "../screens/ItemDetail";
import Profile from "../screens/Profile";

const assetController = createStackNavigator({
  WarehouseList: {
    screen: WarehouseList
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

const LoggedInNavigator = createBottomTabNavigator({
  Dashboard: {
    screen: assetController,
    navigationOptions: {
      title: "Хянах самбар"
    }
  },
  Profile: {
    screen: profileController,
    navigationOptions: {
      title: "Миний"
    }
  }
});

export default LoggedInNavigator;
