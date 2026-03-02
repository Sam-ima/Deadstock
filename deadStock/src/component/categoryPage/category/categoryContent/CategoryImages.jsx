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
  arts: "#123456",
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
   NORMALIZE STRING
========================= */
const normalizeString = (str = "") => {
  return str
    .toLowerCase()
    .replace(/&/g, "and")          // convert & → and
    .replace(/[^a-z0-9\s]/g, "")   // remove special chars
    .trim();
};

/* =========================
   WORD-BASED MATCH HELPER
========================= */
const findBestMatchKey = (name = "") => {
  const normalizedInput = normalizeString(name);

  if (!normalizedInput) return null;

  const inputWords = normalizedInput.split(" ");

  const keys = Object.keys(CATEGORY_IMAGES);

  for (let key of keys) {
    const normalizedKey = normalizeString(key);
    const keyWords = normalizedKey.split(" ");

    // If ANY word matches
    const hasMatch = inputWords.some(word =>
      keyWords.includes(word)
    );

    if (hasMatch) {
      return key;
    }
  }

  return null;
};

/* =========================
   IMAGE HELPER
========================= */
export const getCategoryImage = (name = "") => {
  const matchedKey = findBestMatchKey(name);

  if (matchedKey && CATEGORY_IMAGES[matchedKey]) {
    return CATEGORY_IMAGES[matchedKey];
  }

  return FALLBACK_IMAGES[
    Math.floor(Math.random() * FALLBACK_IMAGES.length)
  ];
};

/* =========================
   COLOR HELPER
========================= */
export const getCategoryColor = (name = "") => {
  const matchedKey = findBestMatchKey(name);

  if (matchedKey && CATEGORY_COLORS[matchedKey]) {
    return CATEGORY_COLORS[matchedKey];
  }

  return FALLBACK_COLOR;
};