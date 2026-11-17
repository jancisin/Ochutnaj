import { StyleSheet } from "react-native";
import { COLORS } from "./theme";

// Styles used by more than one screen / component
export default StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.canvas },
  eyebrow: { color: COLORS.orange, fontSize: 10, fontWeight: "800", letterSpacing: 1.5, marginBottom: 8 },
  bodyText: { color: COLORS.muted, fontSize: 13, lineHeight: 20 },
  avatar: { width: 36, height: 36, borderRadius: 18, alignItems: "center", justifyContent: "center", backgroundColor: COLORS.greenSoft },
  avatarText: { color: COLORS.green, fontSize: 11, fontWeight: "800" },
  backdrop: { flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(18,31,22,.58)" },
  sheet: { maxHeight: "92%", paddingHorizontal: 20, paddingTop: 12, paddingBottom: 28, borderTopLeftRadius: 26, borderTopRightRadius: 26, backgroundColor: COLORS.canvas, gap: 12 },
  sheetHandle: { width: 42, height: 4, borderRadius: 2, alignSelf: "center", backgroundColor: "#C7C9C3", marginBottom: 9 },
  sheetTitle: { color: COLORS.green, fontFamily: "Georgia", fontSize: 29, fontWeight: "700", marginBottom: 4 },
});
