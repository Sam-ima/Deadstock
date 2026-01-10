// utils/categoryIcons.js
import DevicesIcon from '@mui/icons-material/Devices';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import CollectionsIcon from '@mui/icons-material/Collections';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import HomeIcon from '@mui/icons-material/Home';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import BookIcon from '@mui/icons-material/Book';

export const getCategoryIcon = (category) => {
  const key = (category.slug || category.name || '').toLowerCase();

  if (key.includes('electronics')) return <DevicesIcon />;
  if (key.includes('fashion') || key.includes('clothing')) return <CheckroomIcon />;
  if (key.includes('art') || key.includes('collect')) return <CollectionsIcon />;
  if (key.includes('warehouse') || key.includes('wholesale')) return <WarehouseIcon />;
  if (key.includes('car') || key.includes('auto')) return <DirectionsCarIcon />;
  if (key.includes('home')) return <HomeIcon />;
  if (key.includes('food')) return <RestaurantIcon />;
  if (key.includes('fitness') || key.includes('sport')) return <FitnessCenterIcon />;
  if (key.includes('music')) return <MusicNoteIcon />;
  if (key.includes('book')) return <BookIcon />;

  return <WarehouseIcon />; // fallback
};
