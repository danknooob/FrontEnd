import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOutUserStart, deleteUserSuccess, deleteUserFailure } from '../redux/user/userSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      // Navigate to the landing page or another appropriate route after logout
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      dispatch(deleteUserFailure(error.message));
    }
  };

  return (
    <>
      <div className="navbar bg-base-100 fixed top-0 left-0 w-full shadow-md">
        <div className="flex-1 flex items-center justify-between">
          <Link to="/landingpage" className="btn btn-ghost text-2xl font-bold">ByteBazaar</Link>
          <div className="flex space-x-4">
            <Link to="/about">
              <button className="btn btn-outline btn-primary">About Us</button>
            </Link>
            <Link to="/pricing">
              <button className="btn btn-outline btn-primary">Pricing</button>
            </Link>
            <Link to="/sign-in">
              <button className="btn btn-outline btn-secondary">Login</button>
            </Link>
            <Link to="/getstarted">
              <button className="btn btn-outline btn-secondary">Get Started</button>
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="badge badge-sm indicator-item">2</span>
              </div>
            </div>
            <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
              <div className="card-body">
                <span className="font-bold text-lg">2 Item</span>
                <span className="text-info">Subtotal: $999</span>
                <div className="card-actions">
                  <button className="btn btn-primary btn-block">View cart</button>
                </div>
              </div>
            </div>
          </div>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt="User avatar" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/settings" className="justify-between">
                  Settings
                </Link>
              </li>
              <li>
                <button className="justify-between" onClick={handleSignOut}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
