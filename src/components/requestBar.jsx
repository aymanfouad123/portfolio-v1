import React from "react";

function RequestBar({ onToggleView, currentView, disabled }) {
  return (
    <div className="flex items-center w-full bg-[#121212] rounded-md p-1">
      <div className="flex items-center w-full justify-between">
        {/* Left side with method and URL */}
        <div className="flex items-center flex-grow overflow-hidden">
          {/* Method - GET or POST based on currentView */}
          <div
            className={`md:px-4 px-2 py-2 font-mono font-bold md:text-base text-sm whitespace-nowrap ${
              currentView === "code" ? "text-blue-400" : "text-orange-400"
            }`}
          >
            {currentView === "code" ? "GET" : "POST"}
          </div>

          {/* URL/endpoint - right next to the method */}
          <div className="text-gray-400 font-mono md:ml-3 ml-1 md:text-base text-xs truncate max-w-[150px] md:max-w-none">
            https://ayman.fyi/portfolio
          </div>
        </div>

        {/* Send button */}
        <button
          onClick={onToggleView}
          disabled={disabled}
          className="bg-green-500 hover:bg-green-600 text-white font-medium md:py-2 py-1 md:px-6 px-3 md:text-base text-sm rounded-md transition-colors duration-200 whitespace-nowrap"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default RequestBar;
