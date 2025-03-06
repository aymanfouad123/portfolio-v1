import React, { useState, useRef } from "react";

function CardView({ portfolioData }) {
  // Reusable classes for consistent styling
  const cardClasses =
    "bg-[#232323] p-4 rounded-lg flex flex-col relative overflow-hidden";
  const headingClasses = "text-code-blue mb-3 text-xl font-courier font-medium";
  const contentClasses =
    "text-gray-300 flex-1 text-base font-courier font-normal";
  const linkClasses =
    "block text-blue-400 hover:text-blue-300 transition-colors font-courier font-normal hover:underline";

  // Function to format social links properly
  const formatSocialUrl = (url) => {
    // Add https:// if missing
    return url.startsWith("http") ? url : `https://${url}`;
  };

  // Create a component for each card with hover glow effect
  function Card({ title, children }) {
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

    return (
      <div
        ref={cardRef}
        className={cardClasses}
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
      <Card title="about">
        <p className={contentClasses}>{portfolioData.aboutme}</p>
      </Card>

      <Card title="work">
        <p className={contentClasses}>{portfolioData.work}</p>
      </Card>

      <Card title="contact">
        <p className={contentClasses}>{portfolioData.contact}</p>
      </Card>

      <Card title="socials">
        <div className="space-y-2 flex-1">
          {Object.entries(portfolioData.socials).map(([platform, url]) => (
            <a
              key={platform}
              href={formatSocialUrl(url)}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClasses}
            >
              {platform}
            </a>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default CardView;
