export const usersSeed = [
  { id: 1, name: "Lucia Horváthová", initials: "LH", role: "majiteľ", email: "lucia@ochutnaj.sk", password: "recept123" },
  { id: 2, name: "Marek Varga", initials: "MV", role: "moderátor", email: "marek@ochutnaj.sk", password: "recept123" },
  { id: 3, name: "Ema Kováčová", initials: "EK", role: "používateľ", email: "ema@ochutnaj.sk", password: "recept123" },
  { id: 4, name: "Tomáš Bielik", initials: "TB", role: "používateľ", email: "tomas@ochutnaj.sk", password: "recept123" },
];

export const images = [
  "https://images.unsplash.com/photo-1601823281975-75d81b28c373?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1603475225816-8d56dd6d88e8?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1695835394238-d3367fa34b45?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1630660116780-08adc1216529?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1582585484329-10b95c75cfde?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1591985666643-1ecc67616216?auto=format&fit=crop&w=900&q=85",
];

export const recipesSeed = [
  { id: 1, title: "Krémové citrónové cestoviny", description: "Hodvábna omáčka, parmezán a svieža vôňa citróna.", category: "Cestoviny", time: 25, difficulty: "Jednoduché", visibility: "verejný", authorId: 3, image: images[0] },
  { id: 2, title: "Chrumkavý šalát s halloumi", description: "Farebná zelenina, opečený syr a medovo-citrónová zálievka.", category: "Šaláty", time: 20, difficulty: "Jednoduché", visibility: "verejný", authorId: 2, image: images[1] },
  { id: 3, title: "Nedeľné mezze", description: "Stôl plný malých dobrôt, dipov a chrumkavého pečiva.", category: "Hlavné jedlá", time: 55, difficulty: "Stredné", visibility: "verejný", authorId: 4, image: images[2] },
  { id: 4, title: "Jarný bylinkový šalát", description: "Súkromný recept s bylinkami, hráškom a kozím syrom.", category: "Šaláty", time: 15, difficulty: "Jednoduché", visibility: "súkromný", authorId: 1, image: images[3] },
  { id: 5, title: "Čokoládové potešenie", description: "Vláčny dezert s horkou čokoládou a morskou soľou.", category: "Dezerty", time: 45, difficulty: "Stredné", visibility: "verejný", authorId: 2, image: images[4] },
  { id: 6, title: "Raňajková miska", description: "Výživný začiatok dňa s granolou a sezónnym ovocím.", category: "Raňajky", time: 10, difficulty: "Jednoduché", visibility: "verejný", authorId: 1, image: images[5] },
];

export const categories = ["Všetky", "Raňajky", "Hlavné jedlá", "Cestoviny", "Šaláty", "Dezerty"];
