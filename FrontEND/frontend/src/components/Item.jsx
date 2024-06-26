// Item.jsx
import React from 'react';
import img from '../assets/AWS Announces Three New Database Capabilities.jpeg.jpg';

export default function Item() {
  return (
    <div className="flex justify-center items-center py-15 mb-20">
      <div className="w-96 bg-white shadow-xl rounded-xl overflow-hidden border border-gray-300">
        <figure>
          <img src={img} alt="AWS Services" className="w-full h-auto" />
        </figure>
        <div className="px-4 py-10 bg-gray-200 border-t border-gray-300">
          <div className="bg-yellow-400 text-center p-2 rounded-lg mb-2 border border-yellow-500">
            <p className="text-black font-bold">$5k credit </p>
          </div>
          <p className="text-green-600 font-bold">Savings: $5,000</p>
          <p className="text-gray-700 mt-2">
            Amazon Web Services provides information technology infrastructure services to businesses in the form of web services.
          </p>
        </div>
      </div>
    </div>
  );
}
