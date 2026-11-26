import { useContext, useState } from "react";
import { View } from "react-native";
import AppText from "../../../components/ui/AppText";
import AppInput from "../../../components/ui/AppInput";
import AppButton from "../../../components/ui/AppButton";
import { useTheme } from "../../../theme/useTheme";

import { AuthContext } from "../../../store/auth-context";
import { login } from "../../../utils/auth";
import { prelozChybu } from "../../../utils/chyby";

export default function SignInScreen({ navigation }) {
  const { colors, spacing } = useTheme();
  const [email, setEmail] = useState("");
  const [heslo, setHeslo] = useState("");
  const [chyba, setChyba] = useState(null);
  const { authenticate } = useContext(AuthContext);
  const [nacitava, setNacitava] = useState(false);
  async function prihlas() {
    setNacitava(true);
    try {
      const data = await login(email.trim().toLowerCase(), heslo);
      authenticate(data);
    } catch (e) {
      setChyba(prelozChybu(e.message));
      setNacitava(false);
    }
  }

  const prihlas = () => {
    if (!email.includes("@")) {
      setChyba("Zadaj platný e-mail");
      return;
    }
    setChyba(null);
    navigation.navigate("Home");
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: spacing.lg,
        gap: spacing.md,
        backgroundColor: colors.background,
      }}
    >
      <AppText variant="title">Prihlásenie</AppText>
      <AppText color="textMuted">Vitaj späť v appke PMA</AppText>
      <AppInput
        label="E-mail"
        value={email}
        onChangeText={setEmail}
        error={chyba}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <AppInput
        label="Heslo"
        value={heslo}
        onChangeText={setHeslo}
        secureTextEntry
      />
      <AppButton title="Prihlásiť sa" onPress={prihlas} />
      <AppButton
        title="Vytvoriť účet"
        variant="secondary"
        onPress={() => navigation.navigate("SignUp")}
      />
    </View>
  );
}
