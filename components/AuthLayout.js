import { Image, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Brand from "./Brand";
import { images } from "../utils/data";
import { COLORS } from "../utils/theme";
import shared from "../utils/sharedStyles";

// Shared frame for the sign in / sign up screens
export default function AuthLayout({ eyebrow, title, subtitle, children }) {
  return (
    <SafeAreaView style={shared.safe}>
      <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <View style={styles.top}>
          <Brand />
        </View>
        <View style={styles.artwork}>
          <Image source={{ uri: images[0] }} style={styles.image} />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Tvoja digitálna kuchárka</Text>
          </View>
        </View>
        <View style={styles.copy}>
          <Text style={shared.eyebrow}>{eyebrow}</Text>
          <Text style={styles.title}>{title}</Text>
          <Text style={shared.bodyText}>{subtitle}</Text>
        </View>
        <View style={styles.form}>{children}</View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, paddingHorizontal: 22, paddingBottom: 24, backgroundColor: COLORS.canvas },
  top: { paddingTop: 22, paddingBottom: 26 },
  artwork: { height: 190, borderRadius: 22, overflow: "hidden", marginBottom: 28 },
  image: { width: "100%", height: "100%" },
  badge: { position: "absolute", left: 13, bottom: 13, paddingHorizontal: 11, paddingVertical: 7, borderRadius: 12, backgroundColor: "rgba(36,70,48,.9)" },
  badgeText: { color: COLORS.white, fontSize: 9, fontWeight: "800", letterSpacing: 0.7 },
  copy: { marginBottom: 22 },
  title: { color: COLORS.green, fontFamily: "Georgia", fontSize: 31, lineHeight: 36, fontWeight: "700", marginBottom: 7 },
  form: { gap: 12 },
});
