const products = [
  {
    id: "ds-001",
    dropNumber: "001",
    title: "MAYBE AI CAN GET YOU SOME BITCHES",
    memeOrigin: "Memetic expression. Origin: Internet discourse, c. 2023. Emerged during peak artificial intelligence hype cycle. Subject confronts the paradox of technological omnipotence against fundamental human inadequacy. Filed under: computational cope.",
    material: "400GSM Egyptian cotton heavyweight jersey. 68-stitch collar reinforcement. Incomparable drape. Garment-dyed deep black. White pigment screen print.",
    price: 1000,
    status: "available",
    soldDate: null,
    dimensions: "L 76cm x W 58cm",
    video: "/videos/maybeaivid1.mp4",
    images: {
      hero: "/videos/dumbshirts-001-hero.png",
      macro1: "/dumbshirts-001-macro-front.png",
      macro2: "/dumbshirts-001-macro-detail.png",
    },
  },
];

export default products;

export function getAvailableProducts() {
  return products.filter((p) => p.status === "available");
}

export function getSoldProducts() {
  return products.filter((p) => p.status === "sold");
}

export function getProductByDropNumber(num) {
  const padded = String(num).padStart(3, "0");
  return products.find((p) => p.dropNumber === padded) || null;
}
