import { createSwitchNavigator } from "react-navigation";

import LoggedOutNavigator from "./LoggedOut";
// import LoggedInNavigator from "./LoggedIn";

export const getRootNavigator = (loggedIn = false) =>
  createSwitchNavigator(
    {
      LoggedOut: {
        screen: LoggedOutNavigator
      }
    },
    {
      initialRouteName: "LoggedOut"
    }
  );
