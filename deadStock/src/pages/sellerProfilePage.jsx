// SellerProfilePage.js
import React, { useState } from 'react';
import { Container, Box } from '@mui/material';
import ProfileHeader from '../component/sellerProfile/profileHeader';
import ProfileStats from '../component/sellerProfile/profileStats';
import ProductsSection from '../component/sellerProfile/productsSection';
import MenuList from '../component/sellerProfile/menuList';
import RecentActivity from '../component/sellerProfile/recentActivity';

const SellerProfilePage = () => {
  // Dummy dataset matching the image
  const profileData = {
    name: "Jordan Smith",
    username: "@jordankicks",
    verified: true,
    avatar: null, // You can add an avatar image URL here
  };

  const statsData = [
    { label: 'Selling', value: 24, icon: '🛍️' },
    { label: 'Sold', value: 158, icon: '✓' },
    { label: 'Rating', value: 4.9, icon: '⭐' },
  ];

  const productsData = {
    selling: [
      { name: 'Nike Dunk Low', price: '$250' },
      { name: 'Supreme Tee', price: '$120' },
    ],
    saved: []
  };

  const menuItemsData = [
    { text: 'Settings', icon: '⚙️' },
    { 
      text: 'Payment Methods', 
      icon: '💳',
      badge: 'Visa ending in 4242' 
    },
    { 
      text: 'Shipping Addresses', 
      icon: '📍',
      badge: '2 addresses saved' 
    },
    { 
      text: 'Notifications', 
      icon: '🔔',
      badge: 'Price drops, Order updates' 
    },
    { 
      text: 'Privacy & Security', 
      icon: '🔒',
      badge: 'Password · 2FA' 
    },
  ];

  const recentActivityData = [
    { title: 'Purchase: Yeezy Slide', date: 'Oct 18', status: 'Processing', icon: '🚚' }
  ];

  return (
    <Container 
      maxWidth="sm" 
      sx={{ 
        bgcolor: 'white', 
        minHeight: '100vh', 
        p: 0,
        fontFamily: '-SellerProfilePagele-system, BlinkMacSystemFont, sans-serif'
      }}
    >
      <Box sx={{ p: 3 }}>
        <ProfileHeader data={profileData} />
        <ProfileStats stats={statsData} />
        <ProductsSection products={productsData} />
        <MenuList items={menuItemsData} />
        <RecentActivity activity={recentActivityData} />
      </Box>
    </Container>
  );
};

export default SellerProfilePage;