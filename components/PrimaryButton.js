import { Pressable, StyleSheet, Text } from "react-native";
import { COLORS } from "../utils/theme";

export default function PrimaryButton({ children, onPress, style }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.button, pressed && styles.pressed, style]}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { minHeight: 50, borderRadius: 12, alignItems: "center", justifyContent: "center", backgroundColor: COLORS.orange, paddingHorizontal: 18 },
  text: { color: COLORS.white, fontSize: 13, fontWeight: "800" },
  pressed: { opacity: 0.82 },
});
