// src/pages/product/components/ProductTabs.jsx
import { useState } from 'react';
import { Box, Paper } from '@mui/material';

import TabsHeader from './productTabs/tabs/tabsHeader';
import DescriptionTab from './productTabs/tabs/descriptionTab';
import SpecificationsTab from './productTabs/tabs/specificationsTab';
import FeaturesTab from './productTabs/tabs/featuresTab';
import ReviewsTab from './productTabs/tabs/reviewsTab';

const ProductTabs = ({ product, tabValue, setTabValue }) => {
  const [openReviewDialog, setOpenReviewDialog] = useState(false);

  return (
    <Box sx={{ width: '100%', mt: 5 }}>
      <TabsHeader
        product={product}
        tabValue={tabValue}
        setTabValue={setTabValue}
      />

      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        {tabValue === 0 && <DescriptionTab product={product} />}
        {tabValue === 1 && product.specifications && (
          <SpecificationsTab product={product} />
        )}
        {tabValue === 2 && product.features && (
          <FeaturesTab product={product} />
        )}
        {tabValue === 3 && (
          <ReviewsTab
            product={product}
            openReviewDialog={openReviewDialog}
            setOpenReviewDialog={setOpenReviewDialog}
          />
        )}
      </Paper>
    </Box>
  );
};

export default ProductTabs;
