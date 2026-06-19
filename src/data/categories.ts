import type { Category } from "@/types";

export const categories: Category[] = [
  {
    id: "c-audio",
    slug: "audio",
    name: "Audio",
    tagline: "Sound, perfected",
    description:
      "Reference-grade headphones, earbuds and speakers tuned for clarity, depth and silence.",
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80",
    sortOrder: 1,
  },
  {
    id: "c-wearables",
    slug: "wearables",
    name: "Wearables",
    tagline: "Worn intelligence",
    description:
      "Smartwatches and trackers crafted from premium materials with AI-assisted health insight.",
    imageUrl:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80",
    sortOrder: 2,
  },
  {
    id: "c-smart-home",
    slug: "smart-home",
    name: "Smart Home",
    tagline: "A home that thinks",
    description:
      "Ambient devices that quietly orchestrate light, sound and security around your life.",
    imageUrl:
      "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=80",
    sortOrder: 3,
  },
  {
    id: "c-power",
    slug: "power",
    name: "Power & Charging",
    tagline: "Endless energy",
    description:
      "Fast, elegant power banks and chargers engineered to keep everything you own alive.",
    imageUrl:
      "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=1200&q=80",
    sortOrder: 4,
  },
  {
    id: "c-accessories",
    slug: "accessories",
    name: "Accessories",
    tagline: "The finishing details",
    description:
      "The cables, stands and cases that complete the experience — designed, not afterthoughts.",
    imageUrl:
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&w=1200&q=80",
    sortOrder: 5,
  },
];
