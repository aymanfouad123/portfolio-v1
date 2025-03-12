import React, { useState, useRef, useEffect } from "react";

function CodeView({ data }) {
  // Keep track of mouse position for the cool glow effect
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const codeContainerRef = useRef(null);

  // For the animation effect when lines appear
  const [visibleLines, setVisibleLines] = useState(0);
  const [renderedLines, setRenderedLines] = useState([]);

  // Update mouse position when moving around
  function handleMouseMove(e) {
    if (codeContainerRef.current) {
      const rect = codeContainerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  }

  // Some styling classes to keep things organized
  const containerStyle =
    "bg-[#1E1E1E] rounded-md p-4 h-full border border-[#252525] relative overflow-hidden flex items-center justify-center";
  const codeStyle = "text-white break-words overflow-auto relative z-10";

  // Makes the font look nice and light
  const lightFont = {
    fontWeight: "200",
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
  };

  // Shows different colored text based on what type of data it is
  function formatValue(value) {
    // For strings (text)
    if (typeof value === "string") {
      // Special handling for links - make them clickable
      if (
        value.includes("linkedin.com") ||
        value.includes("github.com") ||
        value.includes("twitter.com")
      ) {
        const fullUrl = value.startsWith("http") ? value : `https://${value}`;
        return (
          <span style={{ color: "#CE9178", ...lightFont }}>
            "
            <a
              href={fullUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#6AB0F3", ...lightFont }}
              className="hover:underline"
            >
              {value}
            </a>
            "
          </span>
        );
      }
      // Regular strings get red color
      return <span style={{ color: "#CE9178", ...lightFont }}>"{value}"</span>;
    }

    // Numbers and booleans get blue color
    else if (typeof value === "number" || typeof value === "boolean") {
      return (
        <span style={{ color: "#569CD6", ...lightFont }}>{String(value)}</span>
      );
    }

    // Null values get blue color too
    else if (value === null) {
      return <span style={{ color: "#569CD6", ...lightFont }}>null</span>;
    }

    // Anything else (shouldn't happen much)
    return (
      <span style={{ color: "white", ...lightFont }}>
        {JSON.stringify(value)}
      </span>
    );
  }

  // This turns our JSON object into nice formatted lines of code
  function createCodeLines(obj, indent = 0, isLast = true) {
    const lines = [];

    // First add the opening brace {
    lines.push(
      <div key={`open-${indent}`} className="py-[1px]">
        <div style={{ paddingLeft: `${indent * 20}px` }}>
          <span style={{ color: "#FFD700", ...lightFont }}>{"{"}</span>
        </div>
      </div>
    );

    // Then add each property in the object
    Object.entries(obj).forEach(([key, value], index) => {
      const isLastItem = index === Object.entries(obj).length - 1;
      const comma = isLastItem ? "" : ",";

      // If it's a nested object, we need to handle it differently
      if (typeof value === "object" && value !== null) {
        // Add the property name first
        lines.push(
          <div key={`key-${key}-${indent}`} className="py-[1px]">
            <div style={{ paddingLeft: `${indent * 20 + 20}px` }}>
              <span
                style={{ color: "#9CDCFE", paddingRight: "8px", ...lightFont }}
              >
                "{key}"
              </span>
              <span style={{ paddingRight: "4px", ...lightFont }}>:</span>
            </div>
          </div>
        );

        // Then recursively format the nested object
        lines.push(...createCodeLines(value, indent + 1, isLastItem));
      }
      // For simple values (strings, numbers, etc.)
      else {
        lines.push(
          <div key={`pair-${key}-${indent}`} className="py-[1px]">
            <div style={{ paddingLeft: `${indent * 20 + 20}px` }}>
              <span
                style={{ color: "#9CDCFE", paddingRight: "8px", ...lightFont }}
              >
                "{key}"
              </span>
              <span style={{ paddingRight: "4px", ...lightFont }}>:</span>{" "}
              {formatValue(value)}
              {comma}
            </div>
          </div>
        );
      }
    });

    // Finish with the closing brace }
    lines.push(
      <div key={`close-${indent}`} className="py-[1px]">
        <div style={{ paddingLeft: `${indent * 20}px` }}>
          <span style={{ color: "#FFD700", ...lightFont }}>{"}"}</span>
          {!isLast ? "," : ""}
        </div>
      </div>
    );

    return lines;
  }

  // When data changes, regenerate the code and animate it
  useEffect(() => {
    // Create all the code lines from our data
    const lines = createCodeLines(data);
    setRenderedLines(lines);

    // Reset animation
    setVisibleLines(0);

    // Show lines one by one
    let lineCount = 0;
    const totalLines = lines.length;

    const animation = setInterval(() => {
      if (lineCount < totalLines) {
        setVisibleLines((prev) => prev + 1);
        lineCount++;
      } else {
        clearInterval(animation);
      }
    }, 40); // Shows a new line every 40ms

    // Clean up when component unmounts
    return () => clearInterval(animation);
  }, [data]);

  return (
    <div
      ref={codeContainerRef}
      className={containerStyle}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
    >
      {/* This makes the cool glow effect that follows your mouse */}
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

      {/* The actual code display */}
      <div
        className={codeStyle}
        style={{
          fontSize: "0.875rem",
          lineHeight: "1.25rem",
          fontFamily: "monospace",
          textAlign: "left",
          width: "fit-content",
          maxWidth: "100%",
          ...lightFont,
        }}
      >
        {/* Each line fades in one by one */}
        {renderedLines.map((line, index) => (
          <React.Fragment key={index}>
            {React.cloneElement(line, {
              style: {
                opacity: index < visibleLines ? 1 : 0,
                transform:
                  index < visibleLines ? "translateY(0)" : "translateY(10px)",
                transition: "opacity 0.2s ease-out, transform 0.2s ease-out",
              },
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default CodeView;
