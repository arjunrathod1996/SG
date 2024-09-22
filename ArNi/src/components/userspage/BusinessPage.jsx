import React, { useState, useEffect, useCallback } from "react";
import DataTable from "react-data-table-component";
import BusinessService from "../service/BusinessService";
import BusinessFormModal from "../modal/BusinessFormModal";
import MessageDisplay from "../common/MessageModalDisplay";
import RotatingSquaresSpinner from "../common/RotatingSquaresSpinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { debounce } from "lodash";

function BusinessPage() {
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [name, setName] = useState("");
  const [fullName, setFullName] = useState("");
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [page, setPage] = useState(0); // Add pagination state if needed
  const [size, setSize] = useState(10); // Adjust page size if needed

  const formatDate = (date) => {
    if (!date) return '';
    return date.toISOString().split('T')[0]; // Convert to YYYY-MM-DD format
};

  const handleSearch = async () => {
    try {
        const results = await BusinessService.searchBusinesses(
            name,
            fullName,
            category,
            formatDate(startDate),
            formatDate(endDate),
            0,
            10
        );
        console.log('Search results:', results);
    } catch (error) {
        console.error('Search failed:', error);
    }
};

  // Event handler for search button click
  const onSearchClick = () => {
    handleSearch();
  };

  const [business, setBusiness] = useState({
    id: "",
    name: "",
    fullName: "",
    address: "",
    description: "",
    category: "",
  });
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [messages, setMessages] = useState({
    general: "",
    name: "",
    fullName: "",
    address: "",
    description: "",
    category: "",
  });
  const [loading, setLoading] = useState(true);
  //const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchBusinesses();
    fetchCategories();
  }, []);

  const fetchBusinesses = async () => {
    try {
      setLoading(true);
      const data = await BusinessService.fetchBusinesses();
      setBusinesses(data);
    } catch (error) {
      console.error("Error fetching businesses:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const fetchedCategories = await BusinessService.fetchCategories();
      setCategories(fetchedCategories);
      setFilteredCategories(fetchedCategories);
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
      modals: "",
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
    if (!business.category) {
      valid = false;
      newMessages.category = "Please select a category.";
    }

    if (!valid) {
      setMessages({ ...messages, ...newMessages });
      return;
    }

    try {
      if (business.id) {
        await BusinessService.updateBusiness(business);
      } else {
        await BusinessService.saveBusiness(business);
      }
      fetchBusinesses();
      closeModal();
    } catch (error) {
      console.error("Error saving/updating business:", error);
      // Extract error message from the error object
      const errorMessage =
        error.response?.data?.message ||
        "Error saving/updating business. Please try again.";
      newMessages.modals = errorMessage;
      setMessages({ ...messages, ...newMessages });
    }
  };

  const handleEdit = () => {
    if (!selectedBusiness) {
      setMessages({
        ...messages,
        general: "Please select a business to edit.",
      });
      return;
    }
    const selectedBusinessData = businesses.find(
      (b) => b.id === selectedBusiness
    );
    setBusiness(selectedBusinessData);
    openModal();
  };

  const handleDelete = async () => {
    if (!selectedBusiness) {
      setMessages({
        ...messages,
        general: "Please select a business to delete.",
      });
      return;
    }
    try {
      await BusinessService.deleteBusiness(selectedBusiness);
      fetchBusinesses();
      setSelectedBusiness(null);
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
  };

  const closeModal = () => {
    setModalIsOpen(false);
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

  const filteredBusinesses = businesses.filter((business) =>
    business.name.toLowerCase().includes(search.toLowerCase())
  );

  const handlePageChange = (page) => setPage(page);
  const handleRowsPerPageChange = (rowsPerPage, page) => {
    setRowsPerPage(rowsPerPage);
    setPage(page);
  };

  // For Serach
  const searchBusinesses = async () => {
    const data = await BusinessService.searchBusinesses(
      name,
      fullName,
      category,
      startDate,
      endDate,
      page,
      size
    );
    setBusinesses(data.content);
  };

  useEffect(() => {
    searchBusinesses();
  }, [name, fullName, category, startDate, endDate, page, size]);

  useEffect(() => {
    // Fetch categories on component mount
    const fetchCategories = async () => {
      try {
        const categories = await BusinessService.fetchCategories();
        setFilteredCategories(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChangeForSearch = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div className="p-4 sm:ml-64 mt-8">
      <MessageDisplay message={messages.general} />
      <h1 className="text-2xl font-bold mb-4 mt-1 text-gray-300 uppercase">
        Business Management
      </h1>

      <div className="space-y-4 mb-4">
        <div className="flex flex-wrap gap-1">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex  px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="flex  px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            id="category"
            name="category"
            value={category}
            onChange={handleCategoryChangeForSearch}
            className="flex  px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a category</option>
            {filteredCategories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat} {/* Adjust according to your category object structure */}
              </option>
            ))}
          </select>

          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            placeholderText="Start Date"
            dateFormat="yyyy-MM-dd"
            className="flex-1 min-w-[calc(50%-1rem)] px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            placeholderText="End Date"
            dateFormat="yyyy-MM-dd"
            className="flex-1 min-w-[calc(50%-1rem)] px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={onSearchClick}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
      </div>

      <div className="mb-4 flex justify-between">
        <button
        //onClick={openModal}
        //className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 ease-in-out"
        >
          {/* Add Business */}
        </button>
        <div className="flex space-x-2">
          <button
            onClick={openModal}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 ease-in-out"
          >
            Add Business
          </button>
          <button
            onClick={handleEdit}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-yellow-600 border border-transparent rounded-md shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition duration-300 ease-in-out"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-300 ease-in-out"
          >
            Delete
          </button>
        </div>
      </div>
      <DataTable
        columns={[
          {
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
            cell: (row) => (
              <span className="font-medium text-gray-900">{row.name}</span>
            ),
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
        ]}
        data={filteredBusinesses}
        pagination
        paginationPerPage={rowsPerPage}
        paginationRowsPerPageOptions={[5, 10, 15, 20]}
        paginationComponentOptions={{
          rowsPerPageText: "Rows per page",
          rangeSeparatorText: "of",
          noRowsPerPage: false,
          selectAllRowsItem: true,
          selectAllRowsItemText: "All",
        }}
        onSelectedRowsChange={(state) =>
          setSelectedBusiness(state.selectedRows[0]?.id)
        }
        selectableRows
        selectableRowsSingle
        progressPending={loading}
      //  progressComponent={<RotatingSquaresSpinner />} // Use the chosen spinner here
      />
      <BusinessFormModal
        isOpen={modalIsOpen}
        closeModal={closeModal}
        handleSubmit={handleSubmit}
        business={business}
        handleChange={handleChange}
        handleFocus={handleFocus}
        handleCategoryChange={handleCategoryChange}
        filteredCategories={filteredCategories}
        messages={messages}
      />
    </div>
  );
}

export default BusinessPage;
