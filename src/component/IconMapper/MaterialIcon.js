import React from "react";
import { StyleSheet } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

export const MaterialIconsPack = {
  name: "material",
  icons: createIconsMap(),
};

function createIconsMap() {
  return new Proxy(
    {},
    {
      get(target, name) {
        return IconProvider(name);
      },
    }
  );
}

const IconProvider = (name) => ({
  toReactElement: (props) => MaterialIcon({ name, ...props }),
});

function MaterialIcon({ name, style, onPress }) {
  const { height, tintColor, ...iconStyle } = StyleSheet.flatten(style);
  return (
    <Icon
      name={name}
      size={height}
      color={tintColor}
      style={iconStyle}
      onPress={onPress}
    />
  );
}
