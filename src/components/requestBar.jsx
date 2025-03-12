import React from "react";

function RequestBar({ onToggleView, currentView }) {
  // Determine button color based on view mode
  const methodLabel = currentView === "card" ? "GET" : "POST";
  const buttonColorClass =
    currentView === "card"
      ? "bg-green-600 hover:bg-green-700"
      : "bg-blue-600 hover:bg-blue-700";

  return (
    <div className="flex items-center gap-2 bg-[#151212] p-2 rounded-md font-sans">
      <span className="text-gray-300">{methodLabel}</span>
      <span className="flex-1 text-gray-400 font-mono text-sm">
        https://ayman.fyi/portfolio
      </span>
      <button
        onClick={onToggleView}
        className={`${buttonColorClass} px-4 py-1.5 rounded-md 
                  text-sm font-medium transition-colors text-white`}
      >
        Send
      </button>
    </div>
  );
}

export default RequestBar;
