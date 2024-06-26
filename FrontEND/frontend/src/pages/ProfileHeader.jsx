import React from 'react';
import { motion } from 'framer-motion';

const ProfileHeader = ({ user }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-lg rounded-lg p-4 flex items-center justify-between mb-4"
    >
      <div className="flex items-center">
        <img
          src={user.avatar}
          alt="Profile"
          className="rounded-full h-12 w-12 object-cover mr-4"
        />
        <div>
          <h1 className="text-xl font-bold">{user.name}</h1>
          <p className="text-gray-500">{user.bio}</p>
        </div>
      </div>
      {/* Additional actions or settings button */}
      {/* Example: <button className="text-blue-500">Edit Profile</button> */}
    </motion.div>
  );
};

export default ProfileHeader;
