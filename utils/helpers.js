import { Alert, Platform } from "react-native";

export function getInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

// Owner and the recipe's author can always delete.
// A moderator can delete public recipes written by regular users.
export function canDeleteRecipe(recipe, activeUser, users) {
  if (recipe.authorId === activeUser.id || activeUser.role === "majiteľ") return true;
  const author = users.find((user) => user.id === recipe.authorId);
  return activeUser.role === "moderátor" && recipe.visibility === "verejný" && author?.role === "používateľ";
}

export function confirmDelete(recipe, onConfirm) {
  if (Platform.OS === "web") {
    if (globalThis.confirm?.(`Odstrániť recept „${recipe.title}“?`)) onConfirm();
  } else {
    Alert.alert("Odstrániť recept", recipe.title, [
      { text: "Zrušiť" },
      { text: "Odstrániť", style: "destructive", onPress: onConfirm },
    ]);
  }
}
