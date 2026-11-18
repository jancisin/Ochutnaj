import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SiI from "./screens/SignI";
import SiO from "./screens/SignO";
import HomeScreen from "./screens/mainS";
import { images, recipesSeed, usersSeed } from "./utils/data";
import { getInitials } from "./utils/helpers";

const Stack = createNativeStackNavigator();

function RootStack({
  users,
  recipes,
  activeUser,
  onLogin,
  onRegister,
  onLogout,
  onAddRecipe,
  onRemoveRecipe,
  onToggleModerator,
}) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!activeUser ? (
        <>
          <Stack.Screen name="SiI">
            {(props) => <SiI {...props} users={users} onLogin={onLogin} />}
          </Stack.Screen>
          <Stack.Screen name="SiO">
            {(props) => <SiO {...props} users={users} onRegister={onRegister} />}
          </Stack.Screen>
        </>
      ) : (
        <Stack.Screen name="Home">
          {(props) => (
            <HomeScreen
              {...props}
              users={users}
              recipes={recipes}
              activeUser={activeUser}
              onLogout={onLogout}
              onAddRecipe={onAddRecipe}
              onRemoveRecipe={onRemoveRecipe}
              onToggleModerator={onToggleModerator}
            />
          )}
        </Stack.Screen>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  const [users, setUsers] = useState(usersSeed);
  const [recipes, setRecipes] = useState(recipesSeed);
  const [activeUserId, setActiveUserId] = useState(null);

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
      current.map((user) =>
        user.id === id
          ? { ...user, role: user.role === "moderátor" ? "používateľ" : "moderátor" }
          : user
      )
    );
  }

  return (
    <NavigationContainer>
      <RootStack
        users={users}
        recipes={recipes}
        activeUser={activeUser}
        onLogin={setActiveUserId}
        onRegister={register}
        onLogout={() => setActiveUserId(null)}
        onAddRecipe={addRecipe}
        onRemoveRecipe={removeRecipe}
        onToggleModerator={toggleModerator}
      />
    </NavigationContainer>
  );
}