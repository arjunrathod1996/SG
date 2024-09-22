import React from "react";
import Modal from "react-modal";
import Draggable from "react-draggable";
import {
  FaTimes,
  FaBusinessTime,
  FaHome,
  FaTag,
  FaFileAlt,
  FaPhone,
  FaGlobe,
} from "react-icons/fa";
import Select from 'react-select';

const BusinessFormModal = ({
  isOpen,
  closeModal,
  handleSubmit,
  business = {},
  handleChange,
  handleFocus,
  handleCategoryChange,
  filteredCategories = [],
  messages = {},
}) => {
  const safeBusiness = {
    name: business.name || "",
    fullName: business.fullName || "",
    address: business.address || "",
    description: business.description || "",
    category: business.category || "",
    ...business,
  };

  const categoryOptions = filteredCategories.map((cat) => ({
    value: cat,
    label: cat,
  }));

  const selectedCategory = categoryOptions.find(
    (option) => option.value === safeBusiness.category
  );

  const handleCategorySelect = (selectedOption) => {
    handleCategoryChange({
      target: { name: "category", value: selectedOption?.value || "" },
    });
  };

  return (
    <Draggable handle=".drag-handle">
      <div>
        <Modal
          isOpen={isOpen}
          onRequestClose={closeModal}
          contentLabel="Business Form Modal"
          className="relative w-full max-w-lg p-4 bg-white rounded-lg shadow-lg mx-2 sm:mx-4 md:mx-auto mt-40  lg:mt-20 md:mt-40 z-40"
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
              {safeBusiness.id ? "Edit Business" : "Add New Business"}
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="name" className="flex items-center text-sm font-medium text-gray-700">
                  <FaBusinessTime className="mr-2" />
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={safeBusiness.name}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {messages.name && (
                  <p className="mt-1 text-xs text-red-600">{messages.name}</p>
                )}
              </div>
              <div>
                <label htmlFor="fullName" className="flex items-center text-sm font-medium text-gray-700">
                  <FaBusinessTime className="mr-2" />
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={safeBusiness.fullName}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {messages.fullName && (
                  <p className="mt-1 text-xs text-red-600">{messages.fullName}</p>
                )}
              </div>
              <div>
                <label htmlFor="address" className="flex items-center text-sm font-medium text-gray-700">
                  <FaHome className="mr-2" />
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={safeBusiness.address}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {messages.address && (
                  <p className="mt-1 text-xs text-red-600">{messages.address}</p>
                )}
              </div>
              <div className="md:col-span-2">
                <label htmlFor="description" className="flex items-center text-sm font-medium text-gray-700">
                  <FaFileAlt className="mr-2" />
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={safeBusiness.description}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  rows="4"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                ></textarea>
                {messages.description && (
                  <p className="mt-1 text-xs text-red-600">{messages.description}</p>
                )}
              </div>
              <div className="md:col-span-2">
                <label htmlFor="category" className="flex items-center text-sm font-medium text-gray-700">
                  <FaTag className="mr-2" />
                  Category
                </label>
                <Select
                  id="category"
                  name="category"
                  options={categoryOptions}
                  value={selectedCategory}
                  onChange={handleCategorySelect}
                  onFocus={handleFocus}
                  className="mt-1"
                  placeholder="Select a category"
                />
                {messages.category && (
                  <p className="mt-1 text-xs text-red-600">{messages.category}</p>
                )}
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {safeBusiness.id ? "Update Business" : "Add Business"}
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

export default BusinessFormModal;
