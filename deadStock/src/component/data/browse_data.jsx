// src/data/browse_data.js
import DevicesIcon from '@mui/icons-material/Devices';
import WeekendIcon from '@mui/icons-material/Weekend';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import YardIcon from '@mui/icons-material/Yard';
import StarIcon from '@mui/icons-material/Star';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const browseData = [
  { name: 'Electronics', slug: 'electronics', icon: <DevicesIcon /> },
  { name: 'Furniture', slug: 'furniture', icon: <WeekendIcon /> },
  { name: 'Fashion', slug: 'fashion', icon: <CheckroomIcon /> },
  { name: 'Home & Garden', slug: 'home-garden', icon: <YardIcon /> },
  { name: 'Collectibles', slug: 'collectibles', icon: <StarIcon /> },
  { name: 'Books', slug: 'books', icon: <MenuBookIcon /> },
];

export default browseData;
