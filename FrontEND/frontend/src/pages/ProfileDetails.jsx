import React from 'react';
import { motion } from 'framer-motion';

const ProfileDetails = ({ user }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-lg rounded-lg p-4 mb-4"
    >
      <h2 className="text-lg font-semibold mb-2">Profile Details</h2>
      <div className="flex justify-between">
        <div className="w-1/2">
          <p className="text-gray-600">Email:</p>
          <p>{user.email}</p>
        </div>
        <div className="w-1/2">
          <p className="text-gray-600">Phone:</p>
          <p>{user.phone}</p>
        </div>
      </div>
      {/* Add more details like address, membership status, etc. */}
    </motion.div>
  );
};

export default ProfileDetails;
