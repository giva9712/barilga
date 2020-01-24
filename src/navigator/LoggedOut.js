import { createStackNavigator } from "react-navigation";

import Login from "../screens/Login/Login";

const LoggedOutNavigator = createStackNavigator(
  {
    Login: {
      screen: Login
    }
  },
  {
    headerMode: "none"
  }
);

export default LoggedOutNavigator;
