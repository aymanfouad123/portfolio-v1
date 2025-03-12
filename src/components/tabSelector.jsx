import React from "react";

function TabSelector({ activeTabName }) {
  // Tab options
  const tabs = ["Pretty Print", "Preview"];

  return (
    <div className="flex rounded-t-md overflow-hidden bg-[#171717] border-b border-[#232323]">
      {tabs.map((tabName) => {
        const isActive = tabName === activeTabName;

        return (
          <div
            key={tabName}
            className={`relative px-5 py-2 font-mono text-sm cursor-default transition-all ${
              isActive
                ? "text-blue-400 bg-[#232323]"
                : "text-gray-400 hover:text-gray-300 bg-[#171717]"
            }`}
          >
            {tabName}

            {/* Active indicator line */}
            {isActive && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400" />
            )}
          </div>
        );
      })}

      {/* Fill remaining space with tab bar background */}
      <div className="flex-grow bg-[#171717]"></div>
    </div>
  );
}

export default TabSelector;
