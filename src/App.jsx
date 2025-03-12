import React, { useState } from "react";
import CardView from "./components/cardView";
import CodeView from "./components/codeView";
import { portfolioData } from "./data/portfolioData";
import RequestBar from "./components/requestBar";
import StatusMessage from "./components/statusMessage";
import TabSelector from "./components/tabSelector";

function App() {
  // Group related state variables together for better organization
  const [viewMode, setViewMode] = useState("code");
  const [uiState, setUiState] = useState({
    isLoading: false,
    showContent: true,
    showStatus: false, // Initialize as false to hide status initially
    requestMethod: "GET", // Added to track the simulated API request method
  });

  // Toggle between card and code view modes with simulated API request
  const toggleViewMode = () => {
    // Start loading with the appropriate request method for the target view
    const targetView = viewMode === "card" ? "code" : "card";
    const requestMethod = targetView === "card" ? "POST" : "GET";

    // Hide content and show loading state with appropriate method
    setUiState({
      isLoading: true,
      showContent: false,
      showStatus: true, // Show status when toggling views
      requestMethod: requestMethod,
    });

    // Simulate network request time
    setTimeout(() => {
      // Update view mode
      setViewMode(targetView);

      // Show content and success status
      setUiState({
        isLoading: false,
        showContent: true,
        showStatus: true, // Keep status visible after loading
        requestMethod: requestMethod,
      });
    }, 600); // Longer delay to make the loading state visible
  };

  // Determine active tab name based on current view mode
  const activeTabName = viewMode === "card" ? "Preview" : "Pretty Print";

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-stone-900 min-h-screen selection:bg-yellow-800 bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:16px_16px]">
      <div className="w-[700px] rounded-lg p-4 flex flex-col h-[530px]">
        {/* Top navigation bar */}
        <div className="mb-3">
          <RequestBar onToggleView={toggleViewMode} currentView={viewMode} />
        </div>

        {/* Tab selector area with status message on the right */}
        <div className="flex items-center justify-between">
          <div className="flex-grow">
            <TabSelector activeTabName={activeTabName} />
          </div>

          {/* Status message positioned on the right of tabs - only shown after first click */}
          <div className="ml-2">
            {uiState.showStatus && (
              <StatusMessage
                viewMode={uiState.requestMethod}
                isLoading={uiState.isLoading}
                showStatus={uiState.showStatus}
              />
            )}
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 overflow-y-auto mt-3 min-h-[380px]">
          {uiState.showContent ? (
            viewMode === "card" ? (
              <CardView portfolioData={portfolioData} />
            ) : (
              <CodeView data={portfolioData} />
            )
          ) : (
            <div className="h-full"></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
