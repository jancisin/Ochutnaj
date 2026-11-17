import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Brand from "../components/Brand";
import CreateRecipeModal from "../components/CreateRecipeModal";
import RecipeCard from "../components/RecipeCard";
import UsersModal from "../components/UsersModal";
import { categories } from "../utils/data";
import { canDeleteRecipe, confirmDelete } from "../utils/helpers";
import { COLORS } from "../utils/theme";
import shared from "../utils/sharedStyles";

// Main screen (after sign in)
export default function MainS({
  users,
  recipes,
  activeUser,
  onLogout,
  onAddRecipe,
  onRemoveRecipe,
  onToggleModerator,
}) {
  const [view, setView] = useState("objavovať");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Všetky");
  const [createOpen, setCreateOpen] = useState(false);
  const [usersOpen, setUsersOpen] = useState(false);

  const visibleRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const canSee = recipe.visibility === "verejný" || recipe.authorId === activeUser.id;
      const inView = view === "objavovať" || recipe.authorId === activeUser.id;
      const inCategory = category === "Všetky" || recipe.category === category;
      const matchesSearch = recipe.title.toLowerCase().includes(search.toLowerCase());
      return canSee && inView && inCategory && matchesSearch;
    });
  }, [activeUser, category, recipes, search, view]);

  const isDiscover = view === "objavovať";

  return (
    <SafeAreaView style={shared.safe}>
      <View style={styles.app}>
        <View style={styles.header}>
          <Brand />
          <Pressable onPress={onLogout} style={shared.avatar}>
            <Text style={shared.avatarText}>{activeUser.initials}</Text>
          </Pressable>
        </View>

        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.hero}>
            <Text style={shared.eyebrow}>{isDiscover ? "KUCHYŇA PLNÁ NÁPADOV" : "TVOJA OSOBNÁ KUCHÁRKA"}</Text>
            <Text style={styles.heroTitle}>{isDiscover ? "Čo dnes navaríme?" : "Moje recepty"}</Text>
            <Text style={shared.bodyText}>
              {isDiscover ? "Objav chute komunity a podeľ sa o vlastné recepty." : "Všetky tvoje recepty na jednom mieste."}
            </Text>
            <View style={styles.roleCard}>
              <View style={styles.roleMark}>
                <Text style={styles.roleMarkText}>✓</Text>
              </View>
              <View>
                <Text style={styles.roleLabel}>AKTÍVNA ROLA</Text>
                <Text style={styles.roleName}>{activeUser.role}</Text>
              </View>
            </View>
          </View>

          <View style={styles.searchBox}>
            <Text style={styles.searchIcon}>⌕</Text>
            <TextInput value={search} onChangeText={setSearch} placeholder="Hľadať recept..." placeholderTextColor="#999D96" style={styles.searchInput} />
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categories}>
            {categories.map((item) => (
              <Pressable key={item} onPress={() => setCategory(item)} style={[styles.pill, category === item && styles.pillActive]}>
                <Text style={[styles.pillText, category === item && styles.pillTextActive]}>{item}</Text>
              </Pressable>
            ))}
          </ScrollView>

          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionKicker}>{category === "Všetky" ? "VYBRANÉ PRE TEBA" : category.toUpperCase()}</Text>
              <Text style={styles.sectionTitle}>{isDiscover ? "Najnovšie recepty" : "Tvoja zbierka"}</Text>
            </View>
            <Text style={styles.count}>{visibleRecipes.length}</Text>
          </View>

          {visibleRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              author={users.find((user) => user.id === recipe.authorId)}
              canDelete={canDeleteRecipe(recipe, activeUser, users)}
              onDelete={() => confirmDelete(recipe, () => onRemoveRecipe(recipe.id))}
            />
          ))}

          {!visibleRecipes.length && (
            <View style={styles.empty}>
              <Text style={styles.emptyTitle}>Nič sme nenašli</Text>
              <Text style={shared.bodyText}>Skús zmeniť vyhľadávanie alebo kategóriu.</Text>
            </View>
          )}
        </ScrollView>

        <View style={styles.bottomNav}>
          <Pressable onPress={() => setView("objavovať")} style={[styles.navItem, isDiscover && styles.navItemActive]}>
            <Text style={styles.navSymbol}>⌂</Text>
            <Text style={styles.navLabel}>Objavovať</Text>
          </Pressable>
          <Pressable onPress={() => setCreateOpen(true)} style={styles.addButton}>
            <Text style={styles.addButtonText}>＋</Text>
          </Pressable>
          <Pressable onPress={() => setView("moje")} style={[styles.navItem, view === "moje" && styles.navItemActive]}>
            <Text style={styles.navSymbol}>▤</Text>
            <Text style={styles.navLabel}>Moje recepty</Text>
          </Pressable>
          {activeUser.role === "majiteľ" && (
            <Pressable onPress={() => setUsersOpen(true)} style={styles.navItem}>
              <Text style={styles.navSymbol}>♙</Text>
              <Text style={styles.navLabel}>Komunita</Text>
            </Pressable>
          )}
        </View>

        <CreateRecipeModal
          visible={createOpen}
          onClose={() => setCreateOpen(false)}
          onCreate={(data) => {
            onAddRecipe(data, activeUser.id);
            setCreateOpen(false);
            setView("moje");
          }}
        />
        <UsersModal visible={usersOpen} users={users} onClose={() => setUsersOpen(false)} onToggleRole={onToggleModerator} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  app: { flex: 1, backgroundColor: COLORS.canvas },
  header: { height: 68, paddingHorizontal: 18, flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: COLORS.line, backgroundColor: COLORS.surface },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 104 },
  hero: { paddingHorizontal: 20, paddingTop: 31, paddingBottom: 22 },
  heroTitle: { color: COLORS.green, fontFamily: "Georgia", fontSize: 40, lineHeight: 42, fontWeight: "700", letterSpacing: -1.5, marginBottom: 12 },
  roleCard: { marginTop: 20, padding: 13, borderRadius: 14, backgroundColor: COLORS.greenSoft, flexDirection: "row", alignItems: "center", gap: 11 },
  roleMark: { width: 36, height: 36, borderRadius: 18, alignItems: "center", justifyContent: "center", backgroundColor: COLORS.green },
  roleMarkText: { color: COLORS.white, fontWeight: "800" },
  roleLabel: { color: COLORS.muted, fontSize: 8, fontWeight: "800", letterSpacing: 1 },
  roleName: { color: COLORS.green, fontSize: 14, fontWeight: "800", marginTop: 2, textTransform: "capitalize" },
  searchBox: { height: 49, marginHorizontal: 16, borderRadius: 14, borderWidth: 1, borderColor: COLORS.line, backgroundColor: COLORS.surface, flexDirection: "row", alignItems: "center", paddingHorizontal: 14 },
  searchIcon: { color: COLORS.muted, fontSize: 24, marginRight: 8 },
  searchInput: { flex: 1, color: COLORS.text, fontSize: 13 },
  categories: { paddingHorizontal: 16, paddingVertical: 13, gap: 7 },
  pill: { paddingHorizontal: 14, paddingVertical: 9, borderRadius: 20, borderWidth: 1, borderColor: COLORS.line, backgroundColor: COLORS.surface },
  pillActive: { backgroundColor: COLORS.green, borderColor: COLORS.green },
  pillText: { color: COLORS.muted, fontSize: 11, fontWeight: "700" },
  pillTextActive: { color: COLORS.white },
  sectionHeader: { marginHorizontal: 18, paddingTop: 8, paddingBottom: 14, marginBottom: 2, borderBottomWidth: 1, borderBottomColor: COLORS.line, flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between" },
  sectionKicker: { color: COLORS.orange, fontSize: 8, fontWeight: "800", letterSpacing: 1.2, marginBottom: 5 },
  sectionTitle: { color: COLORS.green, fontFamily: "Georgia", fontSize: 25, fontWeight: "700" },
  count: { color: COLORS.muted, fontSize: 11 },
  empty: { margin: 18, minHeight: 220, alignItems: "center", justifyContent: "center" },
  emptyTitle: { color: COLORS.green, fontFamily: "Georgia", fontSize: 22, fontWeight: "700", marginBottom: 6 },
  bottomNav: { position: "absolute", left: 10, right: 10, bottom: 10, height: 68, borderRadius: 21, borderWidth: 1, borderColor: COLORS.line, backgroundColor: "rgba(255,254,250,.97)", flexDirection: "row", alignItems: "center", justifyContent: "space-around", shadowColor: "#1C3022", shadowOpacity: 0.18, shadowRadius: 18, shadowOffset: { width: 0, height: 8 }, elevation: 8 },
  navItem: { flex: 1, maxWidth: 92, height: 52, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  navItemActive: { backgroundColor: COLORS.greenSoft },
  navSymbol: { color: COLORS.green, fontSize: 20 },
  navLabel: { color: COLORS.green, fontSize: 8, fontWeight: "800", marginTop: 2 },
  addButton: { width: 51, height: 51, borderRadius: 17, alignItems: "center", justifyContent: "center", backgroundColor: COLORS.orange, transform: [{ translateY: -10 }], shadowColor: COLORS.orange, shadowOpacity: 0.3, shadowRadius: 9, elevation: 6 },
  addButtonText: { color: COLORS.white, fontSize: 27, lineHeight: 30 },
});
