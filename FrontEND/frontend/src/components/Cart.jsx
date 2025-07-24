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
    const [purchaseMessage, setPurchaseMessage] = useState('');

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

    // Helper to refetch cart
    const refetchCart = async () => {
        if (!userId) return;
        try {
            const response = await fetch(`/api/cart/getcart/${userId}`);
            if (!response.ok) throw new Error('Failed to fetch cart items');
            const data = await response.json();
            dispatch(setCartItems(data));
        } catch (error) {
            console.error('Failed to fetch cart items:', error);
        }
    };

    const handleAddToCart = async (item) => {
        try {
            const response = await fetch('/api/cart/add-to-cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ userId, listingId: item.listingId, quantity: 1 }),
            });

            if (response.ok) {
                // dispatch(addItem(item));
                refetchCart();
            } else {
                console.error('Failed to add item to cart');
            }
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    };

    const handleRemoveFromCart = async (item) => {
        try {
            const response = await fetch('/api/cart/remove-from-cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ userId, listingId: item.listingId, quantity: 1 }),
            });

            if (response.ok) {
                // dispatch(subtractItem(item.listingId));
                refetchCart();
            } else {
                console.error('Failed to remove item from cart');
            }
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    const handleDeleteItem = async (listingId) => {
        try {
            const response = await fetch('/api/cart/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ listingId, userId }),
            });

            if (response.ok) {
                // dispatch(deleteItem(listingId));
                refetchCart();
            } else {
                console.error('Failed to delete item from cart');
            }
        } catch (error) {
            console.error('Error deleting item from cart:', error);
        }
    };

    const handleBuyNow = async (item) => {
        try {
            const response = await fetch('/api/cart/buyProduct', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ userId, listingId: item.listingId, quantity: item.quantity }),
            });

            if (response.ok) {
                dispatch(deleteItem(item.listingId));
                setPurchaseMessage(`Successfully bought ${item.name}`);
            } else {
                console.error('Failed to buy item:', await response.json());
            }
        } catch (error) {
            console.error('Error buying item:', error);
        }
    };

    const handleBuyCart = async () => {
        try {
            const response = await fetch('/api/cart/buyCart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ userId }),
            });

            if (response.ok) {
                dispatch(setCartItems([])); // Clear the cart locally
                setPurchaseMessage('Cart purchased successfully');
            } else {
                console.error('Failed to buy cart:', await response.json());
            }
        } catch (error) {
            console.error('Error buying cart:', error);
        }
    };

    if (!userId) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col lg:flex-row h-screen">
    <SideBar />
    <div className="flex-1 container mx-auto p-4 md:p-8 overflow-y-auto h-full">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-900">My Cart</h1>
        {purchaseMessage && (
            <div className="bg-green-200 text-green-800 p-2 mb-4 rounded-lg">{purchaseMessage}</div>
        )}
        {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64">
                <p className="text-lg text-gray-500">Your cart is empty.</p>
            </div>
        ) : (
            <>
                <div className="mt-4 text-right">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">Total: ${totalAmount}</h2>
                    <button
                        onClick={handleBuyCart}
                        className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition duration-300 ml-4"
                    >
                        Buy Cart
                    </button>
                </div>
                <ul className="divide-y divide-gray-300 bg-gray-100 mt-6 p-4 rounded-lg shadow-lg">
                    {cartItems.map(item => (
                        <li key={item.listingId} className="py-4 flex flex-col md:flex-row items-center rounded-lg border-2 border-gray-300 mb-4 p-4">
                            <Link to={`/listing/${item.listingId}`} className="flex items-center flex-1 mb-4 md:mb-0 md:mr-4">
                                <div className="flex-shrink-0">
                                    <img className="h-16 w-16 rounded-lg object-cover" src={Array.isArray(item.imageUrls) ? (item.imageUrls[0] || 'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg') : (item.imageUrls || 'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg')} alt={item.name} />
                                </div>
                                <div className="ml-4 flex-1">
                                    <h2 className="text-lg font-semibold text-gray-900">{item.name}</h2>
                                    <div className="flex items-center gap-2">
                                        <span className="text-green-700 font-bold">₹{item.discountPrice}</span>
                                        {item.regularPrice && (
                                            <span className="text-gray-400 line-through">₹{item.regularPrice}</span>
                                        )}
                                    </div>
                                </div>
                            </Link>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => handleRemoveFromCart(item)}
                                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition duration-300 flex items-center justify-center"
                                >
                                    -
                                </button>
                                <span className="text-gray-900 mx-2">{item.quantity}</span>
                                <button
                                    onClick={() => handleAddToCart(item)}
                                    className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition duration-300 flex items-center justify-center"
                                >
                                    +
                                </button>
                                <button
                                    onClick={() => handleDeleteItem(item.listingId)}
                                    className="bg-red-700 text-white px-3 py-1 rounded-lg hover:bg-red-800 transition duration-300 flex items-center justify-center"
                                >
                                    <FaTrash />
                                </button>
                                <button
                                    onClick={() => handleBuyNow(item)}
                                    className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition duration-300 flex items-center justify-center"
                                >
                                    Buy Now
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </>
        )}
    </div>
</div>

    );
};

export default Cart;
