import React from "react";

function TabSelector({ activeTabName }) {
  // Tab options
  const tabs = ["Pretty Print", "Preview"];

  return (
    <div className="inline-flex text-sm md:text-sm text-xs">
      {tabs.map((tab, index) => {
        const isActive = tab === activeTabName;

        // Add a separator between tabs
        const separator =
          index < tabs.length - 1 ? (
            <span className="text-gray-600 mx-3">|</span>
          ) : null;

        return (
          <React.Fragment key={tab}>
            <div
              className={`
                px-1 py-0.5 font-mono transition-colors duration-200
                ${
                  isActive
                    ? "text-gray-200 border-b border-gray-400"
                    : "text-gray-500"
                }
              `}
              style={{
                whiteSpace: "nowrap",
              }}
            >
              {tab}
            </div>
            {separator}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default TabSelector;
