import React from "react";

function RequestBar({ onToggleView, currentView, disabled }) {
  // Determine if button should be in GET or POST state
  const isGet = currentView === "code";
  const buttonText = isGet ? "GET" : "POST";
  const url = "https://ayman.fyi/portfolio";

  return (
    <div className="flex items-center bg-[#171717] rounded-md w-full overflow-hidden">
      {/* Method button */}
      <button
        onClick={onToggleView}
        disabled={disabled}
        className={`px-4 py-2 font-mono text-base font-medium transition-colors duration-200 ${
          isGet ? "text-blue-400" : "text-green-400"
        } ${disabled ? "opacity-50 cursor-not-allowed" : "hover:text-white"}`}
      >
        {buttonText}
      </button>

      {/* URL display */}
      <div className="font-mono text-gray-400 pl-2 py-2 flex-1 truncate">
        {url}
      </div>

      {/* Send button */}
      <button
        onClick={onToggleView}
        disabled={disabled}
        className={`bg-green-600 text-white font-medium py-2 px-6 transition-all duration-200 
        ${disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-green-500"}`}
      >
        Send
      </button>
    </div>
  );
}

export default RequestBar;
