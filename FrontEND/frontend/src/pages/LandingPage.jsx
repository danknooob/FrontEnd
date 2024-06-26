import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { FaSearch, FaQuestionCircle } from 'react-icons/fa';
import ItemContainer from '../components/ItemContainer';
import SaasDiscounts from '../components/SaasDiscounts';
import Footer from '../components/Footer';
import Testimonials from '../components/Testimonials';
import Navbar from '../components/Navbar';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar/>
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 py-16 mt-16">
        <h1 className="text-5xl font-bold text-gray-900">The SaaS Marketplace</h1>
        <p className="text-lg text-gray-700 mt-4 max-w-3xl">
          Get <span className="font-bold">massive discounts</span> on hundreds of major SaaS products. 
          <span className="font-bold"> Discover</span> new relevant SaaS products. 
          <span className="font-bold"> Manage</span> all SaaS payments in one place using virtual credit cards.
        </p>
        <div className="bg-yellow-300 text-yellow-900 font-bold py-2 px-4 rounded-full mt-6">
          Total savings of $4,489,608/year available!
        </div>

        <div className="relative w-full max-w-2xl mt-8">
          <input 
            type="text" 
            placeholder="Search a product or topic" 
            className="w-full py-3 px-4 border border-gray-300 rounded-full focus:outline-none"
          />
          <FaSearch className="absolute top-3 right-4 text-gray-400" size={20} />
        </div>

        <div className="flex items-center mt-4">
          <FaQuestionCircle className="text-blue-600 mr-2" size={24} />
          <a href="#" className="text-blue-600">Ask Shaman SaaS-related questions.</a>
        </div>

        <button className="mt-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-full">
          Ask ByteBot
        </button>
      </main>

      <section className="bg-gray-100 py-12">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">Popular software brands across all categories</h2>
        <div className="flex flex-wrap justify-center gap-2">
          {['Accounting, Finance', 'Analytics, Data', 'Collaboration', 'Communication', 'CRM', 'Customer Support', 'Cybersecurity', 'Design', 'Development'].map(category => (
            <div key={category} className="bg-white py-2 px-4 rounded-full shadow-md text-gray-700">
              {category}
            </div>
          ))}
        </div>
      </section>

      <div className="mt-5 mb-20 px-10 py-20 shadow-xl">
        <ItemContainer />
      </div>
      <Testimonials />
      <div className="flex justify-center py-10">
        <SaasDiscounts />
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;