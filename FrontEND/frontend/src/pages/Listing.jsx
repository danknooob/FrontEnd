import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaCartPlus, FaCartArrowDown } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Listing = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [listing, setListing] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [userId, setUserId] = useState(null);
  // const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { listingId } = useParams();

  const fetchData = async () => {
    try {
      const [userIdRes, listingRes] = await Promise.all([
        fetch('/api/auth/signedinuserid', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        }),
        fetch(`/api/listing/get/${listingId}`),
        // fetch(`/api/listing/${listingId}/comments`)
      ]);

      const userIdData = await userIdRes.json();
      const listingData = await listingRes.json();
      // const commentsData = await commentsRes.json();

      if (userIdData.userId) setUserId(userIdData.userId);
      if (listingData.success === false) throw new Error('Failed to fetch listing');
      // if (commentsData.success === false) throw new Error('Failed to fetch comments');

      setListing(listingData);
      // setComments(commentsData.comments);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
    window.scrollTo(0, 0);
  }, [listingId]);

  const addToCart = async () => {
    try {
      const res = await fetch('/api/cart/add-to-cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, listingId, quantity }),
      });
      const data = await res.json();
      if (data.message === "added to cart") {
        toast.success('Added to cart');
        setQuantity(quantity + 1);
      } else {
        toast.error('Failed to add to cart');
      }
    } catch (error) {
      toast.error('Error adding to cart');
    }
  };

  const removeFromCart = async () => {
    try {
      const res = await fetch('/api/cart/remove-from-cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, listingId, quantity }),
      });
      const data = await res.json();
      if (data.message === "removed from cart") {
        toast.success('Removed from cart');
        setQuantity(quantity > 0 ? quantity - 1 : 0);
      } else {
        toast.error('Failed to remove from cart');
      }
    } catch (error) {
      toast.error('Error removing from cart');
    }
  };

  const buyProduct = async () => {
    try {
      const res = await fetch('/api/cart/buyProduct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, listingId, quantity }),
      });
      const data = await res.json();
      if (data.message === "Product purchased successfully") {
        toast.success('Product purchased successfully');
      } else {
        toast.error('Failed to purchase product');
      }
    } catch (error) {
      toast.error('Error purchasing product');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: Something went wrong</div>;
  }

  if (!listing) {
    return null;
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <div className="min-h-screen flex flex-col mt-12 py-8 md:py-15">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-5xl">
            <div>
              <div className="flex items-center justify-center flex-wrap md:flex-nowrap">
                <img
                  src={listing.imageUrls}
                  alt="Product"
                  className="w-48 h-48 mr-4 rounded-full mb-4 md:mb-0"
                />
                <div className="flex flex-col justify-center">
                  <div className="flex items-center mb-2">
                    <h1 className="text-2xl md:text-4xl font-bold truncate max-w-lg">{listing.name}</h1>
                    <button
                      onClick={addToCart}
                      className="ml-4 bg-green-600 text-white px-3 py-1 rounded-full text-lg font-semibold hover:bg-green-700"
                    >
                      <FaCartPlus />
                    </button>
                    {quantity > 0 && (
                      <div className="flex items-center ml-2">
                        <button
                          onClick={removeFromCart}
                          className="bg-red-600 text-white px-3 py-1 rounded-full text-lg font-semibold hover:bg-red-700"
                        >
                          <FaCartArrowDown />
                        </button>
                        <span className="ml-2 text-lg">{quantity}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center mt-2 space-x-2 flex-wrap">
                    <span className="bg-yellow-300 text-yellow-800 text-lg font-semibold px-3 py-1 rounded-full">
                      {listing.cashbackOffer}
                    </span>
                    <span className="bg-purple-600 text-white text-lg font-semibold px-3 py-1 rounded-full flex items-center">
                      💎 Premium
                    </span>
                    <button 
                      onClick={buyProduct}
                      className="mt-2 md:mt-0 bg-blue-600 text-white px-4 py-2 rounded-full text-lg font-semibold hover:bg-blue-700"
                    >
                      Buy Now
                    </button>
                  </div>
                  <p className="text-green-700 mt-2 text-lg font-bold">Price: ${listing.regularPrice}</p>
                  <p className="text-gray-700 mt-2">{listing.description}</p>
                  <p className="text-gray-600 mt-2">Credit Amount: ${listing.creditAmount}</p>
                  <p className="text-gray-600 mt-2">Savings Amount: ${listing.savingsAmount}</p>
                </div>
              </div>
              
              </div>
            </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Listing;
