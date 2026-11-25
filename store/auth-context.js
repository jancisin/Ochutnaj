import { createContext, useState } from "react";
export const AuthContext = createContext(null);
export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  function authenticate(data) {
    setUser({ token: data.idToken, uid: data.localId, email: data.email });
  }
  function logout() {
    setUser(null);
  }
  const value = { user, isAuthenticated: !!user, authenticate, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
