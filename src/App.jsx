import React, { useState } from "react";
import CardView from "./components/cardView";
import CodeView from "./components/codeView";
import { portfolioData } from "./data/portfolioData";
import RequestBar from "./components/requestBar";
import StatusMessage from "./components/statusMessage";
import TabSelector from "./components/tabSelector";

function App() {
  // Main state variables
  const [viewMode, setViewMode] = useState("code");
  const [isLoading, setIsLoading] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [requestMethod, setRequestMethod] = useState("GET");

  // Handle switching between code and card views
  const toggleViewMode = () => {
    // Don't do anything if already loading
    if (isLoading) return;

    // Figure out which view to show next
    const nextView = viewMode === "card" ? "code" : "card";
    const nextMethod = nextView === "card" ? "POST" : "GET";

    // Start the transition
    setRequestMethod(nextMethod);
    setIsLoading(true);
    setShowStatus(true);

    // Animation logic with timeouts
    requestAnimationFrame(() => {
      setTimeout(() => {
        setViewMode(nextView);

        setTimeout(() => {
          setIsLoading(false);
        }, 400);
      }, 100);
    });
  };

  // Which tab is active depends on the view
  const activeTabName = viewMode === "card" ? "Preview" : "Pretty Print";

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-stone-900 min-h-screen selection:bg-yellow-800 bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:16px_16px]">
      <div className="w-[700px] rounded-lg p-4 flex flex-col h-[530px]">
        {/* Top bar with request buttons */}
        <div className="mb-3">
          <RequestBar
            onToggleView={toggleViewMode}
            currentView={viewMode}
            disabled={isLoading}
          />
        </div>

        {/* Tab selector row */}
        <div className="flex items-center justify-between">
          <div className="flex-grow">
            <TabSelector activeTabName={activeTabName} />
          </div>

          <div className="ml-2 min-w-[140px] text-right">
            {showStatus && (
              <StatusMessage
                viewMode={requestMethod}
                isLoading={isLoading}
                showStatus={true}
              />
            )}
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 mt-3 min-h-[380px] relative overflow-hidden">
          <div
            className="w-full h-full transition-all duration-300 ease-out will-change-opacity will-change-transform"
            style={{
              opacity: isLoading ? 0 : 1,
              transform: isLoading ? "scale(0.98)" : "scale(1)",
            }}
          >
            {viewMode === "card" ? (
              <CardView portfolioData={portfolioData} />
            ) : (
              <CodeView data={portfolioData} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
