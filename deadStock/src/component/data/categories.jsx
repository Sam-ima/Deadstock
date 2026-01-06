import DevicesIcon from '@mui/icons-material/Devices';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import CollectionsIcon from '@mui/icons-material/Collections';
import WarehouseIcon from '@mui/icons-material/Warehouse';

const categories = [
  {
    id: 'cat_electronics',
    name: 'Electronics',
    slug: 'electronics',
    icon: <DevicesIcon fontSize="small" />,
    depreciationType: 'FAST',
  },
  {
    id: 'cat_fashion',
    name: 'Fashion',
    slug: 'fashion',
    icon: <CheckroomIcon fontSize="small" />,
    depreciationType: 'SEASONAL',
  },
  {
    id: 'cat_collectibles',
    name: 'Collectibles',
    slug: 'collectibles',
    icon: <CollectionsIcon fontSize="small" />,
    depreciationType: 'SLOW',
  },
  {
    id: 'cat_bulk',
    name: 'Wholesale Stock',
    slug: 'wholesale',
    icon: <WarehouseIcon fontSize="small" />,
    depreciationType: 'ACCELERATED',
  },
];

export default categories;
