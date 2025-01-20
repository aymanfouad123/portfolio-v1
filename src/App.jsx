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
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-code-bg text-white p-8">
      <div className="max-w-3xl mx-auto space-y-4">
        {/* RequestBar closer to top */}
        <div>
          <RequestBar method={viewMode} onSend={handleSend} />
        </div>

        {/* Status message */}
        <div className="pl-2">
          <StatusMessage
            viewMode={viewMode}
            isLoading={isLoading}
            showStatus={showStatus}
          />
        </div>

        {/* Content */}
        <div>
          {showContent &&
            (viewMode === "POST" ? (
              <CodeView data={portfolioData} />
            ) : (
              <CardView portfolioData={portfolioData} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
