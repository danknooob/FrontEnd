// src/pages/Profile.jsx
import React, { useState } from 'react';
import ProfileHeader from '../components/ProfileHeader';
import ProfileDetails from '../components/ProfileDetails';
import OrderHistory from '../components/OrderHistory';
import { motion } from 'framer-motion';
import SideBar from '../components/SideBar';

const initialUser = {
  name: 'John Doe',
  avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  bio: 'Passionate about online shopping!',
  email: 'johndoe@example.com',
  phone: '+1234567890',
};

const orders = [
  { id: 1, date: '2024-06-28', items: ['Laptop', 'Mouse'], total: 1200 },
  { id: 2, date: '2024-06-27', items: ['Headphones', 'Keyboard'], total: 400 },
  { id: 3, date: '2024-06-25', items: ['Smartphone', 'Case'], total: 800 },
  { id: 4, date: '2024-06-24', items: ['Tablet', 'Charger'], total: 600 },
  { id: 5, date: '2024-06-22', items: ['Monitor', 'Cables'], total: 1500 },
  { id: 6, date: '2024-06-21', items: ['Printer', 'Ink Cartridges'], total: 300 },
  { id: 7, date: '2024-06-18', items: ['Camera', 'Memory Card'], total: 900 },
  { id: 8, date: '2024-06-15', items: ['External Hard Drive', 'USB Stick'], total: 200 },
  { id: 9, date: '2024-06-12', items: ['Gaming Chair', 'Desk Lamp'], total: 700 },
  { id: 10, date: '2024-06-10', items: ['Backpack', 'Water Bottle'], total: 50 },
];

const Profile = () => {
  const [user, setUser] = useState(initialUser);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser(prevState => ({ ...prevState, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEmailChange = (email) => {
    setUser(prevState => ({ ...prevState, email }));
  };

  const handlePhoneChange = (phone) => {
    setUser(prevState => ({ ...prevState, phone }));
  };

  return (
    <div className="flex h-screen">
      <SideBar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-grow p-4 overflow-y-auto"
      >
        <ProfileHeader user={user} onAvatarChange={handleAvatarChange} />
        <ProfileDetails user={user} onEmailChange={handleEmailChange} onPhoneChange={handlePhoneChange} />
        <OrderHistory orders={orders} />
      </motion.div>
    </div>
  );
};

export default Profile;
