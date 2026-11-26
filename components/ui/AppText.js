import { Text } from "react-native";
import { useTheme } from "../../theme/useTheme";

export default function AppText({
  variant = "body",
  color = "text",
  style,
  children,
  ...props
}) {
  const { colors, typography } = useTheme();

  return (
    <Text
      style={[typography[variant], { color: colors[color] }, style]}
      {...props}
    >
      {children}
    </Text>
  );
}
