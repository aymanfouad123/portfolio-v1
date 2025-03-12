import React, { useState, useEffect } from "react";
import CardView from "./components/cardView";
import CodeView from "./components/codeView";
import { portfolioData } from "./data/portfolioData";
import RequestBar from "./components/requestBar";
import StatusMessage from "./components/statusMessage";
import TabSelector from "./components/tabSelector";

function App() {
  // Core states
  const [viewMode, setViewMode] = useState("code");
  const [isLoading, setIsLoading] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [requestMethod, setRequestMethod] = useState("GET");
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Simplified view toggle with cleaner animation flow
  const toggleViewMode = () => {
    if (isLoading || isTransitioning) return;

    const nextView = viewMode === "card" ? "code" : "card";
    const nextMethod = nextView === "card" ? "POST" : "GET";

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
    <div className="flex flex-col items-center justify-center p-4 bg-stone-900 min-h-screen selection:bg-yellow-800 bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:16px_16px]">
      <div className="w-[700px] rounded-lg p-4 flex flex-col h-[530px]">
        {/* Top bar with request buttons */}
        <div className="mb-3">
          <RequestBar
            onToggleView={toggleViewMode}
            currentView={viewMode}
            disabled={isLoading || isTransitioning}
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

        {/* Main content area with hardware-accelerated transitions */}
        <div className="flex-1 mt-3 min-h-[380px] relative overflow-hidden">
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
      <div className="text-gray-500 text-sm font-mono mt-8 mb-2 opacity-70">
        2025 © Ayman Fouad
      </div>
    </div>
  );
}

export default App;
