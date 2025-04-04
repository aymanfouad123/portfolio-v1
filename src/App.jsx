import React, { useState, useEffect } from "react";
import CardView from "./components/cardView";
import CodeView from "./components/codeView";
import { portfolioData } from "./data/portfolioData";
import RequestBar from "./components/requestBar";
import StatusMessage from "./components/statusMessage";
import TabSelector from "./components/tabSelector";

function App() {
  // Core states - setting initial request method to POST since initial view is code
  const [viewMode, setViewMode] = useState("code");
  const [isLoading, setIsLoading] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [requestMethod, setRequestMethod] = useState("POST"); // Start with POST for code view
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Simplified view toggle with cleaner animation flow
  const toggleViewMode = () => {
    if (isLoading || isTransitioning) return;

    const nextView = viewMode === "card" ? "code" : "card";

    // Set the correct request method for each view (POST for code, GET for card)
    const nextMethod = nextView === "code" ? "POST" : "GET";

    // Start transition
    setIsTransitioning(true);
    setIsLoading(true);
    setShowStatus(true);
    setRequestMethod(nextMethod);

    // Fade out
    requestAnimationFrame(() => {
      // Wait for fade out to complete
      setTimeout(() => {
        // Switch view mode
        setViewMode(nextView);

        // Allow time for new view to mount before fading in
        requestAnimationFrame(() => {
          setTimeout(() => {
            setIsLoading(false);

            // Wait for fade-in to complete before allowing new transitions
            setTimeout(() => {
              setIsTransitioning(false);
            }, 350);
          }, 50);
        });
      }, 250); // Slightly longer than opacity transition to ensure it's complete
    });
  };

  // Which tab is active depends on the view
  const activeTabName = viewMode === "card" ? "Preview" : "Pretty Print";

  return (
    <div className="flex flex-col items-center justify-center p-4 md:p-4 p-2 bg-stone-900 min-h-screen selection:bg-yellow-800 bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:16px_16px]">
      {/* Responsive container: fixed width on desktop, full width on mobile */}
      <div className="w-full md:w-[700px] rounded-lg p-4 md:p-4 p-3 flex flex-col md:h-[530px] h-auto">
        {/* Top bar with request buttons */}
        <div className="mb-3 md:mb-3 mb-2">
          <RequestBar
            onToggleView={toggleViewMode}
            currentView={viewMode}
            disabled={isLoading || isTransitioning}
            requestMethod={requestMethod}
          />
        </div>

        {/* Tab selector row - stack vertically on mobile */}
        <div className="flex md:flex-row flex-col md:items-center items-start justify-between md:mb-0 mb-2">
          <div className="flex-grow md:mb-0 mb-2">
            <TabSelector activeTabName={activeTabName} />
          </div>

          <div className="md:ml-2 ml-0 min-w-[140px] md:text-right text-left">
            {showStatus && (
              <StatusMessage
                viewMode={requestMethod}
                isLoading={isLoading}
                showStatus={true}
              />
            )}
          </div>
        </div>

        {/* Main content area with hardware-accelerated transitions */}
        <div className="flex-1 mt-3 md:min-h-[380px] min-h-[500px] relative overflow-hidden">
          <div
            className="w-full h-full transition-all duration-250 ease-out will-change-opacity will-change-transform"
            style={{
              opacity: isLoading ? 0 : 1,
              transform: isLoading
                ? "scale3d(0.98, 0.98, 1)"
                : "scale3d(1, 1, 1)",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            {viewMode === "card" ? (
              <CardView portfolioData={portfolioData} />
            ) : (
              <CodeView data={portfolioData} skipAnimation={true} />
            )}
          </div>
        </div>
      </div>

      {/* Copyright footer */}
      <div className="text-gray-500 text-sm font-mono mt-8 mb-6 opacity-70">
        2025 © Ayman Fouad
      </div>
    </div>
  );
}

export default App;
