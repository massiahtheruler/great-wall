export type ProductStatus = "standard" | "custom" | "future";

export type ProductCategory =
  | "media-walls"
  | "fireplaces"
  | "centerpieces"
  | "tables"
  | "outdoor"
  | "accessories";

export interface GalleryItem {
  slug: string;
  title: string;
  category: ProductCategory;
  status: ProductStatus;
  label: string;
  price: string;
  image: string;
  gallery?: string[];
  summary: string;
  description: string;
  included: string[];
  addOns: string[];
  pairings: string[];
  specs?: string[];
}

export interface OptionCategory {
  title: string;
  category: ProductCategory;
  status: "active" | "soon";
  summary: string;
  availability: string;
  image: string;
}

export const navItems = [
  { label: "Featured", href: "/featured" },
  { label: "Discover", href: "/discover" },
  { label: "Options", href: "/options" },
  { label: "Estimate", href: "#estimate" },
];

export const standardIncludes = [
  "Delivery and installation included in service areas",
  "Built from birch plywood with finished trim details",
  "Painted Sherwin Williams Pure White unless noted",
  "60-inch electric fireplace included on core media wall models",
  "1-year labor and materials warranty",
  "TV and TV mount are not included",
];

export const addOnLibrary = [
  "Mantel upgrade",
  "Soundbar fitting",
  "Side shelving",
  "Extended width",
  "Premium finish",
  "Hidden wire planning",
];

export const featuredItems: GalleryItem[] = [
  {
    slug: "model-bp1",
    title: "Model BP1",
    category: "media-walls",
    status: "standard",
    label: "Foundational media wall",
    price: "$3,500-$4,000",
    image: "/great-wall/models/bp1-main.jpg",
    gallery: ["/great-wall/models/bp1-main.jpg", "/great-wall/models/bp1-mantel.png"],
    summary: "A clean, balanced fireplace wall with enough presence to anchor the room without crowding it.",
    description:
      "BP1 is the quiet standard: built for the family room that needs warmth, storage logic, and a finished architectural face without turning the wall into noise.",
    included: standardIncludes,
    addOns: ["Mantel upgrade +$300", "Soundbar fitting", "Extended height", "Finish consultation"],
    pairings: ["Pure White finish", "Warm gray stone floor", "Low-profile sofa grouping"],
    specs: ["8ft: $3,500", "9ft: $3,800", "10ft: $4,000"],
  },
  {
    slug: "model-bp2",
    title: "Model BP2",
    category: "media-walls",
    status: "standard",
    label: "Tall fireplace build",
    price: "$4,000-$4,500",
    image: "/great-wall/models/bp2-main.jpg",
    gallery: ["/great-wall/models/bp2-main.jpg", "/great-wall/models/bp2-mantel.jpg"],
    summary: "A taller wall treatment that brings more scale and ceremony to the fireplace zone.",
    description:
      "BP2 keeps the same practical install logic but raises the room presence. It works when the fireplace should feel like the main gathering wall, not an afterthought.",
    included: standardIncludes,
    addOns: ["Mantel upgrade", "Soundbar fitting", "Side shelving", "Height extension"],
    pairings: ["Large sectional", "Framed television", "Warm white lighting"],
    specs: ["8ft: $4,000", "9ft: $4,300", "10ft: $4,500"],
  },
  {
    slug: "model-bp3",
    title: "Model BP3",
    category: "media-walls",
    status: "standard",
    label: "Beadboard texture",
    price: "$4,750-$5,700",
    image: "/great-wall/models/bp3-beadboard.png",
    gallery: ["/great-wall/models/bp3-beadboard.png", "/great-wall/models/bp3-custom.jpg"],
    summary: "A textured, classic-leaning media wall for rooms that want detail without feeling busy.",
    description:
      "BP3 adds a crafted surface language. The beadboard treatment brings shadow, rhythm, and a little heritage into a modern fireplace wall.",
    included: standardIncludes,
    addOns: ["Beadboard finish", "Mantel upgrade", "Shelf returns", "Custom paint color"],
    pairings: ["Traditional trim", "Stone accessories", "Soft linen seating"],
    specs: ["Starting at $4,750", "Custom shown examples from $5,225"],
  },
  {
    slug: "model-bp4",
    title: "Model BP4",
    category: "media-walls",
    status: "standard",
    label: "Shelf-ready statement",
    price: "$5,000-$5,750",
    image: "/great-wall/models/bp4-s3.jpg",
    gallery: ["/great-wall/models/bp4-s3.jpg", "/great-wall/models/bp4-s2.jpg"],
    summary: "A stronger wall composition with room for styling, storage, and a bigger visual frame.",
    description:
      "BP4 moves closer to a full centerpiece. It gives the room a finished focal wall with more space for display and a more substantial built-in feeling.",
    included: standardIncludes,
    addOns: ["Three-section layout", "Two-section layout", "Side shelving", "Lighting prep"],
    pairings: ["Built-in decor", "Dark wood coffee table", "Warm spotlighting"],
    specs: ["S3 starting at $5,000", "S2 shown at $5,750"],
  },
  {
    slug: "model-bp5",
    title: "Model BP5",
    category: "media-walls",
    status: "custom",
    label: "Handcrafted example",
    price: "Quote guided by scope",
    image: "/great-wall/models/bp5-main.jpg",
    summary: "A custom-feeling media wall for clients who want the room to feel designed around the fire.",
    description:
      "BP5 is shown as inspiration for more tailored work. Use it as a starting point for proportion, finish direction, and quote conversation.",
    included: ["Custom layout review", "Finish planning", "Fireplace integration", "Install quote by scope"],
    addOns: addOnLibrary,
    pairings: ["Stone hearth", "Artwork above fireplace", "Ambient wall lighting"],
  },
  {
    slug: "model-bp6",
    title: "Model BP6",
    category: "media-walls",
    status: "custom",
    label: "No-mantel modern",
    price: "Starting around $5,700",
    image: "/great-wall/models/bp6-main.jpg",
    summary: "A cleaner modern treatment where the fireplace and wall plane do the work.",
    description:
      "BP6 is for the client who wants restraint. Less trim, more architecture, and a calmer finished surface for a modern living room.",
    included: ["Modern no-mantel profile", "Fireplace integration", "Custom finish review", "Install quote by scope"],
    addOns: ["Soundbar fitting", "Floating base", "Custom wall finish", "Hidden wire planning"],
    pairings: ["Minimal furniture", "Large-format stone", "Warm linear lighting"],
  },
  {
    slug: "model-bp7",
    title: "Model BP7",
    category: "media-walls",
    status: "standard",
    label: "Polished family wall",
    price: "Starting at $5,250",
    image: "/great-wall/models/bp7-main.png",
    summary: "A polished wall option that reads finished, warm, and practical for daily living.",
    description:
      "BP7 keeps the Great Wall promise simple: a better room to gather in, with the fire feature built into the way the family actually lives.",
    included: standardIncludes,
    addOns: ["Mantel upgrade", "Shelving", "Extended width", "Premium paint"],
    pairings: ["Family room seating", "Artwork ledge", "Copper-toned accessories"],
  },
  {
    slug: "model-ws2",
    title: "Model WS2",
    category: "media-walls",
    status: "standard",
    label: "Wide statement wall",
    price: "Starting at $6,000",
    image: "/great-wall/models/ws2-main.jpg",
    gallery: ["/great-wall/models/ws2-main.jpg", "/great-wall/models/ws1-gallery.jpg"],
    summary: "A wider wall system for clients who want the room to feel fully composed.",
    description:
      "WS2 is the step toward a complete showroom wall: fireplace, TV planning, trim, and proportions that make the whole room feel intentional.",
    included: standardIncludes,
    addOns: ["65-86 inch TV accommodation", "Shelf extensions", "Premium finish", "Lighting consultation"],
    pairings: ["Large media room", "Stone coffee table", "Layered warm lighting"],
    specs: ["Related gallery scale: $7,500-$8,600"],
  },
];

export const discoveryItems: GalleryItem[] = [
  {
    slug: "showroom-row",
    title: "Showroom Wall Row",
    category: "fireplaces",
    status: "custom",
    label: "Discovery direction",
    price: "Quote by finish and layout",
    image: "/great-wall/editorial/showroom-row.png",
    summary: "A row of flame features and finish treatments that shows how many moods one fireplace lane can hold.",
    description:
      "This direction is for discovery, not one fixed package. Stone, wood, black metal, and flame width can all shift the room from classic to modern.",
    included: ["Finish consultation", "Firebox sizing", "Wall treatment planning", "Quote by scope"],
    addOns: ["Stone face", "Wood slat panel", "Mantel beam", "Display shelves"],
    pairings: ["Showroom-style lighting", "Material samples", "Custom wall art"],
  },
  {
    slug: "installer-network",
    title: "Best in Show Network",
    category: "centerpieces",
    status: "future",
    label: "Contractor network",
    price: "Partner inquiries open",
    image: "/great-wall/editorial/award-materials.png",
    summary: "A future-facing installer network with social contests for best installs and standout craftsmanship.",
    description:
      "Great Wall can become more than a catalog. The contractor side gives skilled installers a lane to receive work, show proof, and compete for best-in-show recognition.",
    included: ["Installer interest intake", "Social proof direction", "Best-in-show concept", "Portfolio submission path"],
    addOns: ["Contractor page", "Contest gallery", "Submission form", "Monthly highlights"],
    pairings: ["Litty social campaigns", "Install reveal reels", "Client referral flow"],
  },
  {
    slug: "outdoor-gathering",
    title: "Outdoor Gathering Fire",
    category: "outdoor",
    status: "future",
    label: "Future category",
    price: "Quote when available",
    image: "/great-wall/editorial/showroom-portrait.jpeg",
    summary: "Outdoor fire features for the same idea: a place people naturally gather around.",
    description:
      "The outdoor lane is early, but the feeling matters now. Firepits and exterior flame features extend Great Wall from the living room into the family yard.",
    included: ["Future outdoor consultation", "Material direction", "Gathering-space planning"],
    addOns: ["Stone firepit", "Outdoor seating plan", "Patio centerpiece", "Seasonal styling"],
    pairings: ["Family events", "Patio furniture", "Warm exterior lighting"],
  },
  {
    slug: "custom-commissions",
    title: "Custom Commissions",
    category: "centerpieces",
    status: "custom",
    label: "Handcrafted lane",
    price: "Quote by commission",
    image: "/great-wall/future/family-firepit.png",
    summary: "One-off fireplace displays, branded room moments, and custom centerpiece ideas shaped around the client.",
    description:
      "Custom commissions are the discovery lane for clients who want something less catalog and more signature: a room anchor, display wall, or gathering feature designed around their space.",
    included: ["Creative direction", "Material planning", "Quote by scope", "Install path review"],
    addOns: ["Brand mark integration", "Stone finish study", "Lighting direction", "Social reveal planning"],
    pairings: ["Showroom displays", "Litty-family branding", "Premium material samples"],
  },
];

export const catalogItems = [...featuredItems, ...discoveryItems];

export const optionCategories: OptionCategory[] = [
  {
    title: "Media Walls",
    category: "media-walls",
    status: "active",
    summary: "The strongest v1 lane: fireplace, TV planning, trim, storage, and room-defining presence.",
    availability: "Featured now",
    image: "/great-wall/models/ws2-main.jpg",
  },
  {
    title: "Digital Fireplaces",
    category: "fireplaces",
    status: "active",
    summary: "Electric flame inserts and linear fireplace moments that set the warmth without a full wall build.",
    availability: "Quote ready",
    image: "/great-wall/future/legend-flame-insert.webp",
  },
  {
    title: "Centerpieces",
    category: "centerpieces",
    status: "soon",
    summary: "Custom focal objects and room anchors that sit between art, craft, and functional furniture.",
    availability: "Discovery lane",
    image: "/great-wall/editorial/award-materials.png",
  },
  {
    title: "Tables",
    category: "tables",
    status: "soon",
    summary: "Coffee and dining tables with stone, wood, and flame-adjacent material language.",
    availability: "Coming into view",
    image: "/great-wall/editorial/installer-boots.png",
  },
  {
    title: "Outdoor Fire Features",
    category: "outdoor",
    status: "soon",
    summary: "Future outdoor firepits and gathering spaces built around family, season, and atmosphere.",
    availability: "Future-ready",
    image: "/great-wall/future/family-firepit.png",
  },
  {
    title: "Accessories",
    category: "accessories",
    status: "active",
    summary: "Mantels, soundbar fittings, extensions, shelving, finish upgrades, and small decisions that finish the wall.",
    availability: "Add-on ready",
    image: "/great-wall/models/bp1-mantel.png",
  },
];

export function getItemBySlug(slug: string) {
  return catalogItems.find((item) => item.slug === slug);
}

export function getItemsByCategory(category: ProductCategory) {
  return catalogItems.filter((item) => item.category === category);
}
