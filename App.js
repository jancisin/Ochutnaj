import { useContext, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import SiI from "./screens/SignI";
import SiO from "./screens/SignO";
import HomeScreen from "./screens/mainS";
import { images, recipesSeed, usersSeed } from "./utils/data";
import { getInitials } from "./utils/helpers";

const Stack = createNativeStackNavigator();

function RootStack({
  isSignedIn,
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
      {!isSignedIn ? (
        <>
          <Stack.Screen name="SiI">{(props) => <SiI {...props} users={users} onLogin={onLogin} />}</Stack.Screen>
          <Stack.Screen name="SiO">{(props) => <SiO {...props} users={users} onRegister={onRegister} />}</Stack.Screen>
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

function Navigation() {
  const { user, isAuthenticated, authenticate, logout } = useContext(AuthContext);

  const [users, setUsers] = useState(usersSeed);
  const [recipes, setRecipes] = useState(recipesSeed);

  const activeUser = users.find((u) => u.email === user?.email);

  function login(userId) {
    const found = users.find((u) => u.id === userId);
    authenticate({ idToken: "local", localId: String(found.id), email: found.email });
  }

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
    authenticate({ idToken: "local", localId: String(newUser.id), email: newUser.email });
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
      current.map((u) => (u.id === id ? { ...u, role: u.role === "moderátor" ? "používateľ" : "moderátor" } : u)),
    );
  }

  return (
    <NavigationContainer>
      <RootStack
        isSignedIn={isAuthenticated}
        users={users}
        recipes={recipes}
        activeUser={activeUser}
        onLogin={login}
        onRegister={register}
        onLogout={logout}
        onAddRecipe={addRecipe}
        onRemoveRecipe={removeRecipe}
        onToggleModerator={toggleModerator}
      />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthContextProvider>
      <Navigation />
    </AuthContextProvider>
  );
}
