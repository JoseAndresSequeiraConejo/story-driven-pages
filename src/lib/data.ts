export interface Product {
  id: string;
  name: string;
  description: string;
  functionalDescription: string;
  price: number;
  sizes: string[];
  category: "amelia" | "paralisis" | "universal";
  image: string;
  stock: number;
  featured: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: "procesando" | "en preparación" | "enviado" | "entregado";
  items: CartItem[];
  statusHistory: { status: string; date: string }[];
}

export interface Testimonial {
  id: string;
  name: string;
  condition: string;
  quote: string;
  avatar: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Camisa Magnética Elegance",
    description: "Camisa con cierres magnéticos que sustituyen los botones tradicionales, permitiendo vestirse con una sola mano.",
    functionalDescription: "Cierres magnéticos ocultos, tela antiarrugas, corte holgado para facilitar el movimiento.",
    price: 89.99,
    sizes: ["XS", "S", "M", "L", "XL"],
    category: "amelia",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop",
    stock: 25,
    featured: true,
  },
  {
    id: "2",
    name: "Pantalón Adaptativo Flex",
    description: "Pantalón con cintura elástica y apertura lateral con velcro para facilitar el cambio de ropa desde silla de ruedas.",
    functionalDescription: "Cintura elástica ajustable, apertura lateral completa, tela stretch, bolsillos accesibles.",
    price: 75.0,
    sizes: ["S", "M", "L", "XL", "XXL"],
    category: "paralisis",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop",
    stock: 18,
    featured: true,
  },
  {
    id: "3",
    name: "Vestido Inclusivo Aurora",
    description: "Vestido con cierre frontal completo y mangas con elástico suave, diseñado para personas con movilidad reducida.",
    functionalDescription: "Cierre frontal con zipper oculto, mangas con apertura fácil, largo ajustable.",
    price: 120.0,
    sizes: ["XS", "S", "M", "L"],
    category: "universal",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop",
    stock: 12,
    featured: true,
  },
  {
    id: "4",
    name: "Chaqueta Fácil-On",
    description: "Chaqueta con sistema de cierre asistido, ideal para personas con amelia parcial o dificultades motrices finas.",
    functionalDescription: "Cierre con tirador extendido, forro suave, puños con velcro ajustable.",
    price: 145.0,
    sizes: ["S", "M", "L", "XL"],
    category: "amelia",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop",
    stock: 8,
    featured: false,
  },
  {
    id: "5",
    name: "Polo Seated-Fit",
    description: "Polo diseñado específicamente para uso en silla de ruedas, con corte más largo en la espalda y más corto al frente.",
    functionalDescription: "Corte ergonómico para posición sentada, tela transpirable, cuello sin restricción.",
    price: 65.0,
    sizes: ["S", "M", "L", "XL"],
    category: "paralisis",
    image: "https://images.unsplash.com/photo-1625910513413-5fc420e7601d?w=400&h=500&fit=crop",
    stock: 30,
    featured: false,
  },
  {
    id: "6",
    name: "Falda Wrap Libertad",
    description: "Falda envolvente con cierre de velcro, se puede poner y quitar sin necesidad de pasar por las piernas.",
    functionalDescription: "Diseño envolvente completo, velcro de alta resistencia, cintura ajustable.",
    price: 55.0,
    sizes: ["XS", "S", "M", "L", "XL"],
    category: "universal",
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400&h=500&fit=crop",
    stock: 0,
    featured: false,
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "María García",
    condition: "Amelia congénita",
    quote: "Gracias a Inclúyete Moda puedo vestirme sola cada mañana. Los cierres magnéticos de sus camisas cambiaron mi rutina por completo.",
    avatar: "MG",
  },
  {
    id: "2",
    name: "Carlos Rodríguez",
    condition: "Parálisis por accidente",
    quote: "Los pantalones adaptativos son increíbles. Puedo cambiarme desde mi silla de ruedas sin ayuda. Me devolvieron mi independencia.",
    avatar: "CR",
  },
  {
    id: "3",
    name: "Ana Martínez",
    condition: "Parálisis cerebral",
    quote: "La ropa es hermosa y funcional. Por primera vez siento que la moda también es para mí. No tengo que sacrificar estilo por accesibilidad.",
    avatar: "AM",
  },
];

export const sampleOrders: Order[] = [
  {
    id: "ORD-2024-001",
    date: "2024-03-15",
    total: 164.99,
    status: "entregado",
    items: [
      { product: products[0], quantity: 1, size: "M" },
      { product: products[4], quantity: 1, size: "L" },
    ],
    statusHistory: [
      { status: "procesando", date: "2024-03-15" },
      { status: "en preparación", date: "2024-03-16" },
      { status: "enviado", date: "2024-03-18" },
      { status: "entregado", date: "2024-03-22" },
    ],
  },
  {
    id: "ORD-2024-002",
    date: "2024-03-28",
    total: 120.0,
    status: "enviado",
    items: [{ product: products[2], quantity: 1, size: "S" }],
    statusHistory: [
      { status: "procesando", date: "2024-03-28" },
      { status: "en preparación", date: "2024-03-29" },
      { status: "enviado", date: "2024-03-31" },
    ],
  },
];
