import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { usersSeed, recipesSeed } from "./utils/data";
import HomeScreen from "./screens/mainS";

const Stack = createNativeStackNavigator();

function RootStack({ users, recipes }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home">
        {(props) => (
          <HomeScreen
            {...props}
            users={users}
            recipes={recipes}
            activeUser={users[0]} // temporary: pretends Lucia is logged in
            onLogout={() => {}}
            onAddRecipe={() => {}}
            onRemoveRecipe={() => {}}
            onToggleModerator={() => {}}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default function App() {
  const [users, setUsers] = useState(usersSeed);
  const [recipes, setRecipes] = useState(recipesSeed);

  return (
    <NavigationContainer>
      <RootStack users={users} recipes={recipes} />
    </NavigationContainer>
  );
}
