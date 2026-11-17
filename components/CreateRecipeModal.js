import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Input from "./input";
import PrimaryButton from "./PrimaryButton";
import { categories } from "../utils/data";
import { COLORS } from "../utils/theme";
import shared from "../utils/sharedStyles";

export default function CreateRecipeModal({ visible, onClose, onCreate }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Hlavné jedlá");
  const [isPrivate, setPrivate] = useState(false);
  const [image, setImage] = useState("");

  async function chooseImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.85,
    });
    if (!result.canceled) setImage(result.assets[0].uri);
  }

  function save() {
    if (!title.trim()) return;
    onCreate({
      title: title.trim(),
      description: description.trim() || "Nový obľúbený recept.",
      category,
      visibility: isPrivate ? "súkromný" : "verejný",
      image,
    });
    setTitle("");
    setDescription("");
    setPrivate(false);
    setImage("");
  }

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={shared.backdrop} onPress={onClose}>
        <Pressable style={shared.sheet} onPress={() => {}}>
          <View style={shared.sheetHandle} />
          <Text style={shared.eyebrow}>NOVÝ RECEPT</Text>
          <Text style={shared.sheetTitle}>Podeľ sa o svoju chuť</Text>
          <Pressable onPress={chooseImage} style={styles.imagePicker}>
            {image ? (
              <Image source={{ uri: image }} style={styles.imagePreview} />
            ) : (
              <View style={styles.imageEmpty}>
                <Text style={styles.imagePlus}>＋</Text>
                <Text style={styles.imageText}>Vybrať fotografiu</Text>
              </View>
            )}
          </Pressable>
          <Input value={title} onChangeText={setTitle} placeholder="Názov receptu" />
          <Input value={description} onChangeText={setDescription} multiline placeholder="Krátky popis" />
          <Text style={styles.fieldLabel}>KATEGÓRIA</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.choiceRow}>
            {categories.slice(1).map((item) => (
              <Pressable key={item} onPress={() => setCategory(item)} style={[styles.choice, category === item && styles.choiceActive]}>
                <Text style={[styles.choiceText, category === item && styles.choiceTextActive]}>{item}</Text>
              </Pressable>
            ))}
          </ScrollView>
          <Pressable onPress={() => setPrivate(!isPrivate)} style={styles.toggleRow}>
            <View>
              <Text style={styles.toggleTitle}>Súkromný recept</Text>
              <Text style={styles.toggleDescription}>Viditeľný iba pre teba</Text>
            </View>
            <View style={[styles.toggle, isPrivate && styles.toggleActive]}>
              <View style={[styles.toggleDot, isPrivate && styles.toggleDotActive]} />
            </View>
          </Pressable>
          <PrimaryButton onPress={save}>Pridať recept</PrimaryButton>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  imagePicker: { height: 126, borderRadius: 14, overflow: "hidden", borderWidth: 1, borderStyle: "dashed", borderColor: "#BCC2BA", backgroundColor: COLORS.surface },
  imagePreview: { width: "100%", height: "100%" },
  imageEmpty: { flex: 1, alignItems: "center", justifyContent: "center" },
  imagePlus: { color: COLORS.green, fontSize: 27 },
  imageText: { color: COLORS.muted, fontSize: 10, fontWeight: "800", marginTop: 4 },
  fieldLabel: { color: COLORS.text, fontSize: 9, fontWeight: "800", letterSpacing: 1, marginTop: 2 },
  choiceRow: { gap: 7, paddingBottom: 2 },
  choice: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 18, borderWidth: 1, borderColor: COLORS.line, backgroundColor: COLORS.surface },
  choiceActive: { backgroundColor: COLORS.green, borderColor: COLORS.green },
  choiceText: { color: COLORS.muted, fontSize: 10, fontWeight: "700" },
  choiceTextActive: { color: COLORS.white },
  toggleRow: { paddingVertical: 7, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  toggleTitle: { color: COLORS.text, fontSize: 12, fontWeight: "800" },
  toggleDescription: { color: COLORS.muted, fontSize: 9, marginTop: 3 },
  toggle: { width: 44, height: 25, borderRadius: 13, padding: 3, backgroundColor: "#CACDC6" },
  toggleActive: { backgroundColor: COLORS.green },
  toggleDot: { width: 19, height: 19, borderRadius: 10, backgroundColor: COLORS.white },
  toggleDotActive: { transform: [{ translateX: 19 }] },
});
