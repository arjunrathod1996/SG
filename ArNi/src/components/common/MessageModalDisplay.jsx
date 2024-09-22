import React, { useEffect } from "react";

const MessageDisplay = ({ message, type, clearMessage }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        clearMessage();
      }, 3000); // Show message for 3 seconds
      return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }
  }, [message, clearMessage]);

  if (!message) return null;

  const messageStyles = {
    success: "text-green-700 bg-green-100 border-green-300",
    error: "text-red-700 bg-red-100 border-red-300"
  };

  const currentStyle = messageStyles[type] || messageStyles.error;

  return (
    <div className={`p-4 mt-8 text-sm ${currentStyle} border rounded-md`}>
      {message}
    </div>
  );
};

export default MessageDisplay;
