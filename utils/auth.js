const API_KEY = process.env.EXPO_PUBLIC_FIREBASE_API_KEY;
const AUTH_URL = "https://identitytoolkit.googleapis.com/v1/accounts:";
async function authenticate(mode, email, password) {
  const response = await fetch(`${AUTH_URL}${mode}?key=${API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, returnSecureToken: true }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error.message);
  }
  return data; // idToken, localId, email, expiresIn
}
export const createUser = (email, password) => authenticate("signUp", email, password);
export const login = (email, password) => authenticate("signInWithPassword", email, password);
