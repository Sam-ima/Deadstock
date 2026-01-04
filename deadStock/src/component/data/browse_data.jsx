import DevicesIcon from '@mui/icons-material/Devices';
import WeekendIcon from '@mui/icons-material/Weekend';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import YardIcon from '@mui/icons-material/Yard';
import StarIcon from '@mui/icons-material/Star';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const browseData = [
  {
    name: 'Electronics',
    slug: 'electronics',
    description: 'Mobiles, laptops, gadgets and accessories',
    icon: <DevicesIcon />,
  },
  {
    name: 'Furniture',
    slug: 'furniture',
    description: 'Comfortable and stylish furniture for your home',
    icon: <WeekendIcon />,
  },
  {
    name: 'Fashion',
    slug: 'fashion',
    description: 'Trending clothing and accessories',
    icon: <CheckroomIcon />,
  },
  {
    name: 'Home & Garden',
    slug: 'home-garden',
    description: 'Everything for home improvement and gardening',
    icon: <YardIcon />,
  },
  {
    name: 'Collectibles',
    slug: 'collectibles',
    description: 'Rare and valuable collectible items',
    icon: <StarIcon />,
  },
  {
    name: 'Books',
    slug: 'books',
    description: 'Books across multiple genres and interests',
    icon: <MenuBookIcon />,
  },
];

export default browseData;
