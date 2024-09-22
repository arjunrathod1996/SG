import React from "react";

const WarningMessage = ({ message, isOpen, onClose }) => {
  return (
    isOpen && (
      <div
        className="fixed bottom-4 right-4 z-50 bg-yellow-100 border border-yellow-300 text-yellow-700 px-4 py-3 rounded-lg shadow-lg transition-all duration-300 ease-in-out"
        role="alert"
      >
        <div className="flex items-center">
          <svg
            className="w-5 h-5 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 5h2v6h-2zM11 17h2v2h-2z"
            ></path>
          </svg>
          <div className="flex-1">{message}</div>
          <button
            onClick={onClose}
            className="ml-4 text-gray-500 hover:text-gray-700"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    )
  );
};

export default WarningMessage;
