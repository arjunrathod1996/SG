import React, { useReducer, useEffect, useState } from "react";
import LocationService from "../service/LocationService";
import MessageDisplay from "../common/MessageModalDisplay";
import ActionButtons from "../common/ActionButtons";
import CountryFormModal from "../modal/CountryFormModal.jsx";
import DataTable from "react-data-table-component";
import api from "../api/api.js";

const initialState = {
  country: {
    id: "",
    callingCode: "",
    name: "",
  },
  messages: {
    general: "",
    callingCode: "",
    name: "",
    modal: "",
  },
};

function reducer(state, action) {
  console.log("Action dispatched:", action);
  switch (action.type) {
    case "SET_COUNTRY":
      return { ...state, country: { ...state.country, ...action.payload } };
    case "SET_MESSAGES":
      return { ...state, messages: { ...state.messages, ...action.payload } };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

function CountryPage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRow, setSelectedRow] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
 

  useEffect(() => {
    fetchData(currentPage, rowsPerPage);
  }, [currentPage, rowsPerPage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("Field changed:", name, value);
    dispatch({ type: "SET_COUNTRY", payload: { [name]: value } });
  };

  const handleFocus = (e) => {
    const { name } = e.target;
    console.log("Field focused:", name);
    dispatch({ type: "SET_MESSAGES", payload: { [name]: "" } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", state.country);
    let valid = true;
    let newMessages = {
      callingCode: "",
      name: "",
      modal: "",
    };

    if (!state.country.callingCode) {
      valid = false;
      newMessages.callingCode = "Please enter a calling code.";
    }
    if (!state.country.name) {
      valid = false;
      newMessages.name = "Please enter a country name.";
    }

    if (!valid) {
      dispatch({ type: "SET_MESSAGES", payload: newMessages });
      return;
    }

    try {
      if (state.country.id) {
        await LocationService.saveCountry(state.country);
      } else {
        await LocationService.saveCountry(state.country);
      }
      newMessages.modal = "Successfully saved data.";
      dispatch({ type: "SET_MESSAGES", payload: newMessages });
      console.log("Data saved successfully");
      setTimeout(closeModal, 8000);
      
      fetchData(currentPage, rowsPerPage);
    } catch (error) {
      console.error("Error saving/updating country:", error);
      newMessages.modal = "Error saving/updating country. Please try again.";
      dispatch({ type: "SET_MESSAGES", payload: newMessages });
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
    document.body.style.overflow = "hidden"; // Prevent body scroll
  };

  const closeModal = () => {
    setModalIsOpen(false);
    document.body.style.overflow = "auto"; // Restore body scroll
    dispatch({ type: "RESET" });
  };

  const handleEdit = () => {
    if (!selectedRow) {
      dispatch({
        type: "SET_MESSAGES",
        payload: { general: "Please select a country to edit." },
      });
      return;
    }
    dispatch({ type: "SET_COUNTRY", payload: selectedRow });
    openModal();
    console.log("Editing row:", selectedRow);
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
      const response = await api.get("/location/countryPageWise", {
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
    setSelectedRow(row);
    console.log("Row selected:", row);
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
        />
      ),
      ignoreRowClick: true,
    },
    {
      name: "Calling Code",
      selector: (row) => row.callingCode,
      sortable: true,
    },
    {
      name: "Country Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.creationTime,
      sortable: true,
    },
  ];

  return (
    <>
      <div className="p-3 lg:ml-64 z-10 static mt-7">
        <MessageDisplay message={state.messages.general} />
        <h1 className="text-2xl font-bold text-gray-300 uppercase mt-8 mb-2 z-0">
          Country
        </h1>
        <div
          className="table-container table-responsive p-4 bg-white shadow-md rounded-lg"
          style={{ overflowX: "auto" }}
        >
          <ActionButtons openModal={openModal} handleEdit={handleEdit} />
          <div className="overflow-x-auto">
            <DataTable
              columns={columns}
              data={data}
              progressPending={loading}
              pagination
              paginationServer
              paginationTotalRows={totalRows}
              paginationComponentOptions={{
                noRowsPerPage: true,
              }}
              onChangePage={(page) => setCurrentPage(page)}
              customStyles={{
                headCells: {
                  style: {
                    backgroundColor: "#f1f5f9",
                  },
                },
              }}
            />
          </div>
          <CountryFormModal
            isOpen={modalIsOpen}
            closeModal={closeModal}
            handleSubmit={handleSubmit}
            country={state.country}
            handleChange={handleChange}
            handleFocus={handleFocus}

            messages={state.messages}
          />
        </div>
      </div>
    </>
  );
}

export default CountryPage;

























// import React, { useReducer, useEffect, useState } from "react";
// import LocationService from "../service/LocationService";
// import MessageDisplay from "../common/MessageModalDisplay";
// import ActionButtons from "../common/ActionButtons";
// import CountryFormModal from "../modal/CountryFormModal.jsx";
// import DataTable from "react-data-table-component";
// import api from "../api/api.js";

// // Initial state for the reducer
// const initialState = {
//   country: {
//     id: "",
//     callingCode: "",
//     name: "",
//   },
//   messages: {
//     general: "",
//     callingCode: "",
//     name: "",
//     modal: "",
//   },
// };

// // Reducer function to handle state transitions
// function reducer(state, action) {
//   console.log("Action dispatched:", action);
//   switch (action.type) {
//     case "SET_COUNTRY":
//       return { ...state, country: { ...state.country, ...action.payload } };
//     case "SET_MESSAGES":
//       return { ...state, messages: { ...state.messages, ...action.payload } };
//     case "RESET":
//       return initialState;
//     default:
//       return state;
//   }
// }

// function CountryPage() {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [data, setData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [selectedRow, setSelectedRow] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [totalRows, setTotalRows] = useState(0);

//   useEffect(() => {
//     fetchData(currentPage, rowsPerPage);
//   }, [currentPage, rowsPerPage]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     console.log("Field changed:", name, value);
//     dispatch({ type: "SET_COUNTRY", payload: { [name]: value } });
//   };

//   const handleFocus = (e) => {
//     const { name } = e.target;
//     console.log("Field focused:", name);
//     dispatch({ type: "SET_MESSAGES", payload: { [name]: "" } });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Form submitted:", state.country);
//     let valid = true;
//     let newMessages = {
//       callingCode: "",
//       name: "",
//       modal: "",
//     };

//     if (!state.country.callingCode) {
//       valid = false;
//       newMessages.callingCode = "Please enter a calling code.";
//     }
//     if (!state.country.name) {
//       valid = false;
//       newMessages.name = "Please enter a country name.";
//     }

//     if (!valid) {
//       dispatch({ type: "SET_MESSAGES", payload: newMessages });
//       return;
//     }

//     try {
//       if (state.country.id) {
//         await LocationService.updateCountry(state.country);
//       } else {
//         await LocationService.saveCountry(state.country);
//       }
//       newMessages.modal = "Successfully saved data.";
//       dispatch({ type: "SET_MESSAGES", payload: newMessages });
//       console.log("Data saved successfully");
//       setTimeout(closeModal, 8000);
//       fetchData(currentPage, rowsPerPage);
//     } catch (error) {
//       console.error("Error saving/updating country:", error);
//       newMessages.modal = "Error saving/updating country. Please try again.";
//       dispatch({ type: "SET_MESSAGES", payload: newMessages });
//     }
//   };

//   const openModal = () => {
//     setModalIsOpen(true);
//     document.body.style.overflow = "hidden"; // Prevent body scroll
//   };

//   const closeModal = () => {
//     setModalIsOpen(false);
//     document.body.style.overflow = "auto"; // Restore body scroll
//     dispatch({ type: "RESET" });
//   };

//   const handleEdit = () => {
//     if (!selectedRow) {
//       dispatch({
//         type: "SET_MESSAGES",
//         payload: { general: "Please select a country to edit." },
//       });
//       return;
//     }
//     dispatch({ type: "SET_COUNTRY", payload: selectedRow });
//     openModal();
//     console.log("Editing row:", selectedRow);
//   };

//   useEffect(() => {
//     let timer;
//     if (state.messages.modal) {
//       timer = setTimeout(() => {
//         closeModal();
//       }, 8000);
//     }
//     return () => clearTimeout(timer);
//   }, [state.messages.modal]);

// const fetchData = async (page = 1, size = 10) => {
//     setLoading(true);
//     try {
//       const response = await api.get("/location/countryPageWise", {
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
//     setSelectedRow(row);
//     console.log("Row selected:", row);
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
//         />
//       ),
//       ignoreRowClick: true,
//     },
//     {
//       name: "Calling Code",
//       selector: (row) => row.callingCode,
//       sortable: true,
//     },
//     {
//       name: "Country Name",
//       selector: (row) => row.name,
//       sortable: true,
//     },
//     {
//       name: "Date",
//       selector: (row) => row.creationTime,
//       sortable: true,
//     },
//   ];

//   return (
//     <>
//       <div className="p-3 lg:ml-64 z-10 static mt-7">
//         <MessageDisplay message={state.messages.general} />
//         <h1 className="text-2xl font-bold text-gray-300 uppercase mt-8 mb-2 z-0">
//           Country
//         </h1>
//         <div
//           className="table-container table-responsive p-4 bg-white shadow-md rounded-lg"
//           style={{ overflowX: "auto" }}
//         >
//           <ActionButtons openModal={openModal} />
//           <div className="overflow-x-auto">
//             <DataTable
//               columns={columns}
//               data={data}
//               progressPending={loading}
//               pagination
//               paginationServer
//               paginationTotalRows={totalRows}
//               paginationComponentOptions={{
//                 noRowsPerPage: true,
//               }}
//               onChangePage={(page) => setCurrentPage(page)}
//               customStyles={{
//                 headCells: {
//                   style: {
//                     backgroundColor: "#f1f5f9",
//                   },
//                 },
//               }}
//             />
//           </div>
//           <CountryFormModal
//             isOpen={modalIsOpen}
//             closeModal={closeModal}
//             handleSubmit={handleSubmit}
//             country={state.country}
//             handleChange={handleChange}
//             handleFocus={handleFocus}
//             messages={state.messages}
//           />
//         </div>
//       </div>
//     </>
//   );
// }

// export default CountryPage;


























// import React, { useEffect, useState } from "react";
// import LocationService from "../service/LocationService";
// import MessageDisplay from "../common/MessageModalDisplay";
// import ActionButtons from "../common/ActionButtons";
// import CountryFormModal from "../modal/CountryFormModal.jsx";

// function CountryPage() {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [totalRows, setTotalRows] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const [selectedRow, setSelectedRow] = useState(null);
//   const [modalIsOpen, setModalIsOpen] = useState(false);

//   const [messages, setMessages] = useState({
//     general: "",
//     callingCode: "",
//     name: "",
//     modal: "",
//   });

//   const [country, setCountry] = useState({
//     id: "",
//     callingCode: "",
//     name: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCountry({ ...country, [name]: value });
//   };

//   const handleFocus = (e) => {
//     const { name } = e.target;
//     setMessages({ ...messages, [name]: "" });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     let valid = true;
//     let newMessages = {
//       general: "",
//       callingCode: "",
//       name: "",
//       modal: "",
//     };

//     if (!country.callingCode) {
//       valid = false;
//       newMessages.callingCode = "Please enter a calling code.";
//     }
//     if (!country.name) {
//       valid = false;
//       newMessages.name = "Please enter a country name.";
//     }

//     if (!valid) {
//       setMessages(newMessages);
//       return;
//     }

//     try {
//       if (country.id) {
//         await LocationService.saveCountry(country, country.id);
//       } else {
//         await LocationService.saveCountry(country);
//       }
//       newMessages.modal = "Successfully Saved data.";
//       setMessages(newMessages);
//       closeModal();
//       fetchData(currentPage, rowsPerPage);
//     } catch (error) {
//       console.error("Error saving/updating country:", error);
//       const errorMessage =
//         error.response?.data?.message ||
//         "Error saving/updating country. Please try again.";
//       newMessages.modal = errorMessage;
//       setMessages(newMessages);
//     }
//   };

//   const openModal = () => {
//     setModalIsOpen(true);
//     document.body.style.overflow = "hidden"; // Prevent body scroll
//   };

//   const handleEdit = () => {
//     if (!selectedRow) {
//       setMessages({
//         ...messages,
//         general: "Please select a Country to edit.",
//       });
//       return;
//     }
//     setCountry(selectedRow);
//     openModal();
//   };

//   const closeModal = () => {
//     setModalIsOpen(false);
//     document.body.style.overflow = "auto"; // Restore body scroll
//     setCountry({
//       id: "",
//       callingCode: "",
//       name: "",
//     });
//     setMessages({
//       general: "",
//       callingCode: "",
//       name: "",
//       modal: "",
//     });
//     setSelectedRow(null);
//   };

//   const fetchData = async (page, size) => {
//     try {
//       setLoading(true);
//       const response = await LocationService.fetchCountries(page - 1, size);
//       setData(response.content);
//       setTotalRows(response.totalElements);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setMessages({ ...messages, general: "Error fetching data." });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData(currentPage, rowsPerPage);
//   }, [currentPage, rowsPerPage]);

//   return (
//     <>
//       <div className="p-3 lg:ml-64 z-10 static mt-7">
//         <MessageDisplay message={messages.general} />
//         <h1 className="text-2xl font-bold text-gray-300 uppercase mt-8 mb-2 z-0">
//           Country
//         </h1>

//         <div
//           className="table-container table-responsive p-4 bg-white shadow-md rounded-lg"
//           style={{ overflowX: "auto" }}
//         >
//           <ActionButtons openModal={openModal} handleEdit={handleEdit} />

//           <CountryFormModal
//             isOpen={modalIsOpen}
//             closeModal={closeModal}
//             handleSubmit={handleSubmit}
//             country={country}
//             handleChange={handleChange}
//             handleFocus={handleFocus}
//             messages={messages}
//           />
//         </div>
//       </div>
//     </>
//   );
// }

// export default CountryPage;
