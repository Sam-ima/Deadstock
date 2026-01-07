// src/data/categories.js
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

const categories = [
  {
    id: 'cat_electronics',
    name: 'Electronics',
    slug: 'electronics',
    description: 'Cameras, drones, mobiles and electronic gadgets',
    icon: <DevicesIcon fontSize="small" />,
    depreciationType: 'FAST',
    color: '#2196F3',
  },
  {
    id: 'cat_fashion',
    name: 'Fashion',
    slug: 'fashion',
    description: 'Clothing, shoes and seasonal apparel',
    icon: <CheckroomIcon fontSize="small" />,
    depreciationType: 'SEASONAL',
    color: '#E91E63',
  },
  {
    id: 'cat_collectibles',
    name: 'Collectibles',
    slug: 'collectibles',
    description: 'Antiques, art pieces and rare items',
    icon: <CollectionsIcon fontSize="small" />,
    depreciationType: 'SLOW',
    color: '#FF9800',
  },
  {
    id: 'cat_bulk',
    name: 'Wholesale Stock',
    slug: 'wholesale',
    description: 'Bulk inventory and warehouse clearance items',
    icon: <WarehouseIcon fontSize="small" />,
    depreciationType: 'ACCELERATED',
    color: '#795548',
  },
  {
    id: 'cat_automotive',
    name: 'Automotive',
    slug: 'automotive',
    description: 'Car parts, accessories, and automotive tools',
    icon: <DirectionsCarIcon fontSize="small" />,
    depreciationType: 'MODERATE',
    color: '#9C27B0',
  },
  {  description: 'Furniture, decor, and gardening supplies',
    icon: <HomeIcon fontSize="small" />,
    depreciationType: 'SLOW',
    color: '#4CAF50',
  },
  {
    id: 'cat_kitchen',
    name: 'Kitchen & Dining',
    slug: 'kitchen',
    description: 'Cookware, utensils, and dining accessories',
    icon: <RestaurantIcon fontSize="small" />,
    depreciationType: 'MODERATE',
    color: '#FF5722',
  },
  {
    id: 'cat_sports',
    name: 'Sports & Fitness',
    slug: 'sports',
    description: 'Exercise equipment, sports gear, and outdoor',
    icon: <FitnessCenterIcon fontSize="small" />,
    depreciationType: 'FAST',
    color: '#3F51B5',
  },
  {
    id: 'cat_music',
    name: 'Musical Instruments',
    slug: 'music',
    description: 'Instruments, audio equipment, and accessories',
    icon: <MusicNoteIcon fontSize="small" />,
    depreciationType: 'SLOW',
    color: '#009688',
  },
  {
    id: 'cat_books',
    name: 'Books & Media',
    slug: 'books',
    description: 'Books, magazines, DVDs, and vinyl records',
    icon: <BookIcon fontSize="small" />,
    depreciationType: 'SEASONAL',
    color: '#607D8B',
  },
  
];

export default categories;



