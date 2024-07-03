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

// export default function CreateListing() {
//   const { currentUser } = useSelector((state) => state.user);
//   const navigate = useNavigate();
//   const [files, setFiles] = useState([]);
//   const [formData, setFormData] = useState({
//     imageUrls: [],
//     name: '',
//     description: '',
//     address: '',
//     type: 'rent',
//     bedrooms: 1,
//     bathrooms: 1,
//     regularPrice: 50,
//     discountPrice: 0,
//     offer: false,
//     parking: false,
//     furnished: false,
//     savings: '',
//     features: [],
//     website: '',
//   });
//   const [imageUploadError, setImageUploadError] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [error, setError] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleImageSubmit = (e) => {
//     if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
//       setUploading(true);
//       setImageUploadError(false);
//       const promises = [];

//       for (let i = 0; i < files.length; i++) {
//         promises.push(storeImage(files[i]));
//       }
//       Promise.all(promises)
//         .then((urls) => {
//           setFormData({
//             ...formData,
//             imageUrls: formData.imageUrls.concat(urls),
//           });
//           setImageUploadError(false);
//           setUploading(false);
//         })
//         .catch((err) => {
//           setImageUploadError('Image upload failed (2 mb max per image)');
//           setUploading(false);
//         });
//     } else {
//       setImageUploadError('You can only upload 6 images per listing');
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
//           const progress =
//             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           console.log(`Upload is ${progress}% done`);
//         },
//         (error) => {
//           reject(error);
//         },
//         () => {
//           getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//             resolve(downloadURL);
//           });
//         }
//       );
//     });
//   };

//   const handleRemoveImage = (index) => {
//     setFormData({
//       ...formData,
//       imageUrls: formData.imageUrls.filter((_, i) => i !== index),
//     });
//   };

//   const handleChange = (e) => {
//     if (e.target.id === 'sale' || e.target.id === 'rent') {
//       setFormData({
//         ...formData,
//         type: e.target.id,
//       });
//     }

//     if (
//       e.target.id === 'parking' ||
//       e.target.id === 'furnished' ||
//       e.target.id === 'offer'
//     ) {
//       setFormData({
//         ...formData,
//         [e.target.id]: e.target.checked,
//       });
//     }

//     if (
//       e.target.type === 'number' ||
//       e.target.type === 'text' ||
//       e.target.type === 'textarea'
//     ) {
//       setFormData({
//         ...formData,
//         [e.target.id]: e.target.value,
//       });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (formData.imageUrls.length < 1)
//         return setError('You must upload at least one image');
//       if (+formData.regularPrice < +formData.discountPrice)
//         return setError('Discount price must be lower than regular price');
//       setLoading(true);
//       setError(false);
//       const res = await fetch('/api/listing/create', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           ...formData,
//           userRef: currentUser._id,
//         }),
//       });
//       const data = await res.json();
//       console.log(data);
//       setLoading(false);
//       if (data.success === false) {
//         setError(data.message);
//       }
//       navigate(`/listing/${data._id}`);
//     } catch (error) {
//       setError(error.message);
//       setLoading(false);
//     }
//   };

//   return (
//     <main className='p-3 max-w-4xl mx-auto'>
//       <h1 className='text-3xl font-semibold text-center my-7'>
//         Create a Listing
//       </h1>
//       <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
//         <div className='flex flex-col gap-4 flex-1'>
//           <input
//             type='text'
//             placeholder='Name'
//             className='border p-3 rounded-lg'
//             id='name'
//             maxLength='62'
//             minLength='10'
//             required
//             onChange={handleChange}
//             value={formData.name}
//           />
//           <textarea
//             type='text'
//             placeholder='Description'
//             className='border p-3 rounded-lg'
//             id='description'
//             required
//             onChange={handleChange}
//             value={formData.description}
//           />
//           <input
//             type='text'
//             placeholder='Address'
//             className='border p-3 rounded-lg'
//             id='address'
//             required
//             onChange={handleChange}
//             value={formData.address}
//           />
//           <div className='flex gap-6 flex-wrap'>
//             <div className='flex gap-2'>
//               <input
//                 type='checkbox'
//                 id='sale'
//                 className='w-5'
//                 onChange={handleChange}
//                 checked={formData.type === 'sale'}
//               />
//               <span>Sell</span>
//             </div>
//             <div className='flex gap-2'>
//               <input
//                 type='checkbox'
//                 id='rent'
//                 className='w-5'
//                 onChange={handleChange}
//                 checked={formData.type === 'rent'}
//               />
//               <span>Rent</span>
//             </div>
//             <div className='flex gap-2'>
//               <input
//                 type='checkbox'
//                 id='parking'
//                 className='w-5'
//                 onChange={handleChange}
//                 checked={formData.parking}
//               />
//               <span>Parking spot</span>
//             </div>
//             <div className='flex gap-2'>
//               <input
//                 type='checkbox'
//                 id='furnished'
//                 className='w-5'
//                 onChange={handleChange}
//                 checked={formData.furnished}
//               />
//               <span>Furnished</span>
//             </div>
//             <div className='flex gap-2'>
//               <input
//                 type='checkbox'
//                 id='offer'
//                 className='w-5'
//                 onChange={handleChange}
//                 checked={formData.offer}
//               />
//               <span>Offer</span>
//             </div>
//           </div>
//           <div className='flex flex-wrap gap-6'>
//             <div className='flex items-center gap-2'>
//               <input
//                 type='number'
//                 id='bedrooms'
//                 min='1'
//                 max='10'
//                 required
//                 className='p-3 border border-gray-300 rounded-lg'
//                 onChange={handleChange}
//                 value={formData.bedrooms}
//               />
//               <p>Beds</p>
//             </div>
//             <div className='flex items-center gap-2'>
//               <input
//                 type='number'
//                 id='bathrooms'
//                 min='1'
//                 max='10'
//                 required
//                 className='p-3 border border-gray-300 rounded-lg'
//                 onChange={handleChange}
//                 value={formData.bathrooms}
//               />
//               <p>Baths</p>
//             </div>
//             <div className='flex items-center gap-2'>
//               <input
//                 type='number'
//                 id='regularPrice'
//                 min='50'
//                 max='10000000'
//                 required
//                 className='p-3 border border-gray-300 rounded-lg'
//                 onChange={handleChange}
//                 value={formData.regularPrice}
//               />
//               <div className='flex flex-col items-center'>
//                 <p>Regular price</p>
//                 {formData.type === 'rent' && (
//                   <span className='text-xs'>($ / month)</span>
//                 )}
//               </div>
//             </div>
//             {formData.offer && (
//               <div className='flex items-center gap-2'>
//                 <input
//                   type='number'
//                   id='discountPrice'
//                   min='0'
//                   max='10000000'
//                   required
//                   className='p-3 border border-gray-300 rounded-lg'
//                   onChange={handleChange}
//                   value={formData.discountPrice}
//                 />
//                 <div className='flex flex-col items-center'>
//                   <p>Discounted price</p>

//                   {formData.type === 'rent' && (
//                     <span className='text-xs'>($ / month)</span>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//           <input
//             type='text'
//             placeholder='Savings'
//             className='border p-3 rounded-lg'
//             id='savings'
//             required
//             onChange={handleChange}
//             value={formData.savings}
//           />
//           <input
//             type='text'
//             placeholder='Website'
//             className='border p-3 rounded-lg'
//             id='website'
//             required
//             onChange={handleChange}
//             value={formData.website}
//           />
//           <div className='flex flex-wrap gap-4'>
//             <input
//               type='text'
//               placeholder='Feature'
//               className='border p-3 rounded-lg w-full'
//               id='feature'
//               onChange={(e) =>
//                 setFormData({
//                   ...formData,
//                   features: [...formData.features, e.target.value],
//                 })
//               }
//             />
//             <button
//               type='button'
//               onClick={() => setFormData({
//                   ...formData,
//                   features: [...formData.features, e.target.value],
//                 })
//               }
//               className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
//             >
//               Add
//             </button>
//           </div>
//         </div>
//         <div className='flex flex-col flex-1 gap-4'>
//           <p className='font-semibold'>
//             Images:
//             <span className='font-normal text-gray-600 ml-2'>
//               The first image will be the cover (max 6)
//             </span>
//           </p>
//           <div className='flex gap-4'>
//             <input
//               onChange={(e) => setFiles(e.target.files)}
//               className='p-3 border border-gray-300 rounded w-full'
//               type='file'
//               id='images'
//               accept='image/*'
//               multiple
//             />
//             <button
//               type='button'
//               disabled={uploading}
//               onClick={handleImageSubmit}
//               className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
//             >
//               {uploading ? 'Uploading...' : 'Upload'}
//             </button>
//           </div>
//           <p className='text-red-700 text-sm'>
//             {imageUploadError && imageUploadError}
//           </p>
//           {formData.imageUrls.length > 0 &&
//             formData.imageUrls.map((url, index) => (
//               <div
//                 key={url}
//                 className='flex justify-between p-3 border items-center'
//               >
//                 <img
//                   src={url}
//                   alt='listing image'
//                   className='w-20 h-20 object-contain rounded-lg'
//                 />
//                 <button
//                   type='button'
//                   onClick={() => handleRemoveImage(index)}
//                   className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
//                 >
//                   Delete
//                 </button>
//               </div>
//             ))}
//           <button
//             disabled={loading || uploading}
//             className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
//           >
//             {loading ? 'Creating...' : 'Create listing'}
//           </button>
//           {error && <p className='text-red-700 text-sm'>{error}</p>}
//         </div>
//       </form>
//     </main>
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

export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    "name": "",
    "description": "",
    "regularPrice": 0,
    "discountPrice": 0,
    "savings": "",
    "features": [],
    "website": "",
    "type": "communication",
    "offer": false,
    "imageUrls": [],
    "userRef": currentUser ? currentUser._id : "",
    "cashbackOffer": "",
    "serviceProviders": [],
    "eligibilityRequirements": [],
    "benefits": [],
    "tags": [],
    "discountTitle": "",
    "discountDescription": ""
  });
  const [imageUploadError, setImageUploadError] = useState(false);
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

  const handleServiceProviderChange = (index, field, value) => {
    setFormData((prevState) => {
      const newServiceProviders = [...prevState.serviceProviders];
      newServiceProviders[index] = { ...newServiceProviders[index], [field]: value };
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
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>
        Create a Listing
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col gap-4 flex-1'>
          <input
            type='text'
            placeholder='Name'
            className='border p-3 rounded-lg'
            id='name'
            maxLength='62'
            minLength='10'
            required
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            placeholder='Description'
            className='border p-3 rounded-lg'
            id='description'
            required
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type='number'
            placeholder='Regular Price'
            className='border p-3 rounded-lg'
            id='regularPrice'
            required
            onChange={handleChange}
            value={formData.regularPrice}
          />
          <input
            type='number'
            placeholder='Discount Price'
            className='border p-3 rounded-lg'
            id='discountPrice'
            required
            onChange={handleChange}
            value={formData.discountPrice}
          />
          <input
            type='text'
            placeholder='Savings'
            className='border p-3 rounded-lg'
            id='savings'
            required
            onChange={handleChange}
            value={formData.savings}
          />
          <input
            type='text'
            placeholder='Website'
            className='border p-3 rounded-lg'
            id='website'
            required
            onChange={handleChange}
            value={formData.website}
          />
          <input
            type='text'
            placeholder='Cashback Offer'
            className='border p-3 rounded-lg'
            id='cashbackOffer'
            required
            onChange={handleChange}
            value={formData.cashbackOffer}
          />
          <input
            type='text'
            placeholder='Discount Title'
            className='border p-3 rounded-lg'
            id='discountTitle'
            required
            onChange={handleChange}
            value={formData.discountTitle}
          />
          <textarea
            placeholder='Discount Description'
            className='border p-3 rounded-lg'
            id='discountDescription'
            required
            onChange={handleChange}
            value={formData.discountDescription}
          />
          <div className='flex flex-wrap gap-4'>
            <input
              type='text'
              placeholder='Feature'
              className='border p-3 rounded-lg w-full'
              id='feature'
              onChange={(e) =>
                setFormData({
                  ...formData,
                  features: [...formData.features, e.target.value],
                })
              }
            />
            <button
              type='button'
              onClick={() =>
                setFormData({
                  ...formData,
                  features: [...formData.features, e.target.value],
                })
              }
              className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
            >
              Add
            </button>
          </div>
          <div className='flex flex-wrap gap-4'>
            <input
              type='text'
              placeholder='Eligibility Requirement'
              className='border p-3 rounded-lg w-full'
              id='eligibilityRequirement'
              onChange={(e) =>
                setFormData({
                  ...formData,
                  eligibilityRequirements: [...formData.eligibilityRequirements, e.target.value],
                })
              }
            />
            <button
              type='button'
              onClick={() =>
                setFormData({
                  ...formData,
                  eligibilityRequirements: [...formData.eligibilityRequirements, e.target.value],
                })
              }
              className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
            >
              Add
            </button>
          </div>
          <div className='flex flex-wrap gap-4'>
            <input
              type='text'
              placeholder='Benefit'
              className='border p-3 rounded-lg w-full'
              id='benefit'
              onChange={(e) =>
                setFormData({
                  ...formData,
                  benefits: [...formData.benefits, e.target.value],
                })
              }
            />
            <button
              type='button'
              onClick={() =>
                setFormData({
                  ...formData,
                  benefits: [...formData.benefits, e.target.value],
                })
              }
              className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
            >
              Add
            </button>
          </div>
          <div className='flex flex-wrap gap-4'>
            <input
              type='text'
              placeholder='Tag'
              className='border p-3 rounded-lg w-full'
              id='tag'
              onChange={(e) =>
                setFormData({
                  ...formData,
                  tags: [...formData.tags, e.target.value],
                })
              }
            />
            <button
              type='button'
              onClick={() =>
                setFormData({
                  ...formData,
                  tags: [...formData.tags, e.target.value],
                })
              }
              className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
            >
              Add
            </button>
          </div>
        </div>
        <div className='flex flex-col gap-4 flex-1'>
          <div className='flex flex-wrap gap-4'>
            <input
              type='text'
              placeholder='Service Provider Name'
              className='border p-3 rounded-lg w-full'
              id='serviceProviderName'
              onChange={(e) =>
                setFormData({
                  ...formData,
                  serviceProviders: [
                    ...formData.serviceProviders,
                    { name: e.target.value, imageUrl: '', services: [], description: '', link: '' },
                  ],
                })
              }
            />
            <input
              type='text'
              placeholder='Service Provider Image URL'
              className='border p-3 rounded-lg w-full'
              id='serviceProviderImageUrl'
              onChange={(e) =>
                setFormData({
                  ...formData,
                  serviceProviders: formData.serviceProviders.map((provider, index) => {
                    if (index === formData.serviceProviders.length - 1) {
                      return { ...provider, imageUrl: e.target.value };
                    }
                    return provider;
                  }),
                })
              }
            />
            <input
              type='text'
              placeholder='Service Provider Service'
              className='border p-3 rounded-lg w-full'
              id='serviceProviderService'
              onChange={(e) =>
                setFormData({
                  ...formData,
                  serviceProviders: formData.serviceProviders.map((provider, index) => {
                    if (index === formData.serviceProviders.length - 1) {
                      return { ...provider, services: [...provider.services, e.target.value] };
                    }
                    return provider;
                  }),
                })
              }
            />
            <input
              type='text'
              placeholder='Service Provider Description'
              className='border p-3 rounded-lg w-full'
              id='serviceProviderDescription'
              onChange={(e) =>
                setFormData({
                  ...formData,
                  serviceProviders: formData.serviceProviders.map((provider, index) => {
                    if (index === formData.serviceProviders.length - 1) {
                      return { ...provider, description: e.target.value };
                    }
                    return provider;
                  }),
                })
              }
            />
            <input
              type='text'
              placeholder='Service Provider Link'
              className='border p-3 rounded-lg w-full'
              id='serviceProviderLink'
              onChange={(e) =>
                setFormData({
                  ...formData,
                  serviceProviders: formData.serviceProviders.map((provider, index) => {
                    if (index === formData.serviceProviders.length - 1) {
                      return { ...provider, link: e.target.value };
                    }
                    return provider;
                  }),
                })
              }
            />
            <button
              type='button'
              onClick={() =>
                setFormData({
                  ...formData,
                  serviceProviders: [
                    ...formData.serviceProviders,
                    { name: '', imageUrl: '', services: [], description: '', link: '' },
                  ],
                })
              }
              className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
            >
              Add Another Service Provider
            </button>
          </div>
          <div className='flex flex-col gap-4'>
            <label htmlFor='offer' className='flex items-center gap-2'>
              Offer
              <input
                type='checkbox'
                id='offer'
                checked={formData.offer}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className='flex flex-col gap-4'>
            <label htmlFor='type' className='flex items-center gap-2'>
              Type
              <select id='type' value={formData.type} onChange={handleChange}>
                <option value='rent'>Rent</option>
                <option value='sale'>Sale</option>
              </select>
            </label>
          </div>
          <div className='flex flex-col gap-4'>
            <label htmlFor='imageUpload'>Upload Images (Max 6)</label>
            <input
              type='file'
              id='imageUpload'
              multiple
              onChange={(e) => setFiles([...e.target.files])}
            />
            <button
              type='button'
              onClick={handleImageSubmit}
              className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
            >
              Upload Images
            </button>
            {imageUploadError && <p className='text-red-500'>{imageUploadError}</p>}
            <div className='flex flex-wrap gap-2'>
              {formData.imageUrls.map((url, index) => (
                <div key={index} className='relative'>
                  <img src={url} alt='Uploaded' className='w-20 h-20 object-cover' />
                  <button
                    type='button'
                    onClick={() => handleRemoveImage(index)}
                    className='absolute top-0 right-0 bg-red-600 text-white rounded-full p-1'
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className='flex justify-end'>
            <button
              type='submit'
              className='p-3 bg-blue-600 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
              disabled={loading || uploading}
            >
              {loading ? 'Creating...' : 'Create Listing'}
            </button>
          </div>
        </div>
      </form>
      {error && <p className='text-red-500'>{error}</p>}
    </main>
  );
}

