import React, { useState } from "react";
import CardView from "./components/cardView";
import CodeView from "./components/codeView";
import { portfolioData } from "./data/portfolioData";
import RequestBar from "./components/requestBar";
import StatusMessage from "./components/statusMessage";
import TabSelector from "./components/tabSelector";

function App() {
  // Core view state - all we need
  const [viewMode, setViewMode] = useState("code");
  const [isLoading, setIsLoading] = useState(false);
  const [showStatus, setShowStatus] = useState(false);

  // Simple toggle function
  const toggleViewMode = () => {
    // Don't toggle if already loading
    if (isLoading) return;

    // Show loading state and status
    setIsLoading(true);
    setShowStatus(true);

    // Use requestAnimationFrame to ensure smooth transition
    requestAnimationFrame(() => {
      // Use setTimeout to ensure CSS transitions have time to start
      setTimeout(() => {
        // Toggle the view
        setViewMode(viewMode === "card" ? "code" : "card");

        // Hide loading after a short delay
        setTimeout(() => {
          setIsLoading(false);
        }, 400);
      }, 50);
    });
  };

  // Simple derived state
  const requestMethod = viewMode === "card" ? "POST" : "GET";
  const activeTabName = viewMode === "card" ? "Preview" : "Pretty Print";

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-stone-900 min-h-screen selection:bg-yellow-800 bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:16px_16px]">
      <div className="w-[700px] rounded-lg p-4 flex flex-col h-[530px]">
        {/* Top navigation bar */}
        <div className="mb-3">
          <RequestBar
            onToggleView={toggleViewMode}
            currentView={viewMode}
            disabled={isLoading}
          />
        </div>

        {/* Tab selector area with status message on the right */}
        <div className="flex items-center justify-between">
          <div className="flex-grow">
            <TabSelector activeTabName={activeTabName} />
          </div>

          {/* Status message positioned on the right of tabs */}
          <div className="ml-2">
            {showStatus && (
              <StatusMessage
                viewMode={requestMethod}
                isLoading={isLoading}
                showStatus={true}
              />
            )}
          </div>
        </div>

        {/* Main content area with clean transitions */}
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
