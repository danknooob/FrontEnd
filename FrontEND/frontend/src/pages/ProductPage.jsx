import React from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { AiFillCalculator } from 'react-icons/ai'; // Importing diamond icon from React Icons library
import img from '../assets/AWS Announces Three New Database Capabilities.jpeg.jpg';

const ProductPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Navbar />
      <div className="mx-auto p-4 flex flex-col items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full ">
          <div className="flex items-center justify-center">
            <img src={img} alt="Product" className="w-48 h-48 mr-4 rounded-full" /> {/* Increased image size and centered */}
            <div>
              <h1 className="text-4xl font-bold">Google Cloud</h1> {/* Increased text size */}
              <div className="flex items-center mt-2">
                <span className="bg-yellow-300 text-yellow-800 text-lg font-semibold mr-2 px-3 py-1 rounded-full">7% Cashback All Cloud Services. Forever.</span> {/* Increased text size and rounded corners */}
                <span className="bg-purple-600 text-white text-lg font-semibold px-3 py-1 rounded-full flex items-center"> {/* Increased text size and rounded corners */}
                  <AiFillCalculator className="mr-2" /> {/* Diamond icon */}
                  Premium
                </span>
                <Link to="/deals" className="inline-block ml-4 bg-blue-600 text-white px-3 py-1 rounded-full text-lg font-semibold hover:bg-blue-700">Redeem Deal</Link> {/* Adjusted button styling */}
              </div>
              <p className="text-green-700 mt-2 text-lg">Save up to $10,000/year</p> {/* Increased text size */}
              <p className="text-gray-700 mt-4 text-lg">Google Cloud Platform enables developers to build, test and deploy applications on Google's reliable infrastructure.</p> {/* Increased text size */}
              <div className="flex items-center mt-4">
                <a href="https://cloud.google.com/" className="text-blue-600 hover:underline text-lg">Website</a> {/* Increased text size */}
                <button className="ml-4 text-blue-600 hover:underline text-lg">Share</button> {/* Increased text size */}
              </div>
              <div className="flex items-center mt-4 space-x-3">
                <span className="bg-gray-200 text-gray-800 text-lg font-semibold px-3 py-1 rounded-full">Dev Tools</span> {/* Increased text size and rounded corners */}
                <span className="bg-gray-200 text-gray-800 text-lg font-semibold px-3 py-1 rounded-full">Startup Tools</span> {/* Increased text size and rounded corners */}
                <span className="bg-gray-200 text-gray-800 text-lg font-semibold px-3 py-1 rounded-full">Featured Products</span> {/* Increased text size and rounded corners */}
              </div>
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-bold">Eligibility requirements</h2> {/* Increased text size */}
            <ul className="list-disc list-inside mt-2 text-gray-700 text-lg"> {/* Increased text size */}
              <li>Available to existing and new account signups.</li>
              <li>NachoCard is required to redeem this discount for attribution purposes.</li>
              <li>Discount is provided in the form of cashback directly from NachoNacho.</li>
              <li>This deal is only available for premium members.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
