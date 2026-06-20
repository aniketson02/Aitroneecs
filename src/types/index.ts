export type Category = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  imageUrl: string;
  sortOrder: number;
};

export type ProductImage = {
  url: string;
  alt: string;
};

export type ProductOption = {
  name: string;
  values: string[];
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  /** Price in whole INR (rupees). */
  price: number;
  /** Optional original price for showing a discount, in whole INR. */
  compareAtPrice?: number;
  categorySlug: string;
  images: ProductImage[];
  featured: boolean;
  stock: number;
  rating: number;
  reviews: number;
  badge?: string;
  highlights: string[];
  specs: { label: string; value: string }[];
  options?: ProductOption[];
};

export type Review = {
  id: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  date: string;
};

export type CartItem = {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  qty: number;
  option?: string;
};
