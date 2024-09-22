import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import Modal from "react-modal";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  FaGlobe,
  FaCode,
  FaTimes,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaBirthdayCake,
} from "react-icons/fa";

const NoOptionsMessage = ({ inputValue, filteredOptions }) => {
  if (inputValue.length < 3) {
    return (
      <div className="p-1 text-gray-500">Enter 3 characters to search</div>
    );
  }
  if (filteredOptions.length === 0) {
    return <div className="p-1 text-gray-500">Data not found</div>;
  }
  return null;
};

const CustomerFormModal = ({
  isOpen,
  closeModal,
  handleSubmit,
  customer = {},
  handleChange,
  handleFocus,
  messages = {},
  countryOptions = [],
  regionOptions = [],
}) => {
  const safeCustomer = customer || {};
  const [isDisabled, setDisabled] = useState(false);

  const [inputValue, setInputValue] = useState("");
  const [countryInputValue, setCountryInputValue] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [filteredCountryOptions, setFilteredCountryOptions] = useState([]);

  const [regionInputValue, setRegionInputValue] = useState("");
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [filteredRegionOptions, setFilteredRegionOptions] = useState([]);

  const defaultFormData = {
    firstName: "",
    lastName: "",
    email: "",
    region: "",
    country: "",
    birthdate: "",
    mobile: "",
  };

  const currentFormData = { ...defaultFormData, ...customer };

  useEffect(() => {
    if (currentFormData.id) {
      setSelectedCountry(
        countryOptions.find(
          (option) => option.label === currentFormData.country.name
        )
      );
      setSelectedRegion(
        regionOptions.find((option) => option.label === currentFormData.region)
      );
      setDisabled(true);
    } else {
      setDisabled(false);
      setSelectedCountry(null);
      setSelectedRegion(null);
    }
  }, [currentFormData.id, countryOptions, regionOptions]);

  useEffect(() => {
    if (countryInputValue.length >= 3) {
      const results = countryOptions.filter((option) => {
        return (
          option.label &&
          typeof option.label === "string" &&
          option.label.toLowerCase().includes(countryInputValue.toLowerCase())
        );
      });
      setFilteredCountryOptions(results);
    } else {
      setFilteredCountryOptions([]);
    }
  }, [countryInputValue, countryOptions]);

  useEffect(() => {
    if (regionInputValue.length >= 3) {
      const results = regionOptions.filter((option) => {
        return (
          option.label &&
          typeof option.label === "string" &&
          option.label.toLowerCase().includes(regionInputValue.toLowerCase())
        );
      });
      setFilteredRegionOptions(results);
    } else {
      setFilteredRegionOptions([]);
    }
  }, [regionInputValue, regionOptions]);

  const handleCountryInputChange = (inputValue) => {
    setCountryInputValue(inputValue);
  };

  const handleCountryChange = (option) => {
    setSelectedCountry(option);
    handleChange({
      target: { name: "country", value: option ? option.label : "" },
    });
    handleChange({
      target: { name: "countryID", value: option ? option.value : "" },
    });
  };

  const handleRegionChange = (option) => {
    setSelectedRegion(option);
    handleChange({
      target: { name: "region", value: option ? option.label : "" },
    });
    handleChange({
      target: { name: "regionID", value: option ? option.value : "" },
    });
  };

  const handleRegionInputChange = (inputValue) => {
    setRegionInputValue(inputValue);
  };

  const handleInputChangeText = (event) => {
    const { name, value } = event.target;
    setFormData({ ...currentFormData, [name]: value });
  };

  return (
    <>
      <Draggable handle=".drag-handle">
        <div>
          <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Customer Form Modal"
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
                {safeCustomer.id ? "Edit Customer" : "Add New Customer"}
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="flex items-center text-sm font-medium text-gray-700"
                  >
                    <FaUser className="mr-2" />
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={safeCustomer.firstName || ""}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {messages.firstName && (
                    <p className="mt-1 text-xs text-red-600">
                      {messages.firstName}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="flex items-center text-sm font-medium text-gray-700"
                  >
                    <FaUser className="mr-2" />
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={safeCustomer.lastName || ""}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {messages.lastName && (
                    <p className="mt-1 text-xs text-red-600">
                      {messages.lastName}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="mobile"
                    className="flex items-center text-sm font-medium text-gray-700"
                  >
                    <FaPhone className="mr-2" />
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    id="mobile"
                    name="mobile"
                    value={safeCustomer.mobile || ""}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {messages.mobile && (
                    <p className="mt-1 text-xs text-red-600">
                      {messages.mobile}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="flex items-center text-sm font-medium text-gray-700"
                  >
                    <FaEnvelope className="mr-2" />
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    value={safeCustomer.email || ""}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {messages.email && (
                    <p className="mt-1 text-xs text-red-600">
                      {messages.email}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="birthdate"
                    className="flex items-center text-sm font-medium text-gray-700"
                  >
                    <FaBirthdayCake className="mr-2" />
                    Birthdate
                  </label>
                  <DatePicker
                    selected={
                      safeCustomer.birthdate
                        ? new Date(safeCustomer.birthdate)
                        : null
                    }
                    onChange={(date) =>
                      handleChange({
                        target: { name: "birthdate", value: date },
                      })
                    }
                    onFocus={handleFocus}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {messages.birthdate && (
                    <p className="mt-1 text-xs text-red-600">
                      {messages.birthdate}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="country"
                    className="flex items-center text-sm font-medium text-gray-700"
                  >
                    <FaGlobe className="mr-2" />
                    Country
                  </label>
                  <Select
                    id="country"
                    name="country"
                    options={filteredCountryOptions}
                    value={selectedCountry}
                    onChange={handleCountryChange}
                    onInputChange={handleCountryInputChange}
                    inputValue={countryInputValue}
                    components={{
                      NoOptionsMessage: (props) => (
                        <NoOptionsMessage
                          {...props}
                          inputValue={countryInputValue}
                          filteredOptions={filteredCountryOptions}
                        />
                      ),
                    }}
                    className="mt-1 block w-full"
                  />
                  <input 
                        id="countryID"
                        type="hidden"
                        name="countryID"
                        value={selectedCountry ? selectedCountry.value : ""} />
                  {messages.country && (
                    <p className="mt-1 text-xs text-red-600">
                      {messages.country}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="region"
                    className="flex items-center text-sm font-medium text-gray-700"
                  >
                    <FaGlobe className="mr-2" />
                    Region
                  </label>
                  <Select
                    id="region"
                    name="region"
                    options={filteredRegionOptions}
                    value={selectedRegion}
                    onChange={handleRegionChange}
                    onInputChange={setRegionInputValue}
                    noOptionsMessage={() => (
                      <NoOptionsMessage
                        inputValue={regionInputValue}
                        filteredOptions={filteredRegionOptions}
                      />
                    )}
                    isDisabled={isDisabled}
                    placeholder="Select region"
                    className="basic-single"
                    classNamePrefix="select"
                  />
                  <input 
                        id="regionID"
                        type="hidden"
                        name="regionID"
                        value={selectedRegion ? selectedRegion.value : ""} />
                  {messages.region && (
                    <p className="mt-1 text-xs text-red-600">
                      {messages.region}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors"
                  disabled={isDisabled}
                >
                  {safeCustomer.id ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </Modal>
        </div>
      </Draggable>
    </>
  );
};

export default CustomerFormModal;
