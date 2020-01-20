import { createBottomTabNavigator } from "react-navigation-tabs";

import Dashboard from "../screens/Dashboard";
import Profile from "../screens/Profile";

const LoggedInNavigator = createBottomTabNavigator({
  Dashboard: {
    screen: Dashboard
  },
  Profile: {
    screen: Profile
  }
});

export default LoggedInNavigator;
