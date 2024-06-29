import React from 'react';
import { Link } from 'react-router-dom';
import img from '../assets/AWS Announces Three New Database Capabilities.jpeg.jpg';

const Item = ({ id, name }) => {
  return (
    <div className="flex justify-center items-center">
      <Link to={`/productpage/${id}`} className="w-96 bg-white shadow-xl rounded-xl overflow-hidden border border-gray-300">
        <figure>
          <img src={img} alt={name} className="w-full h-auto" />
        </figure>
        <div className="px-4 py-6 bg-gray-200 border-t border-gray-300">
          <div className="bg-yellow-400 text-center p-2 rounded-lg mb-2 border border-yellow-500">
            <p className="text-black font-bold">$5k credit</p>
          </div>
          <p className="text-green-600 font-bold">Savings: $5,000</p>
          <p className="text-gray-700 mt-2">{name}</p>
        </div>
      </Link>
    </div>
  );
};

export default Item;
