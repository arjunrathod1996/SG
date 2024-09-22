// import React, { useState, useEffect } from "react";
// import DataTable from "react-data-table-component";
// import { FaSearch, FaCalendarAlt } from "react-icons/fa";
// import "react-datepicker/dist/react-datepicker.css";
// import DatePicker from "react-datepicker";
// import api from "../api/api.js";
// import MessageDisplay from "../common/MessageModalDisplay.jsx";
// import ActionButtons from "../common/ActionButtons.jsx";
// import BusinessFormModal from "../modal/BusinessFormModal.jsx";
// import BusinessService from "../service/BusinessService.jsx";
// import CustomPagination from "../common/CustomPagination.jsx";

// const BusinessTable = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [totalRows, setTotalRows] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   // Filter States
//   const [name, setName] = useState("");
//   const [fullName, setFullName] = useState("");
//   const [category, setCategory] = useState("");
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);

//   // Define filters state
//   const [filters, setFilters] = useState({
//     name: null,
//     fullName: null,
//     category: null,
//     startDate: null,
//     endDate: null,
//   });

//   // State for selected row and modal
//   const [selectedRow, setSelectedRow] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     fetchData(currentPage, rowsPerPage, filters);
//   }, [currentPage, rowsPerPage, filters]);

//   const fetchData = async (page = 1, size = 10, filters = {}) => {
//     setLoading(true);
//     try {
//       const response = await api.get("/businessPageWise", {
//         params: {
//           page: page - 1,
//           size,
//           sort: "id,desc",
//           ...filters,
//         },
//       });
//       setData(response.data.content);
//       setTotalRows(response.data.totalElements);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//     setLoading(false);
//   };

//   const handleSearch = () => {
//     const params = new URLSearchParams();
//     if (name) params.set("name", name);
//     if (fullName) params.set("fullName", fullName);
//     if (category) params.set("category", category);
//     if (startDate)
//       params.set("startDate", startDate.toISOString().split("T")[0]);
//     if (endDate) params.set("endDate", endDate.toISOString().split("T")[0]);

//     const newUrl = params.toString()
//       ? `/dashboard?${params.toString()}`
//       : "/dashboard";
//     window.history.pushState(null, "", newUrl);

//     setFilters({
//       name: name || null,
//       fullName: fullName || null,
//       category: category || null,
//       startDate: startDate ? startDate.toISOString().split("T")[0] : null,
//       endDate: endDate ? endDate.toISOString().split("T")[0] : null,
//     });

//     setCurrentPage(1);
//   };

//   useEffect(() => {
//     const clearUrlParams = () => {
//       window.history.replaceState(null, "", "/dashboard");
//     };

//     clearUrlParams();
//   }, []);

//   const handleRowSelected = (row) => {
//     setSelectedRow(selectedRow && selectedRow.id === row.id ? null : row);
//   };

//   const isRowSelected = (row) => selectedRow && selectedRow.id === row.id;

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
//       allowOverflow: true,
//       button: true,
//     },
//     {
//       name: "Name",
//       selector: (row) => row.name,
//       sortable: true,
//     },
//     {
//       name: "Full Name",
//       selector: (row) => row.fullName,
//       sortable: true,
//     },
//     {
//       name: "Address",
//       selector: (row) => row.address,
//       sortable: true,
//     },
//     {
//       name: "Description",
//       selector: (row) => row.description,
//       sortable: true,
//     },
//     {
//       name: "Date",
//       selector: (row) => row.creationTime,
//       sortable: true,
//     },
//     {
//       name: "Category",
//       selector: (row) => row.category,
//       sortable: true,
//     },
//   ];

//   const [business, setBusiness] = useState({
//     id: "",
//     name: "",
//     fullName: "",
//     address: "",
//     description: "",
//     category: "",
//   });
//   const [categories, setCategories] = useState([]);
//   const [messages, setMessages] = useState({
//     general: "",
//     name: "",
//     fullName: "",
//     address: "",
//     description: "",
//     category: "",
//     modal: "",
//   });
//   const [modalIsOpen, setModalIsOpen] = useState(false);

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const fetchedCategories = await BusinessService.fetchCategories();
//       setCategories(fetchedCategories);
//     } catch (error) {
//       console.error("Error loading categories:", error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setBusiness({ ...business, [name]: value });
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
//       name: "",
//       fullName: "",
//       address: "",
//       description: "",
//       category: "",
//       modal: "",
//     };

//     if (!business.name) {
//       valid = false;
//       newMessages.name = "Please enter a name.";
//     }
//     if (!business.fullName) {
//       valid = false;
//       newMessages.fullName = "Please enter a full name.";
//     }
//     if (!business.address) {
//       valid = false;
//       newMessages.address = "Please enter an address.";
//     }
//     if (!business.description) {
//       valid = false;
//       newMessages.description = "Please enter a description.";
//     }
//     // if (!business.category) {
//     //   valid = false;
//     //   newMessages.category = "Please select a category.";
//     // }

//     if (!valid) {
//       setMessages(newMessages);
//       return;
//     }

//     try {
//       if (business.id) {
//         await BusinessService.updateBusiness(business);
//       } else {
//         await BusinessService.saveBusiness(business);
//       }
//       const successMessage = "Successfully Saved data.";
//       newMessages.modal = successMessage;
//       setMessages(newMessages);
//       closeModal();
//       fetchData(currentPage, rowsPerPage, filters);
//     } catch (error) {
//       console.error("Error saving/updating business:", error);
//       const errorMessage =
//         error.response?.data?.message ||
//         "Error saving/updating business. Please try again.";
//       newMessages.modal = errorMessage;
//       setMessages(newMessages);
//     }
//   };

//   const handleEdit = () => {
//     if (!selectedRow) {
//       setMessages({
//         ...messages,
//         general: "Please select a business to edit.",
//       });
//       return;
//     }
//     setBusiness(selectedRow);
//     openModal();
//   };

//   const handleDelete = async () => {
//     if (!selectedRow) {
//       setMessages({
//         ...messages,
//         general: "Please select a business to delete.",
//       });
//       return;
//     }
//     try {
//       await BusinessService.deleteBusiness(selectedRow.id);
//       fetchData(currentPage, rowsPerPage, filters);
//       setSelectedRow(null);
//       setMessages({ ...messages, general: "" });
//     } catch (error) {
//       console.error("Error deleting business:", error);
//       setMessages({
//         ...messages,
//         general: "Error deleting business. Please try again.",
//       });
//     }
//   };

//   const handleCategoryChange = (e) => {
//     setBusiness({ ...business, category: e.target.value });
//   };

//   const openModal = () => {
//     setModalIsOpen(true);
//   };

//   const closeModal = () => {
//     setModalIsOpen(false);
//     setBusiness({
//       id: "",
//       name: "",
//       fullName: "",
//       address: "",
//       description: "",
//       category: "",
//     });
//     setMessages({
//       general: "",
//       name: "",
//       fullName: "",
//       address: "",
//       description: "",
//       category: "",
//       modal: "",
//     });
//   };

//   return (
//     <>
//       <div className="p-3 lg:ml-64 z-10">
//         <MessageDisplay message={messages.general} />
//         <h1 className="text-2xl font-bold text-gray-300 uppercase mt-8 mb-2 z-0">
//           Business Management
//         </h1>

//         <div className="filters mb-4 p-4 bg-white shadow-md rounded-lg flex flex-wrap gap-4 ">
//             <input
//               type="text"
//               placeholder="Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="p-2 border rounded-lg h-10"
//             />
//             <input
//               type="text"
//               placeholder="Full Name"
//               value={fullName}
//               onChange={(e) => setFullName(e.target.value)}
//               className="p-2 border rounded-lg h-10"
//             />
//             <div className="flex flex-col relative">
//               <DatePicker
//                 selected={startDate}
//                 onChange={(date) => setStartDate(date)}
//                 placeholderText="Start Date"
//                 dateFormat="yyyy-MM-dd"
//                 className="p-2 border rounded-lg h-10 w-full"
//                 wrapperClassName="w-full"
//               />
//               <FaCalendarAlt className="absolute top-3 right-3 text-gray-500" />
//             </div>
//             <div className="flex flex-col relative">
//               <DatePicker
//                 selected={endDate}
//                 onChange={(date) => setEndDate(date)}
//                 placeholderText="End Date"
//                 dateFormat="yyyy-MM-dd"
//                 className="p-2 border rounded-lg h-10 w-full"
//                 wrapperClassName="w-full"
//               />
//               <FaCalendarAlt className="absolute top-3 right-3 text-gray-500" />
//             </div>
//             <button
//               onClick={handleSearch}
//               className="p-2 bg-blue-500 text-white rounded-lg flex items-center gap-2 hover:bg-blue-600 transition"
//             >
//               <FaSearch />
//               Search
//             </button>
//           </div>

//         <div
//           className="table-container table-responsive p-4 bg-white shadow-md rounded-lg"
//           style={{ overflowX: "auto" }}
//         >
//           <ActionButtons
//             openModal={openModal}
//             handleEdit={handleEdit}
//             handleDelete={handleDelete}
//           />
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
//           <BusinessFormModal
//             isOpen={modalIsOpen}
//             closeModal={closeModal}
//             handleSubmit={handleSubmit}
//             business={business}
//             handleChange={handleChange}
//             handleFocus={handleFocus}
//             handleCategoryChange={handleCategoryChange}
//             filteredCategories={categories}
//             messages={messages}
            
//           />
//         </div>
//       </div>
//     </>
//   );
// };

// export default BusinessTable;



import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FaSearch, FaCalendarAlt } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import api from "../api/api.js";
import MessageDisplay from "../common/MessageModalDisplay.jsx";
import ActionButtons from "../common/ActionButtons.jsx";
import BusinessFormModal from "../modal/BusinessFormModal.jsx";
import BusinessService from "../service/BusinessService.jsx";


const BusinessTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Filter States
  const [name, setName] = useState("");
  const [fullName, setFullName] = useState("");
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Define filters state
  const [filters, setFilters] = useState({
    name: null,
    fullName: null,
    category: null,
    startDate: null,
    endDate: null,
  });

  // State for selected row and modal
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchData(currentPage, rowsPerPage, filters);
  }, [currentPage, rowsPerPage, filters]);

  const fetchData = async (page = 1, size = 10, filters = {}) => {
    setLoading(true);
    try {
      const response = await api.get("/businessPageWise", {
        params: {
          page: page - 1,
          size,
          sort: "id,desc",
          ...filters,
        },
      });
      setData(response.data.content);
      setTotalRows(response.data.totalElements);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (name) params.set("name", name);
    if (fullName) params.set("fullName", fullName);
    if (category) params.set("category", category);
    if (startDate)
      params.set("startDate", startDate.toISOString().split("T")[0]);
    if (endDate) params.set("endDate", endDate.toISOString().split("T")[0]);

    const newUrl = params.toString()
      ? `/dashboard?${params.toString()}`
      : "/dashboard";
    window.history.pushState(null, "", newUrl);

    setFilters({
      name: name || null,
      fullName: fullName || null,
      category: category || null,
      startDate: startDate ? startDate.toISOString().split("T")[0] : null,
      endDate: endDate ? endDate.toISOString().split("T")[0] : null,
    });

    setCurrentPage(1);
  };

  useEffect(() => {
    const clearUrlParams = () => {
      window.history.replaceState(null, "", "/dashboard");
    };

    clearUrlParams();
  }, []);

  const handleRowSelected = (row) => {
    setSelectedRow(selectedRow && selectedRow.id === row.id ? null : row);
  };

  const isRowSelected = (row) => selectedRow && selectedRow.id === row.id;

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
      allowOverflow: true,
      button: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Full Name",
      selector: (row) => row.fullName,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row) => row.address,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.creationTime,
      sortable: true,
    },
  ];

  const [business, setBusiness] = useState({
    id: "",
    name: "",
    fullName: "",
    address: "",
    description: "",
    category: "",
  });
  const [categories, setCategories] = useState([]);
  const [messages, setMessages] = useState({
    general: "",
    name: "",
    fullName: "",
    address: "",
    description: "",
    category: "",
    modal: "",
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const fetchedCategories = await BusinessService.fetchCategories();
      setCategories(fetchedCategories);
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBusiness({ ...business, [name]: value });
  };

  const handleFocus = (e) => {
    const { name } = e.target;
    setMessages({ ...messages, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    let newMessages = {
      general: "",
      name: "",
      fullName: "",
      address: "",
      description: "",
      category: "",
      modal: "",
    };

    if (!business.name) {
      valid = false;
      newMessages.name = "Please enter a name.";
    }
    if (!business.fullName) {
      valid = false;
      newMessages.fullName = "Please enter a full name.";
    }
    if (!business.address) {
      valid = false;
      newMessages.address = "Please enter an address.";
    }
    if (!business.description) {
      valid = false;
      newMessages.description = "Please enter a description.";
    }
    // if (!business.category) {
    //   valid = false;
    //   newMessages.category = "Please select a category.";
    // }

    if (!valid) {
      setMessages(newMessages);
      return;
    }

    try {
      if (business.id) {
        await BusinessService.updateBusiness(business);
      } else {
        await BusinessService.saveBusiness(business);
      }
      const successMessage = "Successfully Saved data.";
      newMessages.modal = successMessage;
      setMessages(newMessages);
      closeModal();
      fetchData(currentPage, rowsPerPage, filters);
    } catch (error) {
      console.error("Error saving/updating business:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Error saving/updating business. Please try again.";
      newMessages.modal = errorMessage;
      setMessages(newMessages);
    }
  };

  const handleEdit = () => {
    if (!selectedRow) {
      setMessages({
        ...messages,
        general: "Please select a business to edit.",
      });
      return;
    }
    setBusiness(selectedRow);
    openModal();
  };

  const handleDelete = async () => {
    if (!selectedRow) {
      setMessages({
        ...messages,
        general: "Please select a business to delete.",
      });
      return;
    }
    try {
      await BusinessService.deleteBusiness(selectedRow.id);
      fetchData(currentPage, rowsPerPage, filters);
      setSelectedRow(null);
      setMessages({ ...messages, general: "" });
    } catch (error) {
      console.error("Error deleting business:", error);
      setMessages({
        ...messages,
        general: "Error deleting business. Please try again.",
      });
    }
  };

  const handleCategoryChange = (e) => {
    setBusiness({ ...business, category: e.target.value });
  };

  const openModal = () => {
    setModalIsOpen(true);
    //document.body.classList.add('body-no-scroll'); // Add the class to disable scrolling
    document.body.style.overflow = "hidden"; // Prevent body scroll
  };

  const closeModal = () => {
    setModalIsOpen(false);
    //document.body.classList.remove('body-no-scroll'); // Remove the class to enable scrolling
    document.body.style.overflow = "auto"; // Restore body scroll
    setBusiness({
      id: "",
      name: "",
      fullName: "",
      address: "",
      description: "",
      category: "",
    });
    setMessages({
      general: "",
      name: "",
      fullName: "",
      address: "",
      description: "",
      category: "",
      modal: "",
    });
  };

  return (
    <>
      <div className="p-3 lg:ml-64 z-10 static mt-7">
        <MessageDisplay message={messages.general} />
        <h1 className="text-2xl font-bold text-gray-300 uppercase mt-8 mb-2 z-0">
          Business
        </h1>

        <div className="filters mb-4 p-4 bg-white shadow-md rounded-lg flex flex-wrap gap-4">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 border rounded-lg h-10"
            />
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="p-2 border rounded-lg h-10"
            />
            <div className="flex flex-col relative">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                placeholderText="Start Date"
                dateFormat="yyyy-MM-dd"
                className="p-2 border rounded-lg h-10 w-full"
                wrapperClassName="w-full"
              />
              <FaCalendarAlt className="absolute top-3 right-3 text-gray-500" />
            </div>
            <div className="flex flex-col relative">
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                placeholderText="End Date"
                dateFormat="yyyy-MM-dd"
                className="p-2 border rounded-lg h-10 w-full"
                wrapperClassName="w-full"
              />
              <FaCalendarAlt className="absolute top-3 right-3 text-gray-500" />
            </div>
            <button
              onClick={handleSearch}
              className="p-2 bg-blue-500 text-white rounded-lg flex items-center gap-2 hover:bg-blue-600 transition"
            >
              <FaSearch />
              Search
            </button>
          </div>

        <div
          className="table-container table-responsive p-4 bg-white shadow-md rounded-lg"
          style={{ overflowX: "auto" }}
        >
          <ActionButtons
            openModal={openModal}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
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
          <BusinessFormModal
            isOpen={modalIsOpen}
            closeModal={closeModal}
            handleSubmit={handleSubmit}
            business={business}
            handleChange={handleChange}
            handleFocus={handleFocus}
            handleCategoryChange={handleCategoryChange}
            filteredCategories={categories}
            messages={messages}
            
          />
        </div>
      </div>
    </>
  );
};

export default BusinessTable;
