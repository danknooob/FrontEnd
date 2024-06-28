import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/product/productSlice.js'; // Adjust path as needed
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const ProductPage = () => {
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.product);
  const { loading, products, error } = productState;

  useEffect(() => {
    dispatch(fetchProducts());
    window.scrollTo(0, 0); // Scroll to the top when component mounts
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render product details using products array
  return (
    <>
      <div className="min-h-screen flex flex-col mt-12 py-15">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-5xl">
            {products.map((product) => (
              <div key={product.id}>
                <div className="flex items-center justify-center">
                  <img
                    src={product.imageUrl}
                    alt="Product"
                    className="w-48 h-48 mr-4 rounded-full"
                  />
                  <div>
                    <h1 className="text-4xl font-bold">{product.name}</h1>
                    <div className="flex items-center mt-2">
                      <span className="bg-yellow-300 text-yellow-800 text-lg font-semibold mr-2 px-3 py-1 rounded-full">
                        {product.cashbackOffer}
                      </span>
                      <span className="bg-purple-600 text-white text-lg font-semibold px-3 py-1 rounded-full flex items-center">
                        💎 Premium
                      </span>
                      <Link
                        to="/deals"
                        className="inline-block ml-4 bg-blue-600 text-white px-3 py-1 rounded-full text-lg font-semibold hover:bg-blue-700"
                      >
                        Redeem Deal
                      </Link>
                    </div>
                    <p className="text-green-700 mt-2 text-lg">
                      Save up to {product.savings}
                    </p>
                    <p className="text-gray-700 mt-4 text-lg">
                      {product.description}
                    </p>
                    <div className="flex items-center mt-4">
                      <a
                        href={product.website}
                        className="text-blue-600 hover:underline text-lg"
                      >
                        Website
                      </a>
                      <button className="ml-4 text-blue-600 hover:underline text-lg">
                        Share
                      </button>
                    </div>
                    <div className="flex items-center mt-4 space-x-3">
                      {product.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gray-200 text-gray-800 text-lg font-semibold px-3 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <h2 className="text-2xl font-bold">
                    Eligibility requirements
                  </h2>
                  <ul className="list-disc list-inside mt-2 text-gray-700 text-base">
                    {product.eligibilityRequirements.map(
                      (requirement, index) => (
                        <li key={index}>{requirement}</li>
                      )
                    )}
                  </ul>
                </div>
                <div className="mt-8">
                  <h2 className="text-2xl font-bold">
                    What is {product.name}?
                  </h2>
                  <p className="text-base text-gray-700 mt-2">
                    {product.description}
                  </p>
                  <ul className="list-disc list-inside mt-2 text-gray-700 text-base">
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8">
                  <h2 className="text-2xl font-bold">
                    Key benefits of using {product.name}
                  </h2>
                  <ul className="list-disc list-inside mt-2 text-gray-700 text-base">
                    {product.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-yellow-300 rounded-lg p-8 mt-10 text-center">
                  <h2 className="text-4xl font-bold text-blue-900">
                    {product.discountTitle}
                  </h2>
                  <div className="flex justify-center items-center mt-4 space-x-4">
                    <span className="bg-white text-black font-semibold py-2 px-4 rounded-full">
                      {product.cashbackOffer}
                    </span>
                    <span className="bg-green-600 text-white font-semibold py-2 px-4 rounded-full">
                      {product.savings}
                    </span>
                  </div>
                  <p className="text-black mt-4">
                    {product.discountDescription}
                  </p>
                  <Link
                    to="/deals"
                    className="inline-block mt-4 bg-blue-600 text-white font-semibold py-2 px-6 rounded-full text-lg hover:bg-blue-700"
                  >
                    Redeem Offer Now!
                  </Link>
                  <p className="mt-4">
                    <a href="#" className="text-blue-600 hover:underline">
                      How NachoNacho discounts work
                    </a>
                  </p>
                </div>
                <div className="mt-10">
                  <h2 className="text-2xl font-bold">
                    Service providers who can help you with this product
                  </h2>
                  <div className="flex justify-between mt-6">
                    {product.serviceProviders.map((provider, index) => (
                      <div
                        key={index}
                        className="bg-blue-50 rounded-lg p-4 w-1/2 mr-2"
                      >
                        <div className="flex items-center mb-2">
                          <img
                            src={provider.imageUrl}
                            alt={provider.name}
                            className="w-12 h-12 rounded-full"
                          />
                          <h3 className="text-xl font-bold ml-4">
                            {provider.name}
                          </h3>
                        </div>
                        <div className="flex items-center mb-2">
                          {provider.services.map((service, idx) => (
                            <span
                              key={idx}
                              className="bg-white text-black font-semibold px-2 py-1 rounded-full mr-2"
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                        <p className="text-gray-700 mb-2">
                          {provider.description}
                        </p>
                        <a
                          href={provider.link}
                          className="bg-yellow-300 text-black font-semibold px-2 py-1 rounded-full inline-block"
                        >
                          Contact
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ProductPage;
