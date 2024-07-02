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
            <div className="flex-1 container mx-auto p-4 overflow-y-auto h-full">
                <h1 className="text-3xl font-bold mb-4 text-gray-800 py-5">My Cart</h1>
                <div className="mt-4 text-right">
                    <h2 className="text-2xl font-bold text-gray-800">Total: ${totalAmount.toFixed(2)}</h2>
                    <Link to="/checkout">
                        <button className="btn btn-outline btn-blue-500 text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600">
                            Checkout
                        </button>
                    </Link>
                </div>
                <ul className="divide-y divide-gray-200">
                    {cartItems.map(item => (
                        <li key={item.id} className="py-4 flex">
                            <div className="flex-shrink-0">
                                <img className="h-12 w-12 rounded-lg" src={img1} alt={item.name} />
                            </div>
                            <div className="ml-3">
                                <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                                <p className="text-gray-800">${item.price.toFixed(2)}</p>
                                <div className="mt-2 flex">
                                    <button
                                        onClick={() => dispatch(subtractItem(item.id))}
                                        className="btn btn-outline btn-red-500 text-red-500 px-2 py-1 rounded-lg mr-2"
                                    >
                                        -
                                    </button>
                                    <span className="text-gray-800">{item.quantity}</span>
                                    <button
                                        onClick={() => dispatch(addItem(item))}
                                        className="btn btn-outline btn-green-500 text-green-500 px-2 py-1 rounded-lg ml-2"
                                    >
                                        +
                                    </button>
                                    <button
                                        onClick={() => dispatch(deleteItem(item.id))}
                                        className="btn btn-outline btn-red-700 text-red-700 px-3 py-2 rounded-lg ml-2 flex items-center"
                                    >
                                        <FaTrash className="ml-1" />
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Cart;

