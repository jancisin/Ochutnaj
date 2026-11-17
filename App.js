import { useState } from "react";
import { StatusBar } from "expo-status-bar";

import SiI from "./screens/SignI";
import SiO from "./screens/SignO";
import MainS from "./screens/mainS";
import { images, recipesSeed, usersSeed } from "./utils/data";
import { getInitials } from "./utils/helpers";

export default function App() {
  const [users, setUsers] = useState(usersSeed);
  const [recipes, setRecipes] = useState(recipesSeed);
  const [activeUserId, setActiveUserId] = useState(null);
  const [authMode, setAuthMode] = useState("signIn");

  const activeUser = users.find((user) => user.id === activeUserId);

  function register({ name, email, password }) {
    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      initials: getInitials(name),
      role: "používateľ",
    };
    setUsers((current) => [...current, newUser]);
    setActiveUserId(newUser.id);
  }

  function logout() {
    setActiveUserId(null);
    setAuthMode("signIn");
  }

  function addRecipe(data, authorId) {
    setRecipes((current) => [
      {
        ...data,
        id: Date.now(),
        time: 30,
        difficulty: "Jednoduché",
        authorId,
        image: data.image || images[current.length % images.length],
      },
      ...current,
    ]);
  }

  function removeRecipe(id) {
    setRecipes((current) => current.filter((item) => item.id !== id));
  }

  function toggleModerator(id) {
    setUsers((current) =>
      current.map((user) => (user.id === id ? { ...user, role: user.role === "moderátor" ? "používateľ" : "moderátor" } : user)),
    );
  }

  let screen;
  if (!activeUser) {
    screen =
      authMode === "signIn" ? (
        <SiI users={users} onLogin={setActiveUserId} onGoToSignUp={() => setAuthMode("signUp")} />
      ) : (
        <SiO users={users} onRegister={register} onGoToSignIn={() => setAuthMode("signIn")} />
      );
  } else {
    screen = (
      <MainS
        users={users}
        recipes={recipes}
        activeUser={activeUser}
        onLogout={logout}
        onAddRecipe={addRecipe}
        onRemoveRecipe={removeRecipe}
        onToggleModerator={toggleModerator}
      />
    );
  }

  return (
    <>
      {screen}
      <StatusBar style="dark" />
    </>
  );
}
