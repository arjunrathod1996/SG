import React from "react";

const MessageDisplay = ({ message }) => (
  message ? (
    <div className="mt-4 p-4 bg-red-100 text-red-800 static rounded-md border border-red-300">
      {message}
    </div>
  ) : null
);

export default MessageDisplay;
