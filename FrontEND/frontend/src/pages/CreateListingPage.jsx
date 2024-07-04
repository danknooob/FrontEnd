// import { useState } from 'react';
// import {
//   getDownloadURL,
//   getStorage,
//   ref,
//   uploadBytesResumable,
// } from 'firebase/storage';
// import { app } from '../firebase';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import Sidebar from '../components/SideBar';

// export default function CreateListing() {
//   const { currentUser } = useSelector((state) => state.user);
//   const navigate = useNavigate();
//   const [files, setFiles] = useState([]);
//   const [formData, setFormData] = useState({
//     "name": "",
//     "description": "",
//     "regularPrice": 0,
//     "discountPrice": 0,
//     "savings": "",
//     "features": [],
//     "website": "",
//     "type": "communication",
//     "offer": false,
//     "imageUrls": [],
//     "userRef": currentUser ? currentUser._id : "",
//     "cashbackOffer": "",
//     "serviceProviders": [],
//     "eligibilityRequirements": [],
//     "benefits": [],
//     "tags": [],
//     "discountTitle": "",
//     "discountDescription": ""
//   });
//   const [imageUploadError, setImageUploadError] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [error, setError] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleImageSubmit = () => {
//     if (files.length > 0 && files.length + formData.imageUrls.length <= 6) {
//       setUploading(true);
//       setImageUploadError(false);
//       const promises = files.map(file => storeImage(file));
//       Promise.all(promises)
//         .then((urls) => {
//           setFormData((prevState) => ({
//             ...prevState,
//             imageUrls: [...prevState.imageUrls, ...urls],
//           }));
//           setImageUploadError(false);
//           setUploading(false);
//         })
//         .catch((err) => {
//           setImageUploadError('Image upload failed (2 mb max per image)');
//           setUploading(false);
//         });
//     } else {
//       setImageUploadError('You can only upload up to 6 images per listing');
//       setUploading(false);
//     }
//   };

//   const storeImage = async (file) => {
//     return new Promise((resolve, reject) => {
//       const storage = getStorage(app);
//       const fileName = new Date().getTime() + file.name;
//       const storageRef = ref(storage, fileName);
//       const uploadTask = uploadBytesResumable(storageRef, file);
//       uploadTask.on(
//         'state_changed',
//         (snapshot) => {
//           const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           console.log(`Upload is ${progress}% done`);
//         },
//         (error) => reject(error),
//         () => getDownloadURL(uploadTask.snapshot.ref).then(resolve).catch(reject)
//       );
//     });
//   };

//   const handleRemoveImage = (index) => {
//     setFormData((prevState) => ({
//       ...prevState,
//       imageUrls: prevState.imageUrls.filter((_, i) => i !== index),
//     }));
//   };

//   const handleChange = (e) => {
//     const { id, value, checked, type } = e.target;
//     if (type === 'checkbox') {
//       setFormData((prevState) => ({ ...prevState, [id]: checked }));
//     } else {
//       setFormData((prevState) => ({ ...prevState, [id]: value }));
//     }
//   };

//   const handleServiceProviderChange = (index, field, value) => {
//     setFormData((prevState) => {
//       const newServiceProviders = [...prevState.serviceProviders];
//       newServiceProviders[index] = { ...newServiceProviders[index], [field]: value };
//       return { ...prevState, serviceProviders: newServiceProviders };
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//         if (formData.imageUrls.length < 1) return setError('You must upload at least one image');
//         if (+formData.regularPrice < +formData.discountPrice) return setError('Discount price must be lower than regular price');
//         setLoading(true);
//         setError(false);
        
//         const response = await fetch('/api/listing/create', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(formData),
//         });

//         const data = await response.json();
//         console.log(data);
//         setLoading(false);

//         if (!data.success) {
//             setError(data.message);
//         } else {
//             navigate(`/listing/${data._id}`);
//         }
//     } catch (error) {
//         setError(error.message);
//         setLoading(false);
//     }
//   };

//   return (
//     <div className="flex h-screen">
//       <Sidebar/>
      
//       <div className='flex-1 p-6'>
//         <h1 className='text-3xl font-semibold text-center my-7'>Create a Listing</h1>
//         <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
//           <div className='flex flex-col gap-4 flex-1'>
//             <input
//               type='text'
//               placeholder='Name'
//               className='border p-3 rounded-lg'
//               id='name'
//               maxLength='62'
//               minLength='10'
//               required
//               onChange={handleChange}
//               value={formData.name}
//             />
//             <textarea
//               placeholder='Description'
//               className='border p-3 rounded-lg'
//               id='description'
//               required
//               onChange={handleChange}
//               value={formData.description}
//             />
//             <input
//               type='number'
//               placeholder='Regular Price'
//               className='border p-3 rounded-lg'
//               id='regularPrice'
//               required
//               onChange={handleChange}
//               value={formData.regularPrice}
//             />
//             <input
//               type='number'
//               placeholder='Discount Price'
//               className='border p-3 rounded-lg'
//               id='discountPrice'
//               required
//               onChange={handleChange}
//               value={formData.discountPrice}
//             />
//             <input
//               type='text'
//               placeholder='Savings'
//               className='border p-3 rounded-lg'
//               id='savings'
//               required
//               onChange={handleChange}
//               value={formData.savings}
//             />
//             <input
//               type='text'
//               placeholder='Website'
//               className='border p-3 rounded-lg'
//               id='website'
//               required
//               onChange={handleChange}
//               value={formData.website}
//             />
//             <input
//               type='text'
//               placeholder='Cashback Offer'
//               className='border p-3 rounded-lg'
//               id='cashbackOffer'
//               required
//               onChange={handleChange}
//               value={formData.cashbackOffer}
//             />
//             <input
//               type='text'
//               placeholder='Discount Title'
//               className='border p-3 rounded-lg'
//               id='discountTitle'
//               required
//               onChange={handleChange}
//               value={formData.discountTitle}
//             />
//             <textarea
//               placeholder='Discount Description'
//               className='border p-3 rounded-lg'
//               id='discountDescription'
//               required
//               onChange={handleChange}
//               value={formData.discountDescription}
//             />
//             <div className='flex flex-wrap gap-4'>
//               <input
//                 type='text'
//                 placeholder='Feature'
//                 className='border p-3 rounded-lg w-full'
//                 id='feature'
//                 onChange={(e) =>
//                   setFormData({
//                     ...formData,
//                     features: [...formData.features, e.target.value],
//                   })
//                 }
//               />
//               <button
//                 type='button'
//                 onClick={() =>
//                   setFormData({
//                     ...formData,
//                     features: [...formData.features, e.target.value],
//                   })
//                 }
//                 className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
//               >
//                 Add
//               </button>
//             </div>
//             <div className='flex flex-wrap gap-4'>
//               <input
//                 type='text'
//                 placeholder='Eligibility Requirement'
//                 className='border p-3 rounded-lg w-full'
//                 id='eligibilityRequirement'
//                 onChange={(e) =>
//                   setFormData({
//                     ...formData,
//                     eligibilityRequirements: [...formData.eligibilityRequirements, e.target.value],
//                   })
//                 }
//               />
//               <button
//                 type='button'
//                 onClick={() =>
//                   setFormData({
//                     ...formData,
//                     eligibilityRequirements: [...formData.eligibilityRequirements, e.target.value],
//                   })
//                 }
//                 className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
//               >
//                 Add
//               </button>
//             </div>
//             <div className='flex flex-wrap gap-4'>
//               <input
//                 type='text'
//                 placeholder='Benefit'
//                 className='border p-3 rounded-lg w-full'
//                 id='benefit'
//                 onChange={(e) =>
//                   setFormData({
//                     ...formData,
//                     benefits: [...formData.benefits, e.target.value],
//                   })
//                 }
//               />
//               <button
//                 type='button'
//                 onClick={() =>
//                   setFormData({
//                     ...formData,
//                     benefits: [...formData.benefits, e.target.value],
//                   })
//                 }
//                 className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
//               >
//                 Add
//               </button>
//             </div>
//           </div>
//           <div className='flex flex-col gap-4 flex-1'>
//             {formData.imageUrls.length > 0 && (
//               <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
//                 {formData.imageUrls.map((imageUrl, index) => (
//                   <div key={index} className='relative'>
//                     <img src={imageUrl} alt={`Uploaded ${index + 1}`} className='w-full h-auto rounded-lg' />
//                     <button
//                       type='button'
//                       onClick={() => handleRemoveImage(index)}
//                       className='absolute top-0 right-0 p-1 text-red-500 bg-white rounded-full shadow'
//                     >
//                       &#10005;
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}
//             {imageUploadError && <div className='text-red-500'>{imageUploadError}</div>}
//             <input
//               type='file'
//               accept='.jpg,.png,.jpeg'
//               multiple
//               onChange={(e) => setFiles([...files, ...Array.from(e.target.files)])}
//               className='border p-3 rounded-lg'
//             />
//             <button
//               type='button'
//               onClick={handleImageSubmit}
//               className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
//             >
//               Upload Images
//             </button>
//             {uploading && <p>Uploading images...</p>}
//             <div className='flex items-center'>
//               <input
//                 type='checkbox'
//                 id='offer'
//                 checked={formData.offer}
//                 onChange={handleChange}
//                 className='mr-2'
//               />
//               <label htmlFor='offer'>Offer</label>
//             </div>
//             {error && <div className='text-red-500'>{error}</div>}
//             <button
//               type='submit'
//               disabled={loading || uploading}
//               className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
//             >
//               {loading ? 'Creating...' : 'Create Listing'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
import { useState } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/SideBar';
import { motion } from 'framer-motion';

function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    regularPrice: 0,
    discountPrice: 0,
    savings: "",
    features: [],
    website: "",
    type: "communication",
    offer: false,
    imageUrls: [],
    userRef: currentUser ? currentUser._id : "",
    cashbackOffer: "",
    serviceProviders: [{
      name: "",
      services: [""],
      description: "",
      link: ""
    }],
    eligibilityRequirements: [],
    benefits: [],
    tags: [],
    discountTitle: "",
    discountDescription: ""
  });
  
  const [imageUploadError, setImageUploadError] = useState(false);
  const [serviceProviderImageUploadError, setServiceProviderImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleImageSubmit = () => {
    if (files.length > 0 && files.length + formData.imageUrls.length <= 6) {
      setUploading(true);
      setImageUploadError(false);
      const promises = files.map(file => storeImage(file));
      Promise.all(promises)
        .then((urls) => {
          setFormData((prevState) => ({
            ...prevState,
            imageUrls: [...prevState.imageUrls, ...urls],
          }));
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError('Image upload failed (2 mb max per image)');
          setUploading(false);
        });
    } else {
      setImageUploadError('You can only upload up to 6 images per listing');
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => reject(error),
        () => getDownloadURL(uploadTask.snapshot.ref).then(resolve).catch(reject)
      );
    });
  };
  const handleServiceProviderImageSubmit = (index) => {
    if (serviceProviderFiles[index]) {
      setUploading(true);
      setServiceProviderImageUploadError(false);
      storeImage(serviceProviderFiles[index])
        .then((url) => {
          const updatedServiceProviders = [...formData.serviceProviders];
          updatedServiceProviders[index].imageUrl = url;
          setFormData((prevState) => ({
            ...prevState,
            serviceProviders: updatedServiceProviders,
          }));
          setServiceProviderImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setServiceProviderImageUploadError('Image upload failed (2 mb max per image)');
          setUploading(false);
        });
    } else {
      setServiceProviderImageUploadError('You must select an image to upload');
      setUploading(false);
    }
  };
  const handleRemoveImage = (index) => {
    setFormData((prevState) => ({
      ...prevState,
      imageUrls: prevState.imageUrls.filter((_, i) => i !== index),
    }));
  };

  const handleChange = (e) => {
    const { id, value, checked, type } = e.target;
    if (type === 'checkbox') {
      setFormData((prevState) => ({ ...prevState, [id]: checked }));
    } else {
      setFormData((prevState) => ({ ...prevState, [id]: value }));
    }
  };

  const handleArrayFieldChange = (field, index, value) => {
    setFormData((prevState) => {
      const newArray = [...prevState[field]];
      newArray[index] = value;
      return { ...prevState, [field]: newArray };
    });
  };

  const handleAddArrayField = (field) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: [...prevState[field], ""],
    }));
  };

  const handleRemoveArrayField = (field, index) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: prevState[field].filter((_, i) => i !== index),
    }));
  };
  const handleServiceProviderChange = (index, field, value) => {
    setFormData((prevState) => {
      const newServiceProviders = [...prevState.serviceProviders];
      newServiceProviders[index][field] = value;
      return { ...prevState, serviceProviders: newServiceProviders };
    });
  };
  
  const handleServiceProviderServiceChange = (providerIndex, serviceIndex, value) => {
    setFormData((prevState) => {
      const newServiceProviders = [...prevState.serviceProviders];
      newServiceProviders[providerIndex].services[serviceIndex] = value;
      return { ...prevState, serviceProviders: newServiceProviders };
    });
  };
  
  const handleAddServiceProvider = () => {
    setFormData((prevState) => ({
      ...prevState,
      serviceProviders: [...prevState.serviceProviders, {
        name: "",
        imageUrl: "",
        services: [""],
        description: "",
        link: ""
      }]
    }));
  };
  
  const handleRemoveServiceProvider = (index) => {
    setFormData((prevState) => ({
      ...prevState,
      serviceProviders: prevState.serviceProviders.filter((_, i) => i !== index),
    }));
  };
  
  const handleAddServiceProviderService = (providerIndex) => {
    setFormData((prevState) => {
      const newServiceProviders = [...prevState.serviceProviders];
      newServiceProviders[providerIndex].services.push("");
      return { ...prevState, serviceProviders: newServiceProviders };
    });
  };
  
  const handleRemoveServiceProviderService = (providerIndex, serviceIndex) => {
    setFormData((prevState) => {
      const newServiceProviders = [...prevState.serviceProviders];
      newServiceProviders[providerIndex].services = newServiceProviders[providerIndex].services.filter((_, i) => i !== serviceIndex);
      return { ...prevState, serviceProviders: newServiceProviders };
    });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1) return setError('You must upload at least one image');
      if (+formData.regularPrice < +formData.discountPrice) return setError('Discount price must be lower than regular price');
      setLoading(true);
      setError(false);

      const response = await fetch('/api/listing/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data);
      setLoading(false);

      if (!data.success) {
        setError(data.message);
      } else {
        navigate(`/listing/${data._id}`);
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-1 p-4 md:p-8 lg:p-12"
      >
        <h1 className="text-3xl font-bold mb-4">Create Listing</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex flex-col">
              <label className="text-lg mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="p-2 pl-10 text-sm text-gray-700"
                placeholder="Enter listing name"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-lg mb-2" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={handleChange}
                className="p-2 pl-10 text-sm text-gray-700"
                placeholder="Enter listing description"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-lg mb-2" htmlFor="regularPrice">
                Regular Price
              </label>
              <input
                type="number"
                id="regularPrice"
                value={formData.regularPrice}
                onChange={handleChange}
                className="p-2 pl-10 text-sm text-gray-700"
                placeholder="Enter regular price"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-lg mb-2" htmlFor="discountPrice">
                Discount Price
              </label>
              <input
                type="number"
                id="discountPrice"
                value={formData.discountPrice}
                onChange={handleChange}
                className="p-2 pl-10 text-sm text-gray-700"
                placeholder="Enter discount price"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-lg mb-2" htmlFor="savings">
                Savings
              </label>
              <input
                type="text"
                id="savings"
                value={formData.savings}
                onChange={handleChange}
                className="p-2 pl-10 text-sm text-gray-700"
                placeholder="Enter savings"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-lg mb-2" htmlFor="website">
                Website
              </label>
              <input
                type="text"
                id="website"
                value={formData.website}
                onChange={handleChange}
                className="p-2 pl-10 text-sm text-gray-700"
                placeholder="Enter website"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-lg mb-2" htmlFor="cashbackOffer">
                Cashback Offer
              </label>
              <input
                type="text"
                id="cashbackOffer"
                value={formData.cashbackOffer}
                onChange={handleChange}
                className="p-2 pl-10 text-sm text-gray-700"
                placeholder="Enter cashback offer"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-lg mb-2" htmlFor="discountTitle">
                Discount Title
              </label>
              <input
                type="text"
                id="discountTitle"
                value={formData.discountTitle}
                onChange={handleChange}
                className="p-2 pl-10 text-sm text-gray-700"
                placeholder="Enter discount title"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-lg mb-2" htmlFor="discountDescription">
                Discount Description
              </label>
              <textarea
                id="discountDescription"
                value={formData.discountDescription}
                onChange={handleChange}
                className="p-2 pl-10 text-sm text-gray-700"
                placeholder="Enter discount description"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-lg mb-2" htmlFor="type">
                Type
              </label>
              <select
                id="type"
                value={formData.type}
                onChange={handleChange}
                className="p-2 pl-10 text-sm text-gray-700"
              >
                <option value="communication">Communication</option>
                <option value="collaboration">Collaboration</option>
                <option value="marketing">Marketing</option>
                <option value="sales">Sales</option>
                <option value="finance">Finance</option>
                <option value="hr">HR</option>
                <option value="operations">Operations</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-lg mb-2" htmlFor="offer">
                Offer
              </label>
              <input
                type="checkbox"
                id="offer"
                checked={formData.offer}
                onChange={handleChange}
                className="p-2 pl-10 text-sm text-gray-700"
              />
            </div>
            <div className="flex flex-col col-span-2">
              <label className="text-lg mb-2">Images</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => setFiles(Array.from(e.target.files))}
                className="p-2 pl-10 text-sm text-gray-700"
              />
              <button
                type="button"
                onClick={handleImageSubmit}
                className="mt-2 p-2 bg-blue-500 text-white rounded"
              >
                Upload Images
              </button>
              {uploading && <p>Uploading...</p>}
              {imageUploadError && <p className="text-red-500">{imageUploadError}</p>}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
                {formData.imageUrls.map((url, index) => (
                  <div key={index} className="relative">
                    <img src={url} alt="Uploaded" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-0 right-0 m-1 p-1 bg-red-500 text-white rounded"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col col-span-2">
              <label className="text-lg mb-2">Features</label>
              {formData.features.map((feature, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleArrayFieldChange('features', index, e.target.value)}
                    className="p-2 pl-10 text-sm text-gray-700 flex-1"
                    placeholder="Enter feature"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveArrayField('features', index)}
                    className="ml-2 p-2 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddArrayField('features')}
                className="mt-2 p-2 bg-blue-500 text-white rounded"
              >
                Add Feature
              </button>
            </div>
            <div className="flex flex-col col-span-2">
              <label className="text-lg mb-2">Eligibility Requirements</label>
              {formData.eligibilityRequirements.map((requirement, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={requirement}
                    onChange={(e) => handleArrayFieldChange('eligibilityRequirements', index, e.target.value)}
                    className="p-2 pl-10 text-sm text-gray-700 flex-1"
                    placeholder="Enter requirement"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveArrayField('eligibilityRequirements', index)}
                    className="ml-2 p-2 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddArrayField('eligibilityRequirements')}
                className="mt-2 p-2 bg-blue-500 text-white rounded"
              >
                Add Requirement
              </button>
            </div>
            <div className="flex flex-col col-span-2">
              <label className="text-lg mb-2">Benefits</label>
              {formData.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={benefit}
                    onChange={(e) => handleArrayFieldChange('benefits', index, e.target.value)}
                    className="p-2 pl-10 text-sm text-gray-700 flex-1"
                    placeholder="Enter benefit"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveArrayField('benefits', index)}
                    className="ml-2 p-2 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddArrayField('benefits')}
                className="mt-2 p-2 bg-blue-500 text-white rounded"
              >
                Add Benefit
              </button>
            </div>
            <div className="flex flex-col col-span-2">
              <label className="text-lg mb-2">Tags</label>
              {formData.tags.map((tag, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={tag}
                    onChange={(e) => handleArrayFieldChange('tags', index, e.target.value)}
                    className="p-2 pl-10 text-sm text-gray-700 flex-1"
                    placeholder="Enter tag"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveArrayField('tags', index)}
                    className="ml-2 p-2 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </div>
              ))}
              <div className="flex flex-col col-span-2">
  <label className="text-lg mb-2">Service Providers</label>
  {formData.serviceProviders.map((provider, index) => (
    <div key={index} className="flex flex-col mb-4 p-4 border border-gray-200 rounded">
      <input
        type="text"
        value={provider.name}
        onChange={(e) => handleServiceProviderChange(index, 'name', e.target.value)}
        className="p-2 mb-2 text-sm text-gray-700"
        placeholder="Enter service provider name"
      />
      <input
        type="text"
        value={provider.imageUrl}
        onChange={(e) => handleServiceProviderChange(index, 'imageUrl', e.target.value)}
        className="p-2 mb-2 text-sm text-gray-700"
        placeholder="Enter service provider image URL"
      />
      <textarea
        value={provider.description}
        onChange={(e) => handleServiceProviderChange(index, 'description', e.target.value)}
        className="p-2 mb-2 text-sm text-gray-700"
        placeholder="Enter service provider description"
      />
      <input
        type="text"
        value={provider.link}
        onChange={(e) => handleServiceProviderChange(index, 'link', e.target.value)}
        className="p-2 mb-2 text-sm text-gray-700"
        placeholder="Enter service provider link"
      />
      <label className="text-lg mb-2">Services</label>
      {provider.services.map((service, serviceIndex) => (
        <div key={serviceIndex} className="flex items-center mb-2">
          <input
            type="text"
            value={service}
            onChange={(e) => handleServiceProviderServiceChange(index, serviceIndex, e.target.value)}
            className="p-2 pl-10 text-sm text-gray-700 flex-1"
            placeholder="Enter service"
          />
          <button
            type="button"
            onClick={() => handleRemoveServiceProviderService(index, serviceIndex)}
            className="ml-2 p-2 bg-red-500 text-white rounded"
          >
            Delete
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => handleAddServiceProviderService(index)}
        className="mt-2 p-2 bg-blue-500 text-white rounded"
      >
        Add Service
      </button>
      <button
        type="button"
        onClick={() => handleRemoveServiceProvider(index)}
        className="mt-2 p-2 bg-red-500 text-white rounded"
      >
        Remove Provider
      </button>
    </div>
  ))}
  <button
    type="button"
    onClick={handleAddServiceProvider}
    className="mt-2 p-2 bg-blue-500 text-white rounded"
  >
    Add Service Provider
  </button>
</div>

              <button
                type="button"
                onClick={() => handleAddArrayField('tags')}
                className="mt-2 p-2 bg-blue-500 text-white rounded"
              >
                Add Tag
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 p-2 bg-green-500 text-white rounded"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Create Listing'}
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </motion.div>
    </div>
  );
}

export default CreateListing;
