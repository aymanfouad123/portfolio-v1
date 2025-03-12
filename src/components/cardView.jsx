import React, { useState, useRef, useEffect } from "react";

function CardView({ portfolioData }) {
  // For card animation
  const [visibleCards, setVisibleCards] = useState(0);

  // Reusable classes for consistent styling - ensure proper font settings for all content
  const cardClasses =
    "bg-[#232323] p-4 rounded-lg flex flex-col relative overflow-hidden";
  const headingClasses = "text-orange-400 mb-3 text-xl font-mono font-medium";
  // Update styling to match codeView's text appearance with proper letter-spacing and word-spacing
  const contentClasses =
    "text-gray-300 text-base font-mono font-light leading-relaxed tracking-tight whitespace-pre-wrap break-words";
  const linkClasses =
    "block text-blue-400 hover:text-blue-300 transition-colors font-mono font-light tracking-tight hover:underline";

  // Function to format social links properly
  const formatSocialUrl = (url) => {
    // Add https:// if missing
    return url.startsWith("http") ? url : `https://${url}`;
  };

  // Animate cards appearing one by one - now with faster timing
  useEffect(() => {
    setVisibleCards(0);

    // Immediately start animating cards (no initial delay)
    let currentCard = 0;
    const totalCards = 4;

    const animationInterval = setInterval(() => {
      if (currentCard < totalCards) {
        setVisibleCards((prev) => prev + 1);
        currentCard++;
      } else {
        clearInterval(animationInterval);
      }
    }, 50); // Reduced from 100ms to 50ms to match CodeView speed

    return () => clearInterval(animationInterval);
  }, [portfolioData]);

  // Text animation component for card content - ensure consistent rendering
  function AnimatedText({ text, className, isWorkCard = false }) {
    const [visibleLines, setVisibleLines] = useState(0);
    const [cursorPosition, setCursorPosition] = useState(2); // Line where cursor appears
    const lineRefs = useRef([]);

    useEffect(() => {
      setVisibleLines(0);

      const animationTimeout = setTimeout(() => {
        let lineIndex = 0;
        const totalLines = 30;

        const lineInterval = setInterval(() => {
          if (lineIndex < totalLines) {
            setVisibleLines((prev) => prev + 1);
            lineIndex++;
          } else {
            clearInterval(lineInterval);
          }
        }, 20); // Reduced from 40ms to 20ms to match CodeView speed

        return () => clearInterval(lineInterval);
      }, 100); // Reduced from 250ms to 100ms

      return () => clearTimeout(animationTimeout);
    }, [text]);

    if (!text) return null;

    // Clean and prepare the text for proper display
    const cleanText = text.trim(); // Remove extra whitespace at start/end

    // Split text into lines with proper handling of empty lines
    const lines = cleanText.split("\n").map((line) => line.trim()); // Remove any leading/trailing spaces

    // Make sure our ref array is the correct length
    if (lineRefs.current.length !== lines.length) {
      lineRefs.current = Array(lines.length)
        .fill(null)
        .map((_, i) => lineRefs.current[i] || React.createRef());
    }

    return (
      <div className={`${className} flex-1 relative`}>
        {lines.map((line, lineIdx) => {
          // Split each line by words but preserve spacing patterns
          const words = line.split(/(\s+)/);

          return (
            <div
              key={lineIdx}
              className="relative"
              ref={lineRefs.current[lineIdx]}
            >
              {words.map((word, index) => {
                // Skip rendering empty strings
                if (word === "") return null;

                // Determine if this is a space sequence or an actual word
                const isSpace = /^\s+$/.test(word);

                // Group words for animation
                const animLineNumber = lineIdx;

                if (isSpace) {
                  // Special handling for spaces - keep them simple
                  return (
                    <span
                      key={`${lineIdx}-${index}`}
                      className="inline-block"
                      style={{
                        opacity: animLineNumber < visibleLines ? 1 : 0,
                        transitionDelay: `${animLineNumber * 0.02}s`,
                      }}
                    >
                      {word}
                    </span>
                  );
                }

                return (
                  <span
                    key={`${lineIdx}-${index}`}
                    className="inline-block transition-all duration-300 ease-out"
                    style={{
                      opacity: animLineNumber < visibleLines ? 1 : 0,
                      transform:
                        animLineNumber < visibleLines
                          ? "translateY(0)"
                          : "translateY(10px)",
                      transitionDelay: `${animLineNumber * 0.02}s`,
                      WebkitFontSmoothing: "antialiased",
                      MozOsxFontSmoothing: "grayscale",
                    }}
                  >
                    {word}
                  </span>
                );
              })}

              {/* Cursor overlay for work card - absolute positioned to not affect layout */}
              {isWorkCard && lineIdx === cursorPosition && (
                <div
                  className="absolute left-0 top-0 h-full w-1.5 bg-amber-600"
                  style={{
                    transform: "translateX(-8px)", // Position it to the left of the text
                    opacity: lineIdx < visibleLines ? 1 : 0,
                    transition: "opacity 0.3s ease-out",
                  }}
                ></div>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  // Links animation component
  function AnimatedLinks({ socials }) {
    const [visibleLines, setVisibleLines] = useState(0);

    useEffect(() => {
      setVisibleLines(0);

      const animationTimeout = setTimeout(() => {
        let lineIndex = 0;
        const totalLines = Object.keys(socials).length;

        const lineInterval = setInterval(() => {
          if (lineIndex < totalLines) {
            setVisibleLines((prev) => prev + 1);
            lineIndex++;
          } else {
            clearInterval(lineInterval);
          }
        }, 40); // Reduced from 70ms to 40ms

        return () => clearInterval(lineInterval);
      }, 100); // Reduced from 250ms to 100ms

      return () => clearTimeout(animationTimeout);
    }, [socials]);

    return (
      <div className="space-y-2 flex-1">
        {Object.entries(socials).map(([platform, url], index) => (
          <div
            key={platform}
            className="transition-all duration-200 ease-out"
            style={{
              opacity: index < visibleLines ? 1 : 0,
              transform:
                index < visibleLines ? "translateY(0)" : "translateY(10px)",
              transitionDelay: `${index * 0.05}s`, // Reduced from 0.08s to 0.05s
            }}
          >
            <a
              href={formatSocialUrl(url)}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClasses}
            >
              {platform}
            </a>
          </div>
        ))}
      </div>
    );
  }

  // Fixed Card title animation
  function AnimatedTitle({ title, index }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      // Set initial state to false to avoid flash
      setIsVisible(false);

      if (index < visibleCards) {
        // Start title animation sooner
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 50); // Reduced from 100ms to 50ms
        return () => clearTimeout(timer);
      }

      return () => {};
    }, [index, visibleCards]);

    return (
      <h2
        className={headingClasses}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(5px)",
          transition: "opacity 0.2s ease-out, transform 0.2s ease-out", // Reduced from 0.3s to 0.2s
          // Ensure absolutely no visibility until animation starts
          visibility: isVisible ? "visible" : "hidden",
        }}
      >
        {title}
      </h2>
    );
  }

  // Simple card component with faster fade-in transition
  function Card({ title, children, index }) {
    const [isHovering, setIsHovering] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    // Remove transition and always show cards with opacity 1
    const cardStyle = {
      opacity: 1,
      transform: "translateY(0)",
    };

    return (
      <div
        ref={cardRef}
        className={cardClasses}
        style={cardStyle}
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
        <AnimatedTitle title={title} index={index} />
        <div className="relative z-10">{children}</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 h-full">
      <Card title="about" index={0}>
        <AnimatedText text={portfolioData.aboutme} className={contentClasses} />
      </Card>

      <Card title="work" index={1}>
        <AnimatedText
          text={portfolioData.work}
          className={contentClasses}
          isWorkCard={true}
        />
      </Card>

      <Card title="contact" index={2}>
        <AnimatedText text={portfolioData.contact} className={contentClasses} />
      </Card>

      <Card title="socials" index={3}>
        <AnimatedLinks socials={portfolioData.socials} />
      </Card>
    </div>
  );
}

export default CardView;
