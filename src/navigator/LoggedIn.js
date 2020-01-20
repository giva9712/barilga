import { createBottomTabNavigator } from "react-navigation";

import Dashboard from "../screens/Dashboard";
import Profile from "../screens/Profile";
import OtherScreen from "../screens/OtherScreen";

const LoggedInNavigator = createBottomTabNavigator({
  Dashboard: {
    screen: Dashboard
  },
  Profile: {
    screen: Profile
  },
  OtherScreen: {
    screen: OtherScreen
  }
});

export default LoggedInNavigator;
