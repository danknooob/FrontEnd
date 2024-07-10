import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, subtractItem, deleteItem, setCartItems } from '../redux/cart/cartSlice';
import SideBar from './SideBar';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const totalAmount = useSelector((state) => state.cart.totalAmount);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const res = await fetch('/api/auth/signedinuserid', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });
                const data = await res.json();
                if (data.userId) {
                    setUserId(data.userId);
                }
            } catch (error) {
                console.error('Error fetching signed-in user ID:', error);
            }
        };

        fetchUserId();
    }, []);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                if (!userId) return; // Ensure userId is available before fetching cart items

                const response = await fetch(`/api/cart/getcart/${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch cart items');
                }
                const data = await response.json();
                dispatch(setCartItems(data));
            } catch (error) {
                console.error('Failed to fetch cart items:', error);
            }
        };

        fetchCartItems();
    }, [dispatch, userId]);

    if (!userId) {
        return <div>Loading...</div>; // Placeholder until userId is fetched
    }

    return (
        <div className="flex h-screen">
            <SideBar />
            <div className="flex-1 container mx-auto p-8 overflow-y-auto h-full">
                <h1 className="text-3xl font-bold mb-6 text-gray-900">My Cart</h1>
                <div className="mt-4 text-right">
                    <h2 className="text-2xl font-bold text-gray-900">Total: ${totalAmount}</h2>
                    <Link to="/checkout">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                            Checkout
                        </button>
                    </Link>
                </div>
                <ul className="divide-y-4 divide-gray-300 bg-gray-100 mt-6 p-4 rounded-lg shadow-lg">
                    {cartItems.map(item => (
                        <li key={item.listingId} className="py-4 flex items-center rounded-lg border-2 border-gray-300 mb-4 p-4">
                            <Link to={`/listing/${item.listingId}`} className="flex items-center flex-1">
                                <div className="flex-shrink-0">
                                    <img className="h-16 w-16 rounded-lg object-cover" src={item.imageUrls} alt={item.name} />
                                </div>
                                <div className="ml-4 flex-1">
                                    <h2 className="text-lg font-semibold text-gray-900">{item.name}</h2>
                                    <p className="text-gray-700">${item.discountPrice}</p>
                                </div>
                            </Link>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => dispatch(subtractItem(item.listingId))}
                                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition duration-300 flex items-center justify-center"
                                >
                                    -
                                </button>
                                <span className="text-gray-900 mx-2">{item.quantity}</span>
                                <button
                                    onClick={() => dispatch(addItem(item))}
                                    className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition duration-300 flex items-center justify-center"
                                >
                                    +
                                </button>
                                <button
                                    onClick={() => dispatch(deleteItem(item.listingId))}
                                    className="bg-red-700 text-white px-3 py-1 rounded-lg hover:bg-red-800 transition duration-300 flex items-center justify-center"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Cart;
