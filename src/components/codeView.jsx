function CodeView({ data }) {
  // Define consistent styling classes
  const codeContainerClasses =
    "bg-[#1E1E1E] rounded-md p-4 h-full border border-[#333333]";
  const codeWrapperClasses =
    "text-white w-full h-full break-words overflow-auto";

  // Create a style that will override everything
  const lightFontStyle = {
    fontWeight: "200 !important", // Extra light with !important flag
    WebkitFontSmoothing: "antialiased", // Improves rendering on Webkit browsers
    MozOsxFontSmoothing: "grayscale", // Improves rendering on Firefox
  };

  // Format a JSON value with proper colors, with special handling for social links
  const renderValue = (value) => {
    if (typeof value === "string") {
      // Check if this is a social media URL
      if (
        value.includes("linkedin.com") ||
        value.includes("github.com") ||
        value.includes("twitter.com")
      ) {
        // Add https:// if missing
        const fullUrl = value.startsWith("http") ? value : `https://${value}`;
        return (
          <span style={{ color: "#CE9178", ...lightFontStyle }}>
            "
            <a
              href={fullUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#6AB0F3", ...lightFontStyle }}
              className="hover:underline"
            >
              {value}
            </a>
            "
          </span>
        );
      }
      return (
        <span style={{ color: "#CE9178", ...lightFontStyle }}>"{value}"</span>
      );
    } else if (typeof value === "number" || typeof value === "boolean") {
      return (
        <span style={{ color: "#569CD6", ...lightFontStyle }}>
          {String(value)}
        </span>
      );
    } else if (value === null) {
      return <span style={{ color: "#569CD6", ...lightFontStyle }}>null</span>;
    }
    return (
      <span style={{ color: "white", ...lightFontStyle }}>
        {JSON.stringify(value)}
      </span>
    );
  };

  // Recursive function to render lines of JSON with proper indentation
  const renderLines = (obj, indent = 0, isLast = true) => {
    const lines = [];

    // Opening brace on its own line
    lines.push(
      <div key={`open-${indent}`} className="py-[1px]">
        <div style={{ paddingLeft: `${indent * 20}px` }}>
          <span style={{ color: "#FFD700", ...lightFontStyle }}>{"{"}</span>
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
          <div key={`key-${key}-${indent}`} className="py-[1px]">
            <div style={{ paddingLeft: `${indent * 20 + 20}px` }}>
              <span
                style={{
                  color: "#9CDCFE",
                  paddingRight: "8px",
                  ...lightFontStyle,
                }}
              >
                "{key}"
              </span>
              <span style={{ paddingRight: "4px", ...lightFontStyle }}>:</span>
            </div>
          </div>
        );
        // Recursively render nested object
        lines.push(...renderLines(value, indent + 1, isLastProp));
      } else {
        // Key-value pair with proper spacing
        lines.push(
          <div key={`pair-${key}-${indent}`} className="py-[1px]">
            <div style={{ paddingLeft: `${indent * 20 + 20}px` }}>
              <span
                style={{
                  color: "#9CDCFE",
                  paddingRight: "8px",
                  ...lightFontStyle,
                }}
              >
                "{key}"
              </span>
              <span style={{ paddingRight: "4px", ...lightFontStyle }}>:</span>{" "}
              {renderValue(value)}
              {comma}
            </div>
          </div>
        );
      }
    });

    // Closing brace with proper indentation
    lines.push(
      <div key={`close-${indent}`} className="py-[1px]">
        <div style={{ paddingLeft: `${indent * 20}px` }}>
          <span style={{ color: "#FFD700", ...lightFontStyle }}>{"}"}</span>
          {!isLast ? "," : ""}
        </div>
      </div>
    );

    return lines;
  };

  return (
    <div className={codeContainerClasses}>
      <div
        className={codeWrapperClasses}
        style={{
          fontSize: "0.875rem",
          lineHeight: "1.25rem",
          fontFamily:
            "ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace",
          ...lightFontStyle,
        }}
      >
        {renderLines(data)}
      </div>
    </div>
  );
}

export default CodeView;
