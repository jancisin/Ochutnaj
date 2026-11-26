import { View, TextInput } from "react-native";
import AppText from "./AppText";
import { useTheme } from "../../theme/useTheme";

export default function AppInput({ label, error, ...props }) {
  const { colors, spacing, radius, typography } = useTheme();
  return (
    <View style={{ gap: spacing.xs }}>
      <AppText variant="caption" color="textMuted">
        {label}
      </AppText>
      <TextInput
        placeholderTextColor={colors.textMuted}
        style={[
          typography.body,
          {
            color: colors.text,
            backgroundColor: colors.surface,
            borderWidth: 2,
            borderRadius: radius.sm,
            padding: spacing.md,
            borderColor: error ? colors.danger : colors.border,
          },
        ]}
        {...props}
      />
      {error ? (
        <AppText variant="caption" color="danger">
          {error}
        </AppText>
      ) : null}
    </View>
  );
}
