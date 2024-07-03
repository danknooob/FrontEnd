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
    <div className="flex h-screen">
      <Sidebar/>
      
      <div className='flex-1 p-6'>
        <h1 className='text-3xl font-semibold text-center my-7'>Create a Listing</h1>
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
          </div>
          <div className='flex flex-col gap-4 flex-1'>
            {formData.imageUrls.length > 0 && (
              <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                {formData.imageUrls.map((imageUrl, index) => (
                  <div key={index} className='relative'>
                    <img src={imageUrl} alt={`Uploaded ${index + 1}`} className='w-full h-auto rounded-lg' />
                    <button
                      type='button'
                      onClick={() => handleRemoveImage(index)}
                      className='absolute top-0 right-0 p-1 text-red-500 bg-white rounded-full shadow'
                    >
                      &#10005;
                    </button>
                  </div>
                ))}
              </div>
            )}
            {imageUploadError && <div className='text-red-500'>{imageUploadError}</div>}
            <input
              type='file'
              accept='.jpg,.png,.jpeg'
              multiple
              onChange={(e) => setFiles([...files, ...Array.from(e.target.files)])}
              className='border p-3 rounded-lg'
            />
            <button
              type='button'
              onClick={handleImageSubmit}
              className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
            >
              Upload Images
            </button>
            {uploading && <p>Uploading images...</p>}
            <div className='flex items-center'>
              <input
                type='checkbox'
                id='offer'
                checked={formData.offer}
                onChange={handleChange}
                className='mr-2'
              />
              <label htmlFor='offer'>Offer</label>
            </div>
            {error && <div className='text-red-500'>{error}</div>}
            <button
              type='submit'
              disabled={loading || uploading}
              className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
            >
              {loading ? 'Creating...' : 'Create Listing'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
