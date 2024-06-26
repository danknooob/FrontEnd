import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ImageIntro from './intro/ImageIntro';
import LandingPage from './pages/LandingPage';
import ProductPage from './pages/ProductPage';
import SignIn from './pages/SignIn'; // Import SignIn component
import SignUp from './pages/SignUp'; // Import SignUp component
// import Footer from './components/Footer';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ImageIntro />} />
        <Route path='/landingpage' element={<LandingPage />} />
        <Route path='/productpage' element={<ProductPage />} />
        <Route path='/sign-in' element={<SignIn />} /> {/* Route to SignIn component */}
        <Route path='/sign-up' element={<SignUp />} /> {/* Route to SignUp component */}
      </Routes>
    </BrowserRouter>
  );
}
