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
  const [serviceProviderFiles, setServiceProviderFiles] = useState([[], []]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    description: '',
    regularPrice: 50,
    discountPrice: 0,
    savings: '',
    features: [],
    website: '',
    type: 'rent',
    offer: false,
    cashbackOffer: '',
    serviceProviders: [
      { name: '', benefits: [], requirements: [], imageUrls: [] },
      { name: '', benefits: [], requirements: [], imageUrls: [] },
    ],
    eligibilityRequirements: [],
    benefits: [],
    tags: [],
    discountTitle: '',
    discountDescription: '',
    category: 'Accounting',
    version: '',
    platforms: [],
    integrations: [],
    legal: {
      termsOfService: '',
      privacyPolicy: ''
    },
    availability: {
      status: '',
      releaseDate: ''
    }
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log(formData);

  const handleImageSubmit = () => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError('Image upload failed (2 mb max per image)');
          setUploading(false);
        });
    } else {
      setImageUploadError('You can only upload 6 images per listing');
      setUploading(false);
    }
  };

  const handleServiceProviderImageSubmit = (index) => {
    if (serviceProviderFiles[index].length > 0 && serviceProviderFiles[index].length + formData.serviceProviders[index].imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < serviceProviderFiles[index].length; i++) {
        promises.push(storeImage(serviceProviderFiles[index][i]));
      }
      Promise.all(promises)
        .then((urls) => {
          const updatedProviders = [...formData.serviceProviders];
          updatedProviders[index].imageUrls = updatedProviders[index].imageUrls.concat(urls);
          setFormData({
            ...formData,
            serviceProviders: updatedProviders,
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError('Image upload failed (2 mb max per image)');
          setUploading(false);
        });
    } else {
      setImageUploadError('You can only upload 6 images per service provider');
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
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleRemoveServiceProviderImage = (spIndex, imgIndex) => {
    const updatedProviders = [...formData.serviceProviders];
    updatedProviders[spIndex].imageUrls = updatedProviders[spIndex].imageUrls.filter((_, i) => i !== imgIndex);
    setFormData({
      ...formData,
      serviceProviders: updatedProviders,
    });
  };

  const handleChange = (e) => {
    const { id, value, checked, type } = e.target;

    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [id]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  const handleServiceProviderChange = (e, index) => {
    const { id, value } = e.target;
    const updatedProviders = [...formData.serviceProviders];
    updatedProviders[index] = {
      ...updatedProviders[index],
      [id]: value,
    };
    setFormData({
      ...formData,
      serviceProviders: updatedProviders,
    });
  };

  const handleAddArrayField = (field, index) => {
    const updatedProviders = [...formData.serviceProviders];
    updatedProviders[index][field].push('');
    setFormData({
      ...formData,
      serviceProviders: updatedProviders,
    });
  };

  const handleRemoveArrayField = (field, index, subIndex) => {
    const updatedProviders = [...formData.serviceProviders];
    updatedProviders[index][field].splice(subIndex, 1);
    setFormData({
      ...formData,
      serviceProviders: updatedProviders,
    });
  };

  const handleArrayFieldChange = (field, index, subIndex, value) => {
    const updatedProviders = [...formData.serviceProviders];
    updatedProviders[index][field][subIndex] = value;
    setFormData({
      ...formData,
      serviceProviders: updatedProviders,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError('You must upload at least one image');
      if (+formData.regularPrice < +formData.discountPrice)
        return setError('Discount price must be lower than regular price');
      setLoading(true);
      setError(false);
      const res = await fetch('/api/listing/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      console.log('Created Listing:', data);
      navigate(`/listing/${data._id}`);
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
            type='text'
            placeholder='Description'
            className='border p-3 rounded-lg'
            id='description'
            required
            onChange={handleChange}
            value={formData.description}
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
          </div>
          <div className='flex gap-6 flex-wrap'>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='offer'
                className='w-5'
                onChange={handleChange}
                checked={formData.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className='flex flex-wrap gap-6'>
            <div className='flex items-center gap-2'>
              <input
                className='w-full px-2 py-1 border rounded-lg'
                type='number'
                placeholder='Regular price'
                id='regularPrice'
                required
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <p>$ / Month</p>
            </div>
            {formData.offer && (
              <>
                <div className='flex items-center gap-2'>
                  <input
                    className='w-full px-2 py-1 border rounded-lg'
                    type='number'
                    placeholder='Discount price'
                    id='discountPrice'
                    required={formData.offer}
                    onChange={handleChange}
                    value={formData.discountPrice}
                  />
                  <p>$ / Month</p>
                </div>
                <div className='flex items-center gap-2'>
                  <input
                    className='w-full px-2 py-1 border rounded-lg'
                    type='text'
                    placeholder='Savings'
                    id='savings'
                    required={formData.offer}
                    onChange={handleChange}
                    value={formData.savings}
                  />
                  <p>$</p>
                </div>
              </>
            )}
          </div>

          <div className='flex flex-col'>
            <p className='font-semibold'>Upload Images</p>
            <input
              className='border p-3 rounded-lg'
              type='file'
              onChange={(e) => setFiles(Array.from(e.target.files))}
              multiple
            />
            {imageUploadError && (
              <p className='text-red-500 text-sm'>{imageUploadError}</p>
            )}
            <button
              type='button'
              className='w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg mt-2'
              onClick={handleImageSubmit}
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
            <div className='flex flex-wrap gap-2 mt-2'>
              {formData.imageUrls.map((url, index) => (
                <div key={index} className='relative'>
                  <img
                    src={url}
                    alt='uploaded'
                    className='w-20 h-20 object-cover rounded-md'
                  />
                  <button
                    type='button'
                    onClick={() => handleRemoveImage(index)}
                    className='absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs'
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>

          <h2 className='text-2xl font-semibold mt-6'>Service Providers</h2>
          {formData.serviceProviders.map((provider, spIndex) => (
            <div key={spIndex} className='flex flex-col gap-4 border p-4 rounded-lg'>
              <h3 className='text-xl font-semibold'>Provider {spIndex + 1}</h3>
              <input
                type='text'
                placeholder='Provider Name'
                className='border p-3 rounded-lg'
                id='name'
                maxLength='62'
                minLength='10'
                required
                onChange={(e) => handleServiceProviderChange(e, spIndex)}
                value={provider.name}
              />
              <div className='flex flex-col'>
                <p className='font-semibold'>Upload Images</p>
                <input
                  className='border p-3 rounded-lg'
                  type='file'
                  onChange={(e) => {
                    const newFiles = Array.from(e.target.files);
                    const updatedServiceProviderFiles = [...serviceProviderFiles];
                    updatedServiceProviderFiles[spIndex] = newFiles;
                    setServiceProviderFiles(updatedServiceProviderFiles);
                  }}
                  multiple
                />
                {imageUploadError && (
                  <p className='text-red-500 text-sm'>{imageUploadError}</p>
                )}
                <button
                  type='button'
                  className='w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg mt-2'
                  onClick={() => handleServiceProviderImageSubmit(spIndex)}
                >
                  {uploading ? 'Uploading...' : 'Upload'}
                </button>
                <div className='flex flex-wrap gap-2 mt-2'>
                  {provider.imageUrls.map((url, imgIndex) => (
                    <div key={imgIndex} className='relative'>
                      <img
                        src={url}
                        alt='uploaded'
                        className='w-20 h-20 object-cover rounded-md'
                      />
                      <button
                        type='button'
                        onClick={() =>
                          handleRemoveServiceProviderImage(spIndex, imgIndex)
                        }
                        className='absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs'
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className='flex flex-col gap-2'>
                <h4 className='text-lg font-semibold'>Benefits</h4>
                {provider.benefits.map((benefit, benefitIndex) => (
                  <div key={benefitIndex} className='flex items-center gap-2'>
                    <input
                      type='text'
                      placeholder='Benefit'
                      className='border p-2 rounded-lg flex-1'
                      value={benefit}
                      onChange={(e) =>
                        handleArrayFieldChange(
                          'benefits',
                          spIndex,
                          benefitIndex,
                          e.target.value
                        )
                      }
                    />
                    <button
                      type='button'
                      onClick={() =>
                        handleRemoveArrayField(
                          'benefits',
                          spIndex,
                          benefitIndex
                        )
                      }
                      className='bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs'
                    >
                      X
                    </button>
                  </div>
                ))}
                <button
                  type='button'
                  className='bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded-lg mt-2'
                  onClick={() => handleAddArrayField('benefits', spIndex)}
                >
                  Add Benefit
                </button>
              </div>
              <div className='flex flex-col gap-2'>
                <h4 className='text-lg font-semibold'>Requirements</h4>
                {provider.requirements.map((requirement, reqIndex) => (
                  <div key={reqIndex} className='flex items-center gap-2'>
                    <input
                      type='text'
                      placeholder='Requirement'
                      className='border p-2 rounded-lg flex-1'
                      value={requirement}
                      onChange={(e) =>
                        handleArrayFieldChange(
                          'requirements',
                          spIndex,
                          reqIndex,
                          e.target.value
                        )
                      }
                    />
                    <button
                      type='button'
                      onClick={() =>
                        handleRemoveArrayField(
                          'requirements',
                          spIndex,
                          reqIndex
                        )
                      }
                      className='bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs'
                    >
                      X
                    </button>
                  </div>
                ))}
                <button
                  type='button'
                  className='bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded-lg mt-2'
                  onClick={() => handleAddArrayField('requirements', spIndex)}
                >
                  Add Requirement
                </button>
              </div>
            </div>
          ))}

          <div className='flex flex-col gap-4'>
            <h2 className='text-2xl font-semibold mt-6'>Eligibility Requirements</h2>
            {formData.eligibilityRequirements.map((requirement, index) => (
              <div key={index} className='flex items-center gap-2'>
                <input
                  type='text'
                  placeholder='Requirement'
                  className='border p-2 rounded-lg flex-1'
                  value={requirement}
                  onChange={(e) => {
                    const newRequirements = [...formData.eligibilityRequirements];
                    newRequirements[index] = e.target.value;
                    setFormData({ ...formData, eligibilityRequirements: newRequirements });
                  }}
                />
                <button
                  type='button'
                  onClick={() => {
                    const newRequirements = [...formData.eligibilityRequirements];
                    newRequirements.splice(index, 1);
                    setFormData({ ...formData, eligibilityRequirements: newRequirements });
                  }}
                  className='bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs'
                >
                  X
                </button>
              </div>
            ))}
            <button
              type='button'
              className='bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded-lg'
              onClick={() =>
                setFormData({
                  ...formData,
                  eligibilityRequirements: [
                    ...formData.eligibilityRequirements,
                    '',
                  ],
                })
              }
            >
              Add Requirement
            </button>
          </div>
          <div className='flex flex-col gap-4'>
            <h2 className='text-2xl font-semibold mt-6'>Benefits</h2>
            {formData.benefits.map((benefit, index) => (
              <div key={index} className='flex items-center gap-2'>
                <input
                  type='text'
                  placeholder='Benefit'
                  className='border p-2 rounded-lg flex-1'
                  value={benefit}
                  onChange={(e) => {
                    const newBenefits = [...formData.benefits];
                    newBenefits[index] = e.target.value;
                    setFormData({ ...formData, benefits: newBenefits });
                  }}
                />
                <button
                  type='button'
                  onClick={() => {
                    const newBenefits = [...formData.benefits];
                    newBenefits.splice(index, 1);
                    setFormData({ ...formData, benefits: newBenefits });
                  }}
                  className='bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs'
                >
                  X
                </button>
              </div>
            ))}
            <button
              type='button'
              className='bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded-lg'
              onClick={() =>
                setFormData({
                  ...formData,
                  benefits: [...formData.benefits, ''],
                })
              }
            >
              Add Benefit
            </button>
          </div>

          <div className='mt-6'>
            <button
              type='submit'
              className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg'
            >
              Submit
            </button>
          </div>
        </form>
    </main>
    
  );
};

// export default CreateListing;




