import React from "react";
import Draggable from "react-draggable";
import Modal from "react-modal";
import {
  FaGlobe,
  FaCode,
  FaTimes
} from "react-icons/fa";

const CountryFormModal = ({
  isOpen,
  closeModal,
  handleSubmit,
  country = {},
  handleChange,
  handleFocus,
  messages = {},
}) => {
  const safeCountry = country || {};

  return (
    <>
      <Draggable handle=".drag-handle">
        <div>
          <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Country Form Modal"
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
                {safeCountry.id ? "Edit Country" : "Add New Country"}
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="callingCode"
                    className="flex items-center text-sm font-medium text-gray-700"
                  >
                    <FaCode className="mr-2" />
                    Calling Code
                  </label>
                  <input
                    type="text"
                    id="callingCode"
                    name="callingCode"
                    value={safeCountry.callingCode || ""}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {messages.callingCode && (
                    <p className="mt-1 text-xs text-red-600">{messages.callingCode}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="name"
                    className="flex items-center text-sm font-medium text-gray-700"
                  >
                    <FaGlobe className="mr-2" />
                    Country name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={safeCountry.name || ""}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {messages.name && (
                    <p className="mt-1 text-xs text-red-600">
                      {messages.name}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {safeCountry.id ? "Update Country" : "Add Country"}
                </button>
              </div>
              {messages.modal && (
                <div
                  className={`mt-4 p-4 text-xs ${
                    messages.modal.startsWith("Error")
                      ? "text-red-600 bg-red-100"
                      : "text-green-600 bg-green-100"
                  } border rounded-md`}
                >
                  <p>{messages.modal}</p>
                </div>
              )}
            </form>
          </Modal>
        </div>
      </Draggable>
    </>
  );
};

export default CountryFormModal;
