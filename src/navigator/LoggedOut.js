import { createStackNavigator } from "react-navigation-stack";

import Login from "../screens/Login";

const LoggedOutNavigator = createStackNavigator({
  Login: {
    screen: Login
  }
});

export default LoggedOutNavigator;
