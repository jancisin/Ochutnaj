const DB_URL = process.env.EXPO_PUBLIC_FIREBASE_DB_URL;
const cesta = (uid, token) => `${DB_URL}/users/${uid}.json?auth=${token}`;
export async function ulozProfil(uid, token, profil) {
  const response = await fetch(cesta(uid, token), {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profil),
  });
  if (!response.ok) throw new Error("PROFIL_NEULOZENY");
}
export async function nacitajProfil(uid, token) {
  const response = await fetch(cesta(uid, token));
  if (!response.ok) throw new Error("PROFIL_NENACITANY");
  return response.json(); // null, ak profil neexistuje
}
