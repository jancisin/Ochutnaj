import { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import AppText from "../../components/ui/AppText";
import AppButton from "../../components/ui/AppButton";
import { AuthContext } from "../../store/auth-context";
import { nacitajProfil } from "../../util/database";
export default function HomeScreen() {
  const { user, logout } = useContext(AuthContext);
  const [profil, setProfil] = useState(null);
  useEffect(() => {
    nacitajProfil(user.uid, user.token).then(setProfil).catch(logout);
  }, [user]);
  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 24, gap: 16 }}>
      <AppText variant="title">Ahoj, {profil?.meno ?? "…"}</AppText>
      <AppText color="textMuted">{user.email}</AppText>
      <AppButton title="Odhlásiť sa" variant="secondary" onPress={logout} />
    </View>
  );
}
