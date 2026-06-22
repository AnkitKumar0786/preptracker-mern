import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/authServices';

const Register = () => {
  const Navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    college: '',
    branch: 'CSE',
    graduationYear: new Date().getFullYear + 4  // guessing the GY
  })


  const [confirmPass, setConfirmPass] = useState('')
  const [err, setErr] = useState('')

  // for saving the input
  const handleChange = (e) => {
    setFormData({  // copy the old data and update the getting one
      ...formData, [e.target.name]: e.target.value
    });
  }

  const SubmitHandler = async(e) => {
    e.preventDefault();
    setErr('')
    if (formData.password !== confirmPass) {
      setErr('Password do not match');
      return;
    }

    try {
      const dataToSubmit = {
        ...formData,
        graduationYear: parseInt(formData.graduationYear)  // converting to int
      };

      await authService.registerUser(dataToSubmit)
      
      Navigate('/dashboard');

    } catch (erro) {
      if (erro.errors && Array.isArray(erro.errors)) {  // if validation rules fails then
                setErr(erro.errors.map(e => e.msg).join(' | '));
            } else {
                setErr(erro.message || 'Registration failed. Please try again.');
            }
    }

  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#edf2f0] p-4 sm:p-8">

      <div className="bg-white w-full max-w-3xl max-h-[95vh] overflow-y-auto rounded-3xl shadow-lg p-8 sm:p-10 md:p-12">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h1>
          <p className="text-gray-500 text-sm">Join us to start your journey.</p>
        </div>


        <form onSubmit={SubmitHandler} className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Username */}
          <div className="col-span-1 relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-700">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Username"
              name='username'
              value={formData.username}
              onChange={handleChange}
              className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-green-700 focus:ring-1 focus:ring-green-700 transition-colors"
              required
            />
          </div>

          {/* Email */}
          <div className="col-span-1 relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-700">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </span>
            <input
              type="email"
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-green-700 focus:ring-1 focus:ring-green-700 transition-colors"
              required
            />
          </div>

          {/* College */}
          <div className="col-span-1 md:col-span-2 relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-700">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
            </span>
            <input
              type="text"
              name='college'
              value={formData.college}
              onChange={handleChange}
              placeholder="College Name (e.g., National Institute of Technology Trichy)"
              className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-green-700 focus:ring-1 focus:ring-green-700 transition-colors"
              required
            />
          </div>

          {/* Branch Dropdown */}
          <div className="col-span-1 relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-700 z-10">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </span>
            <select
              name='branch'
              value={formData.branch}
              onChange={handleChange}
              className="w-full pl-11 pr-10 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-green-700 focus:ring-1 focus:ring-green-700 transition-colors appearance-none text-gray-700 relative"
              defaultValue=""
              required
            >
              <option value="" disabled>Select Branch...</option>
              <option value="CSE">Computer Science and Engineering</option>
              <option value="MECH">Mechanical Engineering</option>
              <option value="ICE">Instrumentation and Control</option>
              <option value="ECE">Electronics and Communication</option>
              <option value="IT">Information Technology</option>
              <option value="MME"> Metallurgical and Materials Engineering</option>
              <option value="CIVIL"> Civil Engineering</option>
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </span>
          </div>

          {/* Graduation Year */}
          <div className="col-span-1 relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-700">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </span>
            <input
              type="number"
              min="2020"
              max="2035"
              name='graduationYear'
              value={formData.graduationYear}
              onChange={handleChange}
              placeholder="Graduation Year"
              className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-green-700 focus:ring-1 focus:ring-green-700 transition-colors"
              required
            />
          </div>

          {/* Password */}
          <div className="col-span-1 relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-700">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </span>
            <input
              type="password"
              placeholder="Password"
              name='password'
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-green-700 focus:ring-1 focus:ring-green-700 transition-colors"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="col-span-1 relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-700">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </span>
            <input
              type="password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              placeholder="Confirm Password"
              className={`w-full pl-11 pr-4 py-2.5 bg-gray-50 border rounded-xl focus:outline-none focus:ring-1 transition-colors
               ${err ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-100 focus:border-green-700 focus:ring-green-700'}
                `}
              required
            />
          </div>

          {/* Error Message Display */}
          {err && (
            <div className="col-span-1 md:col-span-2">
              <p className="text-red-500 text-sm font-medium text-center bg-red-50 py-2 rounded-lg border border-red-100">
                {err}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <div className="col-span-1 md:col-span-2 mt-4">
            <button
              type="submit"
              className="w-full bg-[#067338] text-white font-semibold py-3 rounded-xl hover:bg-green-800 transition-colors active:scale-96"
            >
              Sign Up
            </button>
          </div>

        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-green-700 font-bold hover:underline">
            Log in
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;