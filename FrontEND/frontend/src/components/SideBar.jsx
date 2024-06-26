import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaHome, FaMoneyBill, FaUser, FaCog } from 'react-icons/fa';
import { MdMessage } from 'react-icons/md';
import { BiAnalyse, BiSupport } from 'react-icons/bi';
import { AiFillHeart } from 'react-icons/ai';
import { BsCartCheck } from 'react-icons/bs';
import { AnimatePresence, motion } from 'framer-motion';

const routes = [
  {
    path: '/landingpage',
    name: 'Home',
    icon: <FaHome className="text-2xl" />, // Increased icon size
  },
  {
    path: '/messages',
    name: 'Messages',
    icon: <MdMessage className="text-2xl" />, // Increased icon size
  },
  {
    path: '/analytics',
    name: 'Analytics',
    icon: <BiAnalyse className="text-2xl" />, // Increased icon size
  },
  {
    path: '/profile',
    name: 'Profile',
    icon: <FaUser className="text-2xl" />, // Increased icon size
  },
  {
    path: '/orders',
    name: 'Orders',
    icon: <BsCartCheck className="text-2xl" />, // Increased icon size
  },
  {
    path: '/settings',
    name: 'Settings',
    icon: <FaCog className="text-2xl" />, // Increased icon size
  },
  {
    path: '/support',
    name: 'Support',
    icon: <BiSupport className="text-2xl" />, // Increased icon size
  },
  {
    path: '/billing',
    name: 'Billing',
    icon: <FaMoneyBill className="text-2xl" />, // Increased icon size
  },
  {
    path: '/saved',
    name: 'Saved',
    icon: <AiFillHeart className="text-2xl" />, // Increased icon size
  },
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: 'auto',
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="main-container flex h-screen">
      <motion.div
        animate={{
          width: isOpen ? '200px' : '45px',
          transition: {
            duration: 0.5,
            type: 'spring',
            damping: 10,
          },
        }}
        className="sidebar bg-gray-800 text-white min-h-screen"
      >
        <div className="top_section flex items-center justify-between p-4">
          <AnimatePresence>
            {isOpen && (
              <motion.h1
                variants={showAnimation}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="logo text-xl"
              >
                <NavLink to="/landingpage" className="text-white">
                  ByteBazaar
                </NavLink>
              </motion.h1>
            )}
          </AnimatePresence>
          <div className="bars cursor-pointer">
            <FaBars onClick={toggle} className="text-2xl" /> {/* Increased icon size */}
          </div>
        </div>
        <section className="routes">
          {routes.map((route, index) => (
            <NavLink
              to={route.path}
              key={index}
              className="link flex items-center p-4 text-gray-400 hover:bg-gray-700 hover:text-white transition-all duration-300"
              activeClassName="bg-gray-700 text-white"
            >
              <div className="icon mr-4">{route.icon}</div>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    variants={showAnimation}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="link_text text-lg" // Increased text size
                  >
                    {route.name}
                  </motion.div>
                )}
              </AnimatePresence>
            </NavLink>
          ))}
        </section>
      </motion.div>
      <main className="flex-grow p-4">{children}</main>
    </div>
  );
};

export default SideBar;
