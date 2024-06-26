import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ImageIntro from './intro/ImageIntro';
import LandingPage from './pages/LandingPage';
import ProductPage from './pages/ProductPage';
import SignIn from './pages/SignIn'; // Import SignIn component
import SignUp from './pages/SignUp'; // Import SignUp component
// import Footer from './components/Footer';
// import Dashboard from './components/Dashboard'
import SideBar from './components/SideBar';
import About from './pages/About';
import Profile from './pages/Profile';
import SettingsPage from './pages/SettingsPage';
import Orders from './pages/Orders';
import Pricing from './pages/Pricing';
import GetStarted from './pages/GetStarted';
import PrivateRoute from './components/PrivateRoute';
import CreateListingPage from './pages/CreateListingPage';
import ItemContainer from './components/ItemContainer';
import Listing from './pages/Listing';
import Search from './pages/Search';


export default function App() {
  return (
    <BrowserRouter>
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
        <Route path='/createlisting' element={<CreateListingPage/>  } />
        <Route path='/listing/:listingId' element={<Listing />} />
        <Route path='/itemcontainer' element={<ItemContainer/> } />
      </Routes>
    </BrowserRouter>
  );
}
