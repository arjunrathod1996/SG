
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Draggable from "react-draggable";
import { FaTimes, FaMapMarkedAlt, FaCity, FaMapSigns, FaSearch } from "react-icons/fa";
import LocationService from "../service/LocationService";

const RegionFormModal = ({
  isOpen,
  closeModal,
  handleSubmit,
  region = {},
  handleChange,
  handleFocus,
  messages = {},
}) => {
  const [searchTerm, setSearchTerm] = useState(region.country?.name || ""); // Initialize with existing country name
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(
    region.country ? { id: region.country.id, name: region.country.name } : null
  );
  const [countryMessage, setCountryMessage] = useState("");

  useEffect(() => {
    // Reset searchTerm and selectedCountry for new entry
    if (!region.id) {
     // setSearchTerm("");
    //  setSelectedCountry(null);
    } else {
      setSearchTerm(region.country?.name || "");
      setSelectedCountry(region.country ? { id: region.country.id, name: region.country.name } : null);
    }
  }, [region]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.length >= 3 && (!selectedCountry || searchTerm !== selectedCountry.name)) {
        try {
          const result = await LocationService.searchCountries(searchTerm);
          setSuggestions(result);
        } catch (error) {
          console.error("Error fetching country suggestions:", error);
        }
      } else {
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [searchTerm, selectedCountry]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (selectedCountry && e.target.value !== selectedCountry.name) {
      setSelectedCountry(null);
      handleChange({ target: { name: "countryID", value: "" } }); // Clear countryID when country is deselected
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.name);
    setSelectedCountry(suggestion);
    setSuggestions([]);
    setCountryMessage("");
    // Update the form fields and hidden input with the selected country
    handleChange({ target: { name: "country", value: suggestion.name } });
    handleChange({ target: { name: "countryID", value: suggestion.id } });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (!selectedCountry) {
      setCountryMessage("Please select a country from the suggestions.");
      return;
    }
    handleSubmit(e);
  };

  return (
    <Draggable handle=".drag-handle">
      <div>
        <Modal
          isOpen={isOpen}
          onRequestClose={closeModal}
          contentLabel="Region Form Modal"
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
              {region.id ? "Edit Region" : "Add New Region"}
              <input
                  id="id"
                  name="id"
                  type="hidden"
                  value={region.id}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Search for a country"
                />
            </h2>
          </div>
          <form onSubmit={onFormSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="md:col-span-2 relative">
                <label htmlFor="country" className="flex items-center text-sm font-medium text-gray-700">
                  <FaSearch className="mr-2" />
                  Country
                </label>
                <input
                  id="country"
                  name="country"
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onFocus={handleFocus}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Search for a country"
                />
                {suggestions.length > 0 && (
                  <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                    {suggestions.map((suggestion) => (
                      <li
                        key={suggestion.id}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      >
                        {suggestion.name}
                      </li>
                    ))}
                  </ul>
                )}
                <input
                  id="countryID"
                  type="hidden"
                  name="countryID"
                  value={selectedCountry ? selectedCountry.id : ""}
                />
                {countryMessage && (
                  <p className="mt-1 text-xs text-red-600">{countryMessage}</p>
                )}
              </div>
              <div>
                <label htmlFor="state" className="flex items-center text-sm font-medium text-gray-700">
                  <FaMapMarkedAlt className="mr-2" />
                  State
                </label>
                <input
                  id="state"
                  name="state"
                  type="text"
                  value={region.state || ""}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter state"
                />
                {messages.state && (
                  <p className="mt-1 text-xs text-red-600">{messages.state}</p>
                )}
              </div>
              <div>
                <label htmlFor="city" className="flex items-center text-sm font-medium text-gray-700">
                  <FaCity className="mr-2" />
                  City
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  value={region.city || ""}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter city"
                />
                {messages.city && (
                  <p className="mt-1 text-xs text-red-600">{messages.city}</p>
                )}
              </div>
              <div className="md:col-span-2">
                <label htmlFor="zone" className="flex items-center text-sm font-medium text-gray-700">
                  <FaMapSigns className="mr-2" />
                  Zone
                </label>
                <input
                  id="zone"
                  name="zone"
                  type="text"
                  value={region.zone || ""}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter zone"
                />
                {messages.zone && (
                  <p className="mt-1 text-xs text-red-600">{messages.zone}</p>
                )}
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {region.id ? "Update Region" : "Add Region"}
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
  );
};

export default RegionFormModal;
