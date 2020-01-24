import React from "react";
import {
  Appearance,
  AppearancePreferences,
  ColorSchemeName
} from "react-native-appearance";

export class Theming {
  static Context = React.createContext(null);

  /**
   * @see ThemeContextValue
   *
   * Creates context value with standard configuration:
   *
   * - `currentTheme` is set depending on current appearance set on the device.
   * - `setCurrentTheme` will be called when device appearance is changed.
   * - `isDarkMode` returns true if current device appearance is `dark`.
   * - `createTheme` will take an `upstreamTheme` and merge it with `currentTheme`.
   *
   * @param {Record<Theme, any>} themes - set of themes available in app.
   * @param {Theme} preferredTheme - name of theme that will be applied if there is no preferred appearance set.
   *
   * @returns {[ThemeContextValue, any]} - array of two values:
   * - value to be set in `ThemeContext.Provider`
   * - and theme picked from `themes` param.
   */
  static useTheming = (themes, preferredTheme) => {
    const deviceAppearance = Appearance.getColorScheme();
    const deviceAppearanceTheme = Theming.createAppearanceTheme(
      deviceAppearance,
      preferredTheme
    );

    const [currentTheme, setCurrentTheme] = React.useState(
      deviceAppearanceTheme
    );

    React.useEffect(() => {
      const subscription = Appearance.addChangeListener(preferences => {
        const appearanceTheme = Theming.createAppearanceTheme(
          preferences.colorScheme,
          preferredTheme
        );
        setCurrentTheme(appearanceTheme);
      });

      return () => subscription.remove();
    }, []);

    const isDarkMode = () => {
      return currentTheme === "dark";
    };

    const createTheme = upstreamTheme => {
      return { ...themes[currentTheme], ...themes[upstreamTheme] };
    };

    const themeContext = {
      currentTheme,
      setCurrentTheme,
      isDarkMode,
      createTheme
    };

    return [themeContext, themes[currentTheme]];
  };

  static useTheme = upstreamTheme => {
    const themeContext = React.useContext(Theming.Context);
    return themeContext.createTheme(upstreamTheme);
  };

  static createAppearanceTheme = (appearance, preferredTheme) => {
    if (appearance === "no-preference") {
      return preferredTheme;
    }
    return appearance;
  };
}
