// BuyerProfilrPage.js
import React from 'react';
import { Box, Container } from '@mui/material';
import ProfileHeader from '../component/sellerProfile/profileHeader';
import ProfileStats from '../component/sellerProfile/profileStats';
import ProductsSection from '../component/sellerProfile/productsSection';
import MenuList from '../component/sellerProfile/menuList';
import RecentActivity from '../component/sellerProfile/recentActivity';

const SellerProfilePage = () => {
  return (
    <Container maxWidth="sm" sx={{ bgcolor: 'white', minHeight: '100vh', p: 2 }}>
      <ProfileHeader />
      <ProfileStats />
      <ProductsSection />
      <MenuList />
      <RecentActivity />
    </Container>
  );
};

export default SellerProfilePage;