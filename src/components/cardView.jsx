function CardView({ portfolioData }) {
  // Reusable classes for consistent styling
  const cardClasses = "bg-[#232323] p-4 rounded-lg flex flex-col";
  const headingClasses = "text-code-blue mb-3 text-xl font-courier font-medium";
  const contentClasses =
    "text-gray-300 flex-1 text-base font-courier font-semibold";
  const linkClasses =
    "block text-blue-400 hover:text-blue-300 transition-colors font-courier font-semibold hover:underline";

  // Function to format social links properly
  const formatSocialUrl = (url) => {
    // Add https:// if missing
    return url.startsWith("http") ? url : `https://${url}`;
  };

  return (
    <div className="grid grid-cols-2 gap-4 h-full">
      <div className={cardClasses}>
        <h2 className={headingClasses}>about</h2>
        <p className={contentClasses}>{portfolioData.aboutme}</p>
      </div>

      <div className={cardClasses}>
        <h2 className={headingClasses}>work</h2>
        <p className={contentClasses}>{portfolioData.work}</p>
      </div>

      <div className={cardClasses}>
        <h2 className={headingClasses}>contact</h2>
        <p className={contentClasses}>{portfolioData.contact}</p>
      </div>

      <div className={cardClasses}>
        <h2 className={headingClasses}>socials</h2>
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
      </div>
    </div>
  );
}

export default CardView;
