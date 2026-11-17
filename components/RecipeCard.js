import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../utils/theme";

export default function RecipeCard({ recipe, author, canDelete, onDelete }) {
  return (
    <View style={styles.card}>
      <View>
        <Image source={{ uri: recipe.image }} style={styles.image} />
        <View style={styles.visibility}>
          <Text style={styles.visibilityText}>{recipe.visibility === "súkromný" ? "SÚKROMNÝ" : "VEREJNÝ"}</Text>
        </View>
        {canDelete && (
          <Pressable onPress={onDelete} style={styles.deleteButton}>
            <Text style={styles.deleteText}>×</Text>
          </Pressable>
        )}
      </View>
      <View style={styles.body}>
        <View style={styles.metaRow}>
          <Text style={styles.categoryText}>{recipe.category.toUpperCase()}</Text>
          <Text style={styles.timeText}>{recipe.time} min</Text>
        </View>
        <Text style={styles.title}>{recipe.title}</Text>
        <Text style={styles.description}>{recipe.description}</Text>
        <View style={styles.footer}>
          <View style={styles.author}>
            <View style={styles.avatarSmall}>
              <Text style={styles.avatarSmallText}>{author?.initials}</Text>
            </View>
            <View>
              <Text style={styles.authorLabel}>PRIDAL/A</Text>
              <Text style={styles.authorName}>{author?.name}</Text>
            </View>
          </View>
          <Text style={styles.difficulty}>{recipe.difficulty}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { marginHorizontal: 16, marginTop: 17, borderRadius: 18, overflow: "hidden", backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.line, shadowColor: "#25352B", shadowOpacity: 0.08, shadowRadius: 16, shadowOffset: { width: 0, height: 7 }, elevation: 3 },
  image: { width: "100%", height: 235, backgroundColor: COLORS.line },
  visibility: { position: "absolute", top: 12, left: 12, paddingHorizontal: 10, paddingVertical: 7, borderRadius: 16, backgroundColor: "rgba(255,254,250,.94)" },
  visibilityText: { color: COLORS.green, fontSize: 8, fontWeight: "800", letterSpacing: 0.5 },
  deleteButton: { position: "absolute", top: 12, right: 12, width: 34, height: 34, borderRadius: 17, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(255,254,250,.94)" },
  deleteText: { color: COLORS.danger, fontSize: 24, lineHeight: 25 },
  body: { padding: 17 },
  metaRow: { flexDirection: "row", justifyContent: "space-between" },
  categoryText: { color: COLORS.orange, fontSize: 8, fontWeight: "800", letterSpacing: 1 },
  timeText: { color: COLORS.muted, fontSize: 9 },
  title: { color: COLORS.green, fontFamily: "Georgia", fontSize: 22, lineHeight: 27, fontWeight: "700", marginTop: 9 },
  description: { color: COLORS.muted, fontSize: 12, lineHeight: 18, marginTop: 8, marginBottom: 15 },
  footer: { paddingTop: 13, borderTopWidth: 1, borderTopColor: "#E9E6DE", flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  author: { flexDirection: "row", alignItems: "center", gap: 8 },
  avatarSmall: { width: 29, height: 29, borderRadius: 15, alignItems: "center", justifyContent: "center", backgroundColor: COLORS.greenSoft },
  avatarSmallText: { color: COLORS.green, fontSize: 8, fontWeight: "800" },
  authorLabel: { color: "#A1A49E", fontSize: 7 },
  authorName: { color: COLORS.text, fontSize: 10, fontWeight: "700", marginTop: 2 },
  difficulty: { color: COLORS.muted, fontSize: 9, borderWidth: 1, borderColor: COLORS.line, borderRadius: 14, paddingHorizontal: 9, paddingVertical: 5 },
});
