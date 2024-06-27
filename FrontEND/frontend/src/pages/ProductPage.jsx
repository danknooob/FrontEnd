import React from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { AiFillCalculator } from 'react-icons/ai'; // Importing calculator icon from React Icons library
import img from '../assets/AWS Announces Three New Database Capabilities.jpeg.jpg';
import Footer from '../components/Footer';

const ProductPage = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col mt-10">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-5xl"> {/* Increased max-width */}
            <div className="flex items-center justify-center">
              <img src={img} alt="Product" className="w-48 h-48 mr-4 rounded-full" /> {/* Increased image size and centered */}
              <div>
                <h1 className="text-4xl font-bold">Google Cloud</h1> {/* Increased text size */}
                <div className="flex items-center mt-2">
                  <span className="bg-yellow-300 text-yellow-800 text-lg font-semibold mr-2 px-3 py-1 rounded-full">7% Cashback All Cloud Services. Forever.</span> {/* Increased text size and rounded corners */}
                  <span className="bg-purple-600 text-white text-lg font-semibold px-3 py-1 rounded-full flex items-center"> {/* Increased text size and rounded corners */}
                    <AiFillCalculator className="mr-2" /> {/* Calculator icon */}
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
              <ul className="list-disc list-inside mt-2 text-gray-700 text-base"> {/* Reduced text size */}
                <li>Available to existing and new account signups.</li>
                <li>NachoCard is required to redeem this discount for attribution purposes.</li>
                <li>Discount is provided in the form of cashback directly from NachoNacho.</li>
                <li>This deal is only available for premium members.</li>
              </ul>
            </div>
            <div className="mt-8">
              <h2 className="text-2xl font-bold">What is Google Cloud?</h2> {/* Section title */}
              <p className="text-base text-gray-700 mt-2">
                Google Cloud offers a variety of services, including:
              </p>
              <ul className="list-disc list-inside mt-2 text-gray-700 text-base"> {/* Reduced text size */}
                <li><strong>Artificial intelligence (AI) and machine learning (ML):</strong> Google Cloud offers a number of AI and ML services that can help businesses to automate tasks, improve decision-making, and gain insights from data.</li>
                <li><strong>Data analytics:</strong> Google Cloud offers a number of data analytics services that can help businesses to collect, store, and analyze data.</li>
                <li><strong>Storage:</strong> Google Cloud offers a number of storage services that can help businesses to store their data securely and reliably.</li>
                <li><strong>Compute:</strong> Google Cloud offers a number of compute services that can help businesses to run their applications in the cloud.</li>
                <li><strong>Networking:</strong> Google Cloud offers a number of networking services that can help businesses to connect their applications and data to the cloud.</li>
              </ul>
            </div>
            <div className="mt-8">
              <h2 className="text-2xl font-bold">Key benefits of using Google Cloud</h2> {/* Section title */}
              <ul className="list-disc list-inside mt-2 text-gray-700 text-base"> {/* Reduced text size */}
                <li><strong>Scalability:</strong> Google Cloud can be easily scaled up or down to meet the needs of your business.</li>
                <li><strong>Security:</strong> Google Cloud offers a number of security features that can help to keep your data safe.</li>
                <li><strong>Reliability:</strong> Google Cloud is a reliable platform that is designed to be up and running 24/7.</li>
                <li><strong>Cost-effectiveness:</strong> Google Cloud offers a number of pricing options that can help you to save money on your cloud computing costs.</li>
              </ul>
            </div>
            <div className="bg-yellow-300 rounded-lg p-8 mt-10 text-center"> {/* New div as shown in the image */}
              <h2 className="text-4xl font-bold text-blue-900">Google Cloud Discount Available</h2>
              <div className="flex justify-center items-center mt-4 space-x-4">
                <span className="bg-white text-black font-semibold py-2 px-4 rounded-full">7% Cashback All Cloud Services. Forever.</span>
                <span className="bg-green-600 text-white font-semibold py-2 px-4 rounded-full">Save up to $10,000/year</span>
              </div>
              <p className="text-black mt-4">Get 7% Cashback with our exclusive Google Cloud deal by subscribing from the NachoNacho marketplace. NachoNacho is the best way to buy SaaS with exclusive promo codes, coupons, and deals.</p>
              <Link to="/deals" className="inline-block mt-4 bg-blue-600 text-white font-semibold py-2 px-6 rounded-full text-lg hover:bg-blue-700">Redeem Offer Now!</Link>
              <p className="mt-4">
                <a href="#" className="text-blue-600 hover:underline">How NachoNacho discounts work</a>
              </p>
            </div>
            <div className="mt-10">
              <h2 className="text-2xl font-bold">Service providers who can help you with this product</h2>
              <div className="flex justify-between mt-6">
                <div className="bg-blue-50 rounded-lg p-4 w-1/2 mr-2">
                  <div className="flex items-center mb-2">
                    <img src={img} alt="North Logo" className="w-12 h-12 rounded-full" />
                    <h3 className="text-xl font-bold ml-4">North</h3>
                  </div>
                  <div className="flex items-center mb-2">
                    <span className="bg-white text-black font-semibold px-2 py-1 rounded-full mr-2">Business Services</span>
                    <span className="bg-white text-black font-semibold px-2 py-1 rounded-full mr-2">IT Consulting</span>
                    <span className="bg-white text-black font-semibold px-2 py-1 rounded-full">+ 1 more</span>
                  </div>
                  <p className="text-gray-700 mb-2">Easy cloud savings for everyone!</p>
                  <a href="link_to_north_startups" className="bg-yellow-300 text-black font-semibold px-2 py-1 rounded-full inline-block">North &gt;&gt; For Startups</a>
                  <p className="text-gray-700 mt-2"><span className="text-black">New York City, New York, US</span></p>
                  <div className="bg-white rounded-lg p-2 mt-2">
                    <p className="text-gray-700">Typical project</p>
                    <p className="text-black font-semibold">&lt;$1k - &lt;$1k</p>
                  </div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 w-1/2 ml-2">
                  <div className="flex items-center mb-2">
                    <img src={img} alt="PYYNE Digital Logo" className="w-12 h-12 rounded-full" />
                    <h3 className="text-xl font-bold ml-4">PYYNE Digital</h3>
                  </div>
                  <div className="flex items-center mb-2">
                    <span className="bg-white text-black font-semibold px-2 py-1 rounded-full mr-2">Artificial Intelligence</span>
                    <span className="bg-white text-black font-semibold px-2 py-1 rounded-full mr-2">HR & Staffing Services</span>
                    <span className="bg-white text-black font-semibold px-2 py-1 rounded-full">+ 1 more</span>
                  </div>
                  <p className="text-gray-700 mb-2">PYYNE Digital is a full-service consultancy that optimizes the engineering capabilities for start-ups and scale-ups.</p>
                  <a href="link_to_pyynedigital_free_consultation" className="bg-yellow-300 text-black font-semibold px-2 py-1 rounded-full inline-block">PYYNE Digital &gt;&gt; Free Architectural Consultation</a>
                  <p className="text-gray-700 mt-2"><span className="text-black">New York, New York, US</span></p>
                  <div className="flex mt-2">
                    <div className="bg-white rounded-lg p-2 mr-2">
                      <p className="text-gray-700">Avg. hourly rate</p>
                      <p className="text-black font-semibold">$50 - $100</p>
                    </div>
                    <div className="bg-white rounded-lg p-2 mr-2">
                      <p className="text-gray-700">Avg. monthly rate</p>
                      <p className="text-black font-semibold">$8k - $40k</p>
                    </div>
                    <div className="bg-white rounded-lg p-2">
                      <p className="text-gray-700">Typical project</p>
                      <p className="text-black font-semibold">$30k - $200k</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-10">
              <h2 className="text-2xl font-bold">Comments and Reviews</h2>
              <div className="bg-gray-100 rounded-lg p-6 mt-4">
                <h3 className="text-xl font-semibold mb-4">User Reviews</h3>
                <div className="mb-4">
                  <p className="text-gray-800"><strong>John Doe</strong> <span className="text-gray-600">(March 20, 2023)</span></p>
                  <p className="text-gray-700 mt-2">Google Cloud has been a game changer for our startup. The scalability and reliability are unmatched!</p>
                </div>
                <div className="mb-4">
                  <p className="text-gray-800"><strong>Jane Smith</strong> <span className="text-gray-600">(April 10, 2023)</span></p>
                  <p className="text-gray-700 mt-2">Excellent service and support. Highly recommend Google Cloud for any business.</p>
                </div>
                <form className="mt-6">
                  <label htmlFor="comment" className="block text-gray-700 font-semibold">Add a Comment:</label>
                  <textarea id="comment" className="w-full mt-2 p-2 border border-gray-300 rounded-lg" rows="4"></textarea>
                  <button type="submit" className="mt-4 bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;
