import { codeSnippets } from "./codeSnippets";
import { useState } from "react";
import PrettyPrintToggle from "./components/prettyPrintToggle";
import CardView from "./components/cardView";
import CodeView from "./components/codeView";
import { portfolioData } from "./data/portfolioData";

function App() {
  const languages = ["javascript", "python", "csharp"];
  const [language, setLanguage] = useState("javascript");
  const [prettyPrint, setPrettyPrint] = useState(false);

  const cycleLanguage = () => {
    const currentIndex = languages.indexOf(language);
    const nextIndex = (currentIndex + 1) % languages.length;
    setLanguage(languages[nextIndex]);
  };

  const togglePrettyPrint = () => {
    setPrettyPrint(!prettyPrint);
  };

  return (
    <div>
      <PrettyPrintToggle enabled={prettyPrint} onToggle={togglePrettyPrint} />

      {prettyPrint ? (
        <CardView portfolioData={portfolioData} />
      ) : (
        <div>
          <p>
            hi! i'm ayman fouad. i like to build things using{" "}
            <button onClick={cycleLanguage}>{language}</button>
          </p>
          <CodeView language={language} />
        </div>
      )}
    </div>
  );
}

export default App;
