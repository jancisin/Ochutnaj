import { useContext, useState } from "react";
import { View } from "react-native";
import { AuthContext } from "../../../store/auth-context";
import { createUser } from "../../../utils/auth";
import { ulozProfil } from "../../../utils/database";
import { prelozChybu } from "../../../utils/chyby";
import AppText from "../../../components/ui/AppText";
import AppInput from "../../../components/ui/AppInput";
import AppButton from "../../../components/ui/AppButton";

export default function SignUpScreen() {
  const { authenticate } = useContext(AuthContext);
  const [meno, setMeno] = useState("");
  const [email, setEmail] = useState("");
  const [heslo, setHeslo] = useState("");
  const [chyba, setChyba] = useState(null);
  const [nacitava, setNacitava] = useState(false);

  async function registruj() {
    const cistyEmail = email.trim().toLowerCase();
    if (!cistyEmail.includes("@") || heslo.length < 6) {
      setChyba("Zadaj platný e-mail a heslo aspoň 6 znakov.");
      return;
    }
    setChyba(null);
    setNacitava(true);
    try {
      const data = await createUser(cistyEmail, heslo);
      await ulozProfil(data.localId, data.idToken, {
        meno: meno.trim(),
        email: cistyEmail,
        vytvorene: new Date().toISOString(),
      });
      authenticate(data);
    } catch (e) {
      setChyba(prelozChybu(e.message));
      setNacitava(false);
    }
  }
  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 24, gap: 16 }}>
      <AppText variant="title">Registrácia</AppText>
      <AppInput label="Meno" value={meno} onChangeText={setMeno} />
      <AppInput
        label="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <AppInput
        label="Heslo"
        value={heslo}
        onChangeText={setHeslo}
        secureTextEntry
        error={chyba}
      />
      <AppButton
        title={nacitava ? "Vytváram účet…" : "Zaregistrovať sa"}
        onPress={registruj}
        disabled={nacitava}
      />
    </View>
  );
}
