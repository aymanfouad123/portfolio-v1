import React, { useState } from "react";
import CardView from "./components/cardView";
import CodeView from "./components/codeView";
import { portfolioData } from "./data/portfolioData";
import RequestBar from "./components/requestBar";
import StatusMessage from "./components/statusMessage";
import TabSelector from "./components/tabSelector";

function App() {
  // Core view state
  const [viewMode, setViewMode] = useState("code");
  const [isLoading, setIsLoading] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [requestMethod, setRequestMethod] = useState("GET");

  // Simple toggle function with stable status updates
  const toggleViewMode = () => {
    // Don't toggle if already loading
    if (isLoading) return;

    // Calculate next view and request method
    const nextView = viewMode === "card" ? "code" : "card";
    const nextMethod = nextView === "card" ? "POST" : "GET";

    // Set request method first, before any visual changes
    setRequestMethod(nextMethod);

    // Then enable status and loading in the same batch
    setIsLoading(true);
    setShowStatus(true);

    // Use requestAnimationFrame for visual transitions
    requestAnimationFrame(() => {
      // Let the loading state render first
      setTimeout(() => {
        // Switch view mode
        setViewMode(nextView);

        // Wait for animation to complete before removing loading state
        setTimeout(() => {
          setIsLoading(false);
        }, 400);
      }, 100);
    });
  };

  // Simple derived state
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
