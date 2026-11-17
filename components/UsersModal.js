import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import PrimaryButton from "./PrimaryButton";
import { COLORS } from "../utils/theme";
import shared from "../utils/sharedStyles";

export default function UsersModal({ visible, users, onClose, onToggleRole }) {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={shared.backdrop} onPress={onClose}>
        <Pressable style={shared.sheet} onPress={() => {}}>
          <View style={shared.sheetHandle} />
          <Text style={shared.eyebrow}>SPRÁVA KOMUNITY</Text>
          <Text style={shared.sheetTitle}>Používatelia a roly</Text>
          <Text style={shared.bodyText}>Ako majiteľ môžeš udeliť alebo odobrať moderátorské práva.</Text>
          <ScrollView style={styles.list}>
            {users.map((user) => (
              <View key={user.id} style={styles.row}>
                <View style={shared.avatar}>
                  <Text style={shared.avatarText}>{user.initials}</Text>
                </View>
                <View style={styles.copy}>
                  <Text style={styles.name}>{user.name}</Text>
                  <Text style={styles.role}>{user.role}</Text>
                </View>
                {user.role !== "majiteľ" && (
                  <Pressable onPress={() => onToggleRole(user.id)} style={styles.roleButton}>
                    <Text style={styles.roleButtonText}>{user.role === "moderátor" ? "Odobrať" : "Moderátor"}</Text>
                  </Pressable>
                )}
              </View>
            ))}
          </ScrollView>
          <PrimaryButton onPress={onClose}>Hotovo</PrimaryButton>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  list: { maxHeight: 330, marginVertical: 4 },
  row: { minHeight: 62, flexDirection: "row", alignItems: "center", gap: 10, borderBottomWidth: 1, borderBottomColor: COLORS.line },
  copy: { flex: 1 },
  name: { color: COLORS.text, fontSize: 12, fontWeight: "800" },
  role: { color: COLORS.muted, fontSize: 9, marginTop: 3, textTransform: "capitalize" },
  roleButton: { borderWidth: 1, borderColor: COLORS.line, borderRadius: 9, paddingHorizontal: 10, paddingVertical: 8 },
  roleButtonText: { color: COLORS.green, fontSize: 9, fontWeight: "800" },
});
