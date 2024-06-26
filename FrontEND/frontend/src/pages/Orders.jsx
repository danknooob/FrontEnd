import React from 'react';
import SideBar from '../components/SideBar';
import { motion } from 'framer-motion';

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

const Orders = () => {
  return (
    <div className="flex h-screen">
      <SideBar />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="flex-grow p-4 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">My Orders</h1>
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="p-4 bg-white shadow rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-lg font-semibold">Order #{order.id}</h4>
                  <p className="text-sm text-gray-500">{order.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">${order.total}</p>
                  <p className="text-sm text-gray-500">{order.items.join(', ')}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Orders;
