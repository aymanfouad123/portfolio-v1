import React, { useState, useRef } from "react";

function CodeView({ data }) {
  // For mouse tracking
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const codeContainerRef = useRef(null);

  // Track mouse position when hovering
  const handleMouseMove = (e) => {
    if (codeContainerRef.current) {
      const rect = codeContainerRef.current.getBoundingClientRect();
      // Calculate position relative to the container
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  // Define consistent styling classes
  const codeContainerClasses =
    "bg-[#1E1E1E] rounded-md p-4 h-full border border-[#252525] relative overflow-hidden flex items-center justify-center";
  const codeWrapperClasses =
    "text-white break-words overflow-auto relative z-10";

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

    // Closing brace with proper indentation (no extra bottom padding)
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
    <div
      ref={codeContainerRef}
      className={codeContainerClasses}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Circular glow that follows the mouse */}
      {isHovering && (
        <div
          className="absolute pointer-events-none transition-opacity duration-200 opacity-40"
          style={{
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(180,180,180,0.08) 0%, rgba(0,0,0,0) 85%)",
            position: "absolute",
            top: 0,
            left: 0,
            transform: `translate(${mousePosition.x - 150}px, ${
              mousePosition.y - 150
            }px)`,
            zIndex: 5,
          }}
        />
      )}

      <div
        className={codeWrapperClasses}
        style={{
          fontSize: "0.875rem",
          lineHeight: "1.25rem",
          fontFamily:
            "ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace",
          textAlign: "left",
          width: "fit-content",
          maxWidth: "100%",
          ...lightFontStyle,
        }}
      >
        {renderLines(data)}
      </div>
    </div>
  );
}

export default CodeView;
