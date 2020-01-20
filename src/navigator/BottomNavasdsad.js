import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";

import OtherScreen from "../screens/OtherScreen";

const Tab = createBottomTabNavigator(
  {
    //The first prop is the name that will appear on your tab. So, we created Home to receive screen HomeScreen.
    Home: {
      screen: OtherScreen //HomeScreen is our screen
    }
  },
  {
    initialRouteName: "Home"
  }
);

export default createAppContainer(Tab);
