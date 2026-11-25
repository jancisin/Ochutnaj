const SPRAVY = {
  EMAIL_EXISTS: "Tento e-mail už je zaregistrovaný.",
  INVALID_EMAIL: "E-mail nemá správny tvar.",
  MISSING_PASSWORD: "Zadaj heslo.",
  INVALID_LOGIN_CREDENTIALS: "Nesprávny e-mail alebo heslo.",
  TOO_MANY_ATTEMPTS_TRY_LATER: "Veľa pokusov. Skús to o chvíľu.",
};
export function prelozChybu(kod = "") {
  if (kod.startsWith("WEAK_PASSWORD")) {
    return "Heslo musí mať aspoň 6 znakov.";
  }
  return SPRAVY[kod] ?? "Niečo sa pokazilo. Skús to znova.";
}
