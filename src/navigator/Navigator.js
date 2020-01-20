import React from "react";
import HomeScreen from "../screens/HomeScreen";
import SignInScreen from "../screens/SignInScreen";
import OtherScreen from "../screens/OtherScreen";
import AuthLoadingScreen from "../screens/AuthLoadingScreen";

import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

export const AppStack = createStackNavigator({
  Home: { screen: HomeScreen },
  Other: {
    screen: OtherScreen
  }
});
export const AuthStack = createStackNavigator({
  SignIn: { screen: SignInScreen }
});

export const AppNavigator = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);
