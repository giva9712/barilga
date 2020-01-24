import React from "react";
import { FlexStyle } from "react-native";
import { EdgeInsets, useSafeArea } from "react-native-safe-area-context";
import { Layout, LayoutElement, LayoutProps } from "@ui-kitten/components";

const INSETS = {
  top: {
    toStyle: insets => ({
      paddingTop: insets.top
    })
  },
  bottom: {
    toStyle: insets => ({
      paddingBottom: insets.bottom
    })
  }
};

Inset = "top" | "bottom";

export const SafeAreaLayout = props => {
  const { insets, style, theme, ...layoutProps } = props;

  const safeAreaInsets = useSafeArea();
  const insetStyles = React.Children.map(insets, inset =>
    INSETS[inset].toStyle(safeAreaInsets)
  );

  return <Layout {...layoutProps} style={[insetStyles, style]} />;
};
