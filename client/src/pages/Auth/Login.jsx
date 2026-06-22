import React, { useState } from 'react';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const { login } = useAuth(); // for login

  const [isEmailLogin, setIsEmailLogin] = useState(false);

  const [password, setPassword] = useState('');
  const [user_email, setUser_email] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate();

  const SubmitHandler = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await login({
        username: user_email,
        email: user_email,
        password: password
      });

      navigate('/dashboard');
    } catch(err){
      setError(err.message || 'Failed to login. Please try again.');
    }

  };

  return (
    <div className="h-screen bg-[#edf2f0] flex items-center justify-center p-4 overflow-hidden  sm:p-8">

      <div className="bg-white w-full max-w-5xl max-h-[95vh] rounded-3xl shadow-lg flex flex-col md:flex-row p-3 gap-4 overflow-hidden">

        <div className="hidden md:block w-full md:w-1/2 relative rounded-2xl overflow-hidden">
          <img
            src={assets.login_img}
            alt="Login visual"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form Container */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 py-6 lg:px-16">

          <div className="w-full max-w-sm">
            {/* Heading */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Welcome Back
            </h2>

            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-xl text-sm text-center mb-4 border border-red-100">
                {error}
              </div>
            )}

            <form onSubmit={SubmitHandler} className="w-full flex flex-col gap-4">

              {/* Username / Email Input */}
              <div className="relative">
                {/* User/Email Icon */}
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-700">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    {isEmailLogin
                      ? <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      : <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    }
                  </svg>
                </span>
                <input
                  type={isEmailLogin ? "email" : "text"}
                  placeholder={isEmailLogin ? "Email Address" : "Username"}
                  value={user_email}
                  onChange={(e) => setUser_email(e.target.value)}
                  className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-green-700 focus:ring-1 focus:ring-green-700 transition-colors"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                {/* Lock Icon */}
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-700">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-green-700 focus:ring-1 focus:ring-green-700 transition-colors"
                  required
                />
              </div>

              <div className="text-right -mt-2">
                <button
                  type="button"
                  onClick={() => setIsEmailLogin(!isEmailLogin)}
                  className="text-sm text-green-700 font-medium hover:underline focus:outline-none "
                >
                  Login with {isEmailLogin ? "Username" : "Email"} instead
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#067338] text-white font-semibold py-2.5 rounded-xl hover:bg-green-800 transition-colors mt-2 active:scale-96"
              >
                Log In
              </button>

            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              Don't have an account?{' '}
              <Link to="/register" className="text-green-700 font-bold hover:underline">
                Sign up
              </Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;