// src/components/BrowseByCategory/browse.utils.js
export const getCardWidth = ({ isLarge, isDesktop, isTablet }) => {
  if (isLarge) return 240;
  if (isDesktop) return 220;
  if (isTablet) return 200;
  return 180;
};
