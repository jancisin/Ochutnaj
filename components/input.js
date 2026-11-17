import { StyleSheet, TextInput } from "react-native";
import { COLORS, PLACEHOLDER_COLOR } from "../utils/theme";

// Standard text field. Pass `multiline` for the taller description box.
export default function Input({ style, multiline, ...props }) {
  return (
    <TextInput
      placeholderTextColor={PLACEHOLDER_COLOR}
      multiline={multiline}
      style={[styles.input, multiline && styles.textarea, style]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: { height: 49, borderRadius: 12, borderWidth: 1, borderColor: "#D5D7D0", backgroundColor: COLORS.surface, color: COLORS.text, paddingHorizontal: 14, fontSize: 13 },
  textarea: { height: 90, paddingTop: 13, textAlignVertical: "top" },
});
