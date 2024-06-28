import { useState } from "react";

function CreateListingPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [provider, setProvider] = useState("");
  const [logo, setLogo] = useState("");
  const [features, setFeatures] = useState([]);
  const [services, setServices] = useState([]);
  const [infrastructure, setInfrastructure] = useState("");
  const [website, setWebsite] = useState("");
  const [devTools, setDevTools] = useState("");
  const [startupTools, setStartupTools] = useState("");
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [eligibilityRequirements, setEligibilityRequirements] = useState([]);
  const [offers, setOffers] = useState([]);
  const [pricing, setPricing] = useState({
    hourlyRate: "",
    monthlyRate: "",
    projectSize: "",
  });
  const [location, setLocation] = useState("");
  const [tagline, setTagline] = useState("");
  const [link, setLink] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Submit the form data to the backend here
    console.log("Form submitted!");
    console.log("Name:", name);
    console.log("Description:", description);
    console.log("Provider:", provider);
    console.log("Logo:", logo);
    console.log("Features:", features);
    console.log("Services:", services);
    console.log("Infrastructure:", infrastructure);
    console.log("Website:", website);
    console.log("Dev Tools:", devTools);
    console.log("Startup Tools:", startupTools);
    console.log("Featured Products:", featuredProducts);
    console.log("Eligibility Requirements:", eligibilityRequirements);
    console.log("Offers:", offers);
    console.log("Pricing:", pricing);
    console.log("Location:", location);
    console.log("Tagline:", tagline);
    console.log("Link:", link);
  };

  const handleArrayChange = (setter, index, value) => {
    setter(prev => {
      const newArr = [...prev];
      newArr[index] = value;
      return newArr;
    });
  };

  const handleAddToArray = (setter) => {
    setter(prev => [...prev, ""]);
  };

  const handleOfferChange = (index, field, value) => {
    setOffers(prev => {
      const newOffers = [...prev];
      newOffers[index][field] = value;
      return newOffers;
    });
  };

  const handleAddOffer = () => {
    setOffers(prev => [
      ...prev,
      {
        cashback: "",
        forever: false,
        maxSavings: "",
        premium: false,
        redeemDeal: "",
      },
    ]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Create a Product</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
            Description
          </label>
          <textarea
            id="description"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="provider" className="block text-gray-700 text-sm font-bold mb-2">
            Provider
          </label>
          <input
            type="text"
            id="provider"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="logo" className="block text-gray-700 text-sm font-bold mb-2">
            Logo
          </label>
          <input
            type="text"
            id="logo"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={logo}
            onChange={(e) => setLogo(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="features" className="block text-gray-700 text-sm font-bold mb-2">
            Features
          </label>
          <ul>
            {features.map((feature, index) => (
              <li key={index}>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  value={feature}
                  onChange={(e) => handleArrayChange(setFeatures, index, e.target.value)}
                />
              </li>
            ))}
            <li>
              <button
                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                type="button"
                onClick={() => handleAddToArray(setFeatures)}
              >
                Add Feature
              </button>
            </li>
          </ul>
        </div>

        <div className="mb-4">
          <label htmlFor="services" className="block text-gray-700 text-sm font-bold mb-2">
            Services
          </label>
          <ul>
            {services.map((service, index) => (
              <li key={index}>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  value={service}
                  onChange={(e) => handleArrayChange(setServices, index, e.target.value)}
                />
              </li>
            ))}
            <li>
              <button
                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                type="button"
                onClick={() => handleAddToArray(setServices)}
              >
                Add Service
              </button>
            </li>
          </ul>
        </div>

        <div className="mb-4">
          <label htmlFor="infrastructure" className="block text-gray-700 text-sm font-bold mb-2">
            Infrastructure
          </label>
          <input
            type="text"
            id="infrastructure"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={infrastructure}
            onChange={(e) => setInfrastructure(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="website" className="block text-gray-700 text-sm font-bold mb-2">
            Website
          </label>
          <input
            type="text"
            id="website"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="devTools" className="block text-gray-700 text-sm font-bold mb-2">
            Dev Tools
          </label>
          <input
            type="text"
            id="devTools"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={devTools}
            onChange={(e) => setDevTools(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="startupTools" className="block text-gray-700 text-sm font-bold mb-2">
            Startup Tools
          </label>
          <input
            type="text"
            id="startupTools"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={startupTools}
            onChange={(e) => setStartupTools(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="featuredProducts" className="block text-gray-700 text-sm font-bold mb-2">
            Featured Products
          </label>
          <ul>
            {featuredProducts.map((product, index) => (
              <li key={index}>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  value={product}
                  onChange={(e) => handleArrayChange(setFeaturedProducts, index, e.target.value)}
                />
              </li>
            ))}
            <li>
              <button
                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                type="button"
                onClick={() => handleAddToArray(setFeaturedProducts)}
              >
                Add Featured Product
              </button>
            </li>
          </ul>
        </div>

        <div className="mb-4">
          <label htmlFor="eligibilityRequirements" className="block text-gray-700 text-sm font-bold mb-2">
            Eligibility Requirements
          </label>
          <ul>
            {eligibilityRequirements.map((requirement, index) => (
              <li key={index}>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  value={requirement}
                  onChange={(e) => handleArrayChange(setEligibilityRequirements, index, e.target.value)}
                />
              </li>
            ))}
            <li>
              <button
                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                type="button"
                onClick={() => handleAddToArray(setEligibilityRequirements)}
              >
                Add Requirement
              </button>
            </li>
          </ul>
        </div>

        <div className="mb-4">
          <label htmlFor="offers" className="block text-gray-700 text-sm font-bold mb-2">
            Offers
          </label>
          <ul>
            {offers.map((offer, index) => (
              <li key={index}>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Cashback"
                  value={offer.cashback}
                  onChange={(e) => handleOfferChange(index, "cashback", e.target.value)}
                />
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="checkbox"
                  checked={offer.forever}
                  onChange={(e) => handleOfferChange(index, "forever", e.target.checked)}
                />
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Max Savings"
                  value={offer.maxSavings}
                  onChange={(e) => handleOfferChange(index, "maxSavings", e.target.value)}
                />
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="checkbox"
                  checked={offer.premium}
                  onChange={(e) => handleOfferChange(index, "premium", e.target.checked)}
                />
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Redeem Deal"
                  value={offer.redeemDeal}
                  onChange={(e) => handleOfferChange(index, "redeemDeal", e.target.value)}
                />
              </li>
            ))}
            <li>
              <button
                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                type="button"
                onClick={handleAddOffer}
              >
                Add Offer
              </button>
            </li>
          </ul>
        </div>

        <div className="mb-4">
          <label htmlFor="pricing" className="block text-gray-700 text-sm font-bold mb-2">
            Pricing
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Hourly Rate"
            value={pricing.hourlyRate}
            onChange={(e) => setPricing({ ...pricing, hourlyRate: e.target.value })}
          />
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Monthly Rate"
            value={pricing.monthlyRate}
            onChange={(e) => setPricing({ ...pricing, monthlyRate: e.target.value })}
          />
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Project Size"
            value={pricing.projectSize}
            onChange={(e) => setPricing({ ...pricing, projectSize: e.target.value })}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">
            Location
          </label>
          <input
            type="text"
            id="location"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="tagline" className="block text-gray-700 text-sm font-bold mb-2">
            Tagline
          </label>
          <input
            type="text"
            id="tagline"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="link" className="block text-gray-700 text-sm font-bold mb-2">
            Link
          </label>
          <input
            type="text"
            id="link"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateListingPage;
