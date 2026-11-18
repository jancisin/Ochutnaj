import { useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native"; 
import AuthLayout from "../components/AuthLayout";
import Input from "../components/input";
import PrimaryButton from "../components/PrimaryButton";
import { COLORS } from "../utils/theme";

export default function SiO({ users, onRegister }) { 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigation = useNavigation();

  function submit() {
    if (!name.trim() || !email.trim() || password.length < 6) {
      return setError("Vyplň meno, e-mail a heslo s aspoň 6 znakmi.");
    }
    if (users.some((item) => item.email.toLowerCase() === email.trim().toLowerCase())) {
      return setError("Účet s týmto e-mailom už existuje.");
    }
    onRegister({ name: name.trim(), email: email.trim(), password });
  }

  return (
    <AuthLayout
      eyebrow="PRIDAJ SA K NÁM"
      title="Vytvor si účet"
      subtitle="Začni si tvoriť kuchárku podľa vlastnej chuti."
    >
      <Input value={name} onChangeText={setName} placeholder="Meno a priezvisko" />
      <Input value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" placeholder="E-mail" />
      <Input value={password} onChangeText={setPassword} secureTextEntry placeholder="Heslo" />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <PrimaryButton onPress={submit}>Vytvoriť účet</PrimaryButton>
      
      <Pressable onPress={() => navigation.goBack()} style={styles.switchButton}>
        <Text style={styles.switchText}>Už máš účet?  Prihlás sa</Text>
      </Pressable>
    </AuthLayout>
  );
}