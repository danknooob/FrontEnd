import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import 'chart.js/auto';
import Graphs from './Graphs';
import Sidebar from './SideBar';

const Dashboard = () => {
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [purchasedProducts, setPurchasedProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const[seller,setSeller]=useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user ID
        const userIdResponse = await fetch('/api/auth/signedInUserId');
        const userIdData = await userIdResponse.json();
        const { userId } = userIdData;
        setUserId(userId);

        // Fetch user details (name and avatar)
        const userResponse = await fetch(`/api/user/${userId}`); 
        const userData = await userResponse.json();
        setUserName(userData.username);
        setUserAvatar(userData.avatar);
        setSeller(userData.isSeller);

        // Fetch purchased products
        const purchasedResponse = await fetch(`/api/cart/getPurchasedProducts/${userId}`);
        const purchasedData = await purchasedResponse.json();
        setPurchasedProducts(purchasedData);

        // Fetch cart products
        const cartResponse = await fetch(`/api/cart/getcart/${userId}`);
        const cartData = await cartResponse.json();
        setCartProducts(cartData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Find most purchased products
  let mostPurchased = [];
  if (purchasedProducts.length > 0) {
    // Count total quantity for each product by listingId
    const quantityMap = {};
    purchasedProducts.forEach((product) => {
      if (!quantityMap[product.listingId]) {
        quantityMap[product.listingId] = { ...product, totalQuantity: 0 };
      }
      quantityMap[product.listingId].totalQuantity += product.quantity || 1;
    });
    const maxQuantity = Math.max(...Object.values(quantityMap).map(p => p.totalQuantity));
    mostPurchased = Object.values(quantityMap).filter(p => p.totalQuantity === maxQuantity);
  }

  return (
    <div className="flex flex-col lg:flex-row">
      <Sidebar />
      <div className="lg:ml-20 lg:mr-8 p-8 w-full">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
          <div className="flex items-center mb-4 sm:mb-0">
            <img src={userAvatar} alt="User Avatar" className="h-12 w-12 rounded-full object-cover mr-4" />
            <div>
              <h1 className="text-3xl font-bold">{userName}</h1>
              <p className="text-gray-600">Welcome to your {seller ? 'Seller' : 'Buyer'} dashboard!</p>
            </div>
          </div>
          <Link to="/profile">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Edit Profile</button>
          </Link>
        </div>

        {/* Section: Graphs */}
        <div >
          <Graphs />
        </div>

        {/* Horizontal dotted line */}
        <hr className="border-t-2 border-black my-8 mx-2" />

        {/* Section: Most Purchased Products */}
        {mostPurchased.length > 0 && (
          <>
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Most Purchased Product{mostPurchased.length > 1 ? 's' : ''}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {mostPurchased.map((product) => (
                  <motion.div
                    key={product.listingId}
                    className="bg-yellow-100 rounded-lg shadow-md p-4 border-2 border-yellow-400"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                    <p className="text-gray-600">Purchased {product.totalQuantity} time{product.totalQuantity > 1 ? 's' : ''}</p>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-gray-700">${product.discountPrice}</span>
                      <Link to={`/listing/${product.listingId}`}>
                        <button className="px-3 py-1 bg-blue-500 text-white rounded-md">Buy Again</button>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
            <hr className="border-t-2 border-black my-8 mx-2" />
          </>
        )}

        {/* Section: Purchased Products */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Your Purchased Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {purchasedProducts.map((product) => (
              <motion.div
                key={product._id}
                className="bg-white rounded-lg shadow-md p-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600">{product.description}</p>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-gray-700">${product.discountPrice}</span>
                  <Link to={`/listing/${product.listingId}`}>
                    <button className="px-3 py-1 bg-blue-500 text-white rounded-md">Buy Again</button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Horizontal dotted line */}
        <hr className="border-t-2 border-black my-8 mx-2" />

        {/* Section: Cart Products */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cartProducts.map((product) => (
              <motion.div
                key={product._id}
                className="bg-white rounded-lg shadow-md p-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600">{product.description}</p>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-gray-700">${product.discountPrice}</span>
                  <Link to={`/listing/${product.listingId}`}>
                    <button className="px-3 py-1 bg-red-500 text-white rounded-md">Remove</button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
