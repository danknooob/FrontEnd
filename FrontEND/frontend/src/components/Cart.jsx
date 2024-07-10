import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, subtractItem, deleteItem } from '../redux/cart/cartSlice';
import img1 from '../assets/AWS Announces Three New Database Capabilities.jpeg.jpg';
import SideBar from './SideBar';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const hardcodedItems = [
    {
        id: 1,
        name: 'Product 1',
        price: 29.99,
        imageUrl: 'https://via.placeholder.com/150',
        quantity: 1,
    },
    {
        id: 2,
        name: 'Product 2',
        price: 49.99,
        imageUrl: 'https://via.placeholder.com/150',
        quantity: 1,
    },
    {
        id: 3,
        name: 'Product 3',
        price: 19.99,
        imageUrl: 'https://via.placeholder.com/150',
        quantity: 1,
    },
    {
        id: 4,
        name: 'Product 4',
        price: 39.99,
        imageUrl: 'https://via.placeholder.com/150',
        quantity: 1,
    },
    {
        id: 5,
        name: 'Product 5',
        price: 59.99,
        imageUrl: 'https://via.placeholder.com/150',
        quantity: 1,
    },
    {
        id: 6,
        name: 'Product 6',
        price: 24.99,
        imageUrl: 'https://via.placeholder.com/150',
        quantity: 1,
    },
    {
        id: 7,
        name: 'Product 7',
        price: 44.99,
        imageUrl: 'https://via.placeholder.com/150',
        quantity: 1,
    },
    {
        id: 8,
        name: 'Product 8',
        price: 34.99,
        imageUrl: 'https://via.placeholder.com/150',
        quantity: 1,
    },
    {
        id: 9,
        name: 'Product 9',
        price: 54.99,
        imageUrl: 'https://via.placeholder.com/150',
        quantity: 1,
    },
    {
        id: 10,
        name: 'Product 10',
        price: 49.99,
        imageUrl: 'https://via.placeholder.com/150',
        quantity: 1,
    },
];

const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const totalAmount = useSelector((state) => state.cart.totalAmount);

    useEffect(() => {
        hardcodedItems.slice(0, 10).forEach(item => dispatch(addItem(item)));
    }, [dispatch]);

    return (
        <div className="flex h-screen">
            <SideBar />
            <div className="flex-1 container mx-auto p-8 overflow-y-auto h-full">
                <h1 className="text-3xl font-bold mb-6 text-gray-900">My Cart</h1>
                <div className="mt-4 text-right">
                    <h2 className="text-2xl font-bold text-gray-900">Total: ${totalAmount.toFixed(2)}</h2>
                    <Link to="/checkout">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                            Checkout
                        </button>
                    </Link>
                </div>
                <ul className="divide-y-4 divide-gray-300 bg-gray-100 mt-6 p-4 rounded-lg shadow-lg">
                    {cartItems.map(item => (
                        <li key={item.id} className="py-4 flex items-center rounded-lg border-2 border-gray-300 mb-4 p-4">
                            <div className="flex-shrink-0">
                                <img className="h-16 w-16 rounded-lg object-cover" src={img1} alt={item.name} />
                            </div>
                            <div className="ml-4 flex-1">
                                <h2 className="text-lg font-semibold text-gray-900">{item.name}</h2>
                                <p className="text-gray-700">${item.price.toFixed(2)}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => dispatch(subtractItem(item.id))}
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
                                    onClick={() => dispatch(deleteItem(item.id))}
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
