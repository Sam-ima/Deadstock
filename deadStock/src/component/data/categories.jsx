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
    description: 'Latest smartphones, laptops, cameras, drones, gaming consoles, headphones, and smart devices. Stay updated with cutting-edge technology.',
    icon: <DevicesIcon fontSize="small" />,
    depreciationType: 'FAST',
    color: '#2196F3',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=600&q=80',
    imageAlt: 'Modern electronics including smartphones, laptops and tablets'
  },
  {
    id: 'cat_fashion',
    name: 'Fashion',
    slug: 'fashion',
    description: 'Trendy clothing, designer shoes, seasonal apparel, accessories, and luxury fashion items. Stay stylish with the latest trends.',
    icon: <CheckroomIcon fontSize="small" />,
    depreciationType: 'SEASONAL',
    color: '#E91E63',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=600&q=80',
    imageAlt: 'Fashion clothing and accessories arranged stylishly'
  },
  {
    id: 'cat_collectibles',
    name: 'Collectibles',
    slug: 'collectibles',
    description: 'Rare antiques, fine art pieces, limited edition memorabilia, vintage toys, coins, and exclusive collectible items with investment potential.',
    icon: <CollectionsIcon fontSize="small" />,
    depreciationType: 'SLOW',
    color: '#FF9800',
    image: 'https://images.unsplash.com/photo-1559314809-2b99056a8c4a?auto=format&fit=crop&w=600&q=80',
    imageAlt: 'Vintage collectibles and antique items on display'
  },
  {
    id: 'cat_bulk',
    name: 'Wholesale Stock',
    slug: 'wholesale',
    description: 'Bulk inventory lots, warehouse clearance items, pallet sales, wholesale electronics, and business liquidation stock for resellers.',
    icon: <WarehouseIcon fontSize="small" />,
    depreciationType: 'ACCELERATED',
    color: '#795548',
    image: 'https://images.unsplash.com/photo-1563729114-32a45b5b8dc4?auto=format&fit=crop&w=600&q=80',
    imageAlt: 'Warehouse with stacked boxes and wholesale inventory'
  },
  {
    id: 'cat_automotive',
    name: 'Automotive',
    slug: 'automotive',
    description: 'Car parts, accessories, tires, tools, detailing products, performance upgrades, and automotive maintenance equipment for all vehicle types.',
    icon: <DirectionsCarIcon fontSize="small" />,
    depreciationType: 'MODERATE',
    color: '#9C27B0',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80',
    imageAlt: 'Car parts and automotive accessories arranged neatly'
  },
  {
    id: 'cat_home',
    name: 'Home & Garden',
    slug: 'home',
    description: 'Furniture, home decor, kitchenware, bedding, gardening tools, outdoor furniture, and home improvement supplies for comfortable living.',
    icon: <HomeIcon fontSize="small" />,
    depreciationType: 'SLOW',
    color: '#4CAF50',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80',
    imageAlt: 'Modern home decor and furniture in a living room'
  },
  {
    id: 'cat_kitchen',
    name: 'Kitchen & Dining',
    slug: 'kitchen',
    description: 'Premium cookware sets, utensils, dinnerware, small appliances, glassware, cutlery, and professional kitchen equipment for culinary enthusiasts.',
    icon: <RestaurantIcon fontSize="small" />,
    depreciationType: 'MODERATE',
    color: '#FF5722',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=600&q=80',
    imageAlt: 'Modern kitchen utensils and cookware on counter'
  },
  {
    id: 'cat_sports',
    name: 'Sports & Fitness',
    slug: 'sports',
    description: 'Exercise equipment, sports gear, yoga mats, fitness trackers, team sports equipment, outdoor gear, and athletic apparel for active lifestyles.',
    icon: <FitnessCenterIcon fontSize="small" />,
    depreciationType: 'FAST',
    color: '#3F51B5',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80',
    imageAlt: 'Sports equipment including weights and fitness gear'
  },
  {
    id: 'cat_music',
    name: 'Musical Instruments',
    slug: 'music',
    description: 'Guitars, keyboards, drums, violins, audio equipment, recording gear, DJ equipment, and musical accessories for musicians of all levels.',
    icon: <MusicNoteIcon fontSize="small" />,
    depreciationType: 'SLOW',
    color: '#009688',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=600&q=80',
    imageAlt: 'Various musical instruments including guitars and keyboards'
  },
  {
    id: 'cat_books',
    name: 'Books & Media',
    slug: 'books',
    description: 'Books across all genres, magazines, educational materials, vinyl records, DVDs, Blu-rays, and collectible media for entertainment and learning.',
    icon: <BookIcon fontSize="small" />,
    depreciationType: 'SEASONAL',
    color: '#607D8B',
    image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=600&q=80',
    imageAlt: 'Stacked books and media items on a shelf'
  }
];

export default categories;