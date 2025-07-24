  import React, { useState } from 'react';
  import { Link, useNavigate } from 'react-router-dom';
  import { useDispatch, useSelector } from 'react-redux';
  import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
  import image from '../assets/vecteezy_man-working-with-computer-at-desk_[1].jpg';
  import bgimg from '../assets/WhatsApp Image 2024-06-17 at 15.32.49_5c31df32.jpg';
   import OAuth from '../components/OAuth';

  const SignIn = () => {
    const [formData, setFormData] = useState({
      email: '',
      password: '',
    });
    
    const { loading, error } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        dispatch(signInStart());
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        console.log(data)
        if (!res.ok) {
          dispatch(signInFailure(data.message));
          return;
        }
        dispatch(signInSuccess(data));
        navigate('/landingpage');
      } catch (error) {
        dispatch(signInFailure(error.message));
      }
    };

    return (
      <main
        className="w-full h-screen bg-cover bg-center flex items-center justify-center bg-white"
        style={{ backgroundImage: `url(${bgimg})` }}
      >
        <div className="bg-white shadow-lg rounded-3xl overflow-hidden w-full max-w-4xl">
          <div className="flex flex-col md:flex-row">
            {/* Photo Div */}
            <div className="w-full md:w-2/5 border-r border-black bg-opacity-100">
              <h1 className="text-4xl md:text-6xl text-black font-semibold px-5 py-5">
                Ready to Elevate Your Software Experience?
              </h1>
              <div
                className="mt-12 py-20 h-2/5 bg-cover rounded-3xl"
                style={{ backgroundImage: `url(${image})`, opacity: 1 }}
              ></div>
            </div>

            <div className="w-full p-6 md:w-3/5 bg-white">
              <form autoComplete="off" onSubmit={handleSubmit}>
                <div className="text-center mb-6">
                  {/* Removed ByteBlazer heading for cleaner look */}
                </div>

                <div className="space-y-4">
                  <div className="mb-4">
                    <label className="block mb-1 font-semibold text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      onChange={handleChange}
                      autoComplete="off"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block mb-1 font-semibold text-gray-700">Password</label>
                    <input
                      type="password"
                      name="password"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      onChange={handleChange}
                      autoComplete="off"
                    />
                  </div>

                  <div className="text-center mt-1">
                    <input
                      type="submit"
                      value="Login"
                      className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 cursor-pointer w-full"
                      disabled={loading}
                    />
                  </div>

                  <div className="text-center flex items-center justify-center mt-1">
                    <span className="text-base label-text font-semibold mr-2">New Here?</span>
                    <Link to="/register" className="text-blue-700 cursor-pointer">Register</Link>
                  </div>
                </div>
                {error && <p className="text-red-500 mt-5 text-center">{error}</p>}
                <p className="text-gray-600 mt-6 text-center">
                  By signing in, I agree to the
                  <Link to="#" className="text-blue-600 hover:underline"> Terms of Services</Link> and
                  <Link to="#" className="text-blue-600 hover:underline"> Privacy Policy</Link>
                </p>
              </form>
              <div className="my-4 flex items-center">
                <hr className="flex-grow border-t border-gray-300" />
                <span className="mx-4 text-gray-500">or</span>
                <hr className="flex-grow border-t border-gray-300" />
              </div>
              <OAuth />
            </div>
          </div>
        </div>
      </main>
    );
  };

  export default SignIn;
