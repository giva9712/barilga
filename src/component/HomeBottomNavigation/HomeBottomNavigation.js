import React from "react";
import { BottomNavigationTab, Divider } from "@ui-kitten/components";
import { SafeAreaLayout } from "../../component/SafeAreaLayoutComponent/SafeAreaLayoutComponent";
import { BrandBottomNavigation } from "../../component/BrandBottomNavigation/BrandBottomNavigation";

// import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { Icon } from "@ui-kitten/components";

import _ from "lodash";

const HomeAssistantIcon = style => (
  <Icon {...style} name="home-assistant" pack="material-community" />
);

const AccountSettings = style => (
  <Icon {...style} name="account-settings" pack="material-community" />
);

const History = style => (
  <Icon {...style} name="history" pack="material-community" />
);

export const HomeBottomNavigation = props => {
  const onSelect = index => {
    props.navigation.navigate(
      _.map(props.navigation.state.routes, "routeName")[index]
    );
  };

  return (
    <SafeAreaLayout insets="bottom">
      <Divider />
      <BrandBottomNavigation
        appearance="noIndicator"
        selectedIndex={props.navigation.state.index}
        onSelect={onSelect}
      >
        <BottomNavigationTab
          title={props.navigation.state.index == 0 && "Агуулах"}
          icon={HomeAssistantIcon}
        />
        <BottomNavigationTab
          title={props.navigation.state.index == 1 && "Түүх"}
          icon={History}
        />
        <BottomNavigationTab
          title={props.navigation.state.index == 2 && "Миний"}
          icon={AccountSettings}
        />
      </BrandBottomNavigation>
    </SafeAreaLayout>
  );
};
