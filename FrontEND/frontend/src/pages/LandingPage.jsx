import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { FaSearch, FaQuestionCircle } from 'react-icons/fa';
import ItemContainer from '../components/ItemContainer';
import SaasDiscounts from '../components/SaasDiscounts';
import Footer from '../components/Footer';
import Testimonials from '../components/Testimonials';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="navbar bg-base-100 fixed top-0 left-0 w-full shadow-md">
        <div className="flex-1 flex items-center justify-between">
          <Link to="/" className="btn btn-ghost text-2xl font-bold">ByteBazaar</Link>
          <div className="flex space-x-4">
            <Link to="/about">
              <button className="btn btn-outline btn-primary">About Us</button>
            </Link>
            <Link to="/login">
              <button className="btn btn-outline btn-secondary">Login</button>
            </Link>
            <Link to="/join">
              <button className="btn btn-outline btn-secondary">Join</button>
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="badge badge-sm indicator-item">2</span>
              </div>
            </div>
            <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
              <div className="card-body">
                <span className="font-bold text-lg">2 Item</span>
                <span className="text-info">Subtotal: $999</span>
                <div className="card-actions">
                  <button className="btn btn-primary btn-block">View cart</button>
                </div>
              </div>
            </div>
          </div>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt="User avatar" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li><a>Settings</a></li>
              <li><a>Logout</a></li>
            </ul>
          </div>
        </div>
      </div>

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
