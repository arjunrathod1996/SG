import React, { useEffect, useReducer, useState } from 'react';
import MessageDisplay from '../common/MessageModalDisplay';
import ActionButtons from '../common/ActionButtons';
import CustomerFormModal from '../modal/CustomerFormModal';
import LocationService from '../service/LocationService';
import CustomerService from '../service/CustomerService';

const initialState = {
  customer: {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    region: "",
    country: "",
    birthdate: "",
    mobile: "",
    countryID:"",
    regionID:"",
  },
  messages: {
    general: "",
    firstName: "",
    lastName: "",
    email: "",
    region: "",
    country: "",
    birthdate: "",
    mobile: "",
    modal: "",
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_CUSTOMER":
      return { ...state, customer: { ...state.customer, ...action.payload } };
    case "SET_MESSAGES":
      return { ...state, messages: { ...state.messages, ...action.payload } };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

function CustomerPage({user}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [countryOptions, setCountryOptions] = useState([]);
  const [regionOptions, setRegionOptions] = useState([]);

  const fetchCountries = async () => {
    try {
      const response = await LocationService.searchCountries();
      const countries = response.data || [];
      setCountryOptions(countries.map(country => ({
        value: country.id,
        label: country.name,
      })));
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized access. Please login again.");
      } else {
        console.error("Error loading countries:", error);
      }
    }
  };

  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>> user : " + user);

  const fetchRegions = async () => {
    try {
      const response = await LocationService.searchRegion();
      const regions = response.data || [];
      setRegionOptions(regions.map(region => ({
        value: region.id,
        label: region.city,
      })));
    } catch (error) {
      console.error("Error loading regions:", error);
    }
  };

  useEffect(() => {
    fetchCountries();
    fetchRegions();
  }, []);

  const openModal = () => {
    setModalIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalIsOpen(false);
    document.body.style.overflow = "auto";
    dispatch({ type: "RESET" });
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!state.customer.firstName || !state.customer.lastName || !state.customer.email) {
//       dispatch({
//         type: "SET_MESSAGES",
//         payload: {
//           general: "Please fill out all required fields.",
//           firstName: !state.customer.firstName ? "First name is required." : "",
//           lastName: !state.customer.lastName ? "Last name is required." : "",
//           email: !state.customer.email ? "Email is required." : "",
//         }
//       });
//       return;
//     }

//     try {
//       console.log("Customer Data:", JSON.stringify(state.customer, null, 2));
//       const result = await LocationService.submitCustomer(state.customer);
//       dispatch({
//         type: "SET_MESSAGES",
//         payload: { general: "Customer data submitted successfully." }
//       });
//       closeModal();
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         console.error("Unauthorized access. Please login again.");
//       } else {
//         console.error("Error submitting customer data:", error);
//         dispatch({
//           type: "SET_MESSAGES",
//           payload: { general: "Failed to submit customer data. Please try again." }
//         });
//       }
//     }
//   };


const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate required fields
    if (!state.customer.firstName || !state.customer.lastName || !state.customer.email) {
      dispatch({
        type: "SET_MESSAGES",
        payload: {
          general: "Please fill out all required fields.",
          firstName: !state.customer.firstName ? "First name is required." : "",
          lastName: !state.customer.lastName ? "Last name is required." : "",
          email: !state.customer.email ? "Email is required." : "",
        }
      });
      return;
    }

    console.log(">>>>>>>>>>>>>>>>>>> : state " + state.customer);
  
    try {
      if (state.customer.id) {
        // Update existing customer
        await CustomerService.updateCustomer(state.customer.id, state.customer);
        dispatch({
          type: "SET_MESSAGES",
          payload: { general: "Customer data updated successfully." }
        });
      } else {
        // Create new customer
        await CustomerService.createCustomer(state.customer, state.customer.countryID, state.customer.regionID);
        dispatch({
          type: "SET_MESSAGES",
          payload: { general: "Customer data created successfully." }
        });
      }
      closeModal();
    } catch (error) {
      // Error handling
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized access. Please login again.");
        dispatch({
          type: "SET_MESSAGES",
          payload: { general: "Unauthorized access. Please login again." }
        });
      } else {
        console.error("Error submitting customer data:", error.response ? error.response.data : error.message);
        dispatch({
          type: "SET_MESSAGES",
          payload: { general: "Failed to submit customer data. Please try again." }
        });
      }
    }
  };
  
  

  const handleEdit = () => {
    if (!state.customer.id) {
      dispatch({
        type: "SET_MESSAGES",
        payload: { general: "Please select a customer to edit." },
      });
      return;
    }
    openModal();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "SET_CUSTOMER", payload: { [name]: value } });
  };

  const handleFocus = (e) => {
    const { name } = e.target;
    dispatch({ type: "SET_MESSAGES", payload: { [name]: "" } });
  };

  return (
    <div className="p-3 lg:ml-64 z-10 static mt-7">
      <MessageDisplay message={state.messages.general} />
      <h1 className="text-2xl font-bold text-gray-300 uppercase mt-8 mb-2 z-0">Customer</h1>
      <ActionButtons openModal={openModal} handleEdit={handleEdit} />
      <CustomerFormModal
        isOpen={modalIsOpen}
        closeModal={closeModal}
        handleSubmit={handleSubmit}
        customer={state.customer}
        handleChange={handleChange}
        handleFocus={handleFocus}
        messages={state.messages}
        countryOptions={countryOptions}
        regionOptions={regionOptions}
      />
    </div>
  );
}

export default CustomerPage;
