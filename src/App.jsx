import { useState } from "react";
import CardView from "./components/cardView";
import CodeView from "./components/codeView";
import { portfolioData } from "./data/portfolioData";
import RequestBar from "./components/requestBar";

function App() {
  const [viewMode, setViewMode] = useState("POST");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = () => {
    setIsLoading(true);
    setTimeout(() => {
      setViewMode(viewMode === "POST" ? "GET" : "POST");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div>
      <RequestBar method={viewMode} onSend={handleSend} />
      {viewMode === "POST" ? (
        <CodeView data={portfolioData} />
      ) : (
        <CardView portfolioData={portfolioData} />
      )}
    </div>
  );
}

export default App;
