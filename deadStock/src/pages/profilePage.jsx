// src/pages/profilePage.jsx
import React, { useState } from 'react';
import { Container } from '@mui/material';
import { getUserRole } from '../utils/profileAuth.jsx';
import ProfileHeader from '../component/profile/profileHeader.jsx';
import PersonalInfo from '../component/profile/personalInfo.jsx';
import RecentOrders from '../component/profile/recentOrders.jsx';
import SellerProducts from '../component/profile/sellerProducts.jsx';

const ProfilePage = () => {
  const role = getUserRole();

  const [user] = useState({
    name: 'Roshni Giri',
    email: 'roshni@example.com',
    phone: '+977-123456789',
    address: 'Pokhara, Nepal',
    avatar: '',
  });

  const [products, setProducts] = useState([
    { id: 1, name: 'Product A', price: 100 },
    { id: 2, name: 'Product B', price: 200 },
  ]);

  const [orders] = useState([
    { id: 1, status: 'Delivered', total: 300 },
    { id: 2, status: 'Pending', total: 150 },
  ]);

  const handleAddProduct = (product) => setProducts([...products, product]);
  const handleEditProduct = (editedProduct) => {
    setProducts(products.map(p => p.id === editedProduct.id ? editedProduct : p));
  };
  const handleDeleteProduct = (id) => setProducts(products.filter(p => p.id !== id));

  return (
    <Container sx={{ py: 5, backgroundColor: '#ffffff', minHeight: '100vh' }}>
      <ProfileHeader user={user} />
      <PersonalInfo user={user} />
      {role === 'seller' ? (
        <SellerProducts
          products={products}
          onAddProduct={handleAddProduct}
          onEditProduct={handleEditProduct}
          onDeleteProduct={handleDeleteProduct}
        />
      ) : (
        <RecentOrders orders={orders} />
      )}
    </Container>
  );
};

export default ProfilePage;
