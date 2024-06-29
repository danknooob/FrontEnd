import React, { useEffect, useState } from 'react';
import Item from './Item'; // Adjust the import path for Item as needed
import 'daisyui/dist/full.css';

const ItemContainer = () => {
  const [featuredListings, setFeaturedListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListings = async (type, setListings) => {
      try {
        const res = await fetch(`/api/listing/get?type=${type}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch ${type} listings`);
        }
        const data = await res.json();
        console.log(`${type} listings:`, data);
        setListings(data);
      } catch (error) {
        console.error(`Error fetching ${type} listings:`, error);
        setError(`Failed to fetch ${type} listings`);
      }
    };

    setLoading(true);
    fetchListings('featured', setFeaturedListings);
    fetchListings('sale', setSaleListings);
    fetchListings('rent', setRentListings);
    setLoading(false);
  }, []);

  let content;

  if (loading) {
    content = <p>Loading...</p>;
  } else if (error) {
    content = <p>{error}</p>;
  } else {
    content = (
      <>
        {featuredListings.length > 0 && (
          <div className="my-6">
            <h2 className="text-2xl font-semibold text-slate-600">Featured Listings</h2>
            <div className="flex flex-wrap gap-4">
              {featuredListings.map((listing) => (
                <Item key={listing._id} id={listing._id} name={listing.name} />
              ))}
            </div>
          </div>
        )}
        {saleListings.length > 0 && (
          <div className="my-6">
            <h2 className="text-2xl font-semibold text-slate-600">Listings for Sale</h2>
            <div className="flex flex-wrap gap-4">
              {saleListings.map((listing) => (
                <Item key={listing._id} id={listing._id} name={listing.name} />
              ))}
            </div>
          </div>
        )}
        {rentListings.length > 0 && (
          <div className="my-6">
            <h2 className="text-2xl font-semibold text-slate-600">Listings for Rent</h2>
            <div className="flex flex-wrap gap-4">
              {rentListings.map((listing) => (
                <Item key={listing._id} id={listing._id} name={listing.name} />
              ))}
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="bg-white py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Our Listings
        </h2>
        <div className="mt-6 mb-6">
          {content}
        </div>
      </div>
    </div>
  );
};

export default ItemContainer;
