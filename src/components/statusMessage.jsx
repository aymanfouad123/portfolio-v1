import React from "react";

/**
 * StatusMessage component displays API request status
 *
 * @param {string} viewMode - The current request method ("GET" or "POST")
 * @param {boolean} isLoading - Whether the request is in progress
 * @param {boolean} showStatus - Whether to show the status at all
 */
function StatusMessage({ viewMode, isLoading, showStatus }) {
  // Don't show anything if showStatus is false
  if (!showStatus) return null;

  // Figure out what message to show
  let message;
  if (isLoading) {
    message = viewMode === "POST" ? "Fetching data..." : "Posting data...";
  } else {
    message =
      viewMode === "POST" ? "GET Status: 200 OK" : "POST Status: 201 Created";
  }

  // Set text color based on loading state
  const textColor = isLoading ? "text-gray-400" : "text-emerald-400";

  return (
    <div className="font-mono text-sm whitespace-nowrap">
      <div className={`transition-colors duration-200 ${textColor}`}>
        {message}
      </div>
    </div>
  );
}

export default StatusMessage;
