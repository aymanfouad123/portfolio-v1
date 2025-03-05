function CodeView({ data }) {
  // Format a JSON value with proper colors
  const renderValue = (value) => {
    if (typeof value === "string") {
      return <span className="text-[#CE9178]">"{value}"</span>;
    } else if (typeof value === "number" || typeof value === "boolean") {
      return <span className="text-[#569CD6]">{String(value)}</span>;
    } else if (value === null) {
      return <span className="text-[#569CD6]">null</span>;
    }
    return <span className="text-white">{JSON.stringify(value)}</span>;
  };

  // Recursive function to render lines of JSON with proper indentation
  const renderLines = (obj, indent = 0, isLast = true) => {
    const lines = [];

    // Opening brace on its own line
    lines.push(
      <div key={`open-${indent}`} className="py-[2px]">
        <div style={{ paddingLeft: `${indent * 20}px` }}>
          <span className="text-[#DCDCAA]">{"{"}</span>
        </div>
      </div>
    );

    // Properties with improved indentation
    Object.entries(obj).forEach(([key, value], index) => {
      const isLastProp = index === Object.entries(obj).length - 1;
      const comma = isLastProp ? "" : ",";

      if (typeof value === "object" && value !== null) {
        // Key for nested object with better spacing
        lines.push(
          <div key={`key-${key}-${indent}`} className="py-[2px]">
            <div style={{ paddingLeft: `${indent * 20 + 20}px` }}>
              <span className="text-[#9CDCFE]">"{key}"</span>:
            </div>
          </div>
        );
        // Recursively render nested object
        lines.push(...renderLines(value, indent + 1, isLastProp));
      } else {
        // Key-value pair with proper spacing
        lines.push(
          <div key={`pair-${key}-${indent}`} className="py-[2px]">
            <div style={{ paddingLeft: `${indent * 20 + 20}px` }}>
              <span className="text-[#9CDCFE]">"{key}"</span>:{" "}
              {renderValue(value)}
              {comma}
            </div>
          </div>
        );
      }
    });

    // Closing brace with proper indentation
    lines.push(
      <div key={`close-${indent}`} className="py-[2px]">
        <div style={{ paddingLeft: `${indent * 20}px` }}>
          <span className="text-[#DCDCAA]">{"}"}</span>
          {!isLast ? "," : ""}
        </div>
      </div>
    );

    return lines;
  };

  return (
    <div className="bg-[#1E1E1E] rounded-md p-5 overflow-auto w-full border border-[#333333]">
      <div
        className="text-white font-mono w-full break-words leading-relaxed"
        style={{
          fontSize: "14px",
          fontFamily:
            "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
        }}
      >
        {renderLines(data)}
      </div>
    </div>
  );
}

export default CodeView;
