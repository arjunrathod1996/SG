// import React, { useEffect, useRef, useState } from "react";
// import UserService from "../service/UserService";
// import { NavLink, useNavigate, useLocation} from "react-router-dom";
// import {
//   FaHome,
//   FaSignInAlt,
//   FaTachometerAlt,
//   FaCog,
//   FaMoneyBillWave,
//   FaSignOutAlt,
//   FaBox,
//   FaChartLine,
//   FaMapMarkerAlt,
//   FaGlobe,
//   FaCity
// } from "react-icons/fa";

// function Navbar({ isLoggedIn, onLogout }) {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [profileInfo, setProfileInfo] = useState(null);
//   const [dropdownVisible, setDropdownVisible] = useState(false);
//   const [userEmail, setUserEmail] = useState("");
//   const [user, setUser] = useState("");
//   const [subDropdownOpen, setSubDropdownOpen] = useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [activeRoute, setActiveRoute] = useState(location.pathname);

//   const dropdownRef = useRef(null);
//   const buttonRef = useRef(null);

//   useEffect(() => {
//     const fetchUserEmail = async () => {
//       if (isLoggedIn) {
//         try {
//           const user = await UserService.getCurrentUser();
//           if (user && user.email) {
//             setUserEmail(user.email);
//             setUser(user);
//           }
//         } catch (error) {
//           console.error("Error fetching user email:", error);
//         }
//       }
//     };

//     fetchUserEmail();
//   }, [isLoggedIn]);

//   const handleLogout = () => {
//     onLogout();
//     setDropdownVisible(false);
//     UserService.logout();
//     localStorage.removeItem("token");
//     setProfileInfo(null);
//     navigate("/login");
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target) &&
//         !buttonRef.current.contains(event.target)
//       ) {
//         setDropdownVisible(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const toggleSubDropdown = () => {
//     setSubDropdownOpen(!subDropdownOpen);
//   };

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   useEffect(() => {
//     setActiveRoute(location.pathname);
//     setSubDropdownOpen(location.pathname.startsWith("/products"));
//   }, [location]);

//   return (
//     <>
//       <nav className="bg-white border-gray-200 dark:bg-gray-900 fixed top-0 left-0 right-0 shadow-md z-50 transition-transform">
//         <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
//           <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
//             <span className="text-2xl font-semibold whitespace-nowrap dark:text-white uppercase ext-2xl  text-gray-300">Logo</span>
//           </a>
//           <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
//             <div className="flex items-center">
//               {!isLoggedIn && (
//                 <>
//                   <NavLink
//                     className="py-2 px-3 rounded mx-2 text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500 transition duration-300"
//                     aria-current="page"
//                     to="/home"
//                     style={({ isActive }) => ({
//                       fontWeight: isActive ? "bold" : "normal",
//                       color: isActive ? "blue" : "",
//                     })}
//                   >
//                     <FaHome className="inline mr-2" /> Home
//                   </NavLink>
//                   <NavLink
//                     className="py-2 px-3 rounded mx-2 text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500 transition duration-300"
//                     to="/login"
//                     style={({ isActive }) => ({
//                       fontWeight: isActive ? "bold" : "normal",
//                       color: isActive ? "blue" : "",
//                     })}
//                   >
//                     <FaSignInAlt className="inline mr-2" /> Login
//                   </NavLink>
//                 </>
//               )}
//             </div>

//             {isLoggedIn && (
//               <div className="relative">
//                 <button
//                   type="button"
//                   className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 transition duration-300"
//                   id="user-menu-button"
//                   aria-expanded={dropdownVisible}
//                   onClick={() => setDropdownVisible(!dropdownVisible)}
//                   ref={buttonRef}
//                 >
//                   <span className="sr-only">Open user menu</span>
//                   <img
//                     className="w-8 h-8 rounded-full"
//                     src="/docs/images/people/profile-picture-3.jpg"
//                     alt="user photo"
//                   />
//                 </button>
//                 {dropdownVisible && (
//                   <div
//                     className="absolute right-0 mt-2 w-48 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 transition-opacity duration-300"
//                     id="user-dropdown"
//                     ref={dropdownRef}
//                   >
//                     <div className="px-4 py-3">
//                       <span className="block text-sm text-gray-900 dark:text-white">{userEmail || "User Email"}</span>
//                       <span className="block text-sm text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
//                     </div>
//                     <ul className="py-2" aria-labelledby="user-menu-button">
//                       <li>
//                         <a
//                           href="#"
//                           className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white transition duration-300"
//                         >
//                           <FaTachometerAlt className="inline mr-2" /> Dashboard
//                         </a>
//                       </li>
//                       <li>
//                         <a
//                           href="#"
//                           className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white transition duration-300"
//                         >
//                           <FaCog className="inline mr-2" /> Settings
//                         </a>
//                       </li>
//                       <li>
//                         <a
//                           href="#"
//                           className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white transition duration-300"
//                         >
//                           <FaMoneyBillWave className="inline mr-2" /> Earnings
//                         </a>
//                       </li>
//                       <li>
//                         <a
//                           onClick={handleLogout}
//                           className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer transition duration-300"
//                         >
//                           <FaSignOutAlt className="inline mr-2" /> Sign out
//                         </a>
//                       </li>
//                     </ul>
//                   </div>
//                 )}
//               </div>
//             )}

//             {isLoggedIn && (
//               <button
//                 data-drawer-target="sidebar-multi-level-sidebar"
//                 data-drawer-toggle="sidebar-multi-level-sidebar"
//                 aria-controls="sidebar-multi-level-sidebar"
//                 type="button"
//                 className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 transition duration-300"
//                 onClick={toggleSidebar}
//               >
//                 <span className="sr-only">Open sidebar</span>
//                 <svg
//                   className="w-6 h-6"
//                   aria-hidden="true"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     clipRule="evenodd"
//                     fillRule="evenodd"
//                     d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 15.25zM2.75 10a.75.75 0 00-.75.75v.5a.75.75 0 00.75.75h14.5a.75.75 0 00.75-.75v-.5a.75.75 0 00-.75-.75H2.75z"
//                   ></path>
//                 </svg>
//               </button>
//             )}
//           </div>
//         </div>
//       </nav>

//       {isLoggedIn && (
//         <aside
//           id="sidebar-multi-level-sidebar"
//           className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 lg:pt-4 transition-transform ${
//             isSidebarOpen ? "" : "-translate-x-full"
//           } bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
//           aria-label="Sidebar"
//         >
//           <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
//             <ul className="space-y-2 font-medium">
//               <li>
//                 <NavLink
//                   to="/dashboard"
//                   className={({ isActive }) => {
//                     if (isActive) setActiveRoute("/dashboard");
//                     return `flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300 ${
//                       isActive ? "bg-blue-100 dark:bg-blue-800" : ""
//                     }`;
//                   }}
//                 >
//                   <FaTachometerAlt className="w-4 h-6" />
//                   <span className="ml-3">Dashboard</span>
//                 </NavLink>
//               </li>
//               <li>
//                 <button
//                   type="button"
//                   className="flex items-center w-full p-2 text-gray-900 transition duration-300 rounded-lg group dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
//                   aria-controls="dropdown-example"
//                   data-collapse-toggle="dropdown-example"
//                   onClick={toggleSubDropdown}
//                 >
//                   <FaMapMarkerAlt className="w-4 h-6" />
//                   <span className="flex-1 ml-3 text-left whitespace-nowrap" sidebar-toggle-item>
//                     Location
//                   </span>
//                   <svg
//                     className={`w-6 h-6 transition-transform duration-300 ${
//                       subDropdownOpen ? "transform rotate-180" : ""
//                     }`}
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M5.23 7.21a.75.75 0 011.06.02L10 10.84l3.71-3.61a.75.75 0 111.04 1.08l-4.25 4.13a.75.75 0 01-1.04 0l-4.25-4.13a.75.75 0 01.02-1.06z"
//                       clipRule="evenodd"
//                     ></path>
//                   </svg>
//                 </button>
//                 {subDropdownOpen && (
//                   <ul id="dropdown-example" className="py-2 space-y-2 transition duration-300">
//                     <li>
//                       <NavLink
//                         to="/dashboard/country"
//                         className={({ isActive }) => {
//                           if (isActive) setActiveRoute("/products");
//                           return `flex items-center w-full p-2 pl-11 text-gray-900 transition duration-300 rounded-lg group dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${
//                             isActive ? "bg-blue-100 dark:bg-blue-800" : ""
//                           }`;
//                         }}
//                       >
//                          <FaGlobe />
//                         <span className="ml-3">Country</span>

//                       </NavLink>
//                     </li>
//                     <li>
//                       <NavLink
//                         to="/dashboard/region"
//                         className={({ isActive }) => {
//                           if (isActive) setActiveRoute("/add-product");
//                           return `flex items-center w-full p-2 pl-11 text-gray-900 transition duration-300 rounded-lg group dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${
//                             isActive ? "bg-blue-100 dark:bg-blue-800" : ""
//                           }`;
//                         }}
//                       >
//                          <FaCity />
//                          <span className="ml-3">Region</span>
//                       </NavLink>
//                     </li>
//                   </ul>
//                 )}
//               </li>
//               <li>
//                 <NavLink
//                   to="/reports"
//                   className={({ isActive }) => {
//                     if (isActive) setActiveRoute("/reports");
//                     return `flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300 ${
//                       isActive ? "bg-blue-100 dark:bg-blue-800" : ""
//                     }`;
//                   }}
//                 >
//                   <FaChartLine className="w-6 h-6" />
//                   <span className="ml-3">Reports</span>
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   to="/settings"
//                   className={({ isActive }) => {
//                     if (isActive) setActiveRoute("/settings");
//                     return `flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300 ${
//                       isActive ? "bg-blue-100 dark:bg-blue-800" : ""
//                     }`;
//                   }}
//                 >
//                   <FaCog className="w-6 h-6" />
//                   <span className="ml-3">Settings</span>
//                 </NavLink>
//               </li>
//             </ul>
//           </div>
//         </aside>
//       )}
//     </>
//   );
// }

// export default Navbar;

// import React, { useEffect, useRef, useState } from "react";
// import UserService from "../service/UserService";
// import { NavLink, useNavigate, useLocation } from "react-router-dom";
// import {
//   FaHome,
//   FaSignInAlt,
//   FaTachometerAlt,
//   FaCog,
//   FaMoneyBillWave,
//   FaSignOutAlt,
//   FaMapMarkerAlt,
//   FaGlobe,
//   FaCity,
//   FaChartLine
// } from "react-icons/fa";

// function Navbar({ isLoggedIn, onLogout }) {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [profileInfo, setProfileInfo] = useState(null);
//   const [dropdownVisible, setDropdownVisible] = useState(false);
//   const [userEmail, setUserEmail] = useState("");
//   const [user, setUser] = useState("");
//   const [businessDropdownOpen, setBusinessDropdownOpen] = useState(false);
//   const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [activeRoute, setActiveRoute] = useState(location.pathname);

//   const dropdownRef = useRef(null);
//   const buttonRef = useRef(null);

//   useEffect(() => {
//     const fetchUserEmail = async () => {
//       if (isLoggedIn) {
//         try {
//           const user = await UserService.getCurrentUser();
//           if (user && user.email) {
//             setUserEmail(user.email);
//             setUser(user);
//           }
//         } catch (error) {
//           console.error("Error fetching user email:", error);
//         }
//       }
//     };

//     fetchUserEmail();
//   }, [isLoggedIn]);

//   const handleLogout = () => {
//     onLogout();
//     setDropdownVisible(false);
//     UserService.logout();
//     localStorage.removeItem("token");
//     setProfileInfo(null);
//     navigate("/login");
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target) &&
//         !buttonRef.current.contains(event.target)
//       ) {
//         setDropdownVisible(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const toggleBusinessDropdown = () => {
//     setBusinessDropdownOpen(!businessDropdownOpen);
//     setLocationDropdownOpen(false); // Close Location dropdown if open
//   };

//   const toggleLocationDropdown = () => {
//     setLocationDropdownOpen(!locationDropdownOpen);
//     setBusinessDropdownOpen(false); // Close Business dropdown if open
//   };

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   useEffect(() => {
//     setActiveRoute(location.pathname);
//     setBusinessDropdownOpen(location.pathname.startsWith("/dashboard/business"));
//     setLocationDropdownOpen(location.pathname.startsWith("/dashboard/country") || location.pathname.startsWith("/dashboard/region"));
//   }, [location]);

//   return (
//     <>
//       <nav className="bg-white border-gray-200 dark:bg-gray-900 fixed top-0 left-0 right-0 shadow-md z-50 transition-transform">
//         <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
//           <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
//             <span className="text-2xl font-semibold whitespace-nowrap dark:text-white uppercase ext-2xl text-gray-300">Logo</span>
//           </a>
//           <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
//             <div className="flex items-center">
//               {!isLoggedIn && (
//                 <>
//                   <NavLink
//                     className="py-2 px-3 rounded mx-2 text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500 transition duration-300"
//                     aria-current="page"
//                     to="/home"
//                     style={({ isActive }) => ({
//                       fontWeight: isActive ? "bold" : "normal",
//                       color: isActive ? "blue" : "",
//                     })}
//                   >
//                     <FaHome className="inline mr-2" /> Home
//                   </NavLink>
//                   <NavLink
//                     className="py-2 px-3 rounded mx-2 text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500 transition duration-300"
//                     to="/login"
//                     style={({ isActive }) => ({
//                       fontWeight: isActive ? "bold" : "normal",
//                       color: isActive ? "blue" : "",
//                     })}
//                   >
//                     <FaSignInAlt className="inline mr-2" /> Login
//                   </NavLink>
//                 </>
//               )}
//             </div>

//             {isLoggedIn && (
//               <div className="relative">
//                 <button
//                   type="button"
//                   className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 transition duration-300"
//                   id="user-menu-button"
//                   aria-expanded={dropdownVisible}
//                   onClick={() => setDropdownVisible(!dropdownVisible)}
//                   ref={buttonRef}
//                 >
//                   <span className="sr-only">Open user menu</span>
//                   <img
//                     className="w-8 h-8 rounded-full"
//                     src="/docs/images/people/profile-picture-3.jpg"
//                     alt="user photo"
//                   />
//                 </button>
//                 {dropdownVisible && (
//                   <div
//                     className="absolute right-0 mt-2 w-48 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 transition-opacity duration-300"
//                     id="user-dropdown"
//                     ref={dropdownRef}
//                   >
//                     <div className="px-4 py-3">
//                       <span className="block text-sm text-gray-900 dark:text-white">{userEmail || "User Email"}</span>
//                       <span className="block text-sm text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
//                     </div>
//                     <ul className="py-2" aria-labelledby="user-menu-button">
//                       <li>
//                         <a
//                           href="#"
//                           className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white transition duration-300"
//                         >
//                           <FaTachometerAlt className="inline mr-2" /> Dashboard
//                         </a>
//                       </li>
//                       <li>
//                         <a
//                           href="#"
//                           className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white transition duration-300"
//                         >
//                           <FaCog className="inline mr-2" /> Settings
//                         </a>
//                       </li>
//                       <li>
//                         <a
//                           href="#"
//                           className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white transition duration-300"
//                         >
//                           <FaMoneyBillWave className="inline mr-2" /> Earnings
//                         </a>
//                       </li>
//                       <li>
//                         <a
//                           onClick={handleLogout}
//                           className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer transition duration-300"
//                         >
//                           <FaSignOutAlt className="inline mr-2" /> Sign out
//                         </a>
//                       </li>
//                     </ul>
//                   </div>
//                 )}
//               </div>
//             )}

//             {isLoggedIn && (
//               <button
//                 data-drawer-target="sidebar-multi-level-sidebar"
//                 data-drawer-toggle="sidebar-multi-level-sidebar"
//                 aria-controls="sidebar-multi-level-sidebar"
//                 type="button"
//                 className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 transition duration-300"
//                 onClick={toggleSidebar}
//               >
//                 <span className="sr-only">Open sidebar</span>
//                 <svg
//                   className="w-6 h-6"
//                   aria-hidden="true"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     clipRule="evenodd"
//                     fillRule="evenodd"
//                     d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 01.75.75v10.5a.75.75 0 01-.75.75H2.75A.75.75 0 012 15.25V4.75zM3.5 6.25a.25.25 0 00-.25.25v7.5a.25.25 0 00.25.25h13a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25H3.5z"
//                   />
//                 </svg>
//               </button>
//             )}
//           </div>
//         </div>

//         <aside
//           id="sidebar-multi-level-sidebar"
//           className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
//             isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//           } sm:translate-x-0`}
//           aria-label="Sidebar"
//         >
//           <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
//             <ul className="space-y-2 font-medium">
//               {isLoggedIn && (
//                 <>
//                   <li>
//                     <NavLink
//                       to="/dashboard"
//                       className={`flex items-center p-2 text-gray-900 rounded-lg group dark:text-white dark:hover:bg-gray-700 ${
//                         activeRoute === "/dashboard" ? "bg-gray-100 dark:bg-gray-700" : ""
//                       }`}
//                       onClick={() => setBusinessDropdownOpen(false)}
//                     >
//                       <FaTachometerAlt className="w-6 h-6" />
//                       <span className="ms-3">Dashboard</span>
//                     </NavLink>
//                   </li>
//                   <li>
//                     <button
//                       type="button"
//                       className={`flex items-center p-2 w-full text-gray-900 rounded-lg group dark:text-white dark:hover:bg-gray-700 ${
//                         businessDropdownOpen ? "bg-gray-100 dark:bg-gray-700" : ""
//                       }`}
//                       onClick={toggleBusinessDropdown}
//                     >
//                       <FaCity className="w-6 h-6" />
//                       <span className="ms-3">Business</span>
//                       <svg
//                         className={`w-6 h-6 ms-auto transition-transform ${
//                           businessDropdownOpen ? "rotate-180" : ""
//                         }`}
//                         aria-hidden="true"
//                         fill="none"
//                         viewBox="0 0 10 6"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           stroke="currentColor"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="1.5"
//                           d="M1 1l4 4 4-4"
//                         />
//                       </svg>
//                     </button>
//                     <ul
//                       className={`mt-2 space-y-2 ${
//                         businessDropdownOpen ? "block" : "hidden"
//                       }`}
//                     >
//                       <li>
//                         <NavLink
//                           to="/dashboard/business"
//                           className={`flex items-center p-2 text-gray-900 rounded-lg group dark:text-white dark:hover:bg-gray-700 ${
//                             activeRoute === "/dashboard/business" ? "bg-gray-100 dark:bg-gray-700" : ""
//                           }`}
//                         >
//                           <FaGlobe className="w-6 h-6" />
//                           <span className="ms-3">Business</span>
//                         </NavLink>
//                       </li>
//                       <li>
//                         <NavLink
//                           to="/dashboard/business/add"
//                           className={`flex items-center p-2 text-gray-900 rounded-lg group dark:text-white dark:hover:bg-gray-700 ${
//                             activeRoute === "/dashboard/business/add" ? "bg-gray-100 dark:bg-gray-700" : ""
//                           }`}
//                         >
//                           <FaChartLine className="w-6 h-6" />
//                           <span className="ms-3">Add Business</span>
//                         </NavLink>
//                       </li>
//                     </ul>
//                   </li>
//                   <li>
//                     <button
//                       type="button"
//                       className={`flex items-center p-2 w-full text-gray-900 rounded-lg group dark:text-white dark:hover:bg-gray-700 ${
//                         locationDropdownOpen ? "bg-gray-100 dark:bg-gray-700" : ""
//                       }`}
//                       onClick={toggleLocationDropdown}
//                     >
//                       <FaMapMarkerAlt className="w-6 h-6" />
//                       <span className="ms-3">Location</span>
//                       <svg
//                         className={`w-6 h-6 ms-auto transition-transform ${
//                           locationDropdownOpen ? "rotate-180" : ""
//                         }`}
//                         aria-hidden="true"
//                         fill="none"
//                         viewBox="0 0 10 6"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           stroke="currentColor"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="1.5"
//                           d="M1 1l4 4 4-4"
//                         />
//                       </svg>
//                     </button>
//                     <ul
//                       className={`mt-2 space-y-2 ${
//                         locationDropdownOpen ? "block" : "hidden"
//                       }`}
//                     >
//                       <li>
//                         <NavLink
//                           to="/dashboard/country"
//                           className={`flex items-center p-2 text-gray-900 rounded-lg group dark:text-white dark:hover:bg-gray-700 ${
//                             activeRoute === "/dashboard/country" ? "bg-gray-100 dark:bg-gray-700" : ""
//                           }`}
//                         >
//                           <FaMapMarkerAlt className="w-6 h-6" />
//                           <span className="ms-3">Country</span>
//                         </NavLink>
//                       </li>
//                       <li>
//                         <NavLink
//                           to="/dashboard/region"
//                           className={`flex items-center p-2 text-gray-900 rounded-lg group dark:text-white dark:hover:bg-gray-700 ${
//                             activeRoute === "/dashboard/region" ? "bg-gray-100 dark:bg-gray-700" : ""
//                           }`}
//                         >
//                           <FaMapMarkerAlt className="w-6 h-6" />
//                           <span className="ms-3">Region</span>
//                         </NavLink>
//                       </li>
//                     </ul>
//                   </li>
//                 </>
//               )}
//             </ul>
//           </div>
//         </aside>
//       </nav>
//     </>
//   );
// }

// export default Navbar;

import React, { useEffect, useRef, useState } from "react";
import UserService from "../service/UserService";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  FaHome,
  FaSignInAlt,
  FaTachometerAlt,
  FaCog,
  FaMoneyBillWave,
  FaSignOutAlt,
  FaBox,
  FaChartLine,
  FaMapMarkerAlt,
  FaGlobe,
  FaCity,
  FaBriefcase, 
  FaStore, 
  FaUserShield,
  FaUserTie
} from "react-icons/fa";

function Navbar({ isLoggedIn, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [profileInfo, setProfileInfo] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [user, setUser] = useState("");
  const [subDropdownOpen, setSubDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState(location.pathname);
  const [businessDropdownOpen, setBusinessDropdownOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [merchantDropdownOpen, setMerchantDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  // useEffect(() => {
  //   const fetchUserEmail = async () => {
  //     if (isLoggedIn) {
  //       try {
  //         const user = await UserService.getCurrentUser();
  //         if (user && user.email) {
  //           setUserEmail(user.email);
  //           setUser(user);
  //         }
  //       } catch (error) {
  //         console.error("Error fetching user email:", error);
  //       }
  //     }
  //   };

  //   fetchUserEmail();
  // }, [isLoggedIn]);
  const [userInfo, setUserInfo] = useState({ email: "", phoneNumber: "" });
  useEffect(() => {
    if (isLoggedIn) {
      UserService.getCurrentUser()
        .then((user) => {
          if (user) {
            setUserInfo({
              email: user.email || "",
              phoneNumber: user.phoneNumber || "",
            });
            setProfileInfo(user);
            setUser(user);
          }
        })
        .catch((error) => console.error("Error fetching user information:", error));
    }
  }, [isLoggedIn]);

  

  const handleLogout = () => {
    onLogout();
    setDropdownVisible(false);
    UserService.logout();
    localStorage.removeItem("token");
    setUserInfo({ email: "", phoneNumber: "" });
    setProfileInfo(null);
    navigate("/login");
  };

  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> : user info email: " + userInfo.email);
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> : user info phone number : " + userInfo.phoneNumber);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        //setDropdownVisible(false);
        setDropdownVisible(false);
        setBusinessDropdownOpen(false);
        setLocationDropdownOpen(false);
        setMerchantDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleBusinessDropdown = () => {
    setBusinessDropdownOpen(!businessDropdownOpen);
    setLocationDropdownOpen(false);
    
  };

  const toggleLocationDropdown = () => {
    setLocationDropdownOpen(!locationDropdownOpen);
    setBusinessDropdownOpen(false);
   
  };

  useEffect(() => {
    // setActiveRoute(location.pathname);
    setBusinessDropdownOpen(
      location.pathname.startsWith("/dashboard/business")
      || location.pathname.startsWith("/dashboard/merchant")
      || location.pathname.startsWith("/dashboard/role")
    );
    setLocationDropdownOpen(
      location.pathname.startsWith("/dashboard/country") ||
        location.pathname.startsWith("/dashboard/region")
    );
  }, [location]);

  const toggleSubDropdown = () => {
    setSubDropdownOpen(!subDropdownOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    setActiveRoute(location.pathname);
    setSubDropdownOpen(location.pathname.startsWith("/products"));
  }, [location]);

 
  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 fixed top-0 left-0 right-0 shadow-md z-50 transition-transform">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="#"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="text-2xl font-semibold whitespace-nowrap dark:text-white uppercase ext-2xl  text-gray-300">
              Logo
            </span>
          </a>
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <div className="flex items-center">
              {!isLoggedIn && (
                <>
                  <NavLink
                    className="py-2 px-3 rounded mx-2 text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500 transition duration-300"
                    aria-current="page"
                    to="/home"
                    style={({ isActive }) => ({
                      fontWeight: isActive ? "bold" : "normal",
                      color: isActive ? "blue" : "",
                    })}
                  >
                    <FaHome className="inline mr-2" /> Home
                  </NavLink>
                  <NavLink
                    className="py-2 px-3 rounded mx-2 text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500 transition duration-300"
                    to="/login"
                    style={({ isActive }) => ({
                      fontWeight: isActive ? "bold" : "normal",
                      color: isActive ? "blue" : "",
                    })}
                  >
                    <FaSignInAlt className="inline mr-2" /> Login
                  </NavLink>
                </>
              )}
            </div>

            {isLoggedIn && (
              <div className="relative">
                <button
                  type="button"
                  className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 transition duration-300"
                  id="user-menu-button"
                  aria-expanded={dropdownVisible}
                  onClick={() => setDropdownVisible(!dropdownVisible)}
                  ref={buttonRef}
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-8 h-8 rounded-full"
                    src="/docs/images/people/profile-picture-3.jpg"
                    alt="user photo"
                  />
                </button>
                {dropdownVisible && (
                  <div
                    className="absolute right-0 mt-2 w-48 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 transition-opacity duration-300"
                    id="user-dropdown"
                    ref={dropdownRef}
                  >
                    <div className="px-4 py-3">
                      {( userInfo.email !== null &&
                        <span className="block text-sm text-gray-900 dark:text-white">
                        {/* {userEmail || "User Email"} */}
                        {userInfo.email}
                      </span>
                      )}
                       {( userInfo.phoneNumber !== null &&
                        <span className="block text-sm text-gray-900 dark:text-white">
                        {/* {userEmail || "User Email"} */}
                        {userInfo.phoneNumber}
                      </span>
                      )}
                      <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                      </span>
                    </div>
                    <ul className="py-2" aria-labelledby="user-menu-button">
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white transition duration-300"
                        >
                          <FaTachometerAlt className="inline mr-2" /> Dashboard
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white transition duration-300"
                        >
                          <FaCog className="inline mr-2" /> Settings
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white transition duration-300"
                        >
                          <FaMoneyBillWave className="inline mr-2" /> Earnings
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={handleLogout}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer transition duration-300"
                        >
                          <FaSignOutAlt className="inline mr-2" /> Sign out
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}

            {isLoggedIn && (
              <button
                data-drawer-target="sidebar-multi-level-sidebar"
                data-drawer-toggle="sidebar-multi-level-sidebar"
                aria-controls="sidebar-multi-level-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 transition duration-300"
                onClick={toggleSidebar}
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 15.25zM2.75 10a.75.75 0 00-.75.75v.5a.75.75 0 00.75.75h14.5a.75.75 0 00.75-.75v-.5a.75.75 0 00-.75-.75H2.75z"
                  ></path>
                </svg>
              </button>
            )}
          </div>
        </div>
      </nav>

      {isLoggedIn && userInfo.email && (
        <aside
          id="sidebar-multi-level-sidebar"
          className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 lg:pt-4 transition-transform ${
            isSidebarOpen ? "" : "-translate-x-full"
          } bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
          aria-label="Sidebar"
        >
          <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) => {
                    if (isActive) setActiveRoute("/dashboard");
                    return `flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300 ${
                      isActive ? "bg-blue-100 dark:bg-blue-800" : ""
                    }`;
                  }}
                >
                  <FaTachometerAlt className="w-4 h-6" />
                  <span className="ml-3">Dashboard</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/customer"
                  className={({ isActive }) => {
                    if (isActive) setActiveRoute("/dashboard/customer");
                    return `flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300 ${
                      isActive ? "bg-blue-100 dark:bg-blue-800" : ""
                    }`;
                  }}
                >
                  <FaTachometerAlt className="w-4 h-6" />
                  <span className="ml-3">Customer</span>
                </NavLink>
              </li>

             

              <li>
               {( user && user.role  && user.role.name === "ROLE_ADMIN" &&
                 <button
                 //type="button"
                 className="flex items-center w-full p-2 text-gray-900 transition duration-300 rounded-lg group dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                 aria-controls="dropdown-example"
                 data-collapse-toggle="dropdown-example"
                 onClick={toggleBusinessDropdown}
               >
                 <FaUserTie className="w-4 h-6" />
                 <span
                   className="flex-1 ml-3 text-left whitespace-nowrap"
                   sidebar-toggle-item
                 >  Business Role
                 </span>
                 <svg
                   className={`w-6 h-6 transition-transform duration-300 ${
                     businessDropdownOpen ? "transform rotate-180" : ""
                   }`}
                   fill="currentColor"
                   viewBox="0 0 20 20"
                   xmlns="http://www.w3.org/2000/svg"
                 >
                   <path
                     fillRule="evenodd"
                     d="M5.23 7.21a.75.75 0 011.06.02L10 10.84l3.71-3.61a.75.75 0 111.04 1.08l-4.25 4.13a.75.75 0 01-1.04 0l-4.25-4.13a.75.75 0 01.02-1.06z"
                     clipRule="evenodd"
                   ></path>
                 </svg>
               </button>
               )}
                {businessDropdownOpen && (
                  <ul
                    id="dropdown-example"
                    className="py-2 space-y-2 transition duration-300"
                  >
                    <li>
                      <NavLink
                        to="/dashboard/business"
                        className={({ isActive }) => {
                          if (isActive) setActiveRoute("/dashboard/business");
                          return `flex items-center w-full p-2 pl-11 text-gray-900 transition duration-300 rounded-lg group dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${
                            isActive ? "bg-blue-100 dark:bg-blue-800" : ""
                          }`;
                        }}
                      >
                        <FaBriefcase />
                        <span className="ml-3">Business</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/dashboard/merchant"
                        className={({ isActive }) => {
                          if (isActive) setActiveRoute("/dashboard/merchant");
                          return `flex items-center w-full p-2 pl-11 text-gray-900 transition duration-300 rounded-lg group dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${
                            isActive ? "bg-blue-100 dark:bg-blue-800" : ""
                          }`;
                        }}
                      >
                        <FaStore />
                        <span className="ml-3">Merchant</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/dashboard/role"
                        className={({ isActive }) => {
                          if (isActive) setActiveRoute("/dashboard/role");
                          return `flex items-center w-full p-2 pl-11 text-gray-900 transition duration-300 rounded-lg group dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${
                            isActive ? "bg-blue-100 dark:bg-blue-800" : ""
                          }`;
                        }}
                      >
                        <FaUserShield />
                        <span className="ml-3">Role</span>
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>

              <li>
               {(  user && user.role  && user.role.name === "ROLE_ADMIN" &&
                 <button
                 // type="button"
                 className="flex items-center w-full p-2 text-gray-900 transition duration-300 rounded-lg group dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                 aria-controls="dropdown-example"
                 data-collapse-toggle="dropdown-example"
                 onClick={toggleLocationDropdown}
               >
                 <FaMapMarkerAlt className="w-4 h-6" />
                 <span
                   className="flex-1 ml-3 text-left whitespace-nowrap"
                   sidebar-toggle-item
                 >
                   Location
                 </span>
                 <svg
                   className={`w-6 h-6 transition-transform duration-300 ${
                     locationDropdownOpen ? "transform rotate-180" : ""
                   }`}
                   fill="currentColor"
                   viewBox="0 0 20 20"
                   xmlns="http://www.w3.org/2000/svg"
                 >
                   <path
                     fillRule="evenodd"
                     d="M5.23 7.21a.75.75 0 011.06.02L10 10.84l3.71-3.61a.75.75 0 111.04 1.08l-4.25 4.13a.75.75 0 01-1.04 0l-4.25-4.13a.75.75 0 01.02-1.06z"
                     clipRule="evenodd"
                   ></path>
                 </svg>
               </button>
               )}
                {locationDropdownOpen && (
                  <ul
                    id="dropdown-example"
                    className="py-2 space-y-2 transition duration-300"
                  >
                    <li>
                      <NavLink
                        to="/dashboard/country"
                        className={({ isActive }) => {
                          if (isActive) setActiveRoute("/products");
                          return `flex items-center w-full p-2 pl-11 text-gray-900 transition duration-300 rounded-lg group dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${
                            isActive ? "bg-blue-100 dark:bg-blue-800" : ""
                          }`;
                        }}
                      >
                        <FaGlobe />
                        <span className="ml-3">Country</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/dashboard/region"
                        className={({ isActive }) => {
                          if (isActive) setActiveRoute("/add-product");
                          return `flex items-center w-full p-2 pl-11 text-gray-900 transition duration-300 rounded-lg group dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${
                            isActive ? "bg-blue-100 dark:bg-blue-800" : ""
                          }`;
                        }}
                      >
                        <FaCity />
                        <span className="ml-3">Region</span>
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>

              <li>
                <NavLink
                  to="/reports"
                  className={({ isActive }) => {
                    if (isActive) setActiveRoute("/reports");
                    return `flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300 ${
                      isActive ? "bg-blue-100 dark:bg-blue-800" : ""
                    }`;
                  }}
                >
                  <FaChartLine className="w-6 h-6" />
                  <span className="ml-3">Reports</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/settings"
                  className={({ isActive }) => {
                    if (isActive) setActiveRoute("/settings");
                    return `flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300 ${
                      isActive ? "bg-blue-100 dark:bg-blue-800" : ""
                    }`;
                  }}
                >
                  <FaCog className="w-6 h-6" />
                  <span className="ml-3">Settings</span>
                </NavLink>
              </li>

              <hr></hr>

              <li>
                <NavLink
                  to="/pnp/home"
                  className={({ isActive }) => {
                    if (isActive) setActiveRoute("/pnp/home");
                    return `flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300 ${
                      isActive ? "bg-blue-100 dark:bg-blue-800" : ""
                    }`;
                  }}
                >
                  <FaTachometerAlt className="w-4 h-6" />
                  <span className="ml-3">PNP</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </aside>
      )}
    </>
  );
}

export default Navbar;
