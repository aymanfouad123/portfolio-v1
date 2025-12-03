import React from "react";

function RequestBar({ onToggleView, currentView, disabled, requestMethod }) {
  return (
    <div className="flex items-center w-full bg-[#121212] rounded-md p-1">
      <div className="flex items-center w-full justify-between">
        {/* Left side with method and URL */}
        <div className="flex items-center flex-grow overflow-hidden">
          {/* Method - GET or POST based on requestMethod */}
          <div
            className={`md:px-4 px-2 py-2 font-mono font-bold md:text-base text-sm whitespace-nowrap ${
              requestMethod === "GET" ? "text-blue-400" : "text-orange-400"
            }`}
          >
            {requestMethod}
          </div>

          {/* URL/endpoint - right next to the method */}
          <div className="text-gray-400 font-mono md:ml-3 ml-1 md:text-base text-xs truncate max-w-[150px] md:max-w-none">
            https://ayman.fyi/portfolio
          </div>
        </div>

        {/* Send button with annotation */}
        <div className="relative">
          {/* Sketch annotation - relative to button */}
          <div className="absolute pointer-events-none select-none -top-10 right-0 md:top-1/2 md:-right-24 md:-translate-y-1/2 flex items-center">
            {/* Mobile: text with arrow below */}
            <div className="flex md:hidden flex-col items-end">
              <span
                className="text-gray-400 text-sm italic whitespace-nowrap"
                style={{ fontFamily: "'Caveat', cursive" }}
              >
                click here!
              </span>
              {/* Arrow pointing down */}
              <svg
                width="20"
                height="16"
                viewBox="0 0 20 16"
                fill="none"
                className="mr-4"
              >
                <path
                  d="M10 2 C10 6, 8 10, 10 12"
                  stroke="#9ca3af"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M7 10 L10 13 L13 10"
                  stroke="#9ca3af"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </div>

            {/* Desktop: arrow pointing left with text */}
            <div className="hidden md:flex items-center">
              <svg
                width="30"
                height="20"
                viewBox="0 0 30 20"
                fill="none"
                className="mr-1"
              >
                <path
                  d="M28 10 C22 10, 18 5, 10 8"
                  stroke="#9ca3af"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M13 5 L9 8 L13 11"
                  stroke="#9ca3af"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
              <span
                className="text-gray-400 text-lg italic whitespace-nowrap"
                style={{ fontFamily: "'Caveat', cursive" }}
              >
                click here!
              </span>
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
    </div>
  );
}

export default RequestBar;
