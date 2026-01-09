// src/pages/product/components/tabs/TabsHeader.jsx
import { Paper, Tabs, Tab } from '@mui/material';
import {
  CheckCircle,
  Verified,
  Star,
  ThumbUp,
} from '@mui/icons-material';

const TabsHeader = ({ product, tabValue, setTabValue }) => (
  <Paper elevation={0} sx={{ borderRadius: 2, mb: 3 }}>
    <Tabs
      value={tabValue}
      onChange={(e, v) => setTabValue(v)}
      variant="scrollable"
      scrollButtons="auto"
    >
      <Tab icon={<CheckCircle />} label="Description" />
      {product.specifications && <Tab icon={<Verified />} label="Specifications" />}
      {product.features && <Tab icon={<Star />} label="Features" />}
      <Tab icon={<ThumbUp />} label={`Reviews (${product.reviews || 0})`} />
    </Tabs>
  </Paper>
);

export default TabsHeader;
