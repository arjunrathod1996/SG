// import React, { useReducer, useState, useEffect } from 'react';
// import MerchantFormModal from '../modal/MerchantFormModal';
// import ActionButtons from '../common/ActionButtons';
// import BusinessService from '../service/BusinessService';

// const initialState = {
//     merchant: {
//         id: "",
//         name: "",
//         city: "",
//         zone: "",
//         country: {}
//     },
//     messages: {
//         general: "",
//         state: "",
//         city: "",
//         zone: "",
//         modal: ""
//     }
// };

// function reducer(state, action) {
//     console.log("Action dispatched:", action);
//     switch (action.type) {
//         case "SET_REGION":
//             return { ...state, region: { ...state.region, ...action.payload } };
//         case "SET_MESSAGES":
//             return { ...state, messages: { ...state.messages, ...action.payload } };
//         case "RESET":
//             return initialState;
//         default:
//             return state;
//     }
// }

// function MerchantPage() {
//     const [merchants, setMerchants] = useState([]);
//     const [modalIsOpen, setModalIsOpen] = useState(false);
//     const [businessOptions, setBusinessOptions] = useState([]);

//     const [state, dispatch] = useReducer(reducer, initialState);

//     const fetchBusiness = async () => {
//         try {
//             const fetchedBusiness = await BusinessService.searchBusiness();
//             setBusinessOptions(fetchedBusiness.map(business => ({
//                 value: business.id,
//                 label: business.name,
//             })));
//         } catch (error) {
//             console.error("Error loading businesses:", error);
//         }
//     };

//     useEffect(() => {
//         fetchBusiness();
//     }, []);

//     const openModal = () => {
//         setModalIsOpen(true);
//         document.body.style.overflow = "hidden";
//     };

//     const closeModal = () => {
//         setModalIsOpen(false);
//         document.body.style.overflow = "auto";
//         dispatch({ type: "RESET" });
//     };

//     const handleEdit = (selectedRow) => {
//         if (!selectedRow) {
//             dispatch({
//                 type: "SET_MESSAGES",
//                 payload: { general: "Please select a region to edit." }
//             });
//             return;
//         }
//         dispatch({ type: "SET_REGION", payload: selectedRow });
//         openModal();
//         console.log("Editing row:", selectedRow);
//     };

//     const handleFormSubmit = (formData) => {
//         // Handle form submission logic here
//         console.log("Form submitted with data:", formData);
//         // Close the modal and reset state
//         closeModal();
//     };

//     return (
//         <>
//             <div className="p-3 lg:ml-64 z-10 static mt-7">
//                 <h1 className="text-2xl font-bold text-gray-300 uppercase mt-8 mb-2 z-0">
//                     Merchant
//                 </h1>
//                 <ActionButtons openModal={openModal} handleEdit={handleEdit} />
//                 <MerchantFormModal 
//                     isOpen={modalIsOpen}
//                     closeModal={closeModal}
//                     businessOptions={businessOptions}
//                     formData={state.region}
//                     setFormData={(data) => dispatch({ type: "SET_REGION", payload: data })}
//                     handleSubmit={handleFormSubmit}
//                 />
//             </div>
//         </>
//     );
// }

// export default MerchantPage;


// import React, { useReducer, useState, useEffect } from 'react';
// import MerchantFormModal from '../modal/MerchantFormModal';
// import ActionButtons from '../common/ActionButtons';
// import BusinessService from '../service/BusinessService';
// import LocationService from '../service/LocationService';

// const initialState = {
//     merchant: {
//         id: '',
//         name: '',
//         mobileNumber: '',
//         displayPhone: '',
//         locality: '',
//         address: '',
//         zone: '',
//         business: '',
//         region: ''
//     },
//     messages: {
//         general: "",
//         name: '',
//         mobileNumber: '',
//         displayPhone: '',
//         locality: '',
//         address: '',
//         zone: '',
//         business: '',
//         region: '',
//         modal: ""
//     }
// };

// function reducer(state, action) {
//     switch (action.type) {
//         case "SET_MERCHANT":
//             return { ...state, merchant: { ...state.merchant, ...action.payload } };
//         case "SET_MESSAGES":
//             return { ...state, messages: { ...state.messages, ...action.payload } };
//         case "RESET":
//             return initialState;
//         default:
//             return state;
//     }
// }

// function MerchantPage() {
//     const [merchants, setMerchants] = useState([]);
//     const [modalIsOpen, setModalIsOpen] = useState(false);
//     const [businessOptions, setBusinessOptions] = useState([]);
//     const [regionOptions, setRegionOptions] = useState([]);

//     const [state, dispatch] = useReducer(reducer, initialState);

//     const fetchBusiness = async () => {
//         try {
//             const fetchedBusiness = await BusinessService.searchBusiness();
//             setBusinessOptions(fetchedBusiness.map(business => ({
//                 value: business.id,
//                 label: business.name,
//             })));
//         } catch (error) {
//             console.error("Error loading businesses:", error);
//         }
//     };

//     const fetchRegions = async () => {
//       try {
//           const response = await LocationService.searchRegion();
//           const regions = response.data || []; // Default to an empty array if no data
  
//           console.log("Fetched regions:", regions);
  
//           setRegionOptions(regions.map(region => ({
//               value: region.id,
//               label: region.city,
//           })));
//       } catch (error) {
//           console.error("Error loading regions:", error);
//       }
//   };
  
  

//     useEffect(() => {
//         fetchBusiness();
//         fetchRegions();
//     }, []);

//     const openModal = () => {
//         setModalIsOpen(true);
//         document.body.style.overflow = "hidden";
//     };

//     const closeModal = () => {
//         setModalIsOpen(false);
//         document.body.style.overflow = "auto";
//         dispatch({ type: "RESET" });
//     };

//     const handleEdit = (selectedRow) => {
//         if (!selectedRow) {
//             dispatch({
//                 type: "SET_MESSAGES",
//                 payload: { general: "Please select a region to edit." }
//             });
//             return;
//         }
//         dispatch({ type: "SET_MERCHANT", payload: selectedRow });
//         openModal();
//     };

//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       console.log("Form submitted:", state.merchant);
  
//       let valid = true;
//       let newMessages = {
//         business: "",
//         region: "",
//         category: "",
//         mobileNumber: "",
//         displayPhone: "",
//         locality: "",
//         address: "",
//         modal: "",
//       };
  
//       // Validation
//       if (!state.merchant.business) {
//         valid = false;
//         newMessages.business = "Please select a business.";
//       }
//       if (!state.merchant.region) {
//         valid = false;
//         newMessages.region = "Please select a region.";
//       }
//       if (!state.merchant.category) {
//         valid = false;
//         newMessages.category = "Please enter a name.";
//       }
//       if (!state.merchant.mobileNumber) {
//         valid = false;
//         newMessages.mobileNumber = "Please enter a mobile number.";
//       }
//       if (!state.merchant.displayPhone) {
//         valid = false;
//         newMessages.displayPhone = "Please enter a display phone.";
//       }
//       if (!state.merchant.locality) {
//         valid = false;
//         newMessages.locality = "Please enter a locality.";
//       }
//       if (!state.merchant.address) {
//         valid = false;
//         newMessages.address = "Please enter an address.";
//       }
  
//       if (!valid) {
//         dispatch({ type: "SET_MESSAGES", payload: newMessages });
//         return;
//       }
  
//       try {
//         // Check if it's an update or create operation
//         if (state.merchant.id) {
//           // Update operation
//           await MerchantService.updateMerchant(state.merchant); // Adjust this to your actual update method
//         } else {
//           // Create operation
//           await MerchantService.createMerchant(state.merchant); // Adjust this to your actual create method
//         }
  
//         newMessages.modal = "Successfully saved data.";
//         dispatch({ type: "SET_MESSAGES", payload: newMessages });
//         console.log("Data saved successfully");
//         setTimeout(closeModal, 8000);
//         // Optionally, fetch updated data or refresh the list
//         // fetchData(currentPage, rowsPerPage); // Adjust if needed
//       } catch (error) {
//         console.error("Error saving/updating merchant:", error);
//         newMessages.modal = "Error saving/updating merchant. Please try again.";
//         dispatch({ type: "SET_MESSAGES", payload: newMessages });
//       }
//     };
  

//     return (
//         <div className="p-3 lg:ml-64 z-10 static mt-7">
//             <h1 className="text-2xl font-bold text-gray-300 uppercase mt-8 mb-2 z-0">
//                 Merchant
//             </h1>
//             <ActionButtons openModal={openModal} handleEdit={handleEdit} />
//             {/* <MerchantFormModal 
//                 isOpen={modalIsOpen}
//                 closeModal={closeModal}
//                 businessOptions={businessOptions}
//                 regionOptions={regionOptions} // Pass region options
//                 formData={state.merchant}
//                 setFormData={(data) => dispatch({ type: "SET_MERCHANT", payload: data })}
//                 handleSubmit={handleSubmit}
//             /> */}

//             <MerchantFormModal 
//                 isOpen={modalIsOpen}
//                 closeModal={closeModal}
//                 businessOptions={businessOptions}
//                 regionOptions={regionOptions} // Pass region options
//                 formData={state.merchant}
//                 setFormData={(data) => dispatch({ type: "SET_MERCHANT", payload: data })}
//                 handleSubmit={handleSubmit}
//                 messages={state.messages} // Pass messages
//             />

//         </div>
//     );
// }

// export default MerchantPage;


// import React, { useReducer, useState, useEffect } from 'react';
// import MerchantFormModal from '../modal/MerchantFormModal';
// import ActionButtons from '../common/ActionButtons';
// import BusinessService from '../service/BusinessService';
// import LocationService from '../service/LocationService';
// import MerchantService from '../service/MerchantService'; // Make sure this is imported
// import DataTable from 'react-data-table-component';
// import api from '../api/api';
// import MessageDisplay from '../common/MessageModalDisplay';

// const initialState = {
//     merchant: {
//         id: '',
//         name: '',
//         mobileNumber: '',
//         displayPhone: '',
//         locality: '',
//         address: '',
//         zone: '',
//         business: '',
//         region: ''
//     },
//     messages: {
//         general: "",
//         name: '',
//         mobileNumber: '',
//         displayPhone: '',
//         locality: '',
//         address: '',
//         zone: '',
//         business: '',
//         region: '',
//         modal: ""
//     }
// };
// const customStyles = {
//   headCells: {
//     style: {
//       backgroundColor: "#f1f5f9",
//     },
//   },
// };

// function reducer(state, action) {
//     switch (action.type) {
//         case "SET_MERCHANT":
//             return { ...state, merchant: { ...state.merchant, ...action.payload } };
//         case "SET_MESSAGES":
//             return { ...state, messages: { ...state.messages, ...action.payload } };
//         case "RESET":
//             return initialState;
//         default:
//             return state;
//     }
// }

// function MerchantPage() {
//     const [merchants, setMerchants] = useState([]);
//     const [modalIsOpen, setModalIsOpen] = useState(false);
//     const [businessOptions, setBusinessOptions] = useState([]);
//     const [regionOptions, setRegionOptions] = useState([]);
//     const [isSubmitting, setIsSubmitting] = useState(false); // New state for submission status
//     const [currentPage, setCurrentPage] = useState(1);
//     const [rowsPerPage, setRowsPerPage] = useState(10);
//     const [selectedRow, setSelectedRow] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [totalRows, setTotalRows] = useState(0);
//     const [data, setData] = useState([]);

//     useEffect(() => {
//       fetchData(currentPage, rowsPerPage);
//     }, [currentPage, rowsPerPage]);
  

//     const [state, dispatch] = useReducer(reducer, initialState);

//     const fetchBusiness = async () => {
//         try {
//             const fetchedBusiness = await BusinessService.searchBusiness();
//             setBusinessOptions(fetchedBusiness.map(business => ({
//                 value: business.id,
//                 label: business.name,
//             })));
//         } catch (error) {
//             console.error("Error loading businesses:", error);
//         }
//     };

//     const fetchRegions = async () => {
//         try {
//             const response = await LocationService.searchRegion();
//             const regions = response.data || []; // Default to an empty array if no data
  
//             console.log("Fetched regions:", regions);
  
//             setRegionOptions(regions.map(region => ({
//                 value: region.id,
//                 label: region.city,
//             })));
//         } catch (error) {
//             console.error("Error loading regions:", error);
//         }
//     };

//     useEffect(() => {
//         fetchBusiness();
//         fetchRegions();
//     }, []);

//     const openModal = () => {
//         setModalIsOpen(true);
//         document.body.style.overflow = "hidden";
//     };

  

//     const handleEdit = (selectedRow) => {
//         if (!selectedRow) {
//             dispatch({
//                 type: "SET_MESSAGES",
//                 payload: { general: "Please select a merchant to edit." }
//             });
//             return;
//         }
//         dispatch({ type: "SET_MERCHANT", payload: selectedRow });
//         openModal();
//     };

//     const handleSubmit = async (e) => {
//       e.preventDefault(); // Make sure e is an event object
//       setIsSubmitting(true); // Disable the button
  
//       console.log("Form submitted:", state.merchant);
  
//       let valid = true;
//       let newMessages = {
//           business: "",
//           region: "",
//           name: "",
//           mobileNumber: "",
//           displayPhone: "",
//           locality: "",
//           address: "",
//           modal: "",
//       };
  
//       // Validation
//       if (!state.merchant.business) {
//           valid = false;
//           newMessages.business = "Please select a business.";
//       }
//       if (!state.merchant.region) {
//           valid = false;
//           newMessages.region = "Please select a region.";
//       }
//       if (!state.merchant.name) {
//           valid = false;
//           newMessages.name = "Please enter a name.";
//       }
//       if (!state.merchant.mobileNumber) {
//           valid = false;
//           newMessages.mobileNumber = "Please enter a mobile number.";
//       }
//       if (!state.merchant.displayPhone) {
//           valid = false;
//           newMessages.displayPhone = "Please enter a display phone.";
//       }
//       if (!state.merchant.locality) {
//           valid = false;
//           newMessages.locality = "Please enter a locality.";
//       }
//       if (!state.merchant.address) {
//           valid = false;
//           newMessages.address = "Please enter an address.";
//       }
  
//       if (!valid) {
//           dispatch({ type: "SET_MESSAGES", payload: newMessages });
//           setIsSubmitting(false); // Re-enable the button
//           return;
//       }
  
//       try {
//         const { id, business, region } = state.merchant;
//         const formattedMerchant = {
//             ...state.merchant,
//             business: { id: business },  // Format business field
//             region: { id: region }       // Format region field
//         };

//         await MerchantService.saveMerchant(
//             formattedMerchant,
//             id || null,
//             business,
//             region
//         );
          
//           newMessages.modal = "Successfully saved data.";
//           dispatch({ type: "SET_MESSAGES", payload: newMessages });
  
//           console.log("Data saved successfully");
//           setIsSubmitting(true); // Disable the button after successful submission
//           setTimeout(closeModal, 8000);
//       } catch (error) {
//           console.error("Error saving/updating merchant:", error);
//           newMessages.modal = "Error saving/updating merchant. Please try again.";
//           dispatch({ type: "SET_MESSAGES", payload: newMessages });
//       } finally {
//           setIsSubmitting(false); // Re-enable the button
//       }
//   };
  

//   const closeModal = () => {
//     setModalIsOpen(false);
//     document.body.style.overflow = "auto"; // Restore body scroll
//     dispatch({ type: "RESET" });
//     setIsSubmitting(false); // Reset the submitting state
// };


//   useEffect(() => {
//     let timer;
//     if (state.messages.modal) {
//       timer = setTimeout(() => {
//         closeModal();
//       }, 3000);
//     }
//     return () => clearTimeout(timer);
//   }, [state.messages.modal]);


//   const fetchData = async (page = 1, size = 10) => {
//     setLoading(true);
//     try {
//       const response = await api.get("/merchantPageWise", {
//         params: {
//           page: page - 1,
//           size,
//           sort: "id,desc",
//         },
//       });
//       setData(response.data.content);
//       setTotalRows(response.data.totalElements);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//     setLoading(false);
//   };

//   const handleRowSelected = (row) => {
//     if (selectedRow && selectedRow.id === row.id) {
//       setSelectedRow(null);
//       console.log("Row deselected:", row);
//     } else {
//       setSelectedRow(row);
//       console.log("Row selected:", row);
//     }
//   };

//   const isRowSelected = (row) => {
//     return selectedRow && selectedRow.id === row.id;
//   };

//   const columns = [
//     {
//       name: "Select",
//       cell: (row) => (
//         <input
//           type="checkbox"
//           checked={isRowSelected(row)}
//           onChange={() => handleRowSelected(row)}
//           style={{ cursor: 'pointer' }}
//         />
//       ),
//       ignoreRowClick: true
//     },
//     {
//       name: "name",
//       selector: (row) => row.name,
//       sortable: true
//     },
//     {
//       name: "Date",
//       selector: (row) => row.creationTime,
//       sortable: true
//     }
//   ];

  

//     return (
//         <div className="p-3 lg:ml-64 z-10 static mt-7">
//           <MessageDisplay message={state.messages.general} />
//             <h1 className="text-2xl font-bold text-gray-300 uppercase mt-8 mb-2 z-0">
//                 Merchant
//             </h1>
//             <ActionButtons openModal={openModal} handleEdit={handleEdit} />
//             <div className="overflow-x-auto">
//             <DataTable
//               columns={columns}
//               data={data}
//               progressPending={loading}
//               pagination
//               paginationServer
//               paginationTotalRows={totalRows}
//               paginationComponentOptions={{
//                 noRowsPerPage: true
//               }}
//               onChangePage={(page) => setCurrentPage(page)}
//               customStyles={customStyles}
//             />
//           </div>
//             <MerchantFormModal 
//                 isOpen={modalIsOpen}
//                 closeModal={closeModal}
//                 businessOptions={businessOptions}
//                 regionOptions={regionOptions}
//                 formData={state.merchant}
//                 setFormData={(data) => dispatch({ type: "SET_MERCHANT", payload: data })}
//                 handleSubmit={handleSubmit}
//                 messages={state.messages} // Pass messages
//                 isSubmitting={isSubmitting}
//             />
//         </div>
//     );
// }

// export default MerchantPage;


import React, { useReducer, useState, useEffect } from 'react';
import MerchantFormModal from '../modal/MerchantFormModal';
import ActionButtons from '../common/ActionButtons';
import BusinessService from '../service/BusinessService';
import LocationService from '../service/LocationService';
import MerchantService from '../service/MerchantService'; // Make sure this is imported
import DataTable from 'react-data-table-component';
import api from '../api/api';
import MessageDisplay from '../common/MessageModalDisplay';

const initialState = {
    merchant: {
        id: '',
        name: '',
        mobileNumber: '',
        displayPhone: '',
        locality: '',
        address: '',
        zone: '',
        business: '',
        region: ''
    },
    messages: {
        general: "",
        name: '',
        mobileNumber: '',
        displayPhone: '',
        locality: '',
        address: '',
        zone: '',
        business: '',
        region: '',
        modal: ""
    }
};

const customStyles = {
    headCells: {
        style: {
            backgroundColor: "#f1f5f9",
        },
    },
};

function reducer(state, action) {
    switch (action.type) {
        case "SET_MERCHANT":
            return { ...state, merchant: { ...state.merchant, ...action.payload } };
        case "SET_MESSAGES":
            return { ...state, messages: { ...state.messages, ...action.payload } };
        case "RESET":
            return initialState;
        default:
            return state;
    }
}

function MerchantPage() {
    const [merchants, setMerchants] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [businessOptions, setBusinessOptions] = useState([]);
    const [regionOptions, setRegionOptions] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false); // New state for submission status
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selectedRow, setSelectedRow] = useState(null);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData(currentPage, rowsPerPage);
    }, [currentPage, rowsPerPage]);

    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchBusiness = async () => {
        try {
            const fetchedBusiness = await BusinessService.searchBusiness();
            setBusinessOptions(fetchedBusiness.map(business => ({
                value: business.id,
                label: business.name,
            })));
        } catch (error) {
            console.error("Error loading businesses:", error);
        }
    };

    const fetchRegions = async () => {
        try {
            const response = await LocationService.searchRegion();
            const regions = response.data || []; // Default to an empty array if no data

            console.log("Fetched regions:", regions);

            setRegionOptions(regions.map(region => ({
                value: region.id,
                label: region.city,
            })));
        } catch (error) {
            console.error("Error loading regions:", error);
        }
    };

    useEffect(() => {
        fetchBusiness();
        fetchRegions();
    }, []);

    const openModal = () => {
        setModalIsOpen(true);
        document.body.style.overflow = "hidden";
    };

    const closeModal = () => {
        setModalIsOpen(false);
        document.body.style.overflow = "auto"; // Restore body scroll
        dispatch({ type: "RESET" });
        setIsSubmitting(false); // Reset the submitting state
    };

    const handleEdit = (row) => {
        if (!row) {
            dispatch({
                type: "SET_MESSAGES",
                payload: { general: "Please select a merchant to edit." }
            });
            return;
        }
        dispatch({ type: "SET_MERCHANT", payload: row });
        openModal();
    };

    const handleEditButtonClick = () => {
        if (!selectedRow) {
            dispatch({
                type: "SET_MESSAGES",
                payload: { general: "Please select a merchant to edit." }
            });
            return;
        }
        handleEdit(selectedRow);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Make sure e is an event object
        setIsSubmitting(true); // Disable the button
    
        let valid = true;
        let newMessages = {
            business: "",
            region: "",
            name: "",
            mobileNumber: "",
            displayPhone: "",
            locality: "",
            address: "",
            modal: "",
        };
    
        // Validation
        if (!state.merchant.business) {
            valid = false;
            newMessages.business = "Please select a business.";
        }
        if (!state.merchant.region) {
            valid = false;
            newMessages.region = "Please select a region.";
        }
        if (!state.merchant.name) {
            valid = false;
            newMessages.name = "Please enter a name.";
        }
        if (!state.merchant.mobileNumber) {
            valid = false;
            newMessages.mobileNumber = "Please enter a mobile number.";
        }
        if (!state.merchant.displayPhone) {
            valid = false;
            newMessages.displayPhone = "Please enter a display phone.";
        }
        if (!state.merchant.locality) {
            valid = false;
            newMessages.locality = "Please enter a locality.";
        }
        if (!state.merchant.address) {
            valid = false;
            newMessages.address = "Please enter an address.";
        }
    
        if (!valid) {
            dispatch({ type: "SET_MESSAGES", payload: newMessages });
            setIsSubmitting(false); // Re-enable the button
            return;
        }
    
        try {
            const { id, business, region } = state.merchant;
    
            const formattedMerchant = {
                ...state.merchant,
                business: { id: business.id || business },  // Handle both ID and object
                region: { id: region.id || region }         // Handle both ID and object
            };
    
            console.log("Merchant ID:", id);
            console.log("Business ID:", business.id || business);
            console.log("Region ID:", region.id || region);
    
            await MerchantService.saveMerchant(
                formattedMerchant,
                id || null,
                business.id || business,  // Pass business ID
                region.id || region       // Pass region ID
            );
    
            newMessages.modal = "Successfully saved data.";
            dispatch({ type: "SET_MESSAGES", payload: newMessages });
    
            console.log("Data saved successfully");
            setIsSubmitting(false); // Re-enable the button
    
            // Refetch data to include the new or updated merchant
            fetchData(currentPage, rowsPerPage);
    
            setTimeout(closeModal, 3000);
        } catch (error) {
            console.error("Error saving/updating merchant:", error);
            newMessages.modal = "Error saving/updating merchant. Please try again.";
            dispatch({ type: "SET_MESSAGES", payload: newMessages });
        } finally {
            setIsSubmitting(false); // Re-enable the button
        }
    };
    
    
    

    useEffect(() => {
        let timer;
        if (state.messages.modal) {
            timer = setTimeout(() => {
                closeModal();
            }, 3000);
        }
        return () => clearTimeout(timer);
    }, [state.messages.modal]);

    const fetchData = async (page = 1, size = 10) => {
        setLoading(true);
        try {
            const response = await api.get("/merchantPageWise", {
                params: {
                    page: page - 1,
                    size,
                    sort: "id,desc",
                },
            });
            setData(response.data.content);
            setTotalRows(response.data.totalElements);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        setLoading(false);
    };

    
   

    const handleRowSelected = (row) => {
        if (selectedRow && selectedRow.id === row.id) {
            setSelectedRow(null); // Deselect if the same row is clicked again
            console.log("Row deselected:", row);
        } else {
            setSelectedRow(row);
            console.log("Row selected:", row);
        }
    };

    const isRowSelected = (row) => {
        return selectedRow && selectedRow.id === row.id;
    };

    const columns = [
        {
            name: "Select",
            cell: (row) => (
                <input
                    type="checkbox"
                    checked={isRowSelected(row)}
                    onChange={() => handleRowSelected(row)}
                    style={{ cursor: 'pointer' }}
                />
            ),
            ignoreRowClick: true
        },
        {
            name: "Business",
            selector: (row) => row.business?.name || "",  // Using logical OR operator
            sortable: true
        },        
        {
            name: "Region",
            selector: (row) => row.region.city + " : " + row.region.zone,
            sortable: true
        },
        {
            name: "Locality",
            selector: (row) => row.locality,
            sortable: true
        },
        {
            name: "Date",
            selector: (row) => row.creationTime,
            sortable: true
        }
    ];

    return (
        <div className="p-3 lg:ml-64 z-10 static mt-7">
            <MessageDisplay message={state.messages.general} />
            <h1 className="text-2xl font-bold text-gray-300 uppercase mt-8 mb-2 z-0">
                Merchant
            </h1>
            <ActionButtons openModal={openModal} handleEdit={handleEditButtonClick} />
            <div className="overflow-x-auto">
                <DataTable
                    columns={columns}
                    data={data}
                    progressPending={loading}
                    pagination
                    paginationServer
                    paginationTotalRows={totalRows}
                    paginationComponentOptions={{
                        noRowsPerPage: true
                    }}
                    onChangePage={(page) => setCurrentPage(page)}
                    customStyles={customStyles}
                />
            </div>
            <MerchantFormModal
                isOpen={modalIsOpen}
                closeModal={closeModal}
                businessOptions={businessOptions}
                regionOptions={regionOptions}
                formData={state.merchant}
                setFormData={(data) => dispatch({ type: "SET_MERCHANT", payload: data })}
                handleSubmit={handleSubmit}
                messages={state.messages} // Pass messages
                isSubmitting={isSubmitting}
            />
        </div>
    );
}

export default MerchantPage;

