export type BuilderModelId = "bp1" | "bp2" | "bp4";

export type BuilderOptionId =
  | "soundbar"
  | "mantel"
  | "sideShelves"
  | "lowerCabinets"
  | "ledLighting"
  | "premiumFinish";

export interface BuilderModel {
  id: BuilderModelId;
  name: string;
  description: string;
  basePrice: number;
  widthInches: number;
  heightInches: number;
  tvLabel: string;
  fireplaceLabel: string;
  included: string[];
}

export interface BuilderOption {
  id: BuilderOptionId;
  label: string;
  group: "Layout" | "Finish" | "Electrical";
  price: number;
  description: string;
  defaultSelected?: boolean;
}

export const builderModels: BuilderModel[] = [
  {
    id: "bp1",
    name: "Model BP1",
    description: "The clean foundational media wall with TV prep and a centered fireplace opening.",
    basePrice: 3500,
    widthInches: 96,
    heightInches: 96,
    tvLabel: "55-65 inch TV",
    fireplaceLabel: "60 inch fireplace",
    included: ["Paint-ready finish", "TV mount prep", "Fireplace opening"],
  },
  {
    id: "bp2",
    name: "Model BP2",
    description: "A taller fireplace wall for rooms that need more height and stronger presence.",
    basePrice: 4000,
    widthInches: 108,
    heightInches: 108,
    tvLabel: "65-75 inch TV",
    fireplaceLabel: "60 inch fireplace",
    included: ["Tall wall face", "TV mount prep", "Fireplace opening"],
  },
  {
    id: "bp4",
    name: "Model BP4",
    description: "The wider statement starting point with room for shelving and cabinet decisions.",
    basePrice: 5000,
    widthInches: 120,
    heightInches: 96,
    tvLabel: "65-86 inch TV",
    fireplaceLabel: "72 inch fireplace",
    included: ["Wide wall face", "TV mount prep", "Fireplace opening"],
  },
];

export const builderOptions: BuilderOption[] = [
  {
    id: "soundbar",
    label: "Soundbar niche",
    group: "Layout",
    price: 350,
    description: "Adds a narrow cutout below the TV for a soundbar.",
  },
  {
    id: "mantel",
    label: "Floating mantel",
    group: "Layout",
    price: 650,
    description: "Adds a shelf line between the TV area and the fireplace.",
  },
  {
    id: "sideShelves",
    label: "Side shelves",
    group: "Layout",
    price: 900,
    description: "Adds open shelving zones on both sides of the media wall.",
  },
  {
    id: "lowerCabinets",
    label: "Lower cabinets",
    group: "Layout",
    price: 1200,
    description: "Adds a storage run below the wall composition.",
  },
  {
    id: "ledLighting",
    label: "LED lighting",
    group: "Electrical",
    price: 450,
    description: "Adds accent lighting lines for the shelves or wall face.",
  },
  {
    id: "premiumFinish",
    label: "Premium finish",
    group: "Finish",
    price: 750,
    description: "Represents upgraded paint, texture, or finish consultation.",
  },
];

export function calculateBuilderTotal(
  model: BuilderModel,
  selectedOptionIds: BuilderOptionId[],
) {
  return selectedOptionIds.reduce((total, optionId) => {
    const option = builderOptions.find((entry) => entry.id === optionId);
    return total + (option?.price ?? 0);
  }, model.basePrice);
}

export function formatEstimatePrice(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}
