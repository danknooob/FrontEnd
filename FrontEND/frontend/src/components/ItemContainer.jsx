import React from 'react';
import Item from './Item'; // Replace with your actual Item component
import 'daisyui/dist/full.css';

const ItemContainer = () => {
  const items = [
    { id: 1, name: 'Product 1' },
    { id: 2, name: 'Product 2' },
    { id: 3, name: 'Product 3' },
    { id: 4, name: 'Product 4' },
    { id: 5, name: 'Product 5' },
    { id: 6, name: 'Product 6' },
    { id: 7, name: 'Product 7' },
    { id: 8, name: 'Product 8' },
    { id: 9, name: 'Product 9' },
    { id: 10, name: 'Product 10' },
  ];

  return (
    <div className="bg-white py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Our Featured Items
        </h2>
        <div className="carousel carousel-center flex items-center w-full space-x-4 bg-gray-300 rounded-box mt-6 mb-6 overflow-x-auto">
          {items.map((item) => (
            <div key={item.id} className="carousel-item p-4 flex items-center">
              <Item name={item.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemContainer;
