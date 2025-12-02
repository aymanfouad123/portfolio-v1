import React, { useState, useRef, useEffect } from "react";

function CardView({ portfolioData }) {
  // Basic animation state - just track visible cards
  const [visibleCards, setVisibleCards] = useState(4); // Start with all cards visible

  const cardStyle =
    "bg-[#232323] p-4 rounded-lg flex flex-col relative overflow-hidden";
  const titleStyle = "text-orange-400 mb-3 text-xl font-mono font-medium";
  const textStyle =
    "text-gray-300 text-base md:text-base text-sm font-mono font-light leading-relaxed tracking-tight whitespace-pre-wrap break-words";
  const linkStyle =
    "block text-blue-400 hover:text-blue-300 transition-colors font-mono font-light tracking-tight hover:underline";

  // Simple animation on mount
  useEffect(() => {
    // Reset visibility
    setVisibleCards(0);

    // Show all cards with a slight delay
    const timer = setTimeout(() => {
      setVisibleCards(4);
    }, 100);

    return () => clearTimeout(timer);
  }, [portfolioData]);

  // Format URLs
  function formatSocialUrl(url) {
    return url.startsWith("http") ? url : `https://${url}`;
  }

  // Basic card component
  function Card({ title, children, index }) {
    const [isHovering, setIsHovering] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const cardRef = useRef(null);

    function handleMouseMove(e) {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }

    return (
      <div
        ref={cardRef}
        className={`${cardStyle} transition-all duration-300 ease-out md:mb-0 mb-3`}
        style={{
          opacity: index < visibleCards ? 1 : 0,
          transform:
            index < visibleCards ? "translateY(0)" : "translateY(15px)",
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onMouseMove={handleMouseMove}
      >
        {/* Mouse glow effect */}
        {isHovering && (
          <div
            className="absolute pointer-events-none opacity-40"
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

        {/* Title */}
        <h2 className={titleStyle}>{title}</h2>

        {/* Content */}
        <div className="relative z-10">{children}</div>
      </div>
    );
  }

  // Text content with cursor for work card
  function TextContent({ text, className, isWorkCard }) {
    if (!text) return null;

    // Show cursor on the third line
    const lines = text.split("\n");
    const cursorLine = 2;

    return (
      <div className={className}>
        {lines.map((line, index) => (
          <div key={index} className="relative">
            {line}

            {/* Orange cursor for work card */}
            {isWorkCard && index === cursorLine && (
              <div
                className="absolute left-0 top-0 h-full w-1.5 bg-amber-600"
                style={{ transform: "translateX(-8px)" }}
              />
            )}
          </div>
        ))}
      </div>
    );
  }

  // Links list
  function SocialLinks({ socials }) {
    return (
      <div className="space-y-2">
        {Object.entries(socials).map(([platform, url]) => {
          // Handle resume link differently (it's a local path)
          const href = url.startsWith('/') ? url : formatSocialUrl(url);
          return (
            <div key={platform}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={linkStyle}
              >
                {platform}
              </a>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-4 h-full">
      <Card title="about" index={0}>
        <TextContent text={portfolioData.aboutme} className={textStyle} />
      </Card>

      <Card title="work" index={1}>
        <TextContent
          text={portfolioData.work}
          className={textStyle}
          isWorkCard={true}
        />
      </Card>

      <Card title="contact" index={2}>
        <TextContent text={portfolioData.contact} className={textStyle} />
      </Card>

      <Card title="socials" index={3}>
        <SocialLinks socials={portfolioData.socials} />
      </Card>
    </div>
  );
}

export default CardView;
