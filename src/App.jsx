import { useState } from "react";
import CardView from "./components/cardView";
import CodeView from "./components/codeView";
import { portfolioData } from "./data/portfolioData";
import RequestBar from "./components/requestBar";
import StatusMessage from "./components/statusMessage";

function App() {
  const [viewMode, setViewMode] = useState("POST");
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
      setViewMode(viewMode === "POST" ? "GET" : "POST");
      setShowContent(true);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-[#1E1E1E] flex flex-col items-center justify-center p-4">
      <div className="w-[700px] bg-[#1E1E1E] rounded-lg p-4 flex flex-col h-[500px]">
        <div className="mb-3">
          <RequestBar method={viewMode} onSend={handleSend} />
        </div>

        {/* Status message */}
        <div className="h-5 ml-2">
          <StatusMessage
            viewMode={viewMode}
            isLoading={isLoading}
            showStatus={showStatus}
          />
        </div>

        {/* Content area with adjusted height */}
        <div className="flex-1 overflow-y-auto mt-3 min-h-[350px]">
          {showContent ? (
            viewMode === "POST" ? (
              <CodeView data={portfolioData} />
            ) : (
              <CardView portfolioData={portfolioData} />
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
