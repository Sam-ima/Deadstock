import electronicsImg from "../../../../assets/images/electronics.png";
import automotiveImg from "../../../../assets/images/automotive.png";
import booksImg from "../../../../assets/images/bookAndMedia.png";
import collectiblesImg from "../../../../assets/images/collectibles.png";
import fashionImg from "../../../../assets/images/fashion.png";
import homeGardenImg from "../../../../assets/images/homeAndGarden.png";
import kitchenImg from "../../../../assets/images/kitchenAndDining.png";
import musicImg from "../../../../assets/images/musicalInstrument.png";
import sportsImg from "../../../../assets/images/sportsAndFitness.png";
import wholesaleImg from "../../../../assets/images/wholesaleStock.png";
import fallback1 from "../../../../assets/images/random1.png";
import fallback2 from "../../../../assets/images/random2.png";

/* =========================
   STATIC IMAGE MAPPING
========================= */
const CATEGORY_IMAGES = {
  electronics: electronicsImg,
  automotive: automotiveImg,
  "book and media": booksImg,
  collectibles: collectiblesImg,
  fashion: fashionImg,
  "home and garden": homeGardenImg,
  "kitchen and dining": kitchenImg,
  "musical instrument": musicImg,
  "sports and fitness": sportsImg,
  "wholesale stock": wholesaleImg,
};

/* =========================
   STATIC COLOR MAPPING
========================= */
const CATEGORY_COLORS = {
  electronics: "#2196F3",
  automotive: "#9C27B0",
  "book and media": "#607D8B",
  collectibles: "#ff9800",
  fashion: "#e91e63",
  "home and garden": "#4CAF50",
  "kitchen and dining": "#FF5722",
  "musical instrument": "#009688",
  "sports and fitness": "#3F51B5",
  "wholesale stock": "#795548",
};

/* =========================
   FALLBACKS
========================= */
const FALLBACK_IMAGES = [fallback1, fallback2];
const FALLBACK_COLOR = "#9e9e9e";

/* =========================
   IMAGE HELPER
========================= */
export const getCategoryImage = (name = "") => {
  const key = name.toLowerCase().trim();
  if (CATEGORY_IMAGES[key]) return CATEGORY_IMAGES[key];
  return FALLBACK_IMAGES[Math.floor(Math.random() * FALLBACK_IMAGES.length)];
};

/* =========================
   COLOR HELPER
========================= */
export const getCategoryColor = (name = "") => {
  const key = name.toLowerCase().trim();
  return CATEGORY_COLORS[key] || FALLBACK_COLOR;
};