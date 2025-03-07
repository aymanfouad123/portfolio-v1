import React from "react";

function TabSelector({ activeTabName = "Pretty Print" }) {
  const tabs = ["Pretty Print", "Preview"];

  const tabClasses = (tab) => {
    const baseClasses =
      "px-4 py-2 text-sm font-medium border-t border-l border-r rounded-t-md transition-colors";

    return tab === activeTabName
      ? `${baseClasses} bg-[#1E1E1E] text-orange-400 border-[#252525]`
      : `${baseClasses} bg-[#161616] text-gray-400 border-[#222222]`;
  };

  return (
    <div className="flex space-x-1 mb-[-1px] z-20 relative">
      {tabs.map((tab) => (
        <div key={tab} className={tabClasses(tab)}>
          {tab}
        </div>
      ))}
    </div>
  );
}

export default TabSelector;
