import { Pressable } from "react-native";
import AppText from "./AppText";
import { useTheme } from "../../theme/useTheme";

export default function AppButton({
  title,
  onPress,
  variant = "primary",
  disabled = false,
}) {
  const { colors, spacing, radius } = useTheme();
  const plny = variant === "primary";
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => ({
        backgroundColor: plny ? colors.primary : "transparent",
        borderWidth: 2,
        borderColor: colors.primary,
        borderRadius: radius.md,
        padding: spacing.md,
        alignItems: "center",
        opacity: disabled ? 0.4 : pressed ? 0.75 : 1,
      })}
    >
      <AppText variant="subtitle" color={plny ? "onPrimary" : "primary"}>
        {title}
      </AppText>
    </Pressable>
  );
}
