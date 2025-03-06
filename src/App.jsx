import React, { useState } from "react";
import CardView from "./components/cardView";
import CodeView from "./components/codeView";
import { portfolioData } from "./data/portfolioData";
import RequestBar from "./components/requestBar";
import StatusMessage from "./components/statusMessage";
import TabSelector from "./components/tabSelector";

function App() {
  const [viewMode, setViewMode] = useState("card");
  const [isLoading, setIsLoading] = useState(false);
  const [showContent, setShowContent] = useState(true);
  const [showStatus, setShowStatus] = useState(false);

  const handleSend = () => {
    // Hide content and status, show loading
    setShowContent(false);
    setShowStatus(false);
    setIsLoading(true);

    // After loading, show status and new content
    setTimeout(() => {
      setIsLoading(false);
      setShowStatus(true);
      setViewMode(viewMode === "card" ? "code" : "card");
      setShowContent(true);
    }, 300);
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === "card" ? "code" : "card");
  };

  return (
    <div className="min-h-screen bg-[#1E1E1E] flex flex-col items-center justify-center p-4">
      <div className="w-[700px] bg-[#1E1E1E] rounded-lg p-4 flex flex-col h-[530px]">
        <div className="mb-3">
          <RequestBar onToggleView={toggleViewMode} currentView={viewMode} />
        </div>

        {/* Status message */}
        <div className="h-5 ml-2">
          <StatusMessage
            currentView={viewMode}
            isLoading={isLoading}
            showStatus={showStatus}
          />
        </div>

        {/* Different active tab depending on the view mode */}
        <TabSelector
          activeTabName={viewMode === "card" ? "Preview" : "Pretty Print"}
        />

        {/* Content area with adjusted height */}
        <div className="flex-1 overflow-y-auto mt-3 min-h-[380px]">
          {showContent ? (
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
