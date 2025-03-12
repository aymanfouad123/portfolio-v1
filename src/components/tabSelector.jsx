import React from "react";

function TabSelector({ activeTabName }) {
  // Tab options
  const tabs = ["Pretty Print", "Preview"];

  return (
    <div className="inline-flex bg-[#121212] rounded-md p-1 text-sm">
      {tabs.map((tab) => {
        const isActive = tab === activeTabName;

        return (
          <div
            key={tab}
            className={`
              px-3 py-1 rounded-md font-mono transition-colors duration-200
              ${
                isActive
                  ? "bg-[#232323] text-gray-200"
                  : "text-gray-500 hover:text-gray-400"
              }
            `}
            style={{
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {tab}
          </div>
        );
      })}
    </div>
  );
}

export default TabSelector;
