import React, { useState, useRef, useEffect } from "react";

function CardView({ portfolioData }) {
  // For card animation
  const [visibleCards, setVisibleCards] = useState(0);

  // Reusable classes for consistent styling
  const cardClasses =
    "bg-[#232323] p-4 rounded-lg flex flex-col relative overflow-hidden";
  const headingClasses =
    "text-orange-400 mb-3 text-xl font-courier font-medium";
  const contentClasses = "text-gray-300 text-base font-courier font-normal";
  const linkClasses =
    "block text-blue-400 hover:text-blue-300 transition-colors font-courier font-normal hover:underline";

  // Function to format social links properly
  const formatSocialUrl = (url) => {
    // Add https:// if missing
    return url.startsWith("http") ? url : `https://${url}`;
  };

  // Animate cards appearing one by one
  useEffect(() => {
    setVisibleCards(0);

    // Longer initial delay for smoother start
    setTimeout(() => {
      // Animate cards one-by-one
      let currentCard = 0;
      const totalCards = 4; // We have 4 cards

      const animationInterval = setInterval(() => {
        if (currentCard < totalCards) {
          setVisibleCards((prev) => prev + 1);
          currentCard++;
        } else {
          clearInterval(animationInterval);
        }
      }, 120); // Faster timing between cards for more fluid sequence

      return () => clearInterval(animationInterval);
    }, 100);

    // Cleanup on unmount
    return () => {};
  }, [portfolioData]);

  // Text animation component
  function AnimatedText({ text, className }) {
    const [visibleLines, setVisibleLines] = useState(0);

    useEffect(() => {
      setVisibleLines(0);

      let lineIndex = 0;
      const totalLines = 20; // Maximum lines to animate

      const lineInterval = setInterval(() => {
        if (lineIndex < totalLines) {
          setVisibleLines((prev) => prev + 1);
          lineIndex++;
        } else {
          clearInterval(lineInterval);
        }
      }, 50);

      return () => clearInterval(lineInterval);
    }, [text]);

    if (!text) return null;

    // Split text into words to create a more natural animation
    const words = text.split(" ");

    return (
      <p className={className}>
        {words.map((word, index) => {
          // Group words into "lines" (3 words per line for animation)
          const lineNumber = Math.floor(index / 3);

          return (
            <span
              key={index}
              className="inline-block transition-all duration-300 ease-out"
              style={{
                opacity: lineNumber < visibleLines ? 1 : 0,
                transform:
                  lineNumber < visibleLines
                    ? "translateY(0)"
                    : "translateY(10px)",
                transitionDelay: `${lineNumber * 0.03}s`,
              }}
            >
              {word}{" "}
            </span>
          );
        })}
      </p>
    );
  }

  // Links animation component
  function AnimatedLinks({ socials }) {
    const [visibleLines, setVisibleLines] = useState(0);

    useEffect(() => {
      setVisibleLines(0);

      let lineIndex = 0;
      const totalLines = Object.keys(socials).length;

      const lineInterval = setInterval(() => {
        if (lineIndex < totalLines) {
          setVisibleLines((prev) => prev + 1);
          lineIndex++;
        } else {
          clearInterval(lineInterval);
        }
      }, 100);

      return () => clearInterval(lineInterval);
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
              transitionDelay: `${index * 0.1}s`,
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

  // Create a component for each card with hover glow effect
  function Card({ title, children, index }) {
    const [isHovering, setIsHovering] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [visibleLines, setVisibleLines] = useState(0);
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

    // Start line animation when this card becomes visible
    useEffect(() => {
      if (index < visibleCards) {
        // Reset line counter
        setVisibleLines(0);

        // Wait a bit after card appears before starting text animation
        const startDelay = 100 + index * 50;

        setTimeout(() => {
          // Animate lines one by one
          let lineIndex = 0;
          const totalLines = 10; // Maximum number of possible lines

          const lineInterval = setInterval(() => {
            if (lineIndex < totalLines) {
              setVisibleLines((prev) => prev + 1);
              lineIndex++;
            } else {
              clearInterval(lineInterval);
            }
          }, 50); // 50ms between lines

          return () => clearInterval(lineInterval);
        }, startDelay);
      }
    }, [index, visibleCards]);

    // Calculate unique transition based on card index for cascade effect
    const getTransitionStyle = () => {
      // Each card comes from a slightly different angle
      const directions = [
        { x: -15, y: 30 }, // About card (top left)
        { x: 15, y: 30 }, // Work card (top right)
        { x: -15, y: 15 }, // Contact card (bottom left)
        { x: 15, y: 15 }, // Socials card (bottom right)
      ];

      const dir = directions[index];
      const delay = index * 0.08; // Slightly faster

      return {
        opacity: index < visibleCards ? 1 : 0,
        transform:
          index < visibleCards
            ? "translateY(0) translateX(0) scale(1)"
            : `translateY(${dir.y}px) translateX(${dir.x}px) scale(0.95)`,
        transition: `opacity 0.5s cubic-bezier(0.34, 1.2, 0.64, 1) ${delay}s, 
                     transform 0.5s cubic-bezier(0.34, 1.2, 0.64, 1) ${delay}s`,
      };
    };

    return (
      <div
        ref={cardRef}
        className={cardClasses}
        style={getTransitionStyle()}
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
        <h2 className={headingClasses}>{title}</h2>
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
