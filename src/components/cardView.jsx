import React, { useState, useRef, useEffect } from "react";

function CardView({ portfolioData }) {
  // This keeps track of which cards are visible during the animation
  const [visibleCards, setVisibleCards] = useState(0);

  const cardStyle =
    "bg-[#232323] p-4 rounded-lg flex flex-col relative overflow-hidden";
  const titleStyle = "text-orange-400 mb-3 text-xl font-mono font-medium";
  const textStyle =
    "text-gray-300 text-base font-mono font-light leading-relaxed tracking-tight whitespace-pre-wrap break-words";
  const linkStyle =
    "block text-blue-400 hover:text-blue-300 transition-colors font-mono font-light tracking-tight hover:underline";

  useEffect(() => {
    // Reset to 0 visible cards whenever data changes
    setVisibleCards(0);

    let count = 0;

    // Show one new card every 50ms
    const timer = setInterval(() => {
      if (count < 4) {
        setVisibleCards((oldCount) => oldCount + 1);
        count++;
      } else {
        clearInterval(timer); // Stop the timer when all cards are visible
      }
    }, 50);

    // Clean up the timer when component unmounts
    return () => clearInterval(timer);
  }, [portfolioData]);

  // Makes sure links have https:// at the beginning
  function formatSocialUrl(url) {
    if (url.startsWith("http")) {
      return url;
    } else {
      return `https://${url}`;
    }
  }

  // This component handles the title animation
  function AnimatedTitle({ title, index }) {
    const [isVisible, setIsVisible] = useState(false);

    // Show title when its card becomes visible
    useEffect(() => {
      if (index < visibleCards) {
        // Small delay before showing the title
        const timer = setTimeout(() => setIsVisible(true), 50);
        return () => clearTimeout(timer);
      }
    }, [index, visibleCards]);

    return (
      <h2
        className={titleStyle}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(5px)",
          transition: "opacity 0.2s ease-out, transform 0.2s ease-out",
          visibility: isVisible ? "visible" : "hidden",
        }}
      >
        {title}
      </h2>
    );
  }

  // This component handles the text animation line by line
  function AnimatedText({ text, className, isWorkCard = false }) {
    // Keep track of how many lines we've shown so far
    const [visibleLines, setVisibleLines] = useState(0);

    // The line where we'll show a cursor in the work card
    const cursorLine = 2;

    // Start the animation when text changes
    useEffect(() => {
      // Reset to 0 visible lines
      setVisibleLines(0);

      // Wait a bit before starting animation
      const startDelay = setTimeout(() => {
        let lineCount = 0;

        // Show one new line every 20ms
        const lineInterval = setInterval(() => {
          if (lineCount < 30) {
            // Assuming max 30 lines
            setVisibleLines((prev) => prev + 1);
            lineCount++;
          } else {
            clearInterval(lineInterval);
          }
        }, 20);

        return () => clearInterval(lineInterval);
      }, 100);

      return () => clearTimeout(startDelay);
    }, [text]);

    // Don't show anything if there's no text
    if (!text) return null;

    // Split text into lines and clean them up
    const lines = text
      .trim()
      .split("\n")
      .map((line) => line.trim());

    return (
      <div className={`${className} flex-1 relative`}>
        {lines.map((line, lineIdx) => {
          // Split each line into words so we can animate each word
          const words = line.split(/(\s+)/);

          return (
            <div key={lineIdx} className="relative">
              {words.map((word, wordIdx) => {
                if (word === "") return null;

                // Check if it's just whitespace
                const isSpace = /^\s+$/.test(word);

                if (isSpace) {
                  // Handle spaces
                  return (
                    <span
                      key={`${lineIdx}-${wordIdx}`}
                      className="inline-block"
                      style={{
                        opacity: lineIdx < visibleLines ? 1 : 0,
                        transitionDelay: `${lineIdx * 0.02}s`,
                      }}
                    >
                      {word}
                    </span>
                  );
                }

                // Handle actual words
                return (
                  <span
                    key={`${lineIdx}-${wordIdx}`}
                    className="inline-block transition-all duration-300 ease-out"
                    style={{
                      opacity: lineIdx < visibleLines ? 1 : 0,
                      transform:
                        lineIdx < visibleLines
                          ? "translateY(0)"
                          : "translateY(10px)",
                      transitionDelay: `${lineIdx * 0.02}s`,
                      WebkitFontSmoothing: "antialiased",
                      MozOsxFontSmoothing: "grayscale",
                    }}
                  >
                    {word}
                  </span>
                );
              })}

              {/* This shows a little orange cursor for the work card */}
              {isWorkCard && lineIdx === cursorLine && (
                <div
                  className="absolute left-0 top-0 h-full w-1.5 bg-amber-600"
                  style={{
                    transform: "translateX(-8px)",
                    opacity: lineIdx < visibleLines ? 1 : 0,
                    transition: "opacity 0.3s ease-out",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  }

  // Shows social links with a fade-in animation
  function AnimatedLinks({ socials }) {
    // Track which links are visible
    const [visibleLinks, setVisibleLinks] = useState(0);

    // Animate links appearing one by one
    useEffect(() => {
      setVisibleLinks(0);

      setTimeout(() => {
        let count = 0;
        const totalLinks = Object.keys(socials).length;

        const interval = setInterval(() => {
          if (count < totalLinks) {
            setVisibleLinks((prev) => prev + 1);
            count++;
          } else {
            clearInterval(interval);
          }
        }, 40);

        return () => clearInterval(interval);
      }, 100);
    }, [socials]);

    return (
      <div className="space-y-2 flex-1">
        {Object.entries(socials).map(([platform, url], index) => (
          <div
            key={platform}
            className="transition-all duration-200 ease-out"
            style={{
              opacity: index < visibleLinks ? 1 : 0,
              transform:
                index < visibleLinks ? "translateY(0)" : "translateY(10px)",
              transitionDelay: `${index * 0.05}s`,
            }}
          >
            <a
              href={formatSocialUrl(url)}
              target="_blank"
              rel="noopener noreferrer"
              className={linkStyle}
            >
              {platform}
            </a>
          </div>
        ))}
      </div>
    );
  }

  // Each card with a glow effect when you hover over it
  function Card({ title, children, index }) {
    // Track mouse position and hover state
    const [isHovering, setIsHovering] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const cardRef = useRef(null);

    // Update the mouse position when it moves
    function handleMouseMove(e) {
      if (cardRef.current) {
        // Get the card's position on the page
        const rect = cardRef.current.getBoundingClientRect();

        // Calculate mouse position relative to the card
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    }

    return (
      <div
        ref={cardRef}
        className={cardStyle}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onMouseMove={handleMouseMove}
      >
        {/* This is the glow effect that follows your mouse - so cool! */}
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

  // The main render - a 2x2 grid of cards
  return (
    <div className="grid grid-cols-2 gap-4 h-full">
      {/* About card */}
      <Card title="about" index={0}>
        <AnimatedText text={portfolioData.aboutme} className={textStyle} />
      </Card>

      {/* Work card with the orange cursor */}
      <Card title="work" index={1}>
        <AnimatedText
          text={portfolioData.work}
          className={textStyle}
          isWorkCard={true}
        />
      </Card>

      {/* Contact card */}
      <Card title="contact" index={2}>
        <AnimatedText text={portfolioData.contact} className={textStyle} />
      </Card>

      {/* Socials card with clickable links */}
      <Card title="socials" index={3}>
        <AnimatedLinks socials={portfolioData.socials} />
      </Card>
    </div>
  );
}

export default CardView;
