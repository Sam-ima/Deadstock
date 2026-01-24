// src/pages/categories/components/categoryImages.js
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

const FALLBACK_IMAGES = [fallback1, fallback2];

export const getCategoryImage = (name = "") => {
  const key = name.toLowerCase().trim();
  if (CATEGORY_IMAGES[key]) return CATEGORY_IMAGES[key];
  return FALLBACK_IMAGES[Math.floor(Math.random() * FALLBACK_IMAGES.length)];
};
