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
    <div className="min-h-screen bg-[#1E1E1E] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="h-10 flex items-center gap-2 p-4">
          <RequestBar method={viewMode} onSend={handleSend} />
        </div>

        {/* <div className="h-full pt-16 px-4 pb-4 overflow-y-auto">
          <StatusMessage
            viewMode={viewMode}
            isLoading={isLoading}
            showStatus={showStatus}
          />

          {showContent &&
            (viewMode === "POST" ? (
              <CodeView data={portfolioData} />
            ) : (
              <CardView portfolioData={portfolioData} />
            ))} 
        </div>*/}
      </div>
    </div>
  );
}

export default App;
