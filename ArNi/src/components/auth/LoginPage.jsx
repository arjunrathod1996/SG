// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import UserService from "../service/UserService";
// import { FaUserCircle, FaLock, FaPhone } from "react-icons/fa";

// function LoginPage({ onLogin }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [otp, setOtp] = useState('');
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [isEmailLogin, setIsEmailLogin] = useState(true);
//   const [fade, setFade] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     setFade(true);
//   }, [isEmailLogin]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');

//     try {
//       let response;
//       if (isEmailLogin) {
//         response = await UserService.login(email, password);
//       } else {
//         response = await UserService.loginWithPhone(phoneNumber, otp);
//       }
//       if (response?.token) {
//         const { token } = response;
//         onLogin(token);
//         navigate(isEmailLogin ? '/dashboard' : '/my');
//       } else {
//         throw new Error('Token not found in response');
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const toggleLoginMethod = () => {
//     setFade(false);
//     setTimeout(() => {
//       setIsEmailLogin(!isEmailLogin);
//       setFade(true);
//     }, 300);
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-white z-50">
//       <div className="relative w-full max-w-sm md:max-w-md transition-opacity duration-700 ease-in-out">
//         <div className={`relative bg-white p-8 shadow-lg rounded-lg transition-opacity duration-300 ${fade ? 'opacity-100' : 'opacity-0'}`}>
//           <div className="flex justify-center mb-6">
//             <FaUserCircle className="text-blue-600 text-5xl md:text-6xl" />
//           </div>
//           <h2 className="text-xl md:text-2xl font-semibold mb-6 text-center text-gray-700">Login</h2>
//           <form onSubmit={handleSubmit}>
//             {isEmailLogin ? (
//               <>
//                 <div className="mb-4 relative">
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
//                   <div className="absolute inset-y-0 left-0 flex items-center pl-3">
//                     <FaUserCircle className="text-gray-400" />
//                   </div>
//                   <input
//                     type="email"
//                     id="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="mt-1 pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                     required
//                   />
//                 </div>
//                 <div className="mb-6 relative">
//                   <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
//                   <div className="absolute inset-y-0 left-0 flex items-center pl-3">
//                     <FaLock className="text-gray-400" />
//                   </div>
//                   <input
//                     type="password"
//                     id="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="mt-1 pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                     required
//                   />
//                 </div>
//               </>
//             ) : (
//               <>
//                 <div className="mb-4 relative">
//                   <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
//                   <div className="absolute inset-y-0 left-0 flex items-center pl-3">
//                     <FaPhone className="text-gray-400" />
//                   </div>
//                   <input
//                     type="tel"
//                     id="phoneNumber"
//                     value={phoneNumber}
//                     onChange={(e) => setPhoneNumber(e.target.value)}
//                     className="mt-1 pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                     required
//                   />
//                 </div>
//                 <div className="mb-6 relative">
//                   <label htmlFor="otp" className="block text-sm font-medium text-gray-700">OTP</label>
//                   <div className="absolute inset-y-0 left-0 flex items-center pl-3">
//                     <FaLock className="text-gray-400" />
//                   </div>
//                   <input
//                     type="password"
//                     id="otp"
//                     value={otp}
//                     onChange={(e) => setOtp(e.target.value)}
//                     className="mt-1 pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                     required
//                   />
//                 </div>
//               </>
//             )}
//             {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
//             <button
//               type="submit"
//               className={`w-full px-4 py-2 ${isLoading ? 'bg-gray-500' : 'bg-blue-600'} text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 transition-colors duration-300`}
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 <div className="flex justify-center items-center">
//                   <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C6.268 0 2 4.268 2 12h2zM12 20a8 8 0 01-8-8H2c0 4.418 3.582 8 8 8v-2z"></path>
//                   </svg>
//                   <span className="ml-2">Logging in...</span>
//                 </div>
//               ) : (
//                 'Login'
//               )}
//             </button>
//           </form>
//           <button
//             type="button"
//             onClick={toggleLoginMethod}
//             className="mt-4 w-full px-4 py-2 bg-gray-600 text-white font-semibold rounded-md shadow-sm hover:bg-gray-700 transition-colors duration-300"
//           >
//             {isEmailLogin ? 'Login with Phone Number' : 'Login with Email'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LoginPage;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import UserService from "../service/UserService";
// import { FaUserCircle, FaLock, FaPhone } from "react-icons/fa";

// function LoginPage({ onLogin }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [otp, setOtp] = useState('');
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [isEmailLogin, setIsEmailLogin] = useState(true);
//   const [isPhoneNumberSent, setIsPhoneNumberSent] = useState(false);
//   const [fade, setFade] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     setFade(true);
//   }, [isEmailLogin]);

//   const handleSendOtp = async () => {
//     setIsLoading(true);
//     setError('');
//     try {
//       await UserService.sendOtp(phoneNumber); // Adjust this according to your actual service
//       setIsPhoneNumberSent(true);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');

//     try {
//       let response;
//       if (isEmailLogin) {
//         response = await UserService.login(email, password);
//       } else {
//         response = await UserService.loginWithPhone(phoneNumber, otp);
//       }
//       if (response?.token) {
//         const { token } = response;
//         onLogin(token);
//         navigate(isEmailLogin ? '/dashboard' : '/my');
//       } else {
//         throw new Error('Token not found in response');
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const toggleLoginMethod = () => {
//     setFade(false);
//     setTimeout(() => {
//       setIsEmailLogin(!isEmailLogin);
//       setIsPhoneNumberSent(false); // Reset when switching login methods
//       setPhoneNumber('');
//       setOtp('');
//       setFade(true);
//     }, 300);
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-white z-50">
//       <div className="relative w-full max-w-sm md:max-w-md transition-opacity duration-700 ease-in-out">
//         <div className={`relative bg-white p-8 shadow-lg rounded-lg transition-opacity duration-300 ${fade ? 'opacity-100' : 'opacity-0'}`}>
//           <div className="flex justify-center mb-6">
//             <FaUserCircle className="text-blue-600 text-5xl md:text-6xl" />
//           </div>
//           <h2 className="text-xl md:text-2xl font-semibold mb-6 text-center text-gray-700">Login</h2>
//           <form onSubmit={handleSubmit}>
//             {isEmailLogin ? (
//               <>
//                 <div className="mb-4 relative">
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
//                   <div className="absolute inset-y-0 left-0 flex items-center pl-3">
//                     <FaUserCircle className="text-gray-400" />
//                   </div>
//                   <input
//                     type="email"
//                     id="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="mt-1 pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                     required
//                   />
//                 </div>
//                 <div className="mb-6 relative">
//                   <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
//                   <div className="absolute inset-y-0 left-0 flex items-center pl-3">
//                     <FaLock className="text-gray-400" />
//                   </div>
//                   <input
//                     type="password"
//                     id="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="mt-1 pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                     required
//                   />
//                 </div>
//                 <button
//                   type="submit"
//                   className={`w-full px-4 py-2 ${isLoading ? 'bg-gray-500' : 'bg-blue-600'} text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 transition-colors duration-300`}
//                   disabled={isLoading}
//                 >
//                   {isLoading ? 'Logging in...' : 'Login'}
//                 </button>
//               </>
//             ) : (
//               <>
//                 {!isPhoneNumberSent ? (
//                   <>
//                     <div className="mb-4 relative">
//                       <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
//                       <div className="absolute inset-y-0 left-0 flex items-center pl-3">
//                         <FaPhone className="text-gray-400" />
//                       </div>
//                       <input
//                         type="tel"
//                         id="phoneNumber"
//                         value={phoneNumber}
//                         onChange={(e) => setPhoneNumber(e.target.value)}
//                         className="mt-1 pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                         required
//                       />
//                     </div>
//                     <button
//                       type="button"
//                       onClick={handleSendOtp}
//                       className={`w-full px-4 py-2 ${isLoading ? 'bg-gray-500' : 'bg-blue-600'} text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 transition-colors duration-300`}
//                       disabled={isLoading}
//                     >
//                       {isLoading ? 'Sending OTP...' : 'Send OTP'}
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <div className="mb-4 relative">
//                       <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
//                       <div className="absolute inset-y-0 left-0 flex items-center pl-3">
//                         <FaPhone className="text-gray-400" />
//                       </div>
//                       <input
//                         type="tel"
//                         id="phoneNumber"
//                         value={phoneNumber}
//                         onChange={(e) => setPhoneNumber(e.target.value)}
//                         className="mt-1 pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                         disabled
//                       />
//                     </div>
//                     <div className="mb-4 relative">
//                       <label htmlFor="otp" className="block text-sm font-medium text-gray-700">OTP</label>
//                       <div className="absolute inset-y-0 left-0 flex items-center pl-3">
//                         <FaLock className="text-gray-400" />
//                       </div>
//                       <input
//                         type="text"
//                         id="otp"
//                         value={otp}
//                         onChange={(e) => setOtp(e.target.value)}
//                         className="mt-1 pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                         required
//                       />
//                     </div>
//                     <button
//                       type="submit"
//                       className={`w-full px-4 py-2 ${isLoading ? 'bg-gray-500' : 'bg-blue-600'} text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 transition-colors duration-300`}
//                       disabled={isLoading}
//                     >
//                       {isLoading ? 'Logging in...' : 'Login'}
//                     </button>
//                   </>
//                 )}
//               </>
//             )}
//             {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
//           </form>
//           <button
//             type="button"
//             onClick={toggleLoginMethod}
//             className="mt-4 w-full px-4 py-2 bg-gray-600 text-white font-semibold rounded-md shadow-sm hover:bg-gray-700 transition-colors duration-300"
//           >
//             {isEmailLogin ? 'Login with Phone Number' : 'Login with Email'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LoginPage;




// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import UserService from '../service/UserService';
// import { FaUserCircle, FaLock, FaPhone } from 'react-icons/fa';

// function LoginPage({ onLogin }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [otp, setOtp] = useState('');
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [isEmailLogin, setIsEmailLogin] = useState(true);
//   const [isPhoneNumberSent, setIsPhoneNumberSent] = useState(false);
//   const [fade, setFade] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     setFade(true);
//   }, [isEmailLogin]);

//   const handleSendOtp = async () => {
//     setIsLoading(true);
//     setError('');
//     try {
//       const response = await UserService.sendOtp(phoneNumber);
//       setIsPhoneNumberSent(true);
//       console.log(response); // Handle response or display a success message
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');

//     try {
//       let response;
//       if (isEmailLogin) {
//         response = await UserService.login(email, password);
//       } else {
//         response = await UserService.loginWithPhone(phoneNumber, otp);
//       }
//       if (response?.token) {
//         const { token } = response;
//         onLogin(token);
//         navigate(isEmailLogin ? '/dashboard' : '/my');
//       } else {
//         throw new Error('Token not found in response');
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const toggleLoginMethod = () => {
//     setFade(false);
//     setTimeout(() => {
//       setIsEmailLogin(!isEmailLogin);
//       setIsPhoneNumberSent(false); // Reset when switching login methods
//       setPhoneNumber('');
//       setOtp('');
//       setFade(true);
//     }, 300);
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-white z-50">
//       <div className="relative w-full max-w-sm md:max-w-md transition-opacity duration-700 ease-in-out">
//         <div className={`relative bg-white p-8 shadow-lg rounded-lg transition-opacity duration-300 ${fade ? 'opacity-100' : 'opacity-0'}`}>
//           <div className="flex justify-center mb-6">
//             <FaUserCircle className="text-blue-600 text-5xl md:text-6xl" />
//           </div>
//           <h2 className="text-xl md:text-2xl font-semibold mb-6 text-center text-gray-700">Login</h2>
//           <form onSubmit={handleSubmit}>
//             {isEmailLogin ? (
//               <>
//                 <div className="mb-4 relative">
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
//                   <div className="absolute inset-y-0 left-0 flex items-center pl-3">
//                     <FaUserCircle className="text-gray-400" />
//                   </div>
//                   <input
//                     type="email"
//                     id="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="mt-1 pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                     required
//                   />
//                 </div>
//                 <div className="mb-6 relative">
//                   <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
//                   <div className="absolute inset-y-0 left-0 flex items-center pl-3">
//                     <FaLock className="text-gray-400" />
//                   </div>
//                   <input
//                     type="password"
//                     id="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="mt-1 pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                     required
//                   />
//                 </div>
//                 <button
//                   type="submit"
//                   className={`w-full px-4 py-2 ${isLoading ? 'bg-gray-500' : 'bg-blue-600'} text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 transition-colors duration-300`}
//                   disabled={isLoading}
//                 >
//                   {isLoading ? 'Logging in...' : 'Login'}
//                 </button>
//               </>
//             ) : (
//               <>
//                 {!isPhoneNumberSent ? (
//                   <>
//                     <div className="mb-4 relative">
//                       <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
//                       <div className="absolute inset-y-0 left-0 flex items-center pl-3">
//                         <FaPhone className="text-gray-400" />
//                       </div>
//                       <input
//                         type="tel"
//                         id="phoneNumber"
//                         value={phoneNumber}
//                         onChange={(e) => setPhoneNumber(e.target.value)}
//                         className="mt-1 pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                         required
//                       />
//                     </div>
//                     <button
//                       type="button"
//                       onClick={handleSendOtp}
//                       className={`w-full px-4 py-2 ${isLoading ? 'bg-gray-500' : 'bg-blue-600'} text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 transition-colors duration-300`}
//                       disabled={isLoading}
//                     >
//                       {isLoading ? 'Sending OTP...' : 'Send OTP'}
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <div className="mb-4 relative">
//                       <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
//                       <div className="absolute inset-y-0 left-0 flex items-center pl-3">
//                         <FaPhone className="text-gray-400" />
//                       </div>
//                       <input
//                         type="tel"
//                         id="phoneNumber"
//                         value={phoneNumber}
//                         onChange={(e) => setPhoneNumber(e.target.value)}
//                         className="mt-1 pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                         disabled
//                       />
//                     </div>
//                     <div className="mb-4 relative">
//                       <label htmlFor="otp" className="block text-sm font-medium text-gray-700">OTP</label>
//                       <div className="absolute inset-y-0 left-0 flex items-center pl-3">
//                         <FaLock className="text-gray-400" />
//                       </div>
//                       <input
//                         type="text"
//                         id="otp"
//                         value={otp}
//                         onChange={(e) => setOtp(e.target.value)}
//                         className="mt-1 pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                         required
//                       />
//                     </div>
//                     <button
//                       type="submit"
//                       className={`w-full px-4 py-2 ${isLoading ? 'bg-gray-500' : 'bg-blue-600'} text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 transition-colors duration-300`}
//                       disabled={isLoading}
//                     >
//                       {isLoading ? 'Logging in...' : 'Login'}
//                     </button>
//                   </>
//                 )}
//               </>
//             )}
//           </form>
//           {error && (
//             <div className="mt-4 text-red-500 text-sm text-center">
//               {error}
//             </div>
//           )}
//           <div className="mt-4 text-center">
//             <button
//               type="button"
//               onClick={toggleLoginMethod}
//               className="text-sm text-blue-600 hover:underline"
//             >
//               {isEmailLogin ? 'Login with Phone' : 'Login with Email'}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LoginPage;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../service/UserService';
import { FaUserCircle, FaLock, FaPhone } from 'react-icons/fa';

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailLogin, setIsEmailLogin] = useState(true);
  const [isPhoneNumberSent, setIsPhoneNumberSent] = useState(false);
  const [fade, setFade] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setFade(true);
  }, [isEmailLogin]);

  const handleSendOtp = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await UserService.sendOtp(phoneNumber);
      setIsPhoneNumberSent(true);
      console.log("OTP response: ", response);
    
      setOtp(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      let response;
      if (isEmailLogin) {
        response = await UserService.login(email, password);
      } else {
        response = await UserService.loginWithPhone(phoneNumber, otp);
      }
      if (response?.token) {
        const { token } = response;
        onLogin(token);
        console.log("Navigating to:", isEmailLogin ? '/dashboard' : '/my_app');
       // navigate(isEmailLogin ? '/dashboard' : '/my_app');

        navigate(isEmailLogin ? '/dashboard' : '/my_app');
      } else {
        throw new Error('Token not found in response');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleLoginMethod = () => {
    setFade(false);
    setTimeout(() => {
      setIsEmailLogin(!isEmailLogin);
      setIsPhoneNumberSent(false); // Reset when switching login methods
      setPhoneNumber('');
      setOtp('');
      setFade(true);
    }, 300);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white z-50">
      <div className="relative w-full max-w-sm md:max-w-md transition-opacity duration-700 ease-in-out">
        <div className={`relative bg-white p-8 shadow-lg rounded-lg transition-opacity duration-300 ${fade ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex justify-center mb-6">
            <FaUserCircle className="text-blue-600 text-5xl md:text-6xl" />
          </div>
          <h2 className="text-xl md:text-2xl font-semibold mb-6 text-center text-gray-700">Login</h2>
          <form onSubmit={handleSubmit}>
            {isEmailLogin ? (
              <>
                <div className="mb-4 relative">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <FaUserCircle className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                <div className="mb-6 relative">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <FaLock className="text-gray-400" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className={`w-full px-4 py-2 ${isLoading ? 'bg-gray-500' : 'bg-blue-600'} text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 transition-colors duration-300`}
                  disabled={isLoading}
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                </button>
              </>
            ) : (
              <>
                {!isPhoneNumberSent ? (
                  <>
                    <div className="mb-4 relative">
                      <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <FaPhone className="text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="mt-1 pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className={`w-full px-4 py-2 ${isLoading ? 'bg-gray-500' : 'bg-blue-600'} text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 transition-colors duration-300`}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Sending OTP...' : 'Send OTP'}
                    </button>
                  </>
                ) : (
                  <>
                    <div className="mb-4 relative">
                      <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <FaPhone className="text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="mt-1 pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        disabled
                      />
                    </div>
                    <div className="mb-4 relative">
                      <label htmlFor="otp" className="block text-sm font-medium text-gray-700">OTP</label>
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <FaLock className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="otp"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="mt-1 pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className={`w-full px-4 py-2 ${isLoading ? 'bg-gray-500' : 'bg-blue-600'} text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 transition-colors duration-300`}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                  </>
                )}
              </>
            )}
          </form>
          {error && (
            <div className="mt-4 text-red-500 text-sm text-center">
              {error}
            </div>
          )}
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={toggleLoginMethod}
              className="text-sm text-blue-600 hover:underline"
            >
              {isEmailLogin ? 'Login with Phone' : 'Login with Email'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
