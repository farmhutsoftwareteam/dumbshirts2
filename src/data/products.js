const placeholder = (w, h, color, label) =>
  `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><rect fill="${color}" width="${w}" height="${h}"/><text x="50%" y="50%" fill="rgba(255,255,255,0.3)" font-family="sans-serif" font-size="20" text-anchor="middle" dy=".3em">${label}</text></svg>`)}`;

const products = [
  {
    id: "ds-001",
    dropNumber: "001",
    title: "THIS IS FINE",
    memeOrigin: "Memetic expression. Origin: KC Green, 2013. Subject depicts canine figure seated in structural fire. Widely catalogued as a symbol of performative composure during systemic failure.",
    material: "400GSM Egyptian cotton heavyweight jersey. 68-stitch collar reinforcement. Incomparable drape. Garment-dyed deep gray.",
    price: 450,
    status: "available",
    soldDate: null,
    dimensions: "L 76cm x W 58cm",
    video: "/videos/video (1).mp4",
    images: {
      hero: placeholder(800, 1000, "#1a1a2e", "001 — HERO"),
      macro1: placeholder(600, 600, "#1a1a2e", "001 — DETAIL 1"),
      macro2: placeholder(600, 600, "#16213e", "001 — DETAIL 2"),
      macro3: placeholder(600, 600, "#0f3460", "001 — DETAIL 3"),
    },
  },
  {
    id: "ds-002",
    dropNumber: "002",
    title: "STONKS",
    memeOrigin: "Memetic expression. Origin: Anonymous, c. 2017. Subject depicts CGI humanoid in formal attire before ascending graph. Documented as irrational optimism in visual form.",
    material: "300GSM organic Supima double-knit. Reinforced shoulder seams. Heavy hand-feel with controlled elasticity. White pigment on deep gray.",
    price: 525,
    status: "available",
    soldDate: null,
    dimensions: "L 78cm x W 60cm",
    images: {
      hero: placeholder(800, 1000, "#16213e", "002 — HERO"),
      macro1: placeholder(600, 600, "#16213e", "002 — DETAIL 1"),
      macro2: placeholder(600, 600, "#0f3460", "002 — DETAIL 2"),
      macro3: placeholder(600, 600, "#533483", "002 — DETAIL 3"),
    },
  },
  {
    id: "ds-003",
    dropNumber: "003",
    title: "DISTRACTED BOYFRIEND",
    memeOrigin: "Memetic expression. Origin: Antonio Guillem, 2015. Stock photograph. Male subject redirects attention toward secondary figure. Partner observes. Universally filed under infidelity of focus.",
    material: "320GSM Japanese selvedge cotton. Cut-and-sew construction. Enzyme-washed for immediate softness. Pigment application by hand.",
    price: 680,
    status: "sold",
    soldDate: "2025-11-15",
    dimensions: "L 74cm x W 56cm",
    images: {
      hero: placeholder(800, 1000, "#0f3460", "003 — HERO"),
      macro1: placeholder(600, 600, "#0f3460", "003 — DETAIL 1"),
      macro2: placeholder(600, 600, "#533483", "003 — DETAIL 2"),
      macro3: placeholder(600, 600, "#2c2c54", "003 — DETAIL 3"),
    },
  },
  {
    id: "ds-004",
    dropNumber: "004",
    title: "WOMAN YELLING AT CAT",
    memeOrigin: "Memetic expression. Origin: Composite, 2019. Diptych pairing televised emotional distress with feline bewilderment before a salad. Filed under confrontation without resolution.",
    material: "260GSM Peruvian Pima cotton. Enzyme-washed to near-cashmere touch. Relaxed drape. 52-stitch flatlock seaming throughout.",
    price: 395,
    status: "available",
    soldDate: null,
    dimensions: "L 76cm x W 58cm",
    images: {
      hero: placeholder(800, 1000, "#533483", "004 — HERO"),
      macro1: placeholder(600, 600, "#533483", "004 — DETAIL 1"),
      macro2: placeholder(600, 600, "#2c2c54", "004 — DETAIL 2"),
      macro3: placeholder(600, 600, "#2d132c", "004 — DETAIL 3"),
    },
  },
  {
    id: "ds-005",
    dropNumber: "005",
    title: "TWO BUTTONS",
    memeOrigin: "Memetic expression. Origin: Jake Clark, 2014. Subject exhibits perspiration while selecting between two equally valid options. Catalogued under decision paralysis.",
    material: "340GSM Sea Island cotton loopback fleece. Brushed interior. Incomparable weight. Triple-needle hem. One of the densest weaves in production.",
    price: 800,
    status: "sold",
    soldDate: "2025-12-01",
    dimensions: "L 78cm x W 60cm",
    images: {
      hero: placeholder(800, 1000, "#2c2c54", "005 — HERO"),
      macro1: placeholder(600, 600, "#2c2c54", "005 — DETAIL 1"),
      macro2: placeholder(600, 600, "#2d132c", "005 — DETAIL 2"),
      macro3: placeholder(600, 600, "#1e3d59", "005 — DETAIL 3"),
    },
  },
  {
    id: "ds-006",
    dropNumber: "006",
    title: "EXPANDING BRAIN",
    memeOrigin: "Memetic expression. Origin: Anonymous, 2017. Multi-panel escalation depicting progressive cranial illumination. Each tier pairs cosmic transcendence with increasingly absurd propositions.",
    material: "290GSM Zimbabwean cotton. Pigment-dyed. Sun-faded finish. Heavy hand with raw-edge hem detail. No two garments identical.",
    price: 475,
    status: "available",
    soldDate: null,
    dimensions: "L 76cm x W 58cm",
    images: {
      hero: placeholder(800, 1000, "#2d132c", "006 — HERO"),
      macro1: placeholder(600, 600, "#2d132c", "006 — DETAIL 1"),
      macro2: placeholder(600, 600, "#1e3d59", "006 — DETAIL 2"),
      macro3: placeholder(600, 600, "#1a1a2e", "006 — DETAIL 3"),
    },
  },
  {
    id: "ds-007",
    dropNumber: "007",
    title: "IS THIS A PIGEON",
    memeOrigin: "Memetic expression. Origin: Yutaka Nanten, 1991. Animated humanoid gestures toward lepidoptera and misidentifies species. Filed under confident incorrectness.",
    material: "310GSM Turkish long-staple cotton French terry. Interior loop pile for thermal regulation. 68-stitch collar. Substantial drape.",
    price: 550,
    status: "available",
    soldDate: null,
    dimensions: "L 77cm x W 59cm",
    images: {
      hero: placeholder(800, 1000, "#1e3d59", "007 — HERO"),
      macro1: placeholder(600, 600, "#1e3d59", "007 — DETAIL 1"),
      macro2: placeholder(600, 600, "#1a1a2e", "007 — DETAIL 2"),
      macro3: placeholder(600, 600, "#16213e", "007 — DETAIL 3"),
    },
  },
  {
    id: "ds-008",
    dropNumber: "008",
    title: "DRAKE HOTLINE BLING",
    memeOrigin: "Memetic expression. Origin: Drake, 2015. Diptych from music video. Subject rejects one proposition via recoil, endorses alternative with visible satisfaction. Filed under binary preference.",
    material: "350GSM heavyweight cut-and-sew. Reinforced seams throughout. Incomparable density. White pigment on deep gray substrate. Archived upon acquisition.",
    price: 750,
    status: "sold",
    soldDate: "2026-01-20",
    dimensions: "L 78cm x W 60cm",
    images: {
      hero: placeholder(800, 1000, "#1a1a2e", "008 — HERO"),
      macro1: placeholder(600, 600, "#1a1a2e", "008 — DETAIL 1"),
      macro2: placeholder(600, 600, "#0f3460", "008 — DETAIL 2"),
      macro3: placeholder(600, 600, "#2d132c", "008 — DETAIL 3"),
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
