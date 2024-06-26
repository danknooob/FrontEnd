import React from 'react';
import { motion } from 'framer-motion';

const OrderHistory = ({ orders }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-lg rounded-lg p-4 mb-4"
    >
      <h2 className="text-lg font-semibold mb-2">Order History</h2>
      <div>
        {orders.map((order, index) => (
          <motion.div
            key={index}
            className="border-b border-gray-200 py-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <p className="text-gray-600">Order #{order.id}</p>
            {/* Additional order details like date, items, total, etc. */}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default OrderHistory;
