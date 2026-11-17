import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../utils/theme";

export default function Brand() {
  return (
    <View style={styles.brand}>
      <View style={styles.brandMark}>
        <Text style={styles.brandMarkText}>O</Text>
      </View>
      <Text style={styles.brandText}>
        Ochutnaj<Text style={styles.accent}>.</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  brand: { flexDirection: "row", alignItems: "center", gap: 9 },
  brandMark: { width: 34, height: 34, borderRadius: 17, alignItems: "center", justifyContent: "center", backgroundColor: COLORS.green },
  brandMarkText: { color: COLORS.white, fontFamily: "Georgia", fontSize: 17, fontWeight: "700" },
  brandText: { color: COLORS.green, fontFamily: "Georgia", fontSize: 20, fontWeight: "700" },
  accent: { color: COLORS.orange },
});
