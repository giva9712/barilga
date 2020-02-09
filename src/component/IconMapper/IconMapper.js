import React from "react";
import { StyleSheet } from "react-native";
import MaterialCommunityIconsParent from "@expo/vector-icons/MaterialCommunityIcons";
import IoniconsParent from "@expo/vector-icons/Ionicons";
import FeatherIconsParent from "@expo/vector-icons/Feather";

export const MaterialCommunityIcons = {
  name: "material-community",
  icons: createIconsMap()
};

function createIconsMap() {
  return new Proxy(
    {},
    {
      get(target, name) {
        return IconProvider(name);
      }
    }
  );
}

const IconProvider = name => ({
  toReactElement: props => MaterialIcon({ name, ...props })
});

function MaterialIcon({ name, style, onPress }) {
  const { height, tintColor, ...iconStyle } = StyleSheet.flatten(style);
  return (
    <MaterialCommunityIconsParent
      name={name}
      size={height}
      color={tintColor}
      style={iconStyle}
      onPress={onPress}
    />
  );
}

export const Ionicons = {
  name: "ionicons",
  icons: IoniconscreateIconsMap()
};

function IoniconscreateIconsMap() {
  return new Proxy(
    {},
    {
      get(target, name) {
        return IoniconsIconProvider(name);
      }
    }
  );
}

const IoniconsIconProvider = name => ({
  toReactElement: props => IoniconsIcons({ name, ...props })
});

function IoniconsIcons({ name, style, onPress }) {
  const { height, tintColor, ...iconStyle } = StyleSheet.flatten(style);
  return (
    <IoniconsParent
      name={name}
      size={height}
      color={tintColor}
      style={iconStyle}
      onPress={onPress}
    />
  );
}

export const FeatherIcons = {
  name: "feather",
  icons: FeatherIconscreateIconsMap()
};

function FeatherIconscreateIconsMap() {
  return new Proxy(
    {},
    {
      get(target, name) {
        return FeatherIconsIconProvider(name);
      }
    }
  );
}

const FeatherIconsIconProvider = name => ({
  toReactElement: props => FeatherIconsIcons({ name, ...props })
});

function FeatherIconsIcons({ name, style, onPress }) {
  const { height, tintColor, ...iconStyle } = StyleSheet.flatten(style);
  return (
    <FeatherIconsParent
      name={name}
      size={height}
      color={tintColor}
      style={iconStyle}
      onPress={onPress}
    />
  );
}
