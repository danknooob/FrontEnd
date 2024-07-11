import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ImageIntro from './intro/ImageIntro';
import LandingPage from './pages/LandingPage.jsx';
import ProductPage from './pages/ProductPage.jsx';
import SignIn from './pages/SignIn.jsx'; // Import SignIn component
import SignUp from './pages/SignUp.jsx'; // Import SignUp component
// import Footer from './components/Footer';
// import Dashboard from './components/Dashboard'
import SideBar from './components/SideBar.jsx';
import About from './pages/About.jsx';
import Profile from './pages/Profile.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import Orders from './pages/Orders.jsx';
import Pricing from './pages/Pricing.jsx';
import GetStarted from './pages/GetStarted.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import CreateListingPage from './pages/CreateListingPage.jsx';
import ItemContainer from './components/ItemContainer.jsx';
import Listing from './pages/Listing.jsx';
import Search from './pages/Search.jsx';
import Cart from './components/Cart.jsx';
import CreateServiceProvider from './components/CreateServiceProvider.jsx';
import MarketPlaceProducts from './components/MarketplaceProducts.jsx'; // Import MarketPlaceProducts
import SidebarMarketplace from './components/SidebarForMarketplace.jsx'; // Import SidebarMarketplace
import MyComponent from './components/MyComponent.jsx';

export default function App() {
  const categories = ["Saas", "Security", "Marketing"]; // Replace with your categories

  return (
    <BrowserRouter>
      <div className="marketplace">
        <SidebarMarketplace categories={categories} /> {/* Render Sidebar */}
        <Routes>
          <Route path='/' element={<ImageIntro />} />
          <Route path='/landingpage' element={<LandingPage />} />
          <Route path='/productpage' element={<ProductPage />} />
          <Route path='/sign-in' element={<SignIn />} /> {/* Route to SignIn component */}
          <Route path='/sign-up' element={<SignUp />} /> {/* Route to SignUp component */}
          {/* <Route path='/dashboard' element={<Dashboard/>}/> */}
          <Route path='/sidebar' element={<SideBar/>}/>
          <Route path='/search' element={<Search />} />
          <Route path='/about' element={<About/>}/>
          <Route path='/settings' element={<SettingsPage/>}/>
          <Route path='/orders' element={<Orders/>}/>
          <Route path='/pricing' element={<Pricing/>}/>
          <Route path='/getstarted' element={<GetStarted/>}/>
          <Route element={<PrivateRoute/>}>
            <Route path='/profile' element={<Profile />} />
          </Route>
          <Route path='/createlisting' element={<CreateListingPage/>} />
          <Route path='/listing/:listingId' element={<Listing />} />
          <Route path='/itemcontainer' element={<ItemContainer/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/serviceprovider' element={<CreateServiceProvider/>} />
          <Route path="/marketplace" element={<MarketPlaceProducts />} /> {/* Render MarketPlaceProducts on /marketplace */}
          <Route path="/marketplace/:category" element={<MarketPlaceProducts />} /> {/* Render MarketPlaceProducts with category */}
          <Route path="/mycomponent" element={<MyComponent/>} />
          {/* <Route path="/cart" element={<Cart/>} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}
