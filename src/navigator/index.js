import { createSwitchNavigator, createAppContainer } from "react-navigation";

import LoggedOutNavigator from "./LoggedOut";
import LoggedInNavigator from "./LoggedIn";

export const getRootNavigator = () =>
  createAppContainer(
    createSwitchNavigator(
      {
        LoggedOut: {
          screen: LoggedOutNavigator
        },
        LoggedIn: {
          screen: LoggedInNavigator
        }
      },
      {
        initialRouteName: "LoggedOut"
      }
    )
  );
