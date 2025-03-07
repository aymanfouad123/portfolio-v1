import React, { useState, useRef, useEffect } from "react";

function CardView({ portfolioData }) {
  // For card animation
  const [visibleCards, setVisibleCards] = useState(0);

  // Reusable classes for consistent styling - ensure proper font settings for all content
  const cardClasses =
    "bg-[#232323] p-4 rounded-lg flex flex-col relative overflow-hidden";
  const headingClasses = "text-orange-400 mb-3 text-xl font-mono font-medium";
  // Update font size from text-sm to text-base for better readability
  const contentClasses =
    "text-gray-300 text-base font-mono font-light leading-relaxed";
  const linkClasses =
    "block text-blue-400 hover:text-blue-300 transition-colors font-mono font-light hover:underline";

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
    }, 100); // Faster interval between cards (was 150ms)

    return () => clearInterval(animationInterval);
  }, [portfolioData]);

  // Text animation component for card content - ensure consistent rendering
  function AnimatedText({ text, className }) {
    const [visibleLines, setVisibleLines] = useState(0);

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
        }, 40); // Faster animation like codeView

        return () => clearInterval(lineInterval);
      }, 250);

      return () => clearTimeout(animationTimeout);
    }, [text]);

    if (!text) return null;

    // Split text into words to create a more natural animation
    const words = text.split(" ");

    return (
      <div className={`${className} flex-1`}>
        {" "}
        {/* Add flex-1 to ensure consistent height */}
        {words.map((word, index) => {
          // Group words into "lines" (3 words per line for animation)
          const lineNumber = Math.floor(index / 3);

          return (
            <React.Fragment key={index}>
              <span
                className="inline-block transition-all duration-300 ease-out"
                style={{
                  opacity: lineNumber < visibleLines ? 1 : 0,
                  transform:
                    lineNumber < visibleLines
                      ? "translateY(0)"
                      : "translateY(10px)",
                  transitionDelay: `${lineNumber * 0.03}s`,
                  WebkitFontSmoothing: "antialiased",
                  MozOsxFontSmoothing: "grayscale",
                }}
              >
                {word}
              </span>
              <span
                className="inline-block"
                style={{
                  opacity: lineNumber < visibleLines ? 1 : 0,
                  marginRight: "0.25em",
                  transitionDelay: `${lineNumber * 0.03}s`,
                }}
              >
                {" "}
              </span>
            </React.Fragment>
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
        }, 70);

        return () => clearInterval(lineInterval);
      }, 250);

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
              transitionDelay: `${index * 0.08}s`,
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
        }, 100); // Reduced delay (was 150ms)
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
          transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
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

    // Faster transition with shorter delay
    const cardStyle = {
      opacity: index < visibleCards ? 1 : 0,
      transform: index < visibleCards ? "translateY(0)" : "translateY(10px)",
      transition: `opacity 0.3s ease-out ${index * 0.08}s, 
                   transform 0.3s ease-out ${index * 0.08}s`,
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
        <AnimatedText text={portfolioData.work} className={contentClasses} />
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
