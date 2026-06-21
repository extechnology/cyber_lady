import sandal1 from "../assets/sandal-1.jpeg";
import sandal2 from "../assets/sandal-2.jpeg";
import sandal3 from "../assets/sandal-3.jpeg";
import sandal4 from "../assets/sandal-4.jpeg";
import sandal5 from "../assets/sandal-5.jpeg";
import sandal6 from "../assets/sandal-6.jpeg";

export type Product = {
  id: string;
  name: string;
  price: number;
  color: string;
  type: "Ladies" | "Gents" | "Gents & Boys" | "Kids";
  category: "Sandals" | "Flip Flop" | "Slippers" | "Shoes";
  material: "Leather" | "Suede" | "Metallic" | "Woven";
  image: string;
  tagline: string;
  description: string;
  sizes: number[];
};

export const products: Product[] = [
  {
    id: "noir-strap",
    name: "Noir Strap 110",
    price: 285,
    color: "Onyx",
    type: "Ladies",
    category: "Sandals",
    material: "Leather",
    image: sandal1,
    tagline: "Architectural stiletto, all night.",
    description:
      "An interwoven cage of buttery calfskin set on a precise 110mm heel. Hand-finished in a small Italian atelier.",
    sizes: [5, 6, 7, 8, 9, 10, 11],
  },
  {
    id: "caramel-slide",
    name: "Caramel Slide",
    price: 198,
    color: "Caramel",
    type: "Ladies",
    category: "Slippers",
    material: "Leather",
    image: sandal2,
    tagline: "The everyday object of desire.",
    description:
      "A single sweep of vegetable-tanned leather, slip-on ease, and a low stacked sole. Wears in beautifully.",
    sizes: [5, 6, 7, 8, 9, 10, 11],
  },
  {
    id: "ivory-block",
    name: "Ivory Block 65",
    price: 245,
    color: "Ivory",
    type: "Ladies",
    category: "Shoes",
    material: "Leather",
    image: sandal3,
    tagline: "Quiet confidence on a block heel.",
    description:
      "Slim crossover straps balance a sculpted 65mm block heel — a study in proportion.",
    sizes: [5, 6, 7, 8, 9, 10, 11],
  },
  {
    id: "rosa-kitten",
    name: "Rosa Kitten 55",
    price: 220,
    color: "Blush",
    type: "Ladies",
    category: "Sandals",
    material: "Leather",
    image: sandal4,
    tagline: "A whisper of pink.",
    description:
      "Featherweight kitten heel with delicate ankle strap. Pale rose calfskin lined in nude.",
    sizes: [5, 6, 7, 8, 9, 10, 11],
  },
  {
    id: "luna-gold",
    name: "Luna Gold 60",
    price: 265,
    color: "Gold",
    type: "Ladies",
    category: "Sandals",
    material: "Metallic",
    image: sandal5,
    tagline: "Burnished, never bright.",
    description:
      "Brushed metallic leather catches the light without shouting. Sturdy 60mm block heel.",
    sizes: [5, 6, 7, 8, 9, 10, 11],
  },
  {
    id: "cocoa-weave",
    name: "Cocoa Weave",
    price: 235,
    color: "Cocoa",
    type: "Ladies",
    category: "Slippers",
    material: "Woven",
    image: sandal6,
    tagline: "Hand-woven, slow-made.",
    description:
      "Master-woven leather mule on a stacked walnut heel. Two weeks per pair, by a single artisan.",
    sizes: [5, 6, 7, 8, 9, 10, 11],
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
