import type { Review } from "@/types";

// Seed reviews shown until real reviews exist in Supabase. Keyed by product id.
export const seedReviews: Record<string, Review[]> = {
  "p-aura-headphones": [
    {
      id: "r-aura-1",
      author: "Rahul M.",
      rating: 5,
      title: "Best headphones I've owned",
      body: "The noise cancellation is genuinely incredible on flights, and they feel premium without being heavy. Battery easily lasts a week of commuting.",
      date: "2026-05-28",
    },
    {
      id: "r-aura-2",
      author: "Sneha K.",
      rating: 5,
      title: "Looks and sounds expensive",
      body: "The aluminium finish is gorgeous and the sound is warm and detailed. Worth every rupee.",
      date: "2026-05-12",
    },
    {
      id: "r-aura-3",
      author: "Imran S.",
      rating: 4,
      title: "Excellent, slightly tight at first",
      body: "Amazing sound and ANC. They were a touch tight on day one but loosened up nicely.",
      date: "2026-04-30",
    },
  ],
  "p-vertex-watch": [
    {
      id: "r-vertex-1",
      author: "Aditya R.",
      rating: 5,
      title: "Titanium build is stunning",
      body: "Feels like a proper luxury watch. The 7-day battery is real and the health tracking is accurate against my gym equipment.",
      date: "2026-06-02",
    },
    {
      id: "r-vertex-2",
      author: "Priya N.",
      rating: 5,
      title: "Beautiful and accurate",
      body: "Sleep and recovery tracking has actually changed my routine. The sapphire screen is scratch-free after a month.",
      date: "2026-05-18",
    },
  ],
  "p-volt-powerbank": [
    {
      id: "r-volt-1",
      author: "Karthik V.",
      rating: 5,
      title: "Charges my laptop fully",
      body: "100W is no joke — it tops up my MacBook in under an hour and still has charge left for my phone. Solid metal build.",
      date: "2026-05-22",
    },
  ],
  "p-pulse-earbuds": [
    {
      id: "r-pulse-1",
      author: "Megha T.",
      rating: 5,
      title: "Tiny and powerful",
      body: "Spatial audio is fantastic for movies and they disappear in the ear. Call quality impressed everyone on my team.",
      date: "2026-05-09",
    },
    {
      id: "r-pulse-2",
      author: "Dev P.",
      rating: 4,
      title: "Great value",
      body: "Sound is rich and the case charges fast. Wish the touch controls were a bit less sensitive.",
      date: "2026-04-25",
    },
  ],
};
