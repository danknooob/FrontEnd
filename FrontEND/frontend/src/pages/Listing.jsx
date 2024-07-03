// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import SwiperCore from 'swiper';
// import { useSelector } from 'react-redux';
// import { Navigation } from 'swiper/modules';
// import 'swiper/css/bundle';
// import {
//   FaBath,
//   FaBed,
//   FaChair,
//   FaMapMarkedAlt,
//   FaMapMarkerAlt,
//   FaParking,
//   FaShare,
// } from 'react-icons/fa';
// import Contact from '../components/Contact';


// // https://sabe.io/blog/javascript-format-numbers-commas#:~:text=The%20best%20way%20to%20format,format%20the%20number%20with%20commas.

// export default function Listing() {
//   SwiperCore.use([Navigation]);
//   const [listing, setListing] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   const [copied, setCopied] = useState(false);
//   const [contact, setContact] = useState(false);
//   const params = useParams();
//   const { currentUser } = useSelector((state) => state.user);

//   useEffect(() => {
//     const fetchListing = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(`/api/listing/get/${params.listingId}`);
//         const data = await res.json();
//         if (data.success === false) {
//           setError(true);
//           setLoading(false);
//           return;
//         }
//         setListing(data);
//         setLoading(false);
//         setError(false);
//       } catch (error) {
//         setError(true);
//         setLoading(false);
//       }
//     };
//     fetchListing();
//   }, [params.listingId]);

//   return (
  
//     <main>
//       {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
//       {error && (
//         <p className='text-center my-7 text-2xl'>Something went wrong!</p>
//       )}
//       {listing && !loading && !error && (
//         <div>
//           <Swiper navigation>
//             {listing.imageUrls.map((url) => (
//               <SwiperSlide key={url}>
//                 <div
//                   className='h-[550px]'
//                   style={{
//                     background: `url(${url}) center no-repeat`,
//                     backgroundSize: 'cover',
//                   }}
//                 ></div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//           <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
//             <FaShare
//               className='text-slate-500'
//               onClick={() => {
//                 navigator.clipboard.writeText(window.location.href);
//                 setCopied(true);
//                 setTimeout(() => {
//                   setCopied(false);
//                 }, 2000);
//               }}
//             />
//           </div>
//           {copied && (
//             <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
//               Link copied!
//             </p>
//           )}
//           <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
//             <p className='text-2xl font-semibold'>
//               {listing.name} - ${' '}
//               {listing.offer
//                 ? listing.discountPrice.toLocaleString('en-US')
//                 : listing.regularPrice.toLocaleString('en-US')}
//               {/* {listing.type === 'rent' && ' / month'} */}
//             </p>
//             <p className='flex items-center mt-6 gap-2 text-slate-600  text-sm'>
//               {/* <FaMapMarkerAlt className='text-green-700' /> */}
//               {/* {listing.address} */}
//             </p>
//             <div className='flex gap-4'>
//               {/* <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
//                 {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
//               </p> */}
//               {listing.offer && (
//                 <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
//                   ${+listing.regularPrice - +listing.discountPrice} OFF
//                 </p>
//               )}
//             </div>
//             <p className='text-slate-800'>
//               <span className='font-semibold text-black'>Description - </span>
//               {listing.description}
//             </p>
//             {/* <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
//               <li className='flex items-center gap-1 whitespace-nowrap '>
//                 <FaBed className='text-lg' />
//                 {listing.bedrooms > 1
//                   ? `${listing.bedrooms} beds `
//                   : `${listing.bedrooms} bed `}
//               </li>
//               <li className='flex items-center gap-1 whitespace-nowrap '>
//                 <FaBath className='text-lg' />
//                 {listing.bathrooms > 1
//                   ? `${listing.bathrooms} baths `
//                   : `${listing.bathrooms} bath `}
//               </li>
//               <li className='flex items-center gap-1 whitespace-nowrap '>
//                 <FaParking className='text-lg' />
//                 {listing.parking ? 'Parking spot' : 'No Parking'}
//               </li>
//               <li className='flex items-center gap-1 whitespace-nowrap '>
//                 <FaChair className='text-lg' />
//                 {listing.furnished ? 'Furnished' : 'Unfurnished'}
//               </li>
//             </ul> */}
//             {currentUser && listing.userRef !== currentUser._id && !contact && (
//               <button
//                 onClick={() => setContact(true)}
//                 className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3'
//               >
//                 Contact landlord
//               </button>
//             )}
//             {contact && <Contact listing={listing} />}
//           </div>
//         </div>
//       )}
//     </main>
//   );
// }
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const Listing = () => {
  const { listingId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [listing, setListing] = useState(null);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
    window.scrollTo(0, 0); // Scroll to the top when component mounts
  }, [listingId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: Something went wrong</div>;
  }

  // Render product details using listing data
  return (
    <>
      <div className="min-h-screen flex flex-col mt-12 py-15">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-5xl">
            {listing && (
              <div>
                <div className="flex items-center justify-center">
                  <img
                    src={listing.imageUrls}
                    alt="Product"
                    className="w-48 h-48 mr-4 rounded-full"
                  />
                  <div>
                    <h1 className="text-4xl font-bold">{listing.name}</h1>
                    <div className="flex items-center mt-2">
                      <span className="bg-yellow-300 text-yellow-800 text-lg font-semibold mr-2 px-3 py-1 rounded-full">
                        {listing.cashbackOffer}
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
                      Save up to {listing.savings}
                    </p>
                    <p className="text-gray-700 mt-4 text-lg">
                      {listing.description}
                    </p>
                    <div className="flex items-center mt-4">
                      <a
                        href={listing.website}
                        className="text-blue-600 hover:underline text-lg"
                      >
                        Website
                      </a>
                      <button className="ml-4 text-blue-600 hover:underline text-lg">
                        Share
                      </button>
                    </div>
                    <div className="flex items-center mt-4 space-x-3">
                      {listing.tags.map((tag, index) => (
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
                    {listing.eligibilityRequirements.map(
                      (requirement, index) => (
                        <li key={index}>{requirement}</li>
                      )
                    )}
                  </ul>
                </div>
                <div className="mt-8">
                  <h2 className="text-2xl font-bold">
                    What is {listing.name}?
                  </h2>
                  <p className="text-base text-gray-700 mt-2">
                    {listing.description}
                  </p>
                  <ul className="list-disc list-inside mt-2 text-gray-700 text-base">
                    {listing.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8">
                  <h2 className="text-2xl font-bold">
                    Key benefits of using {listing.name}
                  </h2>
                  <ul className="list-disc list-inside mt-2 text-gray-700 text-base">
                    {listing.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-yellow-300 rounded-lg p-8 mt-10 text-center">
                  <h2 className="text-4xl font-bold text-blue-900">
                    {listing.discountTitle}
                  </h2>
                  <div className="flex justify-center items-center mt-4 space-x-4">
                    <span className="bg-white text-black font-semibold py-2 px-4 rounded-full">
                      {listing.cashbackOffer}
                    </span>
                    <span className="bg-green-600 text-white font-semibold py-2 px-4 rounded-full">
                      {listing.savings}
                    </span>
                  </div>
                  <p className="text-black mt-4">
                    {listing.discountDescription}
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
                    {listing.serviceProviders.map((provider, index) => (
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
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Listing;
