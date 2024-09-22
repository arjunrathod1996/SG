// import React, { useState, useEffect, useRef } from 'react';
// import Draggable from 'react-draggable';
// import Modal from 'react-modal';
// import { FaTimes, FaMapMarkedAlt, FaPhone, FaBuilding, FaAddressCard, FaTag, FaMapSigns } from "react-icons/fa";
// import Select from 'react-select';

// const NoOptionsMessage = ({ inputValue, filteredOptions }) => {
//   if (inputValue.length < 3) {
//     return <div className="p-1 text-gray-500">Enter 3 characters to search</div>;
//   }
//   if (filteredOptions.length === 0) {
//     return <div className="p-1 text-gray-500">Data not found</div>;
//   }
//   return null;
// };

// function MerchantFormModal({ isOpen, closeModal, businessOptions, regionOptions, formData, setFormData, handleSubmit, messages,isSubmitting }) {
//   const [selectedBusiness, setSelectedBusiness] = useState(null);
//   const [filteredBusinessOptions, setFilteredBusinessOptions] = useState([]);
//   const [inputValue, setInputValue] = useState('');

//   const [selectedRegion, setSelectedRegion] = useState(null);
//   const [filteredRegionOptions, setFilteredRegionOptions] = useState([]);
//   const [regionInputValue, setRegionInputValue] = useState('');

//   const [isDisabled, setDisabled] = useState(false);

//   const inputRefs = useRef({}); // Ref to hold input field references

//   const defaultFormData = {
//     business: '',
//     mobileNumber: '',
//     displayPhone: '',
//     region: '',
//     locality: '',
//     address: '',
//     category: ''
//   };

//   const currentFormData = { ...defaultFormData, ...formData };

//   useEffect(() => {
//     if(currentFormData.id !== null){
//       setSelectedBusiness(businessOptions.find(option => option.label === currentFormData.business.name));
//       setDisabled(true);
//     }else{
//       setDisabled(false);
//     }
//   }, [currentFormData, businessOptions]);

//   useEffect(() => {
//     setSelectedRegion(regionOptions.find(option => option.label === currentFormData.region.city));
//     setDisabled(true);
//   }, [currentFormData, regionOptions]);

//   useEffect(() => {
//     if (inputValue.length >= 3) {
//       const results = businessOptions.filter(option => {
//         return option.label && typeof option.label === 'string' && option.label.toLowerCase().includes(inputValue.toLowerCase());
//       });
//       setFilteredBusinessOptions(results);
//     } else {
//       setFilteredBusinessOptions([]);
//     }
//   }, [inputValue, businessOptions]);

//   useEffect(() => {
//     if (regionInputValue.length >= 3) {
//       const results = regionOptions.filter(option => {
//         return option.label && typeof option.label === 'string' && option.label.toLowerCase().includes(regionInputValue.toLowerCase());
//       });
//       setFilteredRegionOptions(results);
//     } else {
//       setFilteredRegionOptions([]);
//     }
//   }, [regionInputValue, regionOptions]);

//   const handleInputChangeText = (event) => {
//     const { name, value } = event.target;
//     setFormData({ ...currentFormData, [name]: value });
//   };

//   const handleBusinessChange = (selectedOption) => {
//     setSelectedBusiness(selectedOption);
//     setFormData({ ...currentFormData, business: selectedOption ? selectedOption.value : '' });
//   };

//   const handleRegionChange = (selectedOption) => {
//     setSelectedRegion(selectedOption);
//     setFormData({ ...currentFormData, region: selectedOption ? selectedOption.value : '' });
//   };

//   const handleBusinessInputChange = (inputValue) => {
//     setInputValue(inputValue);
//   };

//   const handleRegionInputChange = (inputValue) => {
//     setRegionInputValue(inputValue);
//   };

//   const handleFocus = (fieldName) => {
//     if (messages[fieldName]) {
//       // Clear error message
//       dispatch({
//         type: "SET_MESSAGES",
//         payload: { [fieldName]: "" }
//       });
//     }
//   };

//   // const onSubmit = (event) => {
//   //   event.preventDefault();
//   //   handleSubmit(currentFormData);
//   // };

//   const onSubmit = async (event) => {
//     event.preventDefault(); // Prevent default form submission behavior
//     //setIsSubmitting(true); // Set submitting state to true

//     try {
//       await handleSubmit(currentFormData); // Call the passed handleSubmit function
//      // setIsSubmitting(true);
//     } catch (error) {
//       // Handle submission error if needed
//     } finally {
//     //  setIsSubmitting(false); // Reset submitting state
//     }
//   };

//   console.log(">>>>>>>>>>>>>>>> id : " + formData.id + " >>>>> : " + currentFormData.id);

//   return (
//     <>
//       <Draggable handle=".drag-handle">
//         <div>
//           <Modal
//             isOpen={isOpen}
//             onRequestClose={closeModal}
//             contentLabel="Merchant Form Modal"
//             className="relative w-full max-w-lg p-4 bg-white rounded-lg shadow-lg mx-2 sm:mx-4 md:mx-auto mt-40 lg:mt-20 md:mt-40 z-40"
//             overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center overflow-auto"
//           >
//             <button
//               onClick={closeModal}
//               className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-colors"
//               aria-label="Close"
//             >
//               <FaTimes className="w-6 h-6" />
//             </button>
//             <div className="drag-handle cursor-move mb-4">
//               <h2 className="text-lg font-semibold text-gray-800">
//                 {currentFormData.id ? "Edit Merchant" : "Add New Merchant"}
//               </h2>
//             </div>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//                 <div className='md:col-span-2 relative'>
//                   <label htmlFor="business" className="flex items-center text-sm font-medium text-gray-700">
//                     <FaBuilding className="mr-2" />
//                     Business
//                   </label>
//                   <Select
//                     id="business"
//                     name="business"
//                     options={filteredBusinessOptions}
//                     value={selectedBusiness}
//                     onChange={handleBusinessChange}
//                     onInputChange={handleBusinessInputChange}
//                     className="mt-1"
//                     placeholder="Select a business"
//                     inputValue={inputValue}
//                     isDisabled={isDisabled}
//                     noOptionsMessage={() => <NoOptionsMessage inputValue={inputValue} filteredOptions={filteredBusinessOptions} />}
//                   />
//                   {messages.business && <p className="text-red-500 text-sm mt-1">{messages.business}</p>}
//                 </div>
//                 <div className='md:col-span-2 relative'>
//                   <label htmlFor="region" className="flex items-center text-sm font-medium text-gray-700">
//                     <FaMapMarkedAlt className="mr-2" />
//                     Region
//                   </label>
//                   <Select
//                     id="region"
//                     name="region"
//                     options={filteredRegionOptions}
//                     value={selectedRegion}
//                     onChange={handleRegionChange}
//                     onInputChange={handleRegionInputChange}
//                     className="mt-1"
//                     placeholder="Select a region"
//                     inputValue={regionInputValue}
//                     noOptionsMessage={() => <NoOptionsMessage inputValue={regionInputValue} filteredOptions={filteredRegionOptions} />}
//                   />
//                   {messages.region && <p className="text-red-500 text-sm mt-1">{messages.region}</p>}
//                 </div>
//                 <div>
//                   <label htmlFor="name" className="flex items-center text-sm font-medium text-gray-700">
//                     <FaTag className="mr-2" />
//                     Name
//                   </label>
//                   <input
//                     id="name"
//                     name="name"
//                     type="text"
//                     value={currentFormData.name}
//                     onChange={handleInputChangeText}
//                     className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                     placeholder="Enter Name"
//                   />
//                   {messages.name && <p className="text-red-500 text-sm mt-1">{messages.name}</p>}
//                 </div>
//                 <div>
//                   <label htmlFor="mobileNumber" className="flex items-center text-sm font-medium text-gray-700">
//                     <FaPhone className="mr-2" />
//                     Mobile Number
//                   </label>
//                   <input
//                     id="mobileNumber"
//                     name="mobileNumber"
//                     type="text"
//                     value={currentFormData.mobileNumber}
//                     onChange={handleInputChangeText}
//                     className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                     placeholder="Enter mobile number"
//                   />
//                   {messages.mobileNumber && <p className="text-red-500 text-sm mt-1">{messages.mobileNumber}</p>}
//                 </div>
//                 <div>
//                   <label htmlFor="displayPhone" className="flex items-center text-sm font-medium text-gray-700">
//                     <FaPhone className="mr-2" />
//                     Display Phone
//                   </label>
//                   <input
//                     id="displayPhone"
//                     name="displayPhone"
//                     type="text"
//                     value={currentFormData.displayPhone}
//                     onChange={handleInputChangeText}
//                     className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                     placeholder="Enter display phone"
//                   />
//                   {messages.displayPhone && <p className="text-red-500 text-sm mt-1">{messages.displayPhone}</p>}
//                 </div>
//                 <div>
//                   <label htmlFor="locality" className="flex items-center text-sm font-medium text-gray-700">
//                     <FaMapSigns className="mr-2" />
//                     Locality
//                   </label>
//                   <input
//                     id="locality"
//                     name="locality"
//                     type="text"
//                     value={currentFormData.locality}
//                     onChange={handleInputChangeText}
//                     className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                     placeholder="Enter locality"
//                   />
//                   {messages.locality && <p className="text-red-500 text-sm mt-1">{messages.locality}</p>}
//                 </div>
//                 <div className="md:col-span-2">
//                   <label htmlFor="address" className="flex items-center text-sm font-medium text-gray-700">
//                     <FaAddressCard className="mr-2" />
//                     Address
//                   </label>
//                   <textarea
//                     id="address"
//                     name="address"
//                     rows="3"
//                     value={currentFormData.address}
//                     onChange={handleInputChangeText}
//                     className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                     placeholder="Enter address"
//                   />
//                   {messages.address && <p className="text-red-500 text-sm mt-1">{messages.address}</p>}
//                 </div>
//               </div>
//               <div className="flex justify-end mt-4">
//                 <button
//                   type="button"
//                   onClick={closeModal}
//                   className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
//                 >
//                   Cancel
//                 </button>
//                  {/* <button
//                   type="submit"
//                   className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//                 >
//                   {currentFormData.id ? "Update" : "Save"}
//                 </button>  */}

// <button
//   type="submit"
//   className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//   disabled={isSubmitting} // Disable the button when submitting

// >
//  {/* {isSubmitting ? "submiting" : currentFormData.id ? "Update" : "Save"} */}

//  {currentFormData.id ? "Update" : "Save"}
// </button>

//               </div>
//             </form>
//           </Modal>
//         </div>
//       </Draggable>
//     </>
//   );
// }

// export default MerchantFormModal;

// import React, { useState, useEffect } from "react";
// import Modal from "react-modal";
// import {
//   FaTimes,
//   FaMapMarkedAlt,
//   FaPhone,
//   FaBuilding,
//   FaAddressCard,
//   FaTag,
//   FaMapSigns,
// } from "react-icons/fa";
// import Select from "react-select";

// const NoOptionsMessage = ({ inputValue, filteredOptions }) => {
//   if (inputValue.length < 3) {
//     return (
//       <div className="p-1 text-gray-500">Enter 3 characters to search</div>
//     );
//   }
//   if (filteredOptions.length === 0) {
//     return <div className="p-1 text-gray-500">Data not found</div>;
//   }
//   return null;
// };

// function MerchantFormModal({
//   isOpen,
//   closeModal,
//   businessOptions,
//   regionOptions,
//   formData,
//   setFormData,
//   handleSubmit,
//   messages,
//   isSubmitting,
// }) {
//   const [selectedBusiness, setSelectedBusiness] = useState(null);
//   const [selectedRegion, setSelectedRegion] = useState(null);
//   const [inputValue, setInputValue] = useState("");
//   const [regionInputValue, setRegionInputValue] = useState("");
//   const [isDisable, setDisable] = useState(false);
//   const [filteredBusinessOptions, setFilteredBusinessOptions] =
//     useState(businessOptions);
//   const [filteredRegionOptions, setFilteredRegionOptions] =
//     useState(regionOptions);

//   useEffect(() => {
//     // Check if businessOptions and regionOptions are correctly set
//     console.log("Business Options:", businessOptions);
//     console.log("Region Options:", regionOptions);
//   }, [businessOptions, regionOptions]);

//   useEffect(() => {
//     console.log("Form Data>>>>>>>:", formData.business.name);
//   }, [formData]);

//   useEffect(() => {

//     // Initialize selected business and region with formData
//     if (formData.business.name) {
//       const businessOption = businessOptions.find(
//         (option) => option.value === formData.business.name
//       );
//       setDisable(true);
//       setSelectedBusiness(businessOption);
//     } else {
//       setSelectedBusiness(null);
//     }

//     if (formData.region) {
//       const regionOption = regionOptions.find(
//         (option) => option.value === formData.region.city
//       );
//       setDisable(true);
//       setSelectedRegion(regionOption);
//     } else {
//       setSelectedRegion(null);
//     }
//   }, [formData, businessOptions, regionOptions]);

//   useEffect(() => {
//     if (inputValue.length >= 3) {
//       const results = businessOptions.filter(
//         (option) =>
//           option.label &&
//           typeof option.label === "string" &&
//           option.label.toLowerCase().includes(inputValue.toLowerCase())
//       );
//       setFilteredBusinessOptions(results);
//     } else {
//       setFilteredBusinessOptions(businessOptions);
//     }
//   }, [inputValue, businessOptions]);

//   useEffect(() => {
//     if (regionInputValue.length >= 3) {
//       const results = regionOptions.filter(
//         (option) =>
//           option.label &&
//           typeof option.label === "string" &&
//           option.label.toLowerCase().includes(regionInputValue.toLowerCase())
//       );
//       setFilteredRegionOptions(results);
//     } else {
//       setFilteredRegionOptions(regionOptions);
//     }
//   }, [regionInputValue, regionOptions]);

//   const handleBusinessChange = (selectedOption) => {
//     setSelectedBusiness(selectedOption);
//     setFormData({
//       ...formData,
//       business: selectedOption ? selectedOption.value : "",
//     });
//   };

//   const handleRegionChange = (selectedOption) => {
//     setSelectedRegion(selectedOption);
//     setFormData({
//       ...formData,
//       region: selectedOption ? selectedOption.value : "",
//     });
//   };

//   const handleBusinessInputChange = (inputValue) => {
//     setInputValue(inputValue);
//   };

//   const handleRegionInputChange = (inputValue) => {
//     setRegionInputValue(inputValue);
//   };

//   const handleInputChangeText = (event) => {
//     const { name, value } = event.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const onSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       await handleSubmit(formData);
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }
//   };

//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={closeModal}
//       contentLabel="Merchant Form Modal"
//       className="relative w-full max-w-lg p-4 bg-white rounded-lg shadow-lg mx-2 sm:mx-4 md:mx-auto mt-40 lg:mt-20 md:mt-40 z-40"
//       overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center overflow-auto"
//     >
//       <button
//         onClick={closeModal}
//         className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-colors"
//         aria-label="Close"
//       >
//         <FaTimes className="w-6 h-6" />
//       </button>
//       <h2 className="text-lg font-semibold text-gray-800 mb-4">
//         {formData.id ? "Edit Merchant" : "Add New Merchant"}
//       </h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//           <div className="md:col-span-2 relative">
//             <label
//               htmlFor="business"
//               className="flex items-center text-sm font-medium text-gray-700"
//             >
//               <FaBuilding className="mr-2" />
//               Business
//             </label>
//             <Select
//               id="business"
//               name="business"
//               options={filteredBusinessOptions}
//               value={selectedBusiness}
//               onChange={handleBusinessChange}
//               onInputChange={handleBusinessInputChange}
//               className="mt-1"
//               placeholder="Select a business"
//               inputValue={inputValue}
//              // isDisabled={isDisable} // Make the select read-only
//               noOptionsMessage={() => (
//                 <NoOptionsMessage
//                   inputValue={inputValue}
//                   filteredOptions={filteredBusinessOptions}
//                 />
//               )}
//             />
//             {messages.business && (
//               <p className="text-red-500 text-sm mt-1">{messages.business}</p>
//             )}
//           </div>
//           <div className="md:col-span-2 relative">
//             <label
//               htmlFor="region"
//               className="flex items-center text-sm font-medium text-gray-700"
//             >
//               <FaMapMarkedAlt className="mr-2" />
//               Region
//             </label>
//             <Select
//               id="region"
//               name="region"
//               options={filteredRegionOptions}
//               value={selectedRegion}
//               onChange={handleRegionChange}
//               onInputChange={handleRegionInputChange}
//               className="mt-1"
//               placeholder="Select a region"
//               inputValue={regionInputValue}
//              // isDisabled={isDisable} // Make the select read-only
//               noOptionsMessage={() => (
//                 <NoOptionsMessage
//                   inputValue={regionInputValue}
//                   filteredOptions={filteredRegionOptions}
//                 />
//               )}
//             />
//             {messages.region && (
//               <p className="text-red-500 text-sm mt-1">{messages.region}</p>
//             )}
//           </div>
//           <div>
//             <label
//               htmlFor="name"
//               className="flex items-center text-sm font-medium text-gray-700"
//             >
//               <FaTag className="mr-2" />
//               Name
//             </label>
//             <input
//               id="name"
//               name="name"
//               type="text"
//               value={formData.name || ""}
//               onChange={handleInputChangeText}
//               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               placeholder="Enter Name"
//               disabled={formData.id !== undefined} // Disable input if editing
//             />
//             {messages.name && (
//               <p className="text-red-500 text-sm mt-1">{messages.name}</p>
//             )}
//           </div>
//           <div>
//             <label
//               htmlFor="mobileNumber"
//               className="flex items-center text-sm font-medium text-gray-700"
//             >
//               <FaPhone className="mr-2" />
//               Mobile Number
//             </label>
//             <input
//               id="mobileNumber"
//               name="mobileNumber"
//               type="text"
//               value={formData.mobileNumber || ""}
//               onChange={handleInputChangeText}
//               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               placeholder="Enter mobile number"
//               disabled={formData.id !== undefined} // Disable input if editing
//             />
//             {messages.mobileNumber && (
//               <p className="text-red-500 text-sm mt-1">
//                 {messages.mobileNumber}
//               </p>
//             )}
//           </div>
//           <div>
//             <label
//               htmlFor="displayPhone"
//               className="flex items-center text-sm font-medium text-gray-700"
//             >
//               <FaPhone className="mr-2" />
//               Display Phone
//             </label>
//             <input
//               id="displayPhone"
//               name="displayPhone"
//               type="text"
//               value={formData.displayPhone || ""}
//               onChange={handleInputChangeText}
//               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               placeholder="Enter display phone"
//               disabled={formData.id !== undefined} // Disable input if editing
//             />
//             {messages.displayPhone && (
//               <p className="text-red-500 text-sm mt-1">
//                 {messages.displayPhone}
//               </p>
//             )}
//           </div>
//           <div>
//             <label
//               htmlFor="locality"
//               className="flex items-center text-sm font-medium text-gray-700"
//             >
//               <FaMapSigns className="mr-2" />
//               Locality
//             </label>
//             <input
//               id="locality"
//               name="locality"
//               type="text"
//               value={formData.locality || ""}
//               onChange={handleInputChangeText}
//               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               placeholder="Enter locality"
//               disabled={formData.id !== undefined} // Disable input if editing
//             />
//             {messages.locality && (
//               <p className="text-red-500 text-sm mt-1">{messages.locality}</p>
//             )}
//           </div>
//           <div className="md:col-span-2">
//             <label
//               htmlFor="address"
//               className="flex items-center text-sm font-medium text-gray-700"
//             >
//               <FaAddressCard className="mr-2" />
//               Address
//             </label>
//             <textarea
//               id="address"
//               name="address"
//               rows="3"
//               value={formData.address || ""}
//               onChange={handleInputChangeText}
//               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               placeholder="Enter address"
//               disabled={formData.id !== undefined} // Disable textarea if editing
//             />
//             {messages.address && (
//               <p className="text-red-500 text-sm mt-1">{messages.address}</p>
//             )}
//           </div>
//         </div>
//         <div className="flex justify-end mt-4">
//           <button
//             type="button"
//             onClick={closeModal}
//             className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//             disabled={isSubmitting} // Disable the button when submitting
//           >
//             {formData.id ? "Update" : "Save"}
//           </button>
//         </div>
//       </form>
//     </Modal>
//   );
// }

// export default MerchantFormModal;


import React, { useState, useEffect, useRef } from 'react';
import Draggable from 'react-draggable';
import Modal from 'react-modal';
import { FaTimes, FaMapMarkedAlt, FaPhone, FaBuilding, FaAddressCard, FaTag, FaMapSigns } from "react-icons/fa";
import Select from 'react-select';

const NoOptionsMessage = ({ inputValue, filteredOptions }) => {
  if (inputValue.length < 3) {
    return <div className="p-1 text-gray-500">Enter 3 characters to search</div>;
  }
  if (filteredOptions.length === 0) {
    return <div className="p-1 text-gray-500">Data not found</div>;
  }
  return null;
};

function MerchantFormModal({ isOpen, closeModal, businessOptions, regionOptions, formData, setFormData, handleSubmit, messages, isSubmitting }) {
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [filteredBusinessOptions, setFilteredBusinessOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const [selectedRegion, setSelectedRegion] = useState(null);
  const [filteredRegionOptions, setFilteredRegionOptions] = useState([]);
  const [regionInputValue, setRegionInputValue] = useState('');

  const [isDisabled, setDisabled] = useState(false);

  const inputRefs = useRef({}); // Ref to hold input field references

  const defaultFormData = {
    business: '',
    mobileNumber: '',
    displayPhone: '',
    region: '',
    locality: '',
    address: '',
    category: ''
  };

  const currentFormData = { ...defaultFormData, ...formData };

  useEffect(() => {
    if (currentFormData.id) {
      setSelectedBusiness(businessOptions.find(option => option.label === currentFormData.business.name));
      setDisabled(true);
    } else {
      setDisabled(false);
      setSelectedBusiness(null);
    }
  }, [currentFormData.id, businessOptions]);

  useEffect(() => {
   // setSelectedRegion(regionOptions.find(option => option.label === currentFormData.region.city));
    if (currentFormData.id) {
      setSelectedRegion(regionOptions.find(option => option.label === currentFormData.region.city));
      setDisabled(true);
    } else {
      setDisabled(false);
      setSelectedRegion(null);
    }
  }, [currentFormData.id, regionOptions]);

  useEffect(() => {
    if (inputValue.length >= 3) {
      const results = businessOptions.filter(option => {
        return option.label && typeof option.label === 'string' && option.label.toLowerCase().includes(inputValue.toLowerCase());
      });
      setFilteredBusinessOptions(results);
    } else {
      setFilteredBusinessOptions([]);
    }
  }, [inputValue, businessOptions]);

  useEffect(() => {
    if (regionInputValue.length >= 3) {
      const results = regionOptions.filter(option => {
        return option.label && typeof option.label === 'string' && option.label.toLowerCase().includes(regionInputValue.toLowerCase());
      });
      setFilteredRegionOptions(results);
    } else {
      setFilteredRegionOptions([]);
    }
  }, [regionInputValue, regionOptions]);

  const handleInputChangeText = (event) => {
    const { name, value } = event.target;
    setFormData({ ...currentFormData, [name]: value });
  };

  const handleBusinessChange = (selectedOption) => {
    setSelectedBusiness(selectedOption);
    setFormData({ ...currentFormData, business: selectedOption ? selectedOption.value : '' });
  };

  const handleRegionChange = (selectedOption) => {
    setSelectedRegion(selectedOption);
    setFormData({ ...currentFormData, region: selectedOption ? selectedOption.value : '' });
  };

  const handleBusinessInputChange = (inputValue) => {
    setInputValue(inputValue);
  };

  const handleRegionInputChange = (inputValue) => {
    setRegionInputValue(inputValue);
  };

  const handleFocus = (fieldName) => {
    if (messages[fieldName]) {
      // Clear error message
      dispatch({
        type: "SET_MESSAGES",
        payload: { [fieldName]: "" }
      });
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    // setIsSubmitting(true); // Set submitting state to true

    try {
      await handleSubmit(currentFormData); // Call the passed handleSubmit function
      // setIsSubmitting(true);
    } catch (error) {
      // Handle submission error if needed
    } finally {
      // setIsSubmitting(false); // Reset submitting state
    }
  };

  return (
    <>
      <Draggable handle=".drag-handle">
        <div>
          <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Merchant Form Modal"
            className="relative w-full max-w-lg p-4 bg-white rounded-lg shadow-lg mx-2 sm:mx-4 md:mx-auto mt-40 lg:mt-20 md:mt-40 z-40"
            overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center overflow-auto"
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Close"
            >
              <FaTimes className="w-6 h-6" />
            </button>
            <div className="drag-handle cursor-move mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                {currentFormData.id ? "Edit Merchant" : "Add New Merchant"}
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className='md:col-span-2 relative'>
                  <label htmlFor="business" className="flex items-center text-sm font-medium text-gray-700">
                    <FaBuilding className="mr-2" />
                    Business
                  </label>
                  <Select
                    id="business"
                    name="business"
                    options={filteredBusinessOptions}
                    value={selectedBusiness}
                    onChange={handleBusinessChange}
                    onInputChange={handleBusinessInputChange}
                    className="mt-1"
                    placeholder="Select a business"
                    inputValue={inputValue}
                    isDisabled={isDisabled}
                    noOptionsMessage={() => <NoOptionsMessage inputValue={inputValue} filteredOptions={filteredBusinessOptions} />}
                  />
                   <input
                  id="business_"
                 type="hidden"
                  name="business"
                  value={selectedBusiness ? selectedBusiness.value : ""}
                />
                  {messages.business && <p className="text-red-500 text-sm mt-1">{messages.business}</p>}
                </div>
                <div className='md:col-span-2 relative'>
                  <label htmlFor="region" className="flex items-center text-sm font-medium text-gray-700">
                    <FaMapMarkedAlt className="mr-2" />
                    Region
                  </label>
                  <Select
                    id="region"
                    name="region"
                    options={filteredRegionOptions}
                    value={selectedRegion}
                    onChange={handleRegionChange}
                    onInputChange={handleRegionInputChange}
                    className="mt-1"
                    placeholder="Select a region"
                    inputValue={regionInputValue}
                    isDisabled={isDisabled}
                    noOptionsMessage={() => <NoOptionsMessage inputValue={regionInputValue} filteredOptions={filteredRegionOptions} />}
                  />
                   <input
                  id="region_"
                  type="hidden"
                  name="region"
                  value={selectedRegion ? selectedRegion.value : ""}
                />
                  {messages.region && <p className="text-red-500 text-sm mt-1">{messages.region}</p>}
                </div>
                <div>
                  <label htmlFor="name" className="flex items-center text-sm font-medium text-gray-700">
                    <FaTag className="mr-2" />
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={currentFormData.name}
                    onChange={handleInputChangeText}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter Name"
                  />
                  {messages.name && <p className="text-red-500 text-sm mt-1">{messages.name}</p>}
                </div>
                <div>
                  <label htmlFor="mobileNumber" className="flex items-center text-sm font-medium text-gray-700">
                    <FaPhone className="mr-2" />
                    Mobile Number
                  </label>
                  <input
                    id="mobileNumber"
                    name="mobileNumber"
                    type="text"
                    value={currentFormData.mobileNumber}
                    onChange={handleInputChangeText}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter mobile number"
                  />
                  {messages.mobileNumber && <p className="text-red-500 text-sm mt-1">{messages.mobileNumber}</p>}
                </div>
                <div>
                  <label htmlFor="displayPhone" className="flex items-center text-sm font-medium text-gray-700">
                    <FaPhone className="mr-2" />
                    Display Phone
                  </label>
                  <input
                    id="displayPhone"
                    name="displayPhone"
                    type="text"
                    value={currentFormData.displayPhone}
                    onChange={handleInputChangeText}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter Display Phone"
                  />
                  {messages.displayPhone && <p className="text-red-500 text-sm mt-1">{messages.displayPhone}</p>}
                </div>
                <div>
                  <label htmlFor="locality" className="flex items-center text-sm font-medium text-gray-700">
                    <FaMapSigns className="mr-2" />
                    Locality
                  </label>
                  <input
                    id="locality"
                    name="locality"
                    type="text"
                    value={currentFormData.locality}
                    onChange={handleInputChangeText}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter Locality"
                  />
                  {messages.locality && <p className="text-red-500 text-sm mt-1">{messages.locality}</p>}
                </div>
                <div className='md:col-span-2'>
                  <label htmlFor="address" className="flex items-center text-sm font-medium text-gray-700">
                    <FaAddressCard className="mr-2" />
                    Address
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    value={currentFormData.address}
                    onChange={handleInputChangeText}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter address"
                  />
                  {messages.address && <p className="text-red-500 text-sm mt-1">{messages.address}</p>}
                </div>
              </div>
              <div className="flex justify-end mt-4">
                {/* <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`${
                    isSubmitting
                      ? "bg-gray-400"
                      : "bg-blue-500 hover:bg-blue-600"
                  } text-white font-semibold py-2 px-4 rounded`}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button> */}
                           <button
            type="submit"
            className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            disabled={isSubmitting} // Disable the button when submitting
          >
            {formData.id ? "Update" : "Save"}
          </button>
              </div>
              {messages.modal && (
              <div className={`mt-4 p-4 text-xs ${messages.modal.startsWith('Error') ? 'text-red-600 bg-red-100' : 'text-green-600 bg-green-100'} border rounded-md`}>
                <p>{messages.modal}</p>
              </div>
            )}
            </form>
          </Modal>
        </div>
      </Draggable>
    </>
  );
}

export default MerchantFormModal;
