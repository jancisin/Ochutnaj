import { useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import AuthLayout from "../components/AuthLayout";
import Input from "../components/input";
import PrimaryButton from "../components/PrimaryButton";
import { COLORS } from "../utils/theme";

// Sign in
export default function SiI({ users, onLogin, navigation }) {
  const [email, setEmail] = useState("lucia@ochutnaj.sk");
  const [password, setPassword] = useState("recept123");
  const [error, setError] = useState("");

  function submit() {
    const user = users.find((item) => item.email.toLowerCase() === email.trim().toLowerCase() && item.password === password);
    if (!user) return setError("Nesprávny e-mail alebo heslo.");
    onLogin(user.id);
  }

  return (
    <AuthLayout eyebrow="VITAJ SPÄŤ" title="Prihlás sa do kuchyne" subtitle="Tvoje obľúbené recepty na teba čakajú.">
      <Input value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" placeholder="E-mail" />
      <Input value={password} onChangeText={setPassword} secureTextEntry placeholder="Heslo" />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <PrimaryButton onPress={submit}>Prihlásiť sa</PrimaryButton>
      <Pressable onPress={() => navigation.navigate("SiO")} style={styles.switchButton}>
        <Text style={styles.switchText}>Nemáš účet? Zaregistruj sa</Text>
      </Pressable>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  error: { color: COLORS.danger, backgroundColor: "#F7E7E1", padding: 10, borderRadius: 9, fontSize: 11, fontWeight: "700" },
  switchButton: { alignItems: "center", padding: 8 },
  switchText: { color: COLORS.orange, fontSize: 11, fontWeight: "800" },
});
