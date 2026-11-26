import { useColorScheme } from "react-native";
import { colors } from "./colors";
import { spacing, radius, typography, shadow } from "./tokens";

export function useTheme() {
  const scheme = useColorScheme(); // 'light' alebo 'dark'
  const isDark = scheme === "dark";

  return {
    isDark,
    colors: isDark ? colors.dark : colors.light,
    spacing,
    radius,
    typography,
    shadow,
  };
}
